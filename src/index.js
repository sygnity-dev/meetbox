/**
 * Initializes the MeetBox.
 */
export function initialize(containerId) {
  const container = window.document.getElementById(containerId);
  if (container) {
    const meetboxContainer = createMeetboxContainer();
    container.appendChild(meetboxContainer);
  } else {
    console.log('Container element with id=', containerId, ' was not found in DOM.');
  }
}

/**
 * Creates and initializes the MeetBox container with all components.
 *
 * @return {HTMLElement} DIV element encapsulating the MeetBox components.
 */
function createMeetboxContainer() {
  const meetboxContainer = window.document.createElement('DIV');
  meetboxContainer.style.width = '300px';
  meetboxContainer.style.height = '300px';
  meetboxContainer.style.backgroundColor = 'chocolate';
  return meetboxContainer;
}
