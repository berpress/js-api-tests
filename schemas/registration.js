const Joi = require("joi");


export class RegistrationSchema {
    addSchema = Joi.object({
        message: Joi.string(),
        uuid: Joi.number()
    });

    errorSchema = Joi.object({
        message: Joi.string(),
        uuid: Joi.number()
    })
}

