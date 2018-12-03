import PropTypes from 'prop-types'
import React from 'react'
import Select, { Creatable } from 'react-select'
import { styles } from '../forms/ReactSelect'
import searchIcon from '../../img/search.svg'
import { ROKKA_TYPES } from '../imagedetail/UserMetadataRow'

const placeholderByType = {
  string: '* for prefix (e.g. "rokka*")',
  date: 'Format: YYYY-MM-ddTHH:mm:ssZ',
  int: 'Range format of [0,10]',
  double: 'format 0.0'
}

const SearchForm = ({
  onChange,
  onSubmit,
  fields,
  searchField = null,
  searchValue = '',
  searchDataType = '',
  sortField = null,
  sortOrder = null
}) => {
  const fieldOptions = Object.keys(fields).map(key => fields[key])
  let currentFieldOption = fieldOptions.filter(({ value }) => searchField === value)
  if (currentFieldOption) {
    currentFieldOption = currentFieldOption[0]
  }
  const sortOrderOptions = [
    { label: 'Ascending', value: 'asc' },
    { label: 'Descending', value: 'desc' }
  ]

  return (
    <form onSubmit={onSubmit}>
      <div className="row">
        <div className="col-md-2">
          <div className="rka-form-group mb-sm">
            <Creatable
              options={fieldOptions}
              isClearable
              isSearchable
              name="searchField"
              value={currentFieldOption}
              onChange={value => onChange('searchField', value || {})}
              styles={styles}
            />
          </div>
        </div>
        <div className="col-md-2">
          <div className="rka-form-group mb-sm">
            <Select
              options={ROKKA_TYPES}
              name="searchDataType"
              isDisabled={!!(currentFieldOption && currentFieldOption.type)}
              value={ROKKA_TYPES.filter(({ value }) => searchDataType === value)}
              onChange={value => onChange('searchDataType', value || {})}
              styles={styles}
            />
          </div>
        </div>
        <div className="col-md-3">
          <div className="rka-form-group mb-sm pos-r">
            <input
              type="text"
              disabled={searchField === null}
              placeholder={placeholderByType[fields[searchField]] || 'Select search field first'}
              name="searchValue"
              value={searchValue}
              className="rka-input-txt rka-search-input"
              onChange={e => onChange('searchValue', { value: e.currentTarget.value })}
            />
            <svg className="rka-search-icon" onClick={onSubmit}>
              <use xlinkHref={searchIcon + '#search-icon'} />
            </svg>
          </div>
        </div>
        <div className="col-md-2 col-md-offset-1">
          <div className="rka-form-group mb-sm">
            <Creatable
              options={fieldOptions}
              isSearchable
              name="sortField"
              value={fieldOptions.filter(({ value }) => sortField === value)}
              onChange={value => onChange('sortField', value || {}, true)}
              styles={styles}
            />
          </div>
        </div>
        <div className="col-md-2">
          <div className="rka-form-group mb-sm">
            <Select
              options={sortOrderOptions}
              name="sortOrder"
              value={sortOrderOptions.filter(({ value }) => sortOrder === value)}
              onChange={value => onChange('sortOrder', value || {}, true)}
              styles={styles}
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
  searchDataType: PropTypes.string,
  sortField: PropTypes.string,
  sortOrder: PropTypes.string
}

export default SearchForm
