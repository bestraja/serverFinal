const { check, validationResult } = require("express-validator")


const SignupCheck = () => [
    check("email", "this field should be a valid email").isEmail(),
    check("password", "password should have at least 6 characters").isLength({ min: 6 }),
    check("firstname", " firstName should not empty").notEmpty().trim(),
    check("lastname", " lastName should not empty").notEmpty().trim(),
    check("confirmPassword","'Passwords do not match'")
    .exists()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Les mots de passe ne correspondent pas");
      }
      return true; // La validation a réussi
    }),
];

    
const loginCheck = () => [
    check("email", "this field should be a valid email").isEmail(),
    check("password", "password should have at least 6 characters").isLength({ min: 6 })
]

const validator = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next()
}

module.exports={SignupCheck,loginCheck,validator}