import * as ts from 'typescript';
import { getSymbolDescription, getSymbolJSDocTags } from '../buildApiUtils';
import { TypeScriptProject } from './createTypeScriptProject';
import { Classes } from './parseStyles';

const GLOBAL_STATE_CLASSES: string[] = [
  'active',
  'checked',
  'completed',
  'disabled',
  'error',
  'expanded',
  'focusVisible',
  'focused',
  'required',
  'selected',
];

export interface Slot {
  class: string | null;
  name: string;
  description: string;
  default?: string;
}

function extractClasses({
  project,
  componentName,
}: {
  project: TypeScriptProject;
  componentName: string;
}): string[] {
  const classesInterface = `${componentName}Classes`;
  const classesType = project.checker.getDeclaredTypeOfSymbol(project.exports[classesInterface]);
  const classesTypeDeclaration = classesType?.symbol?.declarations?.[0];
  let classNames: string[] = [];
  if (classesTypeDeclaration && ts.isInterfaceDeclaration(classesTypeDeclaration)) {
    const classesProperties = classesType.getProperties();
    classNames = classesProperties.map((symbol) => symbol.name);
  }
  return classNames;
}

export default function parseSlotsAndClasses({
  project,
  componentName,
  muiName,
}: {
  project: TypeScriptProject;
  componentName: string;
  muiName: string;
}): { slots: Slot[]; classes: Classes } {
  let result: { slots: Slot[]; classes: Classes } = {
    slots: [],
    classes: { classes: [], globalClasses: {} },
  };
  const slotsInterface = `${componentName}Slots`;
  try {
    const exportedSymbol = project.exports[slotsInterface];
    const type = project.checker.getDeclaredTypeOfSymbol(exportedSymbol);
    const typeDeclaration = type?.symbol?.declarations?.[0];
    if (!typeDeclaration || !ts.isInterfaceDeclaration(typeDeclaration)) {
      return result;
    }

    // Obtain an array of classes for the given component
    const classNames = extractClasses({ project, componentName });
    const slots: Record<string, Slot> = {};
    const propertiesOnProject = type.getProperties();

    propertiesOnProject.forEach((propertySymbol) => {
      const tags = getSymbolJSDocTags(propertySymbol);
      if (tags.ignore) {
        return;
      }
      const slotName = propertySymbol.name;
      slots[slotName] = {
        name: slotName,
        description: getSymbolDescription(propertySymbol, project),
        default: tags.default?.text?.[0].text,
        class: classNames.includes(slotName) ? `.${muiName}-${slotName}` : null,
      };
    });

    const classNamesLeftover = classNames.filter(
      (className) => !Object.keys(slots).includes(className),
    );
    const globalStateClassNames: Record<string, string> = {};
    const otherClassNames: string[] = [];
    classNamesLeftover.forEach((className) => {
      if (GLOBAL_STATE_CLASSES.includes(className)) {
        globalStateClassNames[className] = `Mui-${className}`;
      } else {
        otherClassNames.push(className);
      }
    });

    result = {
      slots: Object.values(slots),
      classes: {
        classes: otherClassNames,
        globalClasses: globalStateClassNames,
      },
    };
  } catch (e) {
    console.error(`No declaration for ${slotsInterface}`);
  }
  return result;
}
