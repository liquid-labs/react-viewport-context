/* globals window */
/* eslint jsdoc/require-file-overview:0 */

/**
 * Plugin to track whether the <code>window.innerWidth</code> has changed or not.
 * @param {object} prevInfo - The info object last time the plugin was invoked.
 * @param {number} prevInfo.width - The <code>window.innerWidth</code> the last time the plugin was invoked.
 * @param {object} newInfo - The info object for this invocation..
 * @param {number} newInfo.width - The <code>window.innerWidth</code> for this invocation.
 * @returns {boolean} <code>true</code> if the width has changed and <code>false</code> otherwise.
 */
const widthPlugin = (prevInfo, newInfo) => {
  const viewWidth = window.innerWidth

  if (viewWidth !== prevInfo.width) {
    newInfo.width = viewWidth
    return true
  }
  return false
}

export { widthPlugin }
