function validateValueInList(value, validList, fieldName) {
    if (!value) return {
        isSuccess: false,
        message: `Invalid value ${value} entered for fieldName ${fieldName} must be one of ${validList}`
    };

    const lowerCaseValue = value.trim().toLowerCase();
    const lowerCaseList = validList.map(v => v.toLowerCase());

    if (!lowerCaseList.includes(lowerCaseValue)) {

        return {
            isSuccess: false,
            message: `Invalid value ${value} entered fieldName ${fieldName} must be one of ${validList}`
        }
    }

    return {
        isSuccess: true,
        message: `Valid`
    };
}

module.exports = {
    validateValueInList
}