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
            const product = await Product.findOne({where: {id}});
            return res.json(product);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async getOneBySku(req, res, next) {
        try {
            const {sku} = req.params;
            const product = await Product.findOne({ where: { sku: sku } });
            return res.json(product);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }
    async updateById(req, res, next) {
        try{
            const {id, name, price, typeId} = req.body;
            if (!id) {
                return next(ApiError.badRequest('Не задан id'));
            }
            //{where: { id: id }}
            const updateProduct = await Product.upsert({ name: name, price: price, typeId: typeId }, { returning: true });
            return res.json(updateProduct);
        } catch (e) {
            next(ApiError.internal(e.message));
        }

    }
    async updateBySku(req, res, next) {
        const {sku, name, price, typeId} = req.body;
        if (!sku) {
            return next(ApiError.badRequest('Не задан sku'));
        }

    }
    async deleteById(req, res, next) {
        try {
            const {id} = req.params;
            const product = await Product.destroy({where: {id}});
            return res.json(product);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }
    async deleteBySku(req, res, next) {
        try {
            const {sku} = req.params;
            const product = await Product.destroy({where: { sku: sku }});
            return res.json(product);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }
}

module.exports = new ProductController()