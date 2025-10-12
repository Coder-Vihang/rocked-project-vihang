function validateValueInList(value, validList, fieldName) {
    if (value == null || value.toString().trim() === "") return {
        isSuccess: false,
        message: `Invalid value ${value} entered for fieldName ${fieldName} must be one of ${validList.join(", ")}`
    };

    const lowerCaseValue = value.trim().toLowerCase();
    const lowerCaseList = validList.map(v => v.toLowerCase());

    if (!lowerCaseList.includes(lowerCaseValue)) {

        return {
            isSuccess: false,
            message: `Invalid value ${value} entered for fieldName ${fieldName} must be one of ${validList.join(", ")}`
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