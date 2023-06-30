import * as doctrine from 'doctrine';
import * as recast from 'recast';
import { PropTypeDescriptor } from 'react-docgen';
import {
  isElementTypeAcceptingRefProp,
  isElementAcceptingRefProp,
} from './generatePropTypeDescription';
import { DescribeablePropDescriptor } from './createDescribeableProp';
import escapeCell from './escapeCell';

function resolveType(type: NonNullable<doctrine.Tag['type']>): string {
  if (type.type === 'AllLiteral') {
    return 'any';
  }

  if (type.type === 'VoidLiteral') {
    return 'void';
  }

  if (type.type === 'NullLiteral') {
    return 'null';
  }

  if (type.type === 'UndefinedLiteral') {
    return 'undefined';
  }

  if (type.type === 'TypeApplication') {
    return `${resolveType(type.expression)}<${type.applications
      .map((typeApplication) => {
        return resolveType(typeApplication);
      })
      .join(', ')}>`;
  }

  if (type.type === 'UnionType') {
    return type.elements.map((t) => resolveType(t)).join(' | ');
  }

  if (type.type === 'RecordType') {
    if (type.fields.length === 0) {
      return '{}';
    }

    return `{ ${type.fields.map((field) => resolveType(field)).join(', ')} }`;
  }

  if (type.type === 'FieldType') {
    return `${type.key}: ${type.value ? resolveType(type.value) : 'any'}`;
  }

  if ('name' in type) {
    return type.name;
  }
  throw new TypeError(`resolveType for '${type.type}' not implemented`);
}

function getDeprecatedInfo(type: PropTypeDescriptor) {
  const marker = /deprecatedPropType\((\r*\n)*\s*PropTypes\./g;
  const match = type.raw.match(marker);
  const startIndex = type.raw.search(marker);
  if (match) {
    const offset = match[0].length;

    return {
      propTypes: type.raw.substring(startIndex + offset, type.raw.indexOf(',')),
      explanation: recast.parse(type.raw).program.body[0].expression.arguments[1].value,
    };
  }

  return false;
}

export default function generatePropDescription(
  prop: DescribeablePropDescriptor,
  propName: string,
): {
  deprecated: string;
  jsDocText: string;
  signature?: string;
  signatureArgs?: { name: string; description: string }[];
  signatureReturn?: { name: string; description: string };
  notes: string;
} {
  const { annotation } = prop;
  const type = prop.type;
  let deprecated = '';

  if (type.name === 'custom') {
    const deprecatedInfo = getDeprecatedInfo(type);
    if (deprecatedInfo) {
      deprecated = `*Deprecated*. ${deprecatedInfo.explanation}<br><br>`;
    }
  }

  // Two new lines result in a newline in the table.
  // All other new lines must be eliminated to prevent markdown mayhem.
  const jsDocText = escapeCell(annotation.description)
    .replace(/(\r?\n){2}/g, '<br>')
    .replace(/\r?\n/g, ' ');

  // Split up the parsed tags into 'arguments' and 'returns' parsed objects. If there's no
  // 'returns' parsed object (i.e., one with title being 'returns'), make one of type 'void'.
  const parsedArgs: readonly doctrine.Tag[] = annotation.tags.filter(
    (tag) => tag.title === 'param',
  );
  let parsedReturns: { description?: string | null; type?: doctrine.Type | null } | undefined =
    annotation.tags.find((tag) => tag.title === 'returns');

  let signature;
  let signatureArgs;
  let signatureReturn;
  if (type.name === 'func' && (parsedArgs.length > 0 || parsedReturns !== undefined)) {
    parsedReturns = parsedReturns ?? { type: { type: 'VoidLiteral' } };

    // Remove new lines from tag descriptions to avoid markdown errors.
    annotation.tags.forEach((tag) => {
      if (tag.description) {
        tag.description = tag.description.replace(/\r*\n/g, ' ');
      }
    });

    const returnType = parsedReturns.type;
    if (returnType == null) {
      throw new TypeError(
        `Function signature for prop '${propName}' has no return type. Try \`@returns void\`. Otherwise it might be a bug with doctrine.`,
      );
    }
    const returnTypeName = resolveType(returnType);

    signature = `function(${parsedArgs
      .map((tag, index) => {
        if (tag.type != null && tag.type.type === 'OptionalType') {
          return `${tag.name}?: ${(tag.type.expression as any).name}`;
        }

        if (tag.type === undefined) {
          throw new TypeError(
            `In function signature for prop '${propName}' Argument #${index} has no type.`,
          );
        }
        return `${tag.name}: ${resolveType(tag.type!)}`;
      })
      .join(', ')}) => ${returnTypeName}`;

    signatureArgs = parsedArgs
      .filter((tag) => tag.description && tag.name)
      .map((tag) => ({ name: tag.name!, description: tag.description! }));

    if (parsedReturns.description) {
      signatureReturn = { name: returnTypeName, description: parsedReturns.description };
    }
  }

  let notes = '';
  if (isElementAcceptingRefProp(type) || isElementTypeAcceptingRefProp(type)) {
    notes +=
      '⚠️ [Needs to be able to hold a ref](/material-ui/guides/composition/#caveat-with-refs).';
  }

  return {
    deprecated,
    jsDocText,
    signature,
    signatureArgs,
    signatureReturn,
    notes,
  };
}
