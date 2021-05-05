const {v4: uuidv4} = require('uuid');

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
