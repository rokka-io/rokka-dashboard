import React from 'react'
import PropTypes from 'prop-types'
import FormGroup from '../forms/FormGroup'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import OperationList from './OperationList'
import Options from '../Options'

const StackEditPane = ({
  name,
  options,
  stacks,
  stackOptions,
  addedOperations,
  availableOperations,
  activeOperation,
  selectedOperation,
  onChangeName,
  onChangeOptions,
  onChangeOperation,
  addOperation,
  removeOperation,
  setActiveOperation,
  onMoveOperation,
  onSelectAddOperation
}) => (
  <div className="col-md-7 col-sm-7">
    <h3 className="rka-h2 mv-md">Stack details</h3>
    <FormGroup label="Name" required>
      <input
        type="text"
        className="rka-input-txt"
        id="name"
        name="name"
        onChange={onChangeName}
        value={name}
      />
    </FormGroup>

    <Tabs>
      <TabList>
        <Tab>Operations</Tab>
        <Tab>Options</Tab>
      </TabList>
      <TabPanel>
        <OperationList
          onChangeOperation={onChangeOperation}
          addOperation={addOperation}
          removeOperation={removeOperation}
          setActiveOperation={setActiveOperation}
          onMoveOperation={onMoveOperation}
          onSelectAddOperation={onSelectAddOperation}
          selectedOperation={selectedOperation}
          activeOperation={activeOperation}
          addedOperations={addedOperations}
          availableOperations={availableOperations}
        />
      </TabPanel>
      <TabPanel>
        <Options
          defaultOptions={stackOptions ? stackOptions.properties : {}}
          options={options}
          onChange={onChangeOptions}
          stacks={stacks}
        />
      </TabPanel>
    </Tabs>
  </div>
)
StackEditPane.propTypes = {
  onChangeName: PropTypes.func.isRequired,
  onChangeOperation: PropTypes.func.isRequired,
  addOperation: PropTypes.func.isRequired,
  removeOperation: PropTypes.func.isRequired,
  setActiveOperation: PropTypes.func.isRequired,
  onMoveOperation: PropTypes.func.isRequired,
  onSelectAddOperation: PropTypes.func.isRequired,
  selectedOperation: PropTypes.string.isRequired,
  onChangeOptions: PropTypes.func.isRequired,
  stackOptions: PropTypes.object,
  stacks: PropTypes.object,
  options: PropTypes.object,
  name: PropTypes.string,
  activeOperation: PropTypes.number,
  addedOperations: PropTypes.array,
  availableOperations: PropTypes.object
}
export default StackEditPane
