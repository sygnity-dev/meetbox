/*
 * Copyright (c) 2017-2021 Dariusz Depta Engos Software
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

export const ice = new Ice();

function Ice() {
  this.xirSys = null;
  this.coturn = null;
}

Ice.prototype.init = function (configuration) {
  this.xirSys = configuration.xirSys;
  this.coturn = configuration.coturn;
}

Ice.prototype.getServers = function () {
	if (this.xirSys) {
		return this.getServersXsys();
	}
	if (this.coturn) {
		return this.getServersCoturn();
	}
	return new Promise((resolve, reject) => { reject("error") });
}

Ice.prototype.getServersCoturn = function () {
  return new Promise((resolve, reject) => {
    const res = this.coturn;
    if (res && res[0] && res[0].iceServers) {
      resolve(res[0].iceServers);
    } else {
      reject("error");
    }
  });
}

Ice.prototype.getServersXsys = function () {
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
