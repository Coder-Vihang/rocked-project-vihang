function validateValueInList(value, validList, fieldName) {
    if (!value) return {
        isSuccess: false,
        message: `Invalid value ${value} entered for fieldName ${fieldName} must be one of ${validList}`
    };

    const normalizedValue = value.trim().toLowerCase();
    const normalizedList = validList.map(v => v.toLowerCase());

    if (!normalizedList.includes(normalizedValue)) {

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