export const ice = new Ice();

function Ice() {
  this.xirSys = null;
}

Ice.prototype.init = function (configuration) {
  this.xirSys = configuration.xirSys;
}

Ice.prototype.getServers = function () {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const url = this.xirSys.apiPath + '/_turn/' + this.xirSys.channel;
    const id = this.xirSys.ident + ':' + this.xirSys.secret;
    xhr.open('PUT', url, true);
    xhr.setRequestHeader('Authorization', 'Basic ' + btoa(id));
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.onreadystatechange = function (event) {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          let res = JSON.parse(xhr.responseText);
          if (res && res.v && res.v.iceServers) {
            resolve(res.v.iceServers);
          } else {
            reject(xhr.statusText);
          }
        } else {
          reject(xhr.statusText);
        }
      }
    };
    xhr.onerror = function () {
      reject(xhr.statusText);
    };
    xhr.send(JSON.stringify({"format": "urls"}));
  });
}
