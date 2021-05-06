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

import './css/styles.css'
import {common} from "./common.js"
import {logger} from "./logger.js";
import {gui} from "./gui.js";
import {pipe} from "./pipe.js"
import {ice} from "./ice.js"

/**
 * Initializes the MeetBox.
 */
export function init(containerId, configuration) {
  logger.init(configuration.trace);
  ice.init(configuration);
  pipe.init(configuration);
  const externalContainer = window.document.getElementById(containerId);
  if (externalContainer) {
    gui.deleteAllChildren(externalContainer);
    externalContainer.appendChild(gui.createMeetboxContainer());
    gui.init();
  } else {
    logger.error('external container element identified by `' + containerId + '` does not exist');
  }
}

/**
 * Opens a new meeting.
 *
 * @return {string|null} Identifier of the opened (owned) meeting channel.
 */
export function openMeeting(localChannelId) {
  if (gui.meetBoxContainer()) {
    if (localChannelId) {
      pipe.open(localChannelId);
      logger.info('opening meeting with given LOCAL channel id: ' + localChannelId);
      return localChannelId;
    } else {
      const generatedLocalChannelId = common.uuid();
      pipe.open(generatedLocalChannelId);
      logger.info('opening meeting with generated LOCAL channel id: ' + generatedLocalChannelId);
      return generatedLocalChannelId;
    }
  } else {
    logger.error('call `init` function before opening a meeting');
    return null;
  }
}

/**
 * Joins an opened meeting.
 *
 * @param remoteChannelId Identifier of the channel of the remote meeting owner.
 */
export function joinMeeting(remoteChannelId) {
  if (gui.meetBoxContainer()) {
    const generatedLocalChannelId = common.uuid();
    pipe.join(remoteChannelId, generatedLocalChannelId);
    logger.info('joining meeting with REMOTE channel id: ' + remoteChannelId + ' and LOCAL channel id: ' + generatedLocalChannelId);
  } else {
    logger.error('call `init` function before joining a meeting');
  }
}
