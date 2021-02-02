const formatSubstring = (value) => {
    if (value != null) {
        if (value.length > 20) {
            return value.substring(0, 20) + '...';
        } else {
            return value;
        }
    } else return 'Trống';
};


export { formatSubstring };