import {trace, generateUUID} from "./common"
import {Messaging} from "./messaging"

/**
 * Variable storing the configuration.
 */
let gvConfiguration = null;

/**
 * Variable storing the MeetBox container.
 */
let gvMeetBoxContainer = null;

/**
 * Variable storing the messaging service.
 */
let gvMessaging = null;

/**
 * Initializes the MeetBox.
 */
export function initialize(containerId, configuration) {
  trace = configuration.trace;
  gvConfiguration = configuration;
  gvMessaging = new Messaging();
  gvMessaging.initialize(gvConfiguration);
  const externalContainer = window.document.getElementById(containerId);
  if (externalContainer) {
    deleteChildren(externalContainer);
    gvMeetBoxContainer = createMeetboxContainer();
    externalContainer.appendChild(gvMeetBoxContainer);
  } else {
    console.log('Container element with id = `' + containerId + '` was not found in document.');
  }
}

/**
 * Opens a new meeting.
 *
 * @return {string|null} Identifier of the newly created meeting of null.
 */
export function openMeeting() {
  if (gvMeetBoxContainer) {
    const ownerChannelId = 'd6b2bb79-60b4-4bc6-8aaf-ed924faf4db5'; //generateUUID(); //FIXME
    gvMeetBoxContainer.appendChild(createIdIndicator(ownerChannelId, '#ffeb3b'))
    gvMessaging.open(ownerChannelId);
    return ownerChannelId;
  } else {
    console.log('Call function `initialize` before calling function `createMeeting`.');
    return null;
  }
}

/**
 * Joins the meeting.
 *
 * @param ownerChannelId Identifier of the channel of the meeting owner.
 */
export function joinMeeting(ownerChannelId) {
  if (gvMeetBoxContainer) {
    const clientChannelId = generateUUID();
    gvMeetBoxContainer.appendChild(createIdIndicator(ownerChannelId, '#f5f5f5'))
    gvMessaging.join(ownerChannelId, clientChannelId);
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
  gvMeetBoxContainer.style.backgroundColor = '#546e7a';
  gvMeetBoxContainer.style.minWidth = '300px';
  gvMeetBoxContainer.style.minHeight = '300px';
  return gvMeetBoxContainer;
}

/**
 *
 * @param uuid
 * @param color
 * @return {HTMLElement}
 */
function createIdIndicator(uuid, color) {
  const indicator = window.document.createElement('div');
  indicator.style.color = color;
  indicator.style.fontSize = '1.6em';
  indicator.style.fontStyle = 'bold';
  indicator.style.padding = '12px';
  indicator.style.textAlign = 'center';
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
