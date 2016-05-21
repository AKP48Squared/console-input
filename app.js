'use strict';
const PLUGIN_NAME = "CLI"; // Set this
const PLUGIN = global.AKP48.pluginTypes.BackgroundTask; // [BackgroundTask, MessageHandler, ServerConnector]
const readline = require("readline").createInterface(process.stdin, process.stdout);

var permissions = [
  "AKP48.op",
  "AKP48.owner",
  "AKP48.console"
];

function createContext(self, line) {
  var ctxs = [];
  line.split(/[^\\]\|/).forEach(function (text) {
    var ctx = {
      rawText: line,
      text: text.trim(),
      myNick: "console",
      permissions: permissions.slice(), // Copy permissions
      instanceId: 1, // Console is #1
      instanceType: "console",
      instance: self,
      isCmd: true, // It's always a command
    };
    ctxs.push(ctx);
  });
  return ctxs;
};

class app extends PLUGIN {
  constructor(AKP48, _config) {
    super(PLUGIN_NAME, AKP48);
    var self = this;
    self.unloading = false;
    readline.setPrompt("> ");
    AKP48.on("loadFinished", () => readline.prompt());
    readline.on("line", function (line) {
      AKP48.onMessage(line, createContext(self, line));
    });
    readline.on("close", function () {
      if (!self.unloading) process.exit();
    });
  }
}

app.prototype.unload = function () {
  self.unloading = true;
  readline.close();
};

module.exports = app;
module.exports.type = 'BackgroundTask';
module.exports.pluginName = 'console-input';
