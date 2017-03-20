import React, { PropTypes } from 'react'
import UserMetadataRow from './UserMetadataRow'

const UserMetadata = ({ metadata, addMetadata, onChange, onClickRemove, onClickAdd }) => (
  <section className="rka-box mb-n">
    <div className="row">
      <div className="col-md-7">
        <h2 className="rka-h2 mb-md">User metadata</h2>
        {metadata.map((data, index) => (
          <UserMetadataRow key={index} index={index} onChange={onChange} onClickRemove={onClickRemove} onClickAdd={onClickAdd} {...data} />
        ))}
        <UserMetadataRow isNew index={metadata.length} onChange={onChange} onClickRemove={onClickRemove} onClickAdd={onClickAdd} {...addMetadata} />
      </div>
    </div>
  </section>
)
UserMetadata.propTypes = {
  metadata: PropTypes.array.isRequired,
  addMetadata: PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onClickRemove: PropTypes.func.isRequired,
  onClickAdd: PropTypes.func.isRequired
}

export default UserMetadata
