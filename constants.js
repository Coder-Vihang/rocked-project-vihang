const { Gender, Department } = require("./enums")
const Constants = {
    DefaultPointsEarned: 20,
    DefaultPageNumber: 1,
    DefaultPageSize: 10,
    CorrectGenderList: [Gender.male, Gender.female],
    CorrectDepartmentList: [Department.HR, Department.MARKETING, Department.SALES, Department.SERVICES],
    RegexValidations:{
        EmailRegexValidations: /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    }
}

module.exports = {
    Constants
}