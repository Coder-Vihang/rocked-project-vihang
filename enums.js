const StatusCodes = {
Success: 200,
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

module.exports={
    StatusCodes,
    Gender,
    Department
}