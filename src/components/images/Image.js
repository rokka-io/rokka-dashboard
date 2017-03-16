import React, { PropTypes } from 'react'
import cx from 'classnames'

const Image = (props) => {
  const onClick = (e) => {
    if (props.onClick) {
      props.onClick(e, props)
    }
  }

  const classes = cx(
    'rka-image-tile',
    props.className,
    {
      'is-uploaded': props.uploaded,
      'is-uploading': !props.uploaded,
      'is-clickable': props.onClick
    }
  )

  const specs = [
    props.format ? props.format.toUpperCase() : null,
    props.size ? `${Math.round(props.size / 1024)}KB` : null,
    [props.width || '?', props.height || '?'].join('×')
  ].filter(line => line).join(', ')

  return (
    <div className="col-md-3 col-sm-6 col-xs-12">
      <div className={classes}
        onClick={onClick}>
        <div className="rka-image-tile-hd">
          {props.uploaded === true &&
            <span className="rka-image-checkbox-container">
              <i className="roka-image-checkbox rka-checkbox-icon is-checked" />
            </span>
          }
          <img src={props.url} alt={props.name} />
        </div>
        <div className="rka-image-tile-ft">
          <div className="rka-image-tile-specs txt-ellipsis" title={specs}>
            {specs}
          </div>
          <div className="rka-image-tile-name txt-ellipsis" title={props.name}>{props.name}</div>
        </div>
      </div>
    </div>
  )
}

Image.propTypes = {
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  size: PropTypes.number,
  format: PropTypes.string,
  uploaded: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string
}

export default Image
