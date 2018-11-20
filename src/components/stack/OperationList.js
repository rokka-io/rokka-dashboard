import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import Operation from '../operations/Operation'
import StackOperation from '../operations/StackOperation'

const OperationList = ({
  onChangeOperation,
  onAddOperation,
  onRemoveOperation,
  setActiveOperation,
  onMoveOperation,
  onSelectAddOperation,
  selectedOperation,
  activeOperation = 0,
  addedOperations = [],
  availableOperations = {}
}) => {
  const OperationComponent = onChangeOperation ? Operation : StackOperation

  return (
    <>
      <h3 className="rka-h2 mv-md">Operations</h3>
      {addedOperations.map((operation, index) => {
        const comp = (
          <OperationComponent
            availableOperations={availableOperations}
            key={`operation-${operation.id}-${operation.name}`}
            name={operation.name}
            operation={operation}
            values={operation.options}
            index={index}
            isActive={index === activeOperation}
            onChange={onChangeOperation}
            removeOperation={onRemoveOperation}
            setActiveOperation={setActiveOperation}
            onMoveOperation={onMoveOperation}
          />
        )
        if (onChangeOperation) {
          return comp
        }
        return (
          <div
            className={cx('pa-md bor-light mb-xs', { 'bg-gray-lightest': index % 2 })}
            key={`operation-${operation.name}-${index}`}
          >
            <h3 className="rka-h3 mb-md">{operation.name}</h3>
            {comp}
          </div>
        )
      })}

      {onAddOperation && (
        <div className="pa-md bor-light mt-md">
          <h3 className="rka-h3 mb-md">New operation</h3>
          <div className="rka-form-group">
            <select
              className="rka-select"
              onChange={onSelectAddOperation}
              value={selectedOperation}
            >
              {Object.keys(availableOperations)
                .filter(name => name !== 'noop')
                .sort()
                .map(name => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
            </select>
          </div>
          <button className="rka-button rka-button-brand rka-button-sm" onClick={onAddOperation}>
            Add operation
          </button>
        </div>
      )}
    </>
  )
}
OperationList.propTypes = {
  onChangeOperation: PropTypes.func,
  onAddOperation: PropTypes.func,
  onRemoveOperation: PropTypes.func,
  setActiveOperation: PropTypes.func,
  onMoveOperation: PropTypes.func,
  onSelectAddOperation: PropTypes.func,
  selectedOperation: PropTypes.string,
  activeOperation: PropTypes.number,
  addedOperations: PropTypes.array,
  availableOperations: PropTypes.object
}

export default OperationList
