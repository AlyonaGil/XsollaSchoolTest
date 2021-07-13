require('dotenv').config()
const express = require('express') // импорт модуля express
const sequelize = require('./db') // импорт модуля sequelize из файла окружения
const models = require('./models/models'); //импорт моделей
const cors = require('cors');

const PORT = process.env.PORT || 5000 //порт, на котором наше приложение работает

const app = express() //начинается запуск приложения
app.use(cors())
app.use(express.json()) //чтобы приложение могло парсить json-формат

app.get('/', (req, res) => {
    res.status(200).json({message: 'WORKING!'})
});

const start = async () => {
    try {
        await sequelize.authenticate() //устанавливает подключение к бд
        await sequelize.sync() //сверяет состояние бд со схемой данных
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))//какой порт должен прослушывать наш сервер, колбек, который отработает при успехе
    } catch (e) {
        console.log(e)
    }
}
start()
