import React, { PropTypes } from 'react'
import Select, { Creatable } from 'react-select'
import searchIcon from '../../img/search.svg'

const placeholderByType = {
  string: '* for prefix (e.g. "rokka*")',
  date: 'Format: YYYY-MM-ddTHH:mm:ssZ',
  int: 'Range format of [0,10]',
  double: 'format 0.0'
}

const SearchForm = ({ onChange, onSubmit, fields, searchField = null, searchValue = null, sortField = null, sortOrder = null }) => {
  const fieldOptions = Object.keys(fields).map(key => ({value: fields[key].value, label: key}))

  return (
    <form onSubmit={onSubmit}>
      <div className="row">
        <div className="col-md-2">
          <div className="rka-form-group mb-sm">
            <Creatable
              options={fieldOptions}
              simpleValue
              clearable
              searchable
              name="searchField"
              value={searchField}
              onChange={(value) => onChange('searchField', value)}
            />
          </div>
        </div>
        <div className="col-md-4">
          <div className="rka-form-group mb-sm pos-r">
            <input
              type="text"
              disabled={searchField === null}
              placeholder={placeholderByType[fields[searchField]] || 'Select search field first'}
              name="searchValue"
              value={searchValue}
              className="rka-input-txt rka-search-input"
              onChange={(e) => onChange('searchValue', e.currentTarget.value)}
            />
            <svg className="rka-search-icon" onClick={onSubmit}>
              <use xlinkHref={searchIcon + '#search-icon'} />
            </svg>
          </div>
        </div>
        <div className="col-md-2 col-md-offset-2">
          <div className="rka-form-group mb-sm">
            <Creatable
              options={fieldOptions}
              simpleValue
              clearable={false}
              searchable
              name="sortField"
              value={sortField}
              onChange={(value) => onChange('sortField', value, true)}
            />
          </div>
        </div>
        <div className="col-md-2">
          <div className="rka-form-group mb-sm">
            <Select
              options={[{label: 'Ascending', value: 'asc'}, {label: 'Descending', value: 'desc'}]}
              simpleValue
              clearable={false}
              name="sortOrder"
              value={sortOrder}
              onChange={(value) => onChange('sortOrder', value, true)}
            />
          </div>
        </div>
      </div>
      <input type="submit" className="dis-n" />
    </form>
  )
}
SearchForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired,
  searchField: PropTypes.string,
  searchValue: PropTypes.string,
  sortField: PropTypes.string,
  sortOrder: PropTypes.string
}

export default SearchForm
