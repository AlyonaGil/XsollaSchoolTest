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
            page = page || 1; //текущая страница
            limit = limit || 10; //кол-во записей для одной страницы
            let offset = page * limit - limit;
            let product;
            if (!typeId){
                product = await Product.findAll({limit, offset});
            }
            if (typeId){ //Фильтрация по TypeId
                product = await Product.findAll({where:{typeId}, limit, offset});
            }
            return res.json(product);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async getOneById(req, res, next) {
        try {
            const {id} = req.params;
            if (!id) {
                return next(ApiError.badRequest('Не задан id'));
            }
            const product = await Product.findOne({where: {id}});
            return res.json(product);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async getOneBySku(req, res, next) {
        try {
            const {sku} = req.params;
            if (!sku) {
                return next(ApiError.badRequest('Не задан sku'));
            }
            const product = await Product.findOne({ where: { sku: sku } });
            return res.json(product);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }
    async updateById(req, res) {

    }
    async updateBySku(req, res) {

    }
    async deleteById(req, res) {

    }
    async deleteBySku(req, res) {

    }
}

module.exports = new ProductController()