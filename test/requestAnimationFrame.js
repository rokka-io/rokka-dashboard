// shim for requestAnimationFrame for tests (react requires requestAnimationFrame)
global.window = global
window.requestAnimationFrame = callback => {
  setTimeout(callback, 0)
}
