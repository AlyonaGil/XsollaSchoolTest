const {Product} = require('../models/models');
const ApiError = require('../error/ApiError');

class ProductController {
    async create(req, res, next) {
        try {
            const {sku, name, price, typeId} = req.body;
            const product = await Product.create({sku, name, price, typeId});
            return res.json(product);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res, next) {
        try {
            let {typeId, limit, page} = req.query;
            page = page || 1;
            limit = limit || 10;
            let offset = page * limit - limit;
            let product;
            if (!typeId){
                product = await Product.findAndCountAll({limit, offset});
            } else { //Фильтрация по TypeId
                product = await Product.findAndCountAll({where:{typeId}, limit, offset});
            }
            return res.json(product);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async getOneById(req, res, next) {
        const {id} = req.params;
        Product.findOne({where: {id}}).then(answer => {
            if (answer == null) {
                res.send({message: `Product with id=${id} was not found`});
            }
            else
            {
                res.send(answer);
            }
        }).catch (e => next(ApiError.internal(e.message)));
    }

    async getOneBySku(req, res, next) {
        const {sku} = req.params;
        Product.findOne({ where: {sku: sku}}).then(answer => {
            if (answer == null) {
                res.send({message: `Product with sku=${sku} was not found`});
            }
            else {
                res.send(answer);
            }
        }).catch (e => next(ApiError.internal(e.message)));
    }
    async updateById(req, res, next) {
        const {id, name, typeId, price} = req.body;
        if (!id) {
            return next(ApiError.badRequest('id is empty'));
        }
        Product.update({name, typeId, price}, {where: { id: id }}).then(num => {
            if (num == 1) {
                res.send({message: "Product was updated successfully."});
            } else {
                res.send({message: `Cannot update product with id=${id}. Maybe product was not found`});
            }
        }). catch(e => next(ApiError.internal(e.message)));
    }

    async updateBySku(req, res, next) {
        const {sku, name, typeId, price} = req.body;
        if (!sku) {
            return next(ApiError.badRequest('sku is empty'));
        }
        Product.update({name, typeId, price}, {where: { sku: sku }}).then(num => {
            if (num == 1) {
                res.send({message: "Product was updated successfully."});
            } else {
                res.send({message: `Cannot update product with sku=${sku}. Maybe product was not found`});
            }
        }). catch(e => next(ApiError.internal(e.message)));
    }

    async deleteById(req, res, next) {
        const {id} = req.params;
        Product.destroy({where: {id}}).then(num => {
            if (num == 1){
                res.send({message: "Product was delete successfully."});
            } else {
                res.send({message: `Cannot delete product with id=${id}. Maybe product was not found`});
            }
        }).catch (e => next(ApiError.internal(e.message)));
    }
    async deleteBySku(req, res, next) {
        const {sku} = req.params;
        Product.destroy({where: { sku: sku }}).then(num => {
            if (num == 1){
                res.send({message: "Product was delete successfully."});
            } else {
                res.send({message: `Cannot delete product with sku=${sku}. Maybe product was not found`});
            }
        }).catch (e => next(ApiError.internal(e.message)));
    }
}

module.exports = new ProductController()