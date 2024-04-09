import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const Modal = ({ isOpen, onClose, data, onSave }) => {
    const { register, handleSubmit, reset, control } = useForm();

    useEffect(() => {
        if (data) {
            reset(data); // Инициализирует форму данными из `data`
        }
    }, [data, reset]);

    const onSubmit = (formData) => {
        onSave(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="modal">
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register("title")} placeholder="Название" />
                <input {...register("description")} placeholder="Описание" />
                <input {...register("price")} placeholder="Цена" />
                <input {...register("photo")} placeholder="Фото" />
                <input {...register("contact")} placeholder="Контакты" />
                <input {...register("marka")} placeholder="Марка" />
                <input {...register("model")} placeholder="Модель" />
                <input {...register("year")} placeholder="Год выпуска" />
                <input {...register("kuzov")} placeholder="Кузов" />
                <input {...register("probeg")} placeholder="Пробег" />
                {/* Для полей массива `option` */}
                {data && data.option && data.option.map((opt, index) => (
                    <input
                        key={index}
                        defaultValue={opt} // Устанавливаем значение по умолчанию для каждого элемента массива
                        {...register(`option[${index}]`)}
                        placeholder="Опция"
                    />
                ))}
                <button type="button" onClick={onClose}>Закрыть</button>
                <button type="submit">Сохранить</button>
            </form>
        </div>
    );
};

export default Modal;
