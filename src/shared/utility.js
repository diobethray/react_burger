export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const checkValidity = (value, rules) => {
    let isValid = true;

    if (rules && rules.required && isValid) {
        isValid = value.trim() !== '';
    }

    if (rules && rules.minLength && isValid) {
        isValid = value.length >= rules.minLength;
    }

    if (rules && rules.maxLength && isValid) {
        isValid = value.length <= rules.maxLength;
    }

    return isValid;
}