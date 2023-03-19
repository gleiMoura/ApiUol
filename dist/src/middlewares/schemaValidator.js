"use strict";
exports.__esModule = true;
function schemaValidator(schema) {
    return function (req, res, next) {
        var validation = schema.validate(req.body, { abortEarly: false });
        if (validation.error) {
            return res.status(410).send(validation.error.details);
        }
        next();
    };
}
exports["default"] = schemaValidator;
