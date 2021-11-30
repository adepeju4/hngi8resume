class Error{
    constructor(error, message){
    this.errorCode = error;
    this.message = message;
    this.name = "Error";
    }
}

class ValidationError extends Error{
    constructor(error, message) {
    super(error, message);
        this.name = "Validation error";
          this.type = "Validation Error";
    }
} 

class RequiredPropError extends ValidationError{
    constructor(error, property){
        super(error, "No Property: " + property, error);
        this.name = "PropertyRequiredError";
        this.property = property;
        this.type = "Required Property Error";
    }
} 

class ReadError extends Error{
    constructor(error, message, cause){
        super(error, cause);
        this.cause = cause;
        this.name = 'ReadError'
          this.type = "Read Error";
    }
}


module.exports = { Error, ValidationError, RequiredPropError, ReadError };