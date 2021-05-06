export const logger = new Logger();

function Logger() {
}

Logger.prototype.init = function (traceEnabled) {
  this.traceEnabled = traceEnabled;
}

Logger.prototype.info = function (msg, ...args) {
  if (this.traceEnabled) {
    console.log(msg, args);
  }
}

Logger.prototype.error = function (msg, ...args) {
  console.log('[ERROR] ' + msg, args);
}
