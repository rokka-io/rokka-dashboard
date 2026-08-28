import PropTypes from 'prop-types'
import React from 'react'
import { MAX_ALLOWED_IPS, parseAllowedIps } from '../utils/apikeys'

/**
 * The four security settings of an Api Key, as form fields.
 *
 * Shared by the create form, the per-row edit form and the initial key of a new
 * membership, so the wording and the layout stay the same wherever you set them.
 */
const ApikeyOptionsFields = ({ idPrefix, values, onChange, mfaNote = null }) => {
  const ips = parseAllowedIps(values.allowedIps)

  return (
    <>
      <div className="rka-form-group">
        <label className="rka-label-checkbox" htmlFor={`${idPrefix}-requires-mfa`}>
          <input
            id={`${idPrefix}-requires-mfa`}
            type="checkbox"
            className="rka-input-checkbox"
            checked={values.requiresMfa}
            onChange={(e) => onChange({ requiresMfa: e.currentTarget.checked })}
          />{' '}
          Requires two-factor authentication
        </label>
        <div className="rka-input-help">
          The key can then not be used for API calls any more. The only thing left it can do is be
          exchanged for a token, together with a current code from your authenticator app — which is
          exactly what logging into this dashboard does. So put it on the key you log in with, not
          on one a server or a script uses: there is nobody there to type the code.
        </div>
        {mfaNote}
      </div>

      <div className="rka-form-group">
        <label className="rka-label-checkbox" htmlFor={`${idPrefix}-trusted`}>
          <input
            id={`${idPrefix}-trusted`}
            type="checkbox"
            className="rka-input-checkbox"
            checked={values.trusted}
            onChange={(e) => onChange({ trusted: e.currentTarget.checked })}
          />{' '}
          Trusted
        </label>
        <div className="rka-input-help">
          Lets the key manage the user's Api Keys even when the user only has a read-only role
          (read, upload, sourceimages:read). It grants no other rights. Never hand a trusted key to
          untrusted end users — no frontend JavaScript, no mobile app.
        </div>
      </div>

      <div className="rka-form-group">
        <label className="rka-label" htmlFor={`${idPrefix}-allowed-ips`}>
          Allowed IP addresses
        </label>
        <div className="rka-input-help">
          The key then only works from these addresses, and so do the tokens already made from it.
          One per line, single IPs or IPv4 ranges in CIDR notation, at most {MAX_ALLOWED_IPS}. Leave
          it empty to allow every address.
        </div>
        <textarea
          id={`${idPrefix}-allowed-ips`}
          className="rka-input-txt rka-input-txtarea"
          rows={3}
          placeholder={'192.168.0.5\n10.0.0.0/24'}
          value={values.allowedIps}
          onChange={(e) => onChange({ allowedIps: e.currentTarget.value })}
        />
        <div
          className={`rka-input-help ${ips.length > MAX_ALLOWED_IPS ? 'txt-cranberry' : ''}`.trim()}
        >
          {ips.length === 0
            ? 'No restriction, the key works from anywhere.'
            : `${ips.length} of ${MAX_ALLOWED_IPS} addresses: ${ips.join(', ')}`}
        </div>
      </div>

      <div className="rka-form-group">
        <label className="rka-label" htmlFor={`${idPrefix}-expires`}>
          Expiration date
        </label>
        <div className="rka-input-help">
          The key stops working after this moment, and so do the tokens already made from it. In
          your own timezone. Leave it empty for a key which never expires.
        </div>
        <input
          id={`${idPrefix}-expires`}
          type="datetime-local"
          className="rka-input-txt rka-input-datetime"
          value={values.expires}
          onChange={(e) => onChange({ expires: e.currentTarget.value })}
        />
        {values.expires ? (
          <button
            className="rka-button rka-button-secondary ml-sm"
            type="button"
            onClick={() => onChange({ expires: '' })}
          >
            Clear
          </button>
        ) : (
          <span className="rka-input-help ml-sm">Never expires</span>
        )}
      </div>
    </>
  )
}

ApikeyOptionsFields.propTypes = {
  /** Prefix for the input ids, so several of these forms can live on one page */
  idPrefix: PropTypes.string.isRequired,
  values: PropTypes.shape({
    requiresMfa: PropTypes.bool.isRequired,
    trusted: PropTypes.bool.isRequired,
    allowedIps: PropTypes.string.isRequired,
    /** As a `datetime-local` value, see `toDatetimeLocal()` */
    expires: PropTypes.string.isRequired,
  }).isRequired,
  /** Called with the changed part of `values` */
  onChange: PropTypes.func.isRequired,
  /** Shown below the two-factor field, for whatever the caller needs to warn about */
  mfaNote: PropTypes.node,
}

export default ApikeyOptionsFields
