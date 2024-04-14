// Файл: CarListingForm.js
import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { addUser } from './redux/slices/carsSlice';
import submitFormData from "./postTojsonserver";

const CarListingForm = () => {
    const { register, handleSubmit, formState: { errors } , reset, isValid} = useForm();
    const [isAdditionalInputsVisible, setIsAdditionalInputsVisible] = useState(false);
    const dispatch = useDispatch();
    const fileInputRef = React.useRef();

    const onSubmit = (data) => {
        const formData = new FormData();


        const onSubmit = (data) => {
            const formData = new FormData();

            // Добавляем текстовые поля в formData
            for (const key of Object.keys(data)) {
                formData.append(key, data[key]);
            }


            // Добавляем файл в formData
            if (fileInputRef.current && fileInputRef.current.files[0]) {
                formData.append('photo', fileInputRef.current.files[0]);
            } else {
                console.log("Файл не выбран");
            }
            for (var pair of formData.entries()) {
                console.log(`${pair[0]}: ${pair[1]}`);
            }
            // Отправляем formData
            submitFormData(formData).then(() => {
                dispatch(addUser(data)); // Можно добавить только после успешной отправки
                reset();
            });
        };
        console.log("Отправка данных на сервер", formData);
        for (var pair of formData.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }

        submitFormData(data);
        console.log(data);

        console.log('render');
        dispatch(addUser(data));
        reset();
        setFields([]);

    };

    const [fields, setFields] = useState([]);

    const toggleAdditionalInputs = () => {
            setIsAdditionalInputsVisible(!isAdditionalInputsVisible);
        };

    const addField = () => {
        setFields([...fields, '']); // Добавляем пустое значение в массив полей
    };

    const handleFieldChange = (index, value) => {
        const newFields = [...fields];
        newFields[index] = value;
        setFields(newFields);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Заполните необходимое описание</h2>
           <div><input type="text" name="title" placeholder="Название*" {...register("title",{
           required: "Поле обязательно к заполнению"})
           } /></div>
            <div><input type="text" name="description" placeholder="Описание*" {...register("description",{
                required: "Поле обязательно к заполнению"})
            }/></div>
            <div><input type="text" name="price" placeholder="Цена*" {...register("price",{
                required: "Поле обязательно к заполнению"})
            }/></div>
            <div>
                <input type="file" ref={fileInputRef} name="photo" required />
            </div>
            <div><input type="text" name="contact" placeholder="Контакты*" {...register("contact",{
                required: "Поле обязательно к заполнению"})
            } /></div>
            <div>
                <button type="button" onClick={toggleAdditionalInputs}>Указать технические характеристики</button>
                {isAdditionalInputsVisible && (
                    <div>
                        <div><input type="text" name="marka" placeholder="Марка*" {...register("marka", {
                            required: "Поле обязательно к заполнению"
                        })} /></div>
                        <div><input type="text" name="model" placeholder="Модель*" {...register("model", {
                            required: "Поле обязательно к заполнению"
                        })} /></div>
                        <div><input type="text" name="year" placeholder="Год выпуска*" {...register("year", {
                            required: "Поле обязательно к заполнению"
                        })} /></div>
                        <div><input type="text" name="kuzov" placeholder="Кузов*" {...register("kuzov", {
                            required: "Поле обязательно к заполнению"
                        })} /></div>
                        <div><input type="text" name="probeg" placeholder="Пробег*" {...register("probeg", {
                            required: "Поле обязательно к заполнению"
                        })} /></div>
                    </div>
                )}
            </div>

            <div>
                <h2>Дополнительные опции</h2>
                {fields.map((field, index) => (
                    <div>
                    <input
                        key={index}
                        value={fields[index]}
                        {...register(`option[${index}]`)}
                        onChange={(e) => handleFieldChange(index, e.target.value)}
                    />
                        </div>
                ))}



                <button type="button" onClick={addField}>Добавить поле</button>
            </div>


            <button type="submit" disabled={isValid}>Создать</button>

        </form>
    );
};

export default CarListingForm;
