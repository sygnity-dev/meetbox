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
 *
 * This module includes icons from the [Font Awesome](https://fontawesome.com) project,
 * taken from SVG formatted assets from the 'Free' download version.
 * These components are applicable to the [CC BY 4.0](https://creativecommons.org/licenses/by/4.0) license
 * (which applies to all Font Awesome icons packaged as .svg and .js file types).
 * Original .svg icons are modified by removing not used attributes from SVG element.
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
        <video id="mbxRemoteVideo" class="mbx-remote-video"></video>
      </div>
      <div id="mbxLocalVideoContainer" class="mbx-local-video-container">
        <div id="mbxButtonContainer" class="mbx-button-container">
          <div id="mbxCloseButton" class="mbx-close-button">
            <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
              <g fill="red">
                <path d="M504 256C504 119 393 8 256 8S8 119 8 256s111 248 248 248 248-111 248-248zm-448 0c0-110.5 89.5-200 200-200s200 89.5 200 200-89.5 200-200 200S56 366.5 56 256zm296-80v160c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h160c8.8 0 16 7.2 16 16z"/>
              </g>
            </svg>
          </div>
          <div id="mbxMicButtons" class="mbx-mic-buttons">
            <div id="mbxMicOffButton" class="mbx-mic-off-button">
              <svg viewBox="0 0 640 512" focusable="false" xmlns="http://www.w3.org/2000/svg">
                <g fill="black">
                  <path d="M633.82 458.1l-157.8-121.96C488.61 312.13 496 285.01 496 256v-48c0-8.84-7.16-16-16-16h-16c-8.84 0-16 7.16-16 16v48c0 17.92-3.96 34.8-10.72 50.2l-26.55-20.52c3.1-9.4 5.28-19.22 5.28-29.67V96c0-53.02-42.98-96-96-96s-96 42.98-96 96v45.36L45.47 3.37C38.49-2.05 28.43-.8 23.01 6.18L3.37 31.45C-2.05 38.42-.8 48.47 6.18 53.9l588.36 454.73c6.98 5.43 17.03 4.17 22.46-2.81l19.64-25.27c5.41-6.97 4.16-17.02-2.82-22.45zM400 464h-56v-33.77c11.66-1.6 22.85-4.54 33.67-8.31l-50.11-38.73c-6.71.4-13.41.87-20.35.2-55.85-5.45-98.74-48.63-111.18-101.85L144 241.31v6.85c0 89.64 63.97 169.55 152 181.69V464h-56c-8.84 0-16 7.16-16 16v16c0 8.84 7.16 16 16 16h160c8.84 0 16-7.16 16-16v-16c0-8.84-7.16-16-16-16z"/>
                </g>
              </svg>
            </div>
            <div id="mbxMicOnButton" class="mbx-mic-on-button">
              <svg viewBox="0 0 352 512" focusable="false" xmlns="http://www.w3.org/2000/svg">
                <g fill="green">
                  <path d="M176 352c53.02 0 96-42.98 96-96V96c0-53.02-42.98-96-96-96S80 42.98 80 96v160c0 53.02 42.98 96 96 96zm160-160h-16c-8.84 0-16 7.16-16 16v48c0 74.8-64.49 134.82-140.79 127.38C96.71 376.89 48 317.11 48 250.3V208c0-8.84-7.16-16-16-16H16c-8.84 0-16 7.16-16 16v40.16c0 89.64 63.97 169.55 152 181.69V464H96c-8.84 0-16 7.16-16 16v16c0 8.84 7.16 16 16 16h160c8.84 0 16-7.16 16-16v-16c0-8.84-7.16-16-16-16h-56v-33.77C285.71 418.47 352 344.9 352 256v-48c0-8.84-7.16-16-16-16z"/>
                </g>
              </svg>
            </div>
          </div>
          <div id="mbxCamButtons" class="mbx-cam-buttons">
            <div id="mbxCamOffButton" class="mbx-cam-off-button">
              <svg viewBox="0 0 640 512" xmlns="http://www.w3.org/2000/svg">
                <g fill="black">
                  <path d="M633.8 458.1l-55-42.5c15.4-1.4 29.2-13.7 29.2-31.1v-257c0-25.5-29.1-40.4-50.4-25.8L448 177.3v137.2l-32-24.7v-178c0-26.4-21.4-47.8-47.8-47.8H123.9L45.5 3.4C38.5-2 28.5-.8 23 6.2L3.4 31.4c-5.4 7-4.2 17 2.8 22.4L42.7 82 416 370.6l178.5 138c7 5.4 17 4.2 22.5-2.8l19.6-25.3c5.5-6.9 4.2-17-2.8-22.4zM32 400.2c0 26.4 21.4 47.8 47.8 47.8h288.4c11.2 0 21.4-4 29.6-10.5L32 154.7v245.5z"/>
                </g>
              </svg>            
            </div>
            <div id="mbxCamOnButton" class="mbx-cam-on-button">
              <svg viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg">
                <g fill="green">
                  <path d="M336.2 64H47.8C21.4 64 0 85.4 0 111.8v288.4C0 426.6 21.4 448 47.8 448h288.4c26.4 0 47.8-21.4 47.8-47.8V111.8c0-26.4-21.4-47.8-47.8-47.8zm189.4 37.7L416 177.3v157.4l109.6 75.5c21.2 14.6 50.4-.3 50.4-25.8V127.5c0-25.4-29.1-40.4-50.4-25.8z"/>
                </g>
              </svg>
            </div>
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
    micOff();
    micOnButton = window.document.getElementById('mbxMicOnButton');
    micOffButton = window.document.getElementById('mbxMicOffButton');
    common.addTouch(micOnButton, () => {
      micOff();
    });
    common.addTouch(micOffButton, () => {
      micOn();
    });
    camOff();
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
  }

  /**
   *
   */
  const micOff = () => {
    showButton('mbxMicOnButton', false);
    showButton('mbxMicOffButton', true);
    pipe.micOff();
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
