var http = require("http");
var fs = require("fs");
const util = require("util");
const convert = require("xml-js");

//create a server object:
http
  .createServer(function (req, res) {
    let readXML = fs.readFileSync("src/test.xml", "utf8");
    let XMLtoJSON = convert.xml2json(readXML, { compact: false, spaces: 1 });
    let XMLtoJSONcomp = convert.xml2json(readXML, { compact: true, spaces: 1 });
    let JSONtoXML = convert.json2xml(XMLtoJSON, { spaces: 3 });

    console.log(
      util.inspect(XMLtoJSONcomp, {
        showHidden: false,
        depth: null,
        colors: true
      })
    );

    try {
      fs.writeFileSync("src/XML.xml", JSONtoXML);
      fs.writeFileSync("src/JSON.json", XMLtoJSON);
      fs.writeFileSync("src/JSONcomp.json", XMLtoJSONcomp);
      //file written successfully 555556666677777
    } catch (err) {
      console.error(err);
    }

    res.write(JSONtoXML); //write a response to the client
    res.end(); //end the response
  })
  .listen(8080); //the server object listens on port  8080
