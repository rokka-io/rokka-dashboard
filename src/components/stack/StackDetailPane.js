import React, { lazy, Suspense } from 'react'
import PropTypes from 'prop-types'
import FormGroup from '../forms/FormGroup'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import OperationList from './OperationList'
import Options from '../Options'
import JsonView from './JsonView'
import { addIdAndErrorsToStackOperations } from '../../state'
import Spinner from '../Spinner'
const JsonEditor = lazy(() => import('./JsonEditor'))

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
  onSelectAddOperation,
  router,
  stack,

  setStack
}) => {
  const operationsTab = stack.operations.length > 0 || !!onAddOperation
  const addedOptionsKeys = Object.keys(options || {})
  const optionsTab = !operationsTab || addedOptionsKeys.length > 0 || !!onChangeOptions
  const {
    match: {
      params: { tabindex }
    }
  } = router

  const tabs = []
  if (operationsTab) {
    tabs.push('Operations')
  }
  if (optionsTab) {
    tabs.push('Options')
  }
  tabs.push('JSON Config')
  const foundIndex = tabindex ? tabs.findIndex(tab => tab === tabindex) : 0
  const tabindexNumber = foundIndex < 0 ? 0 : foundIndex
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
      <Tabs
        selectedIndex={tabindexNumber}
        onSelect={index => {
          let root
          if (router.match.path.startsWith('/new-stack')) {
            root = '/new-stack'
          } else {
            root = `/stacks/${name}`
          }
          router.history.push(`${root}/${tabs[index]}`)
        }}
      >
        <TabList>
          {tabs.map(tab => (
            <Tab key={tab}>{tab}</Tab>
          ))}
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
              addedOperations={addIdAndErrorsToStackOperations(stack).operations}
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
                    accumulator[key] = defaultOptions[key].default
                    return accumulator
                  }, {})}
                defaultOptions={defaultOptions}
              />
            )}
          </TabPanel>
        )}
        <TabPanel>
          {tabindex === 'JSON Config' &&
            (onChangeOperation ? (
              <Suspense fallback={<Spinner />}>
                <JsonEditor
                  key={name}
                  value={
                    stack || {
                      description: '',
                      operations: [],
                      options: {},
                      expressions: [],
                      variables: {}
                    }
                  }
                  setValue={value => {
                    setStack(value)
                  }}
                ></JsonEditor>
              </Suspense>
            ) : (
              <JsonView
                key={name}
                value={
                  stack || {
                    description: '',
                    operations: [],
                    options: {},
                    expressions: [],
                    variables: {}
                  }
                }
              ></JsonView>
            ))}
        </TabPanel>
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
  availableOperations: PropTypes.object,
  router: PropTypes.shape({
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    })
  }).isRequired,
  stack: PropTypes.object,
  setStack: PropTypes.func.isRequired
}
export default StackDetailPane
