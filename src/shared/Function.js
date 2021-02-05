const formatSubstring = (value) => {
  if (value != null) {
    if (value.length > 20) {
      return value.substring(0, 20) + '...';
    } else {
      return value;
    }
  } else return 'Trống';
};
const currencyFormat = (num) => {
  if (num === 0) {
    return 0;
  } else {
    return num?.toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }
};


export { formatSubstring, currencyFormat };