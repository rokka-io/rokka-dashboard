import React from 'react'
import PropTypes from 'prop-types'
import FormGroup from '../forms/FormGroup'
import Options from '../Options'
import Operation from '../operations'

const OperationListContainer = ({
  name,
  options,
  stacks,
  onChangeName,
  onChangeOptions,
  onChangeOperation,
  addOperation,
  removeOperation,
  setActiveOperation,
  onMoveOperation,
  onSelectAddOperation,
  activeOperation = 0,
  addedOperations = [],
  availableOperations = {},
  stackOptions = null
}) => {
  return (
    <div className="col-md-7 col-sm-7">
      <h3 className="rka-h2 mv-md">Stack details</h3>
      <FormGroup label="Name" required>
        <input type="text" className="rka-input-txt" id="name" name="name" onChange={onChangeName}
          value={name} />
      </FormGroup>

      <Options
        defaultOptions={stackOptions ? stackOptions.properties : {}}
        options={options}
        onChange={onChangeOptions}
        stacks={stacks}
      />

      <OperationList
        addedOperations={addedOperations}
        availableOperations={availableOperations}
        activeOperation={activeOperation}
        onChangeOperation={onChangeOperation}
        removeOperation={removeOperation}
        setActiveOperation={setActiveOperation}
        onMoveOperation={onMoveOperation}
      />

      <NewOperation onSelectAddOperation={onSelectAddOperation} availableOperations={availableOperations} addOperation={addOperation} />
    </div>
  )
}
OperationListContainer.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.object.isRequired,
  onChangeName: PropTypes.func.isRequired,
  onChangeOptions: PropTypes.func.isRequired,
  onChangeOperation: PropTypes.func.isRequired,
  addOperation: PropTypes.func.isRequired,
  removeOperation: PropTypes.func.isRequired,
  setActiveOperation: PropTypes.func.isRequired,
  onMoveOperation: PropTypes.func.isRequired,
  onSelectAddOperation: PropTypes.func.isRequired,
  activeOperation: PropTypes.number,
  addedOperations: PropTypes.array,
  availableOperations: PropTypes.object,
  stacks: PropTypes.object,
  stackOptions: PropTypes.shape({
    properties: PropTypes.object.isRequired
  })
}

const OperationList = ({ addedOperations, availableOperations, activeOperation, onChangeOperation, removeOperation, setActiveOperation, onMoveOperation }) => (
  <>
    <h3 className="rka-h2 mv-md">Operations</h3>
    {addedOperations.map((operation, index) => {
      return <Operation
        availableOperations={availableOperations}
        key={`operation-${operation.id}-${operation.name}`}
        operation={operation}
        index={index}
        isActive={index === activeOperation}
        onChange={onChangeOperation}
        removeOperation={removeOperation}
        setActiveOperation={setActiveOperation}
        onMoveOperation={onMoveOperation}
      />
    })}
  </>
)
OperationList.propTypes = {
  onChangeOperation: PropTypes.func.isRequired,
  removeOperation: PropTypes.func.isRequired,
  setActiveOperation: PropTypes.func.isRequired,
  onMoveOperation: PropTypes.func.isRequired,
  addedOperations: PropTypes.array,
  availableOperations: PropTypes.object,
  activeOperation: PropTypes.number,
}

const NewOperation = ({ onSelectAddOperation, availableOperations, addOperation }) => (
  <div className="pa-md bor-light mt-md">
    <h3 className="rka-h3 mb-md">New operation</h3>
    <div className="rka-form-group">
      <select className="rka-select" onChange={onSelectAddOperation}>
        {Object.keys(availableOperations).filter(name => name !== 'noop').sort().map((name) => <option key={name} value={name}>{name}</option>)}
      </select>
    </div>
    <a href="#" className="rka-button rka-button-brand rka-button-sm" onClick={addOperation}>Add operation</a>
  </div>
)
NewOperation.propTypes = {
  onSelectAddOperation: PropTypes.func.isRequired,
  addOperation: PropTypes.func.isRequired,
  availableOperations: PropTypes.object
}

export default OperationListContainer
