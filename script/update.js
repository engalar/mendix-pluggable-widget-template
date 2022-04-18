var packageConfig = require('../package.json');
var { updateXml, replaceFile } = require('./xml');

updateXml("./src/package.xml", json => {
  json.package.clientModule[0].$.name = packageConfig.widgetName;
  json.package.clientModule[0].$.version = packageConfig.version;
  json.package.clientModule[0].files[0].file[0].$.path = `${packageConfig.packagePath}/${packageConfig.name}`;
  json.package.clientModule[0].widgetFiles[0].widgetFile[0].$.path = `${packageConfig.widgetName}.xml`;
});

updateXml(`./src/${packageConfig.widgetName}.xml`, json => {
  json.widget.$.id = `${packageConfig.packagePath}.${packageConfig.name}.${packageConfig.widgetName}`;
  json.widget.name[0] = packageConfig.widgetName;
  json.widget.description[0] = packageConfig.description;
});

replaceFile(`./src/${packageConfig.widgetName}.tsx`, /Graph/g, packageConfig.widgetName);