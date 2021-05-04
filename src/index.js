const { v4: uuidv4 } = require('uuid');

let meetboxContainer = null;

/**
 * Initializes the MeetBox.
 */
export function initialize(containerId) {
  const container = window.document.getElementById(containerId);
  if (container) {
    // in case this function is called multiple times,
    // clear the content of the external container,
    deleteChildren(container);
    // add MeetBox container as a child to the provided external container
    const meetboxContainer = createMeetboxContainer();
    container.appendChild(meetboxContainer);
  } else {
    console.log('Container element with id = `' + containerId + '` was not found in document.');
  }
}

/**
 * Creates a new meeting.
 *
 * @return {string|null} Identifier of the newly created meeting of null.
 */
export function createMeeting() {
  if (meetboxContainer) {
    const uuid = createUUID();
    meetboxContainer.appendChild(createIdIndicator(uuid, '#ffeb3b'))
    return uuid;
  } else {
    console.log('Call function `initialize` before calling function `createMeeting`.');
    return null;
  }
}

/**
 * Joins the meeting.
 *
 * @param uuid Identifier of the meeting to join.
 */
export function joinMeeting(uuid) {
  if (meetboxContainer) {
    meetboxContainer.appendChild(createIdIndicator(uuid, '#f5f5f5'))
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
  meetboxContainer = window.document.createElement('div');
  meetboxContainer.style.backgroundColor = '#546e7a';
  meetboxContainer.style.minWidth = '300px';
  meetboxContainer.style.minHeight = '300px';
  return meetboxContainer;
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

/**
 * Generates new UUID.
 *
 * @return {string} Newly created UUID.
 */
function createUUID() {
  return uuidv4();
}
