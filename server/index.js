require('dotenv').config()
const express = require('express');
const sequelize = require('./db');
const models = require('./models/models');
const cors = require('cors');
const router= require('./routes/index');
const errorHandler = require('./middleware/ErrorHandingMiddleware');

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json()) //чтобы приложение могло парсить json-формат
app.use('/api', router)


//Обработка ошибок, последний middleware
app.use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate() //устанавливает подключение к бд
        await sequelize.sync() //сверяет состояние бд со схемой данных
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}
start()
