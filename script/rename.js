var packageConfig = require('../package.json');
var { readXml, updateXml, replaceFile } = require('./xml');
var fs = require('fs');

console.log('rename: start');
readXml("./src/package.xml", json => {
  var oldWidgetName = json.package.clientModule[0].$.name;

  if (oldWidgetName !== packageConfig.widgetName) {
    //#region rename 
    fs.renameSync(`./typings/${oldWidgetName}Props.d.ts`, `./typings/${packageConfig.widgetName}Props.d.ts`);
    fs.renameSync(`./src/${oldWidgetName}.xml`, `./src/${packageConfig.widgetName}.xml`);

    //#region WidgetName.tsx
    (function () {
      fs.renameSync(`./src/${oldWidgetName}.tsx`, `./src/${packageConfig.widgetName}.tsx`);
      const data = fs.readFileSync(`./src/${packageConfig.widgetName}.tsx`, { encoding: 'utf8' });
      var result = data
        .replace(new RegExp(`${oldWidgetName}Props`, 'g'), `${packageConfig.widgetName}Props`)
        .replace(new RegExp(`${oldWidgetName}PreviewProps`, 'g'), `${packageConfig.widgetName}PreviewProps`);
      fs.writeFileSync(`./src/${packageConfig.widgetName}.tsx`, result, 'utf8');
    })();
    //#endregion

    //#region  editorPreview.tsx
    (function () {
      fs.renameSync(`./src/${oldWidgetName}.editorPreview.tsx`, `./src/${packageConfig.widgetName}.editorPreview.tsx`);

      const data = fs.readFileSync(`./src/${packageConfig.widgetName}.editorPreview.tsx`, { encoding: 'utf8' });

      var result = data
        .replace(new RegExp(`${oldWidgetName}Props`, 'g'), `${packageConfig.widgetName}Props`)
        .replace(new RegExp(`${oldWidgetName}PreviewProps`, 'g'), `${packageConfig.widgetName}PreviewProps`);

      fs.writeFileSync(`./src/${packageConfig.widgetName}.editorPreview.tsx`, result, { encoding: 'utf8' });
    })();
    //#endregion


    //#region editorConfig.ts
    (function () {
      fs.renameSync(`./src/${oldWidgetName}.editorConfig.ts`, `./src/${packageConfig.widgetName}.editorConfig.ts`);

      const data = fs.readFileSync(`./src/${packageConfig.widgetName}.editorConfig.ts`, 'utf8');

      var result = data
        .replace(new RegExp(`${oldWidgetName}Props`, 'g'), `${packageConfig.widgetName}Props`)
        .replace(new RegExp(`${oldWidgetName}PreviewProps`, 'g'), `${packageConfig.widgetName}PreviewProps`);

      fs.writeFileSync(`./src/${packageConfig.widgetName}.editorConfig.ts`, result, { encoding: 'utf8' });
    })();
    //#endregion

    console.log('rename: done');
    //#endregion
  } else {
    console.log('skip: no need rename');
  }

  //#region update
  console.log('update: start');
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

  console.log('update: done');
  //#endregion

});

