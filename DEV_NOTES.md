- With the new ESLint flat config, we cannot seem to find any configuration that resolves '.jsx' extension and we were 
  getting the 'node/no-missing-import' rule triggered when importing the WindowContext.jsx file. As a workaround, we 
  supress that rule for those imports. Once the flat config file is around for awhile I'm sure the answer will show up.