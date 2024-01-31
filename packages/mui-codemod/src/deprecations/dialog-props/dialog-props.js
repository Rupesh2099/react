import findComponentJSX from '../../util/findComponentJSX';
import assignObject from '../../util/assignObject';
import appendAttribute from '../../util/appendAttribute';

/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;

  findComponentJSX(j, { root, componentName: 'Dialog' }, (elementPath) => {
    let index = elementPath.node.openingElement.attributes.findIndex(
      (attr) => attr.type === 'JSXAttribute' && attr.name.name === 'TransitionComponent',
    );
    if (index !== -1) {
      const removed = elementPath.node.openingElement.attributes.splice(index, 1);
      let hasNode = false;
      elementPath.node.openingElement.attributes.forEach((attr) => {
        if (attr.name?.name === 'slots') {
          hasNode = true;
          assignObject(j, {
            target: attr,
            key: 'transition',
            expression: removed[0].value.expression,
          });
        }
      });
      if (!hasNode) {
        appendAttribute(j, {
          target: elementPath.node,
          attributeName: 'slots',
          expression: j.objectExpression([
            j.objectProperty(j.identifier('transition'), removed[0].value.expression),
          ]),
        });
      }
    }

    index = elementPath.node.openingElement.attributes.findIndex(
      (attr) => attr.type === 'JSXAttribute' && attr.name.name === 'TransitionProps',
    );
    if (index !== -1) {
      const removed = elementPath.node.openingElement.attributes.splice(index, 1);
      let hasNode = false;
      elementPath.node.openingElement.attributes.forEach((attr) => {
        if (attr.name?.name === 'slotProps') {
          hasNode = true;
          assignObject(j, {
            target: attr,
            key: 'transition',
            expression: removed[0].value.expression,
          });
        }
      });
      if (!hasNode) {
        appendAttribute(j, {
          target: elementPath.node,
          attributeName: 'slotProps',
          expression: j.objectExpression([
            j.objectProperty(j.identifier('transition'), removed[0].value.expression),
          ]),
        });
      }
    }
  });

  findComponentJSX(j, { root, componentName: 'Dialog' }, (elementPath) => {
    let index = elementPath.node.openingElement.attributes.findIndex(
      (attr) => attr.type === 'JSXAttribute' && attr.name.name === 'PaperComponent',
    );
    if (index !== -1) {
      const removed = elementPath.node.openingElement.attributes.splice(index, 1);
      let hasNode = false;
      elementPath.node.openingElement.attributes.forEach((attr) => {
        if (attr.name?.name === 'slots') {
          hasNode = true;
          assignObject(j, {
            target: attr,
            key: 'paper',
            expression: removed[0].value.expression,
          });
        }
      });
      if (!hasNode) {
        appendAttribute(j, {
          target: elementPath.node,
          attributeName: 'slots',
          expression: j.objectExpression([
            j.objectProperty(j.identifier('paper'), removed[0].value.expression),
          ]),
        });
      }
    }

    index = elementPath.node.openingElement.attributes.findIndex(
      (attr) => attr.type === 'JSXAttribute' && attr.name.name === 'PaperProps',
    );
    if (index !== -1) {
      const removed = elementPath.node.openingElement.attributes.splice(index, 1);
      let hasNode = false;
      elementPath.node.openingElement.attributes.forEach((attr) => {
        if (attr.name?.name === 'slotProps') {
          hasNode = true;
          assignObject(j, {
            target: attr,
            key: 'paper',
            expression: removed[0].value.expression,
          });
        }
      });
      if (!hasNode) {
        appendAttribute(j, {
          target: elementPath.node,
          attributeName: 'slotProps',
          expression: j.objectExpression([
            j.objectProperty(j.identifier('paper'), removed[0].value.expression),
          ]),
        });
      }
    }
  });

  let TransitionComponent;
  let PaperComponent;
  let TransitionProps;
  let PaperProps;

  root.find(j.ObjectProperty).forEach((path) => {
    if (
      path.parent?.parent?.parent?.parent?.node.key?.name === 'MuiDialog' &&
      ['TransitionComponent', 'PaperComponent', 'PaperProps', 'TransitionProps'].includes(
        path.node.key.name,
      )
    ) {
      if (path.node.key.name === 'TransitionComponent') {
        TransitionComponent = path.node.value;
      }
      if (path.node.key.name === 'PaperComponent') {
        PaperComponent = path.node.value;
      }
      if (path.node.key.name === 'TransitionProps') {
        TransitionProps = path.node.value;
      }
      if (path.node.key.name === 'PaperProps') {
        PaperProps = path.node.value;
      }
    }
  });

  root.find(j.ObjectProperty, { key: { name: 'TransitionComponent' } }).forEach((path) => {
    if (path.parent?.parent?.parent?.parent?.node.key?.name === 'MuiDialog') {
      path.replace(
        j.property(
          'init',
          j.identifier('slots'),
          j.objectExpression([
            j.objectProperty(j.identifier('transition'), TransitionComponent),
            j.objectProperty(j.identifier('paper'), PaperComponent),
          ]),
        ),
      );
    }
  });

  root.find(j.ObjectProperty, { key: { name: 'TransitionProps' } }).forEach((path) => {
    if (path.parent?.parent?.parent?.parent?.node.key?.name === 'MuiDialog') {
      path.replace(
        j.property(
          'init',
          j.identifier('slotProps'),
          j.objectExpression([
            j.objectProperty(j.identifier('transition'), TransitionProps),
            j.objectProperty(j.identifier('paper'), PaperProps),
          ]),
        ),
      );
    }
  });

  root.find(j.ObjectExpression).forEach((path) => {
    if (path.node.properties) {
      path.node.properties = path.node.properties.filter(
        (prop) =>
          !['PaperComponent', 'TransitionComponent', 'TransitionProps', 'PaperProps'].includes(
            prop.key.name,
          ),
      );
    }
  });

  return root.toSource(printOptions);
}
