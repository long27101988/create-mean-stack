export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    }
};

export const checkValidity = (value, rules) => {
    let isValid = true;
    let errMsg = ""


    if (!rules) {
        return true;
    }

    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
        errMsg = isValid ? "" : "This field is required"
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
        errMsg = isValid ? "" : `This field contains at least ${rules.minLength} characters in length.`
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid
        errMsg = isValid ? "" : `This field contains entered exceeds the maximum ${rules.maxLength} characters in length.`
    }

    if(rules.email) {
        let patternEmail = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i);
        isValid = patternEmail.test(value) && isValid
        errMsg = isValid ? "" : "This field must be a valid email."
    }

    return {valid: isValid, errMsg: errMsg};
}