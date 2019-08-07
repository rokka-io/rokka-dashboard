import React, { PureComponent } from 'react'
import moment from 'moment'

class BillChooser extends PureComponent {
  changeMonth = (event, b) => {
    this.props.router.history.push(`/bills/${event.target.value}-1`)
  }

  getMonths = () => {
    let month = moment()

    let options = []
    for (let i = 0; i < 6; i++) {
      options.push(<option key={i}>{month.startOf('month').format('YYYY-MM')}</option>)
      month = month.subtract(1, 'months')
    }
    return options
  }
  render() {
    return (
      <form>
        <select onChange={this.changeMonth}>{this.getMonths()}</select>
      </form>
    )
  }
}

export default BillChooser
