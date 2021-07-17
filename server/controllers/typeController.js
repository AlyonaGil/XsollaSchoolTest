const {Type} = require('../models/models');
const ApiError = require('../error/ApiError');

class TypeController {
    async create(req, res, next) {
        try {
            const {name} = req.body;
            const type = await Type.create({name});
            return res.json({type});
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async getAll(req, res, next) {
        try {
            const types = await Type.findAll();
            return res.json(types);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async getOne(req, res, next) {
        const {id} = req.params;
        Type.findOne({where: {id}}).then(answer => {
            if (answer == null) {
                res.send({message: `Type with id=${id} was not found`});
            }
            else
            {
                res.send(answer);
            }
        }).catch (e => next(ApiError.internal(e.message)));
    }
}

module.exports = new TypeController();