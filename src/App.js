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
                    <div key={sale.id}>
                        <h2>{sale.title}</h2>
                        <h3>{sale.description}</h3>
                        <h3>{sale.price}</h3>
                        <h3>{sale.photo}</h3>
                        <h3>{sale.contact}</h3>
                        <h3>{sale.marka}</h3>
                        <h3>{sale.model}</h3>
                        <h3>{sale.year}</h3>
                        <h3>{sale.kuzov}</h3>
                        <h3>{sale.probeg}</h3>
                        {/* Для массива option */}
                        <div>Опции:</div>
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
