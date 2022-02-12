const Joi = require('joi');

exports.register = (req, res, next) => {
    
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    const schema = Joi.object({
        pseudo: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string()
        .regex(RegExp(pattern))
        .required()
    })

    const {error, value} = schema.validate(req.body)

    if (error) {
        switch (error.details[0].context.key) {
            case 'pseudo':
                res.status(400).send({
                    error: 'You must provide a pseudo'
                })
            case 'email':
                res.status(400).send({
                    error: 'You must provide a valid email address'
                })
                break
            case 'password':
                res.status(400).send({
                    error: `The password provided failed to match the following rules:
                        <br>
                        It must contains at least 8 characters, one digit, one lowercase character, one uppercase character and one special character`
                        
                })
                break
            default:
                res.status(400).send({
                    error: 'Invalid registration information' 
                })
        }
    } else {
        next();
    }

}

exports.login = (req, res, next) => {
    
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string()
        .regex(RegExp(pattern))
        .required()
    })

    const {error, value} = schema.validate(req.body)

    if (error) {
        switch (error.details[0].context.key) {
            case 'email':
                res.status(400).send({
                    error: 'You must provide a valid email address'
                })
                break
            case 'password':
                res.status(400).send({
                    error: `Invalid password provided` 
                })
                break
            default:
                res.status(400).send({
                    error: 'Invalid registration information' 
                })
        }
    } else {
        next();
    }

}