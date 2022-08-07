import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";

export const getData = createAsyncThunk('tours/getData', 
    async (_,thunkAPI) => {
        try {
            const res = await fetch('https://api.jsonbin.io/v3/b/62efe522a1610e6386f2d6cd')
            const Data = await res.json();
            return Data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
})

export const removeData = createAsyncThunk('tours/removeData',
    async (id,thunkAPI) => {
        try {
            await fetch(`https://api.jsonbin.io/v3/b/62efe522a1610e6386f2d6cd/${id}` , {
                method: "DELETE",
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            })
            return id;
        } catch (error) {
            thunkAPI.rejectWithValue(error)
        }
    })

const initialState = {tours: [] , isLoading: false , isError: null}
const ToursSlice = createSlice({
    name: 'tours',
    initialState: initialState,
    extraReducers: {
        [getData.pending]: (state,action) => {
            state.isLoading = true
        },
        [getData.fulfilled]: (state,action) => {
            state.isLoading = false
            state.tours = action.payload.record.Tours
        },
        [getData.rejected]: (state,action) => {
            state.isLoading = false
            state.isError = action
        },

        // ------------ Delete an item from the server ------------

        [removeData.pending]: (state,action) => {
            state.isLoading = true
        },
        [removeData.fulfilled]: (state,action) => {
            state.isLoading = false
            state.tours = state.tours.filter(i => i.id !== action.patload)
        },
        [removeData.rejected]: (state,action) => {
            state.isLoading = false
        },
    },
    reducers: {
        // ------------ Delete an item from the state ------------
        remove: (state,action) => {
            state.tours = state.tours.filter(({id}) => id !== action.payload)
        }
    }
})
export default ToursSlice.reducer;
export const {remove} = ToursSlice.actions