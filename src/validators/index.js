const { validationResult, check } = require("express-validator");

exports.resultsValidator = (req) => {
    let messages = [];
    if (!validationResult(req).isEmpty()) {
      const errors = validationResult(req).array();
      for (const i of errors) {
        messages.push(i);
      }
    }
    return messages;
}

exports.contactUsValidator = () => {
  return [
    check("name")
        .notEmpty()
        .withMessage("name is required")
        .isLength({ min: 2 })
        .withMessage("Name should be at least two characters"),
     
    check("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Please enter a valid email"),
    
      check("message")
        .notEmpty()
        .withMessage("Message field cannot be empty")  
  ];
};