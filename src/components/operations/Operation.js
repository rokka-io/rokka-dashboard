import PropTypes from 'prop-types'
import React, { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import cx from 'classnames'
import StackOperation from './StackOperation'

const ITEM_TYPE = 'OPERATION'

const Operation = ({
  availableOperations,
  operation,
  index,
  isActive,
  onChange,
  removeOperation,
  setActiveOperation,
  onMoveOperation,
}) => {
  const ref = useRef(null)

  const [{ isDragging }, drag, dragPreview] = useDrag({
    type: ITEM_TYPE,
    item: () => ({
      id: operation.id,
      index,
      originalIndex: index,
    }),
    end: (item, monitor) => {
      if (!monitor.didDrop()) {
        onMoveOperation(item.id, item.originalIndex)
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [{ isOver }, drop] = useDrop({
    accept: ITEM_TYPE,
    hover: (item, monitor) => {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) {
        return
      }

      const hoverBoundingRect = ref.current.getBoundingClientRect()
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset.y - hoverBoundingRect.top

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      onMoveOperation(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  })

  dragPreview(drop(ref))

  const hasErrors = operation.errors && Object.keys(operation.errors).length
  const className = cx('pa-md', 'mb-xs', 'pos-r', {
    'bg-gray-lightest': index % 2,
    'is-active': isActive || hasErrors,
    'bor-cranberry': hasErrors,
    'bor-light': !hasErrors,
    opaque: isDragging,
    'bor-brand-light-dashed': isOver,
  })

  const { name, options, errors } = operation

  return (
    <div className={className} ref={ref}>
      <div ref={drag}>
        <button className="rka-close-icon" onClick={(e) => removeOperation(e, index)} />
        <button className="rka-edit-icon" onClick={(e) => setActiveOperation(e, index)} />
        <span className="rka-move-icon" />
        <h3 className="rka-h3 txt-cap">{name}</h3>
      </div>
      <div className={cx({ 'semi-transparent': isOver })}>
        <div className="rka-operation-content">
          <StackOperation
            availableOperations={availableOperations}
            name={name}
            values={options}
            onChange={(e) => onChange(index, e)}
            errors={errors}
          />
        </div>
      </div>
    </div>
  )
}
Operation.propTypes = {
  availableOperations: PropTypes.object.isRequired,
  operation: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    options: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onMoveOperation: PropTypes.func.isRequired,
  removeOperation: PropTypes.func.isRequired,
  setActiveOperation: PropTypes.func.isRequired,
}

export default Operation
