import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";


export const fetchUserData = createAsyncThunk(
    'cars/fetchCars',
    async (userId, {rejectWithValue}) => {
        try {
            const response = await fetch(`http://localhost:4000/sale`);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            return data;
        } catch (error) {
            // В случае ошибки можно использовать `rejectWithValue`, чтобы передать кастомную ошибку
            return rejectWithValue(error.message);
        }
    }
);
export const updateUser = createAsyncThunk(
    'cars/updateCar', // Исправьте на подходящее для вашего приложения название
    async ({id, ...data}, {rejectWithValue}) => {
        try {
            const response = await fetch(`http://localhost:4000/sale/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json(); // Возвращает обновленные данные
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


export const deleteUserData = createAsyncThunk(
    'cars/deleteCars',
    async (id, {dispatch, getState, rejectWithValue}) => {
        try {
            const response = await fetch(`http://localhost:4000/sale/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Network response was not ok');
            dispatch(deleteUser(id)); // Предполагая, что у вас есть такой action creator
            return id;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const userSlice = createSlice({
    name: "users",
    initialState: {value: [], loading: false, error: null},
    reducers: {
        addUser: (state, action) => {
            state.value.push(action.payload);
        },

        deleteUser: (state, action) => {
            state.value = state.value.filter((user) => user.id !== action.payload.id);

        },


    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.loading = false;
                state.value = action.payload;
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteUserData.fulfilled, (state, action) => {
                state.loading = false;
                state.value = state.value.filter((user) => user.id !== action.payload);
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                const index = state.value.findIndex((user) => user.id === action.payload.id);
                if (index !== -1) {
                    state.value[index] = action.payload;
                }
            });

    },
});

export const {addUser, deleteUser} = userSlice.actions;
export default userSlice.reducer;