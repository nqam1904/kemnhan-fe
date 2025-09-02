const formatSubstring = (value: string) => {
    if (value != null) {
        if (value.length > 20) {
            return `${value.substring(0, 20)  }...`;
        } 
            return value;
        
    } return 'Trống';
};

const isValidEmailAddress = (text: string) => !!text.match(/.+@.+/);

const validatePhoneNumber = (checkingText: string) => 
    /* reg exp để kiểm tra xem chuỗi có chỉ bao gồm 10 - 11 chữ số hay không */
     !!checkingText.match(/^\d{10,11}$/)
;

export { formatSubstring, isValidEmailAddress, validatePhoneNumber };
