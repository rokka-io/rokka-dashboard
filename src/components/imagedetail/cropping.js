/**
 * Image cropping functions
 */

/**
 * Get the offset of an element
 *
 * From react-image-crop
 *
 * @param {Element} el
 * @return {{top: number, left: number}}
 */
function getElementOffset(el) {
  const rect = el.getBoundingClientRect()
  const docEl = document.documentElement

  const rectTop = rect.top + window.pageYOffset - docEl.clientTop
  const rectLeft = rect.left + window.pageXOffset - docEl.clientLeft

  return {
    top: rectTop,
    left: rectLeft
  }
}

/**
 * Get the mouse position of a click/touch.
 *
 * From react-image-crop
 *
 * @param {MouseEvent} e
 * @return {{x: number, y: number}}
 */
function getClientPos(e) {
  if (e.touches) {
    return { x: e.touches[0].pageX, y: e.touches[0].pageY }
  }
  return { x: e.pageX, y: e.pageY }
}

/**
 * Calculate the rendered scale of an image
 *
 * @param {number} naturalWidth
 * @param {number} width
 * @return {number}
 */
export function calculateScale(naturalWidth, width) {
  return naturalWidth / width
}

/**
 * Calculates the click position within the parent element of the clicked element.
 *
 * @param {MouseEvent} evt
 * @return {{x: number, y: number}}
 */
export function calculateClickPosition(evt) {
  const clientPos = getClientPos(evt)
  const parentElOffset = getElementOffset(evt.currentTarget.parentElement)

  return {
    x: Math.round(clientPos.x - parentElOffset.left),
    y: Math.round(clientPos.y - parentElOffset.top)
  }
}

/**
 * Apply scale to an x and y position.
 *
 * @param {{x: number, y: number}} pos
 * @param {number} scale
 * @return {{x: number, y: number}}
 */
export function scalePosition({ x, y }, scale) {
  return {
    x: Math.round(x * scale),
    y: Math.round(y * scale)
  }
}

/**
 * Calculates the position for rendering a target element.
 *
 * @param {number} scale
 * @param {number} targetElementWidth
 * @param {{x: number, y: number}} pos
 * @return {{x: number, y: number}}
 */
export function calculateRenderedPosition(scale, targetElementWidth, pos) {
  const focusPointSize = (targetElementWidth / 2) * scale
  const x = pos.x - focusPointSize
  const y = pos.y - focusPointSize

  return scalePosition({ x, y }, 1 / scale)
}

/**
 * Converts a crop area from pixel values to relative percent pixel values based on the width/height of the
 * image.
 *
 * @param {{x: number, y: number, width: number, height: number}} crop
 * @param {number} width  Real image width (naturalWidth)
 * @param {number} height Real image height (naturalHeight)
 * @returns {{x: number, y: number, width: number, height: number}}
 */
export function pixelToPercent(crop, width, height) {
  return {
    x: (crop.x * 100) / width,
    y: (crop.y * 100) / height,
    width: (crop.width * 100) / width,
    height: (crop.height * 100) / height
  }
}
