const Router = require('express');
const router = new Router();
const productController = require('../controllers/productController');

router.post('/', productController.create);
router.get('/', productController.getAll);
router.get('/id/:id', productController.getOneById);
router.get('/sku/:sku', productController.getOneBySku);
router.put('/id', productController.updateById);
router.put('/sku', productController.updateBySku);
router.delete('/id/:id', productController.deleteById);
router.delete('/sku/:sku', productController.deleteBySku);

module.exports = router;
