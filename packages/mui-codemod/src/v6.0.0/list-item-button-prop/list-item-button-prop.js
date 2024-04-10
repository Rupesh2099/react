import findComponentJSX from '../../util/findComponentJSX';

/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;

  //Rename components that have ListItem button to ListItemButton
  findComponentJSX(j, { root, componentName: 'ListItem' }, (elementPath) => {
    const index = elementPath.node.openingElement.attributes.findIndex(
      (attr) => attr.type === 'JSXAttribute' && attr.name.name === 'button',
    );
    if (index !== -1) {
      elementPath.node.openingElement.name.name = 'ListItemButton';
      elementPath.node.openingElement.attributes.splice(index, 1);
    }
  });

  //Find if there are ListItem imports/named imports.
  let containsListItemImport = root.find(j.ImportDeclaration).filter(path => path.node.source.value === '@mui/material');
  let containsListItemNamedImport = containsListItemImport.find(j.ImportSpecifier).filter(path => path.node.imported.name === 'ListItem');
  let containsListItem = false;

  //Find components that use ListItem. If they do, we shouldn't remove it
  findComponentJSX(j, { root, componentName: 'ListItem' }, (elementPath) => {
    if(elementPath.node.openingElement.name.name === 'ListItem') {
      containsListItem = true;
    }
  });

  //Remove ListItem import if there is no usage
  if(containsListItemNamedImport.length === 0 || !containsListItem) {
    // root.find(j.ImportDeclaration).filter(path => path.node.source.value === '@mui/material').find(j.ImportSpecifier)
    // .filter(path => path.node.imported.name === 'ListItem').remove();
    root.find(j.ImportDeclaration).filter(path => path.node.source.value === '@mui/material/ListItem').remove();
  }

  //If ListItemButton does not already exist, add it at the end
  let imports = root.find(j.ImportDeclaration).filter(path => path.node.source.value === '@mui/material/ListItemButton');

  if(imports.length === 0) {
    let lastImport = root.find(j.ImportDeclaration).at(-1);

    // Insert the import for 'ListItemButton' after the last import declaration
    lastImport.insertAfter(
      j.importDeclaration(
        [j.importDefaultSpecifier(j.identifier('ListItemButton'))],
        j.stringLiteral('@mui/material/ListItemButton')
      )
    );
  }

  return root.toSource(printOptions);
}
