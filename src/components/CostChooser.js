import React, { PureComponent } from 'react'
import moment from 'moment'
import Select from 'react-select'
import { styles } from './forms/ReactSelect'

class CostChooser extends PureComponent {
  changeMonth = (event, b) => {
    this.props.router.history.push(`/costs/${event.value}-1`)
  }

  getMonths = () => {
    let month = moment()

    let options = []
    for (let i = 0; i < 15; i++) {
      const value = month.startOf('month').format('YYYY-MM')
      options.push({ value: value, label: value })
      month = month.subtract(1, 'months')
    }
    return options
  }
  render() {
    const monthsOptions = this.getMonths()
    return (
      <form>
        <div key={'title2'} className="section rka-box no-min-height">
          <h2 className={'rka-h2 mb-md'}>Month</h2>
          <div className="rka-form-group mb-sm">
            <Select
              options={monthsOptions}
              name="month"
              value={monthsOptions.filter(({ value }) => {
                return this.props.router.match.params.date === value + '-1'
              })}
              onChange={this.changeMonth}
              styles={styles}
            />
          </div>
        </div>
      </form>
    )
  }
}

export default CostChooser
