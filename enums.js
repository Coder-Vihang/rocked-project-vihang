
const StatusCodes = {
Ok: 200,
Created: 201,
NotFound: 404,
BadRequest: 400,
InternalServerError: 500,
Unauthorised: 401
}


const Gender ={
    male: "male",
    female: "female"
}

const Department = {
    SALES: "SALES",
    HR: "HR",
    MARKETING: "MARKETING",
    SERVICES: "SERVICES"
}

const ValidationFieldNames = {
    gender: "gender",
    department: "department"
}

const ErrorMessages ={
    defaultErrorMessage: "Internal Server Error",
    pageLessthanOne: "Page Number cannot be less than 1 and must be a number",
    blankName: 'Name cannot be blank',
    emailNotFoundInHeaders: "Unauthorized: EmailId not found in Headers",
    invalidEmailFormat: "Invalid Email Format in Headers"
}

module.exports={
    StatusCodes,
    Gender,
    Department,
    ValidationFieldNames,
    ErrorMessages
}