import React, { PureComponent } from 'react'
import FramelessLayout from './layouts/FramelessLayout'

class Signedup extends PureComponent {
  render() {
    return (
      <FramelessLayout {...this.props}>
        <div className="rka-signup-container">
          <div className="row">
            <div className="">
              <div className="rka-signup-brand">
                <i className="rka-header-logo mb-lg" />
                <h2 className="txt-white rka-h2">Thanks for signing up.</h2>
                <p className="mt-sm txt-white">
                  You will soon receive an email with your credentials. If not, please contact us at{' '}
                  <a className="mt-sm txt-white" href={'mailto:rokka@rokka.io'}>
                    rokka@rokka.io
                  </a>
                  .
                </p>
                <p className="txt-white">
                  In the meantime, you can read the{' '}
                  <a className="txt-white" href={'/documentation'}>
                    documentation
                  </a>{' '}
                  and get familiar with rokka.
                </p>
              </div>
            </div>
          </div>
        </div>
      </FramelessLayout>
    )
  }
}

export default Signedup
