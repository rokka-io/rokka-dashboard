export const styles = {
  control: base => {
    return {
      ...base,
      borderColor: '#DDDDD8',
      borderRadius: 0,
      boxShadow: null,
      lineHeight: '1.2em'
    }
  },
  option: (base, state) => {
    const backgroundColor = state.isFocused || state.isSelected ? '#F7F7F5' : null
    return {
      ...base,
      backgroundColor,
      color: '#000'
    }
  }
}
