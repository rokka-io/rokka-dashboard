import React from 'react'
import { authRequired } from '../utils/auth'
import { Link } from 'react-router'

const NoStackSelected = () => (
  <div>
    <h1 className="rka-h1 mb-md">Stacks</h1>
    <div className="section rka-box no-min-height">
      <h2 className="rka-h2 mb-md">How to create a new stack?</h2>
      <p className="txt-md mb-md">
        You can create a stack by providing the name (lowercase), options and operations to apply on the stack.
      </p>
      <Link to="new-stack" className="rka-button rka-button-brand">Create New Stack</Link>
    </div>
    <div className="section rka-box no-min-height">
      <h2 className="rka-h2 mb-md">What are stack options?</h2>
      <p className="txt-md">
        With stack options you can define image compression and quality to apply on the stack.
      </p>
      <p className="txt-md">
        For more information you can
        check the <a className="rka-link txt-md" href="https://rokka.io/documentation/references/stacks.html#create-a-stack" target="_blank">options documentation</a>.
      </p>
    </div>
    <div className="section rka-box no-min-height">
      <h2 className="rka-h2 mb-md">What are stack operations?</h2>
      <p className="txt-md">
        Stack operations makes image processing possible for each stack.
        <br />
        Currently available operations are:
      </p>
      <ul className="rka-bullet-list">
        <li>Alpha</li>
        <li>Autorotate</li>
        <li>Blur</li>
        <li>Composition</li>
        <li>Crop</li>
        <li>Dropshadow</li>
        <li>Grayscale</li>
        <li>Resize</li>
        <li>Rotate</li>
        <li>Sepia</li>
        <li>Trim</li>
      </ul>
      <p className="txt-md">
        For more information you can
        check the <a className="rka-link txt-md" href="https://rokka.io/documentation/references/operations.html" target="_blank">operations documentation</a>.
      </p>
    </div>
  </div>
)

export default authRequired(NoStackSelected)
