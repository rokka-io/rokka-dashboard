import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

// shim for requestAnimationFrame for tests (react requires requestAnimationFrame)
global.window = global
window.requestAnimationFrame = callback => {
  setTimeout(callback, 0)
}
