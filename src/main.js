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
 * Initializes the MeetBox component.
 * //TODO more details
 */
export function init(containerId, configuration) {
  logger.init(configuration.trace);
  ice.init(configuration);
  pipe.init(configuration);
  const externalContainer = window.document.getElementById(containerId);
  if (externalContainer) {
    gui.deleteAllChildren(externalContainer);
    externalContainer.appendChild(gui.createMeetboxContainer());
    gui.init(configuration);
    const pageHideHandler = () => {
      pipe.close();
    };
    window.addEventListener('pagehide', pageHideHandler);
  } else {
    logger.error(`MeetBox container element with id = '${containerId}' was not found in document.`, `Check the value of parameter 'containerId' passed to function 'init'.`);
  }
}

/**
 * Opens a new meeting and returns the meeting's identifier.
 * //TODO more details
 *
 * @return {string|null} Identifier of the meeting to be opened.
 */
export function openMeeting(localChannelId) {
  if (gui.meetBoxContainer()) {
    if (localChannelId) {
      pipe.open(localChannelId);
      logger.info(`Opening a meeting with given channel identifier`, `LOCAL channel identifier = '${localChannelId}'.`);
      return localChannelId;
    } else {
      const generatedLocalChannelId = common.uuid();
      pipe.open(generatedLocalChannelId);
      logger.info(`Opening a meeting with generated channel identifier`, `LOCAL channel identifier = ${generatedLocalChannelId}'.`);
      return generatedLocalChannelId;
    }
  } else {
    logger.error(`MeetBox is not yet initialized.`,`call function 'init' before calling function 'openMeeting'`);
    return null;
  }
}

/**
 * Joins an opened meeting.
 * //TODO more details
 *
 * @param remoteChannelId Identifier of the channel of the remote meeting owner.
 */
export function joinMeeting(remoteChannelId) {
  if (gui.meetBoxContainer()) {
    const generatedLocalChannelId = common.uuid();
    pipe.join(remoteChannelId, generatedLocalChannelId);
    logger.info(`Joining a meeting with REMOTE channel identifier = '${remoteChannelId} and LOCAL channel identifier = '${generatedLocalChannelId}'.`);
  } else {
    logger.error(`MeetBox is not yet initialized.`,`call function 'init' before calling function 'joinMeeting'`);
  }
}

/**
 * Closes an opened meeting immediately.
 * //TODO more details
 */
export function closeMeeting() {
  if (gui.meetBoxContainer()) {
    pipe.close();
  } else {
    logger.error(`MeetBox is not yet initialized.`,`call function 'init' before calling function 'closeMeeting'`);
  }
}

/**
 * Assigns a handler triggered when the streaming started.
 *
 * @param handler Handler called when the streaming started.
 */
export function setOnStartStreaming(handler) {
  if (gui.meetBoxContainer()) {
	  logger.info('setOnStartStreaming', handler);
    pipe.setOnStartStreamingExternal(handler);
  } else {
    logger.error(`MeetBox is not yet initialized.`,`call function 'init' before calling function 'setOnStartStreaming'`);
  }
}

/**
 * Assigns a handler triggered when the connection is closed.
 *
 * @param handler Handler called when the connection is closed.
 */
export function setOnClose(handler) {
  if (gui.meetBoxContainer()) {
	  logger.info('setOnClose', handler);
	  pipe.setOnCloseExternal(handler);
  } else {
    logger.error(`MeetBox is not yet initialized.`,`call function 'init' before calling function 'setOnClose'`);
  }
}
