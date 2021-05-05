import styles from "./css/styles.css"
import {trace, generateUUID} from "./common.js"
import {Components} from "./components.js";
import {Pipe} from "./pipe.js"

/** Variable storing the configuration. */
let gvConfiguration = null;
/** Variable storing the MeetBox container. */
let gvMeetBoxContainer = null;
/** Variable storing the messaging service. */
let gvPipe = null;
/** Variable storing the visual components service. */
let gvComponents = null;

/**
 * Initializes the MeetBox.
 */
export function initialize(containerId, configuration) {
  trace = configuration.trace;
  gvConfiguration = configuration;
  gvPipe = new Pipe();
  gvPipe.initialize(gvConfiguration);
  gvComponents = new Components();
  const externalContainer = window.document.getElementById(containerId);
  if (externalContainer) {
    deleteChildren(externalContainer);
    gvMeetBoxContainer = createMeetboxContainer();
    externalContainer.appendChild(gvMeetBoxContainer);
    externalContainer.appendChild(gvComponents.initialize());
  } else {
    console.log('Container element with id = `' + containerId + '` was not found in document.');
  }
}

/**
 * Opens a new meeting.
 *
 * @return {string|null} Identifier of the opened (owned) meeting channel.
 */
export function openMeeting() {
  if (gvMeetBoxContainer) {
    const localChannelId = 'd6b2bb79-60b4-4bc6-8aaf-ed924faf4db5'; //generateUUID(); //FIXME
    const indicator = createIdIndicator(localChannelId);
    gvMeetBoxContainer.appendChild(indicator);
    indicator.className = 'mbx-indicator';
    gvPipe.open(localChannelId);
    return localChannelId;
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
  if (gvMeetBoxContainer) {
    const localChannelId = generateUUID();
    const indicator = createIdIndicator(remoteChannelId);
    gvMeetBoxContainer.appendChild(indicator);
    indicator.className = 'mbx-indicator';
    gvPipe.join(remoteChannelId, localChannelId);
  } else {
    console.log('Call function `initialize` before calling function `joinMeeting`.');
  }
}

/**
 * Creates and initializes the MeetBox container with all components.
 *
 * @return {HTMLElement} DIV element encapsulating the MeetBox components.
 */
function createMeetboxContainer() {
  gvMeetBoxContainer = window.document.createElement('div');
  gvMeetBoxContainer.className = 'mbx-meet-box-container';
  return gvMeetBoxContainer;
}

/**
 *
 * @param uuid
 * @return {HTMLElement}
 */
function createIdIndicator(uuid) {
  const indicator = window.document.createElement('div');
  indicator.innerText = uuid;
  return indicator;
}

/**
 * Deletes all children of the specified element.
 *
 * @param element Element whose all children will be deleted.
 */
function deleteChildren(element) {
  if (element) {
    let child = element.firstChild;
    while (child) {
      element.removeChild(child);
      child = element.firstChild;
    }
  } else {
    console.log('Invalid element passed to `deleteChildren function: ', element);
  }
}
