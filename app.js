'use strict';
const PLUGIN_NAME = "CLI"; // Set this
const PLUGIN = global.AKP48.pluginTypes.BackgroundTask; // [BackgroundTask, MessageHandler, ServerConnector]
const readline = require("readline").createInterface(process.stdin, process.stdout);

var permissions = [
  "AKP48.op",
  "AKP48.owner",
  "AKP48.console"
];

class app extends PLUGIN {
  constructor(AKP48, _config) {
    super(PLUGIN_NAME, AKP48);
    var self = this;
    
    readline.setPrompt(">");
    readline.prompt();
    readline.on("line", function (line) {
      AKP48.onMessage(line, self.createContext(line));
    });
  }
}

app.prototype.createContext = function (line) {
  var ctxs = [];
  line.split(/[^\\]\|/).forEach(function (text) {
    var ctx = {
      rawText: line,
      text: text.trim(), 
      myNick: "console",
      permissions: permissions.slice(), // Copy permissions
      instanceId: 1, // Console is #1
      instanceType: "console",
      instance: this,
      isCmd: true, // It's always a command
    };
    ctxs.push(ctx);
  });
  return ctxs;
};

/*app.prototype.saveConfig = function () {
  this._AKP48.saveConfig(this._config, "console");
};*/

app.prototype.unload = function () {
  readline.close();
};

module.exports = app;