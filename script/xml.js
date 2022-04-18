var fs = require("fs"),
  parseString = require("xml2js").parseString,
  xml2js = require("xml2js");

function updateXml(path, cb) {
  fs.readFile(path, "utf-8", function (err, data) {
    if (err) console.log(err);
    // we then pass the data to our method here
    parseString(data, function (err, result) {
      if (err) console.log(err);
      var json = result;

      cb(json);

      var builder = new xml2js.Builder({
        xmldec: {
          standalone: null,
          encoding: 'utf-8',
          version: '1.0'
        }, renderOpts: { 'pretty': true, 'indent': '    ', 'newline': '\n' }
      });
      var xml = builder.buildObject(json);

      fs.writeFile(path, xml, function (err, data) {
        if (err) console.log(err);

        console.log(`successfully update xml to file ${path}`);
      });
    });
  });
}

function readXml(path, cb) {
  fs.readFile(path, "utf-8", function (err, data) {
    if (err) console.log(err);
    // we then pass the data to our method here
    parseString(data, function (err, result) {
      if (err) console.log(err);
      var json = result;

      cb(json);
    });
  });
}
function replaceFile(path, fromStr, toStr) {
  fs.readFile(path, "utf-8", function (err, data) {
    if (err) console.log(err);
    // we then pass the data to our method here

    fs.writeFile(path, data.replace(fromStr, toStr), function (err, data) {
      if (err) console.log(err);
      console.log(`successfully replace ${fromStr} to ${toStr} in file ${path}`);
    });
  });
}
module.exports = {
  readXml,
  updateXml,
  replaceFile
}