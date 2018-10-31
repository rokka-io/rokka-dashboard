import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import * as emotion from 'emotion'
import { createSerializer } from 'jest-emotion'

Enzyme.configure({ adapter: new Adapter() })

expect.addSnapshotSerializer(createSerializer(emotion))

// shim for requestAnimationFrame for tests (react requires requestAnimationFrame)
global.window = global
window.requestAnimationFrame = callback => {
  setTimeout(callback, 0)
}
