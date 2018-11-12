import PropTypes from 'prop-types'
import React from 'react'
import { findDOMNode } from 'react-dom'
import { DragSource, DropTarget } from 'react-dnd'
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
  isDragging,
  isOver,
  connectDragSource,
  connectDragPreview,
  connectDropTarget
}) => {
  const hasErrors = Object.keys(operation.errors).length
  const className = cx('pa-md', 'mb-xs', 'pos-r', {
    'bg-gray-lightest': index % 2,
    'is-active': isActive || hasErrors,
    'bor-cranberry': hasErrors,
    'bor-light': !hasErrors,
    opaque: isDragging,
    'bor-brand-light-dashed': isOver
  })

  const { name, options, errors } = operation

  return connectDragPreview(
    connectDropTarget(
      <div className={className} key={`operations-${index}`}>
        {connectDragSource(
          <div>
            <button className="rka-close-icon" onClick={e => removeOperation(e, index)} />
            <button className="rka-edit-icon" onClick={e => setActiveOperation(e, index)} />
            <span className="rka-move-icon" />
            <h3 className="rka-h3 txt-cap">{name}</h3>
          </div>
        )}
        <div className={cx({ 'semi-transparent': isOver })}>
          <div className="rka-operation-content">
            <StackOperation
              availableOperations={availableOperations}
              name={name}
              values={options}
              onChange={e => onChange(index, e)}
              errors={errors}
            />
          </div>
        </div>
      </div>
    )
  )
}
Operation.propTypes = {
  availableOperations: PropTypes.object.isRequired,
  operation: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    options: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  }).isRequired,
  index: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  // state manipulators on container
  onChange: PropTypes.func.isRequired,
  onMoveOperation: PropTypes.func.isRequired,
  removeOperation: PropTypes.func.isRequired,
  setActiveOperation: PropTypes.func.isRequired,
  // from HOCs of react-dnd
  connectDragSource: PropTypes.func.isRequired,
  connectDragPreview: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  isOver: PropTypes.bool.isRequired
}

const dragSourceSpec = {
  beginDrag(props) {
    return {
      id: props.operation.id,
      index: props.index
    }
  },

  endDrag(props, monitor) {
    const { id: droppedId, originalIndex } = monitor.getItem()
    const didDrop = monitor.didDrop()

    if (!didDrop) {
      props.onMoveOperation(droppedId, originalIndex)
    }
  }
}

const dragSourceCollect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging()
})

const dropTargetSpec = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index
    const hoverIndex = props.index

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

    // Determine mouse position
    const clientOffset = monitor.getClientOffset()

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return
    }

    // Time to actually perform the action
    props.onMoveOperation(dragIndex, hoverIndex)

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex
  }
}

const dropTargetCollect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver()
})

export default DropTarget(ITEM_TYPE, dropTargetSpec, dropTargetCollect)(
  DragSource(ITEM_TYPE, dragSourceSpec, dragSourceCollect)(Operation)
)
