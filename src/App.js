import "./App.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserData, deleteUserData, updateUser } from "./redux/slices/carsSlice";
import CarListingForm from "./CarListingForm";
import Modal from "./modalEditForm";

function App() {
    const dispatch = useDispatch();
    const userList = useSelector((state) => state.users.value);

    // Добавьте состояния для модального окна и редактируемых данных
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentSale, setCurrentSale] = useState(null);


    // Функция для открытия модального окна с данными объявления
    const handleEditClick = (sale) => {
        setCurrentSale(sale);
        setIsModalOpen(true);
    };

    useEffect(() => {
        dispatch(fetchUserData());
    }, [dispatch]);

    return (
        <div className="App">
            <CarListingForm/>
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                data={currentSale}
                onSave={(updatedData) => {
                    dispatch(updateUser({ id: currentSale.id, ...updatedData }));
                    setIsModalOpen(false);
                }}
            />
            <div className="displayUsers">
                {userList.map((sale) => (
                    <div className="sale-card" key={sale.id}>
                        <h2>{sale.title}</h2>
                        <h3>Описнаие: {sale.description}</h3>
                        <h3>Цена: {sale.price}</h3>
                        <h3>Фото: {sale.photo}</h3>
                        <h3>Контакт: {sale.contact}</h3>
                        <h3>{sale.marka ? `Марка: ${sale.marka}` : ""}</h3>
                        <h3>{sale.model ? `Модель: ${sale.model}`: ""}</h3>
                        <h3>{sale.year ? `Год выпуска: ${sale.year}` : ""}</h3>
                        <h3>{sale.kuzov ? `Тип кузова: ${sale.kuzov}` : ""}</h3>
                        <h3>{sale.probeg ? `Пробег: ${sale.probeg}` : ""}</h3>
                        {/* Для массива option */}
                        <div>{sale.option ? `Опции:` : ""}</div>
                        {sale.option && sale.option.map((opt, index) => (
                            <div key={index}>{opt}</div> // Убедитесь, что опции могут быть уникально идентифицированы, если index не уникален
                        ))}
                        {/* Кнопки управления */}
                        <button onClick={() => dispatch(deleteUserData(sale.id))}>
                            Удалить объявление
                        </button>
                        <button onClick={() => handleEditClick(sale)}>Редактировать</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
