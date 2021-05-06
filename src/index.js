import './css/styles.css'
import {common} from "./common.js"
import {logger} from "./logger.js";
import {gui} from "./gui.js";
import {pipe} from "./pipe.js"
import {ice} from "./ice.js"

/**
 * Initializes the MeetBox.
 */
export function initialize(containerId, configuration) {
  logger.init(configuration.trace);
  ice.init(configuration);
  pipe.init(configuration);
  const externalContainer = window.document.getElementById(containerId);
  if (externalContainer) {
    gui.deleteAllChildren(externalContainer);
    externalContainer.appendChild(gui.createMeetboxContainer());
    externalContainer.appendChild(gui.createStreamingContainer());
  } else {
    console.log('Container element with id = `' + containerId + '` was not found in document.');
  }
}

/**
 * Opens a new meeting.
 *
 * @return {string|null} Identifier of the opened (owned) meeting channel.
 */
export function openMeeting(localChannelId) {
  if (gui.meetBoxContainer) {
    if (localChannelId) {
      pipe.open(localChannelId);
      return localChannelId;
    } else {
      const generatedLocalChannelId = common.uuid();
      pipe.open(generatedLocalChannelId);
      return generatedLocalChannelId;
    }
  } else {
    console.log('Call function `initialize` before calling function `createMeeting`.');
    return null;
  }
}

/**
 * Joins an opened meeting.
 *
 * @param remoteChannelId Identifier of the channel of the remote meeting owner.
 */
export function joinMeeting(remoteChannelId) {
  if (gui.meetBoxContainer) {
    const generatedLocalChannelId = common.uuid();
    pipe.join(remoteChannelId, generatedLocalChannelId);
  } else {
    console.log('Call function `initialize` before calling function `joinMeeting`.');
  }
}
