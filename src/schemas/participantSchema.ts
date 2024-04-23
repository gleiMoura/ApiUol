import joi from "joi";

const participantSchema = joi.object({
    name: joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]+$'))
        .required()
        .messages({
            'string.pattern.base': `"nome" deve conter apenas letras e números sem espaços ou caracteres especiais`,
            'string.empty': `"nome" não pode estar vazio`,
            'any.required': `"nome" é obrigatório`
        })
});

export default participantSchema;