const express = require('express');
const multer = require('multer');
const path = require('path');

// Настройка express приложения
const app = express();

// Папка для сохранения загруженных файлов
const uploadFolder = 'uploads/';

// Убедитесь, что папка для загрузки существует или создайте её
const fs = require('fs');
if (!fs.existsSync(uploadFolder)){
    fs.mkdirSync(uploadFolder);
}

// Настройка multer для сохранения файлов
const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, uploadFolder);
    },
    filename: function(req, file, callback) {
        callback(null, Date.now() + path.extname(file.originalname)); // Использование timestamp для уникальности имени
    }
});

// Функция фильтрации файлов (пример)
const fileFilter = (req, file, callback) => {
    if (file.mimetype.startsWith('image/')) {
        callback(null, true); // Принимаем файл
    } else {
        callback(new Error('Файл не является изображением'), false); // Отклоняем файл
    }
};

// Инициализация загрузчика с настройками
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5 // Ограничение размера файла в 5MB
    }
});

// Маршрут для загрузки файла
app.post('/photos', upload.single('photo'), (req, res) => {
    if (req.file) {
        console.log(req.file); // Логирование информации о файле
        res.json({
            success: true,
            message: 'Файл успешно загружен',
            fileInfo: req.file
        });
    } else {
        res.status(400).json({
            success: false,
            message: 'Ошибка при загрузке файла'
        });
    }
});

// Обработка ошибок Multer
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    } else if (err) {
        res.status(500).json({
            success: false,
            message: 'Произошла неизвестная ошибка при загрузке файла'
        });
    } else {
        next();
    }
});

// Запуск сервера
const port = 5000;
app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
