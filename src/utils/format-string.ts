const formatSubstring = (value) => {
    if (value != null) {
        if (value.length > 20) {
            return value.substring(0, 20) + '...';
        } else {
            return value;
        }
    } else return 'Trống';
};

const isValidEmailAddress = (text) => {
    return !!text.match(/.+@.+/);
};

const validatePhoneNumber = (checkingText) => {
    /* reg exp để kiểm tra xem chuỗi có chỉ bao gồm 10 - 11 chữ số hay không */
    return !!checkingText.match(/^\d{10,11}$/);
};

export { formatSubstring, isValidEmailAddress, validatePhoneNumber };
