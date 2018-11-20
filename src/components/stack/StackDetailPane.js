import React from 'react'
import PropTypes from 'prop-types'
import FormGroup from '../forms/FormGroup'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import OperationList from './OperationList'
import Options from '../Options'

const StackDetailPane = ({
  name,
  options,
  stacks,
  defaultOptions,
  addedOperations,
  availableOperations,
  activeOperation,
  selectedOperation,
  onChangeName,
  onChangeOptions,
  onChangeOperation,
  onAddOperation,
  onRemoveOperation,
  setActiveOperation,
  onMoveOperation,
  onSelectAddOperation
}) => {
  const operationsTab = addedOperations.length > 0 || !!onAddOperation
  const addedOptionsKeys = Object.keys(options)
  const optionsTab = !operationsTab || !!onChangeOptions
  console.log(availableOperations)

  return (
    <>
      {onChangeName && (
        <>
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
        </>
      )}

      <Tabs>
        <TabList>
          {operationsTab && <Tab>Operations</Tab>}
          {optionsTab && <Tab>Options</Tab>}
        </TabList>
        {operationsTab && (
          <TabPanel>
            <OperationList
              onChangeOperation={onChangeOperation}
              onAddOperation={onAddOperation}
              onRemoveOperation={onRemoveOperation}
              setActiveOperation={setActiveOperation}
              onMoveOperation={onMoveOperation}
              onSelectAddOperation={onSelectAddOperation}
              selectedOperation={selectedOperation}
              activeOperation={activeOperation}
              addedOperations={addedOperations}
              availableOperations={availableOperations}
            />
          </TabPanel>
        )}
        {optionsTab && (
          <TabPanel>
            <Options
              defaultOptions={defaultOptions}
              options={options}
              onChange={onChangeOptions}
              stacks={stacks}
            />
            {!onChangeOptions && (
              <Options
                title="Default options"
                options={Object.keys(defaultOptions)
                  .filter(key => !addedOptionsKeys.includes(key))
                  .reduce((accumulator, key) => {
                    accumulator[key] = { value: defaultOptions[key].default }
                    return accumulator
                  }, {})}
                defaultOptions={defaultOptions}
              />
            )}
          </TabPanel>
        )}
      </Tabs>
    </>
  )
}
StackDetailPane.propTypes = {
  onChangeName: PropTypes.func,
  onChangeOperation: PropTypes.func,
  onAddOperation: PropTypes.func,
  onRemoveOperation: PropTypes.func,
  setActiveOperation: PropTypes.func,
  onMoveOperation: PropTypes.func,
  onSelectAddOperation: PropTypes.func,
  selectedOperation: PropTypes.string,
  onChangeOptions: PropTypes.func,
  defaultOptions: PropTypes.object,
  stacks: PropTypes.object,
  options: PropTypes.object,
  name: PropTypes.string,
  activeOperation: PropTypes.number,
  addedOperations: PropTypes.array,
  availableOperations: PropTypes.object
}
export default StackDetailPane
