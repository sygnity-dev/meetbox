const {v4: uuidv4} = require('uuid');

export const common = new Common();

function Common() {
}

Common.prototype.uuid = function () {
  return uuidv4();
}

/**
 * Flag indicating if tracing is enabled.
 */
export let trace = false;

/**
 * Generates new UUID.
 *
 * @return {string} Newly created UUID.
 */
export function generateUUID() {
  return uuidv4();
}

/**
 * Global flag indicating whether this application runs on device with touch capabilities.
 */
const gvTouch = ('ontouchstart' in window);

/**
 * Global flag indicating whether tracing is enabled.
 */
const gvTraceEnabled = true;

/**
 * Adds touch or mouse event to specified element.
 */
function common_addTouch(pmElement, pmHandler) {
  pmElement.addEventListener(gvTouch ? "touchstart" : "mousedown", pmHandler, false);
}

/**
 * Adds touch or mouse event to element with specified identifier.
 */
export function common_addTouchById(pmElementId, pmHandler) {
  const lvElement = document.getElementById(pmElementId);
  common_addTouch(lvElement, pmHandler);
}

/**
 * Sets element's text.
 */
export function common_setText(pmElement, pmText) {
  if (pmElement) {
    pmElement.firstChild.textContent = pmText;
  }
}

/**
 * Gets element's value.
 */
function common_getValue(pmElement) {
  if (pmElement) {
    return pmElement.value;
  }
  return null;
}

/**
 * Gets element's value.
 */
export function common_getValueById(pmElementId) {
  return common_getValue(document.getElementById(pmElementId));
}

/**
 *
 * @param pmMessage
 */
export function common_log(pmMessage) {
  console.log(pmMessage);
}

/**
 *
 * @param pmText
 */
export function common_trace(pmText) {
  console.log('TRACE: ' + (window.performance.now() / 1000).toFixed(3) + ' | ' + Date.now() + ': ' + pmText);
}

/**
 *
 * @param pmError
 */
export function common_error(pmError) {
  console.log('ERROR: ' + pmError);
}
