import axios from 'axios';

const submitFormData = async (formData) => {
    try {
        // Отправляем POST-запрос на сервер json-server
        const response = await axios.post('http://localhost:4000/sale', formData);
        console.log(response.data); // Выводим данные, которые вернул сервер
        return response.data; // Возвращаем данные, если это необходимо
    } catch (error) {
        console.error('Error submitting form data:', error);
        throw error; // Бросаем ошибку, чтобы ее обработать в компоненте, отправляющем данные
    }
};

export default submitFormData;
