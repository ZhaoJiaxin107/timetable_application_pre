//validation
const Joi = require('@hapi/joi');
//Register Validation
const registerValidation = data =>{
    const schema = {
        first_name:Joi.string().max(20).required(),
        last_name:Joi.string().max(20).required(),
        email:Joi.string().max(20).required().email(),
        mobile_num:Joi.string().max(20).required(),
        username:Joi.string().max(20).required(),
        password:Joi.string().min(5).required()
    };
    return Joi.validate(data,schema);
};

const loginValidation = data =>{
    const schema = {
        username:Joi.string().max(20).required(),
        password:Joi.string().min(5).required()
    };
    return Joi.validate(data,schema);
};
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;