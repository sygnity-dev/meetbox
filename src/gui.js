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

import {logger} from "./logger.js";
import {pipe} from "./pipe.js";
import {common} from "./common.js";

/**
 * GUI module.
 */
export const gui = (function () {

  /**
   *
   * @type {string}
   */
  const HTML_STREAMING_CONTAINER = `
    <div id="mbxStreamingContainer" class="mbx-streaming-container">
      <div id="mbxRemoteVideoContainer" class="mbx-remote-video-container">
        <video id="mbxRemoteVideo" class="mbx-remote-video" muted></video>
      </div>
      <div id="mbxLocalVideoContainer" class="mbx-local-video-container">
        <div id="mbxButtonContainer" class="mbx-button-container">
          <div id="mbxCloseButton" class="mbx-close-button"></div>
          <div id="mbxMicButtons" class="mbx-mic-buttons">
            <div id="mbxMicOffButton" class="mbx-mic-off-button"></div>
            <div id="mbxMicOnButton" class="mbx-mic-on-button"></div>
          </div>
          <div id="mbxCamButtons" class="mbx-cam-buttons">
            <div id="mbxCamOffButton" class="mbx-cam-off-button"></div>
            <div id="mbxCamOnButton" class="mbx-cam-on-button"></div>
          </div>
        </div>
        <video id="mbxLocalVideo" class="mbx-local-video" muted></video>
      </div>
    </div>
  `
  let localVideo = null;
  let closeButton = null;
  let micOnButton = null;
  let micOffButton = null;
  let camOnButton = null;
  let camOffButton = null;

  /**
   *
   */
  const init = (configuration) => {
    localVideo = window.document.getElementById('mbxLocalVideo');
    if (localVideo && configuration && configuration.localVideo) {
      if (configuration.localVideo.width) {
        localVideo.style.width = configuration.localVideo.width;
      }
    }
    hideLocalVideo();
    hideRemoteVideo();
    localVideo.addEventListener('playing', (event) => {
      logger.info('playing LOCAL video: width=' + event.target.videoWidth + ' height=' + event.target.videoHeight);
    });
    remoteVideo().addEventListener('playing', (event) => {
      logger.info('playing REMOTE video: width=' + event.target.videoWidth + ' height=' + event.target.videoHeight);
    });
    closeButton = window.document.getElementById('mbxCloseButton');
    common.addTouch(closeButton, () => {
      pipe.close();
    });
    micOn();
    micOnButton = window.document.getElementById('mbxMicOnButton');
    micOffButton = window.document.getElementById('mbxMicOffButton');
    common.addTouch(micOnButton, () => {
      micOff();
    });
    common.addTouch(micOffButton, () => {
      micOn();
    });
    camOn();
    camOnButton = window.document.getElementById('mbxCamOnButton');
    camOffButton = window.document.getElementById('mbxCamOffButton');
    common.addTouch(camOnButton, () => {
      camOff();
    });
    common.addTouch(camOffButton, () => {
      camOn();
    });
  }

  /**
   *
   * @return {HTMLDivElement}
   */
  const createMeetboxContainer = () => {
    const meetBoxContainer = window.document.createElement('div');
    meetBoxContainer.id = 'mbxMeetboxContainer';
    meetBoxContainer.className = 'mbx-meetbox-container';
    meetBoxContainer.innerHTML = HTML_STREAMING_CONTAINER;
    return meetBoxContainer;
  }

  /**
   *
   */
  const showLocalVideo = function () {
    localVideoContainer().style.display = 'flex';
  }

  /**
   *
   */
  const hideLocalVideo = function () {
    localVideoContainer().style.display = 'none';
  }

  /**
   *
   */
  const showRemoteVideo = function () {
    remoteVideoContainer().style.display = 'block';
  }

  /**
   *
   */
  const hideRemoteVideo = function () {
    remoteVideoContainer().style.display = 'none';
  }

  /**
   *
   * @return {HTMLElement}
   */
  const meetBoxContainer = function () {
    return window.document.getElementById('mbxMeetboxContainer');
  }

  /**
   *
   * @return {HTMLElement}
   */
  const getLocalVideo = function () {
    return window.document.getElementById('mbxLocalVideo');
  }

  /**
   *
   * @return {HTMLElement}
   */
  const localVideoContainer = function () {
    return window.document.getElementById('mbxLocalVideoContainer');
  }

  /**
   *
   * @return {HTMLElement}
   */
  const remoteVideo = function () {
    return window.document.getElementById('mbxRemoteVideo');
  }

  /**
   *
   * @return {HTMLElement}
   */
  const remoteVideoContainer = function () {
    return window.document.getElementById('mbxRemoteVideoContainer');
  }

  /**
   *
   * @param element
   */
  const deleteAllChildren = function (element) {
    if (element) {
      let child = element.firstChild;
      while (child) {
        element.removeChild(child);
        child = element.firstChild;
      }
    } else {
      logger.error('Invalid element passed to `deleteChildren function: ', element);
    }
  }

  /**
   *
   * @param buttonId
   * @param show
   */
  const showButton = (buttonId, show) => {
    const button = window.document.getElementById(buttonId);
    if (button) {
      button.style.display = show ? 'block' : 'none';
    } else {
      logger.error('button with id `' + buttonId + '` not found');
    }
  }

  /**
   *
   */
  const micOn = () => {
    showButton('mbxMicOnButton', true);
    showButton('mbxMicOffButton', false);
    pipe.micOn();
    localVideo.muted = true;
  }

  /**
   *
   */
  const micOff = () => {
    showButton('mbxMicOnButton', false);
    showButton('mbxMicOffButton', true);
    pipe.micOff();
    localVideo.muted = true;
  }

  /**
   *
   */
  const camOn = () => {
    showButton('mbxCamOnButton', true);
    showButton('mbxCamOffButton', false);
    pipe.camOn()
  }

  /**
   *
   */
  const camOff = () => {
    showButton('mbxCamOnButton', false);
    showButton('mbxCamOffButton', true);
    pipe.camOff();
  }

  return {
    init: init,
    createMeetboxContainer: createMeetboxContainer,
    showLocalVideo: showLocalVideo,
    hideLocalVideo: hideLocalVideo,
    showRemoteVideo: showRemoteVideo,
    hideRemoteVideo: hideRemoteVideo,
    meetBoxContainer: meetBoxContainer,
    getLocalVideo: getLocalVideo,
    localVideoContainer: localVideoContainer,
    remoteVideo: remoteVideo,
    remoteVideoContainer: remoteVideoContainer,
    deleteAllChildren: deleteAllChildren
  }
})();
