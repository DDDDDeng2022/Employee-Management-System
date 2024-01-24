import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
    name: "user",
    initialState: {
        user_id: "",
        user_name: "",
        role: "",
        personal_info: "",
    },
    reducers: {
        setUser: (state, action) => {
            state.user_id = action.payload.id;
            state.user_name = action.payload.username;
            state.role = action.payload.role.name;
            state.personal_info = action.payload.personal_info;
        },
        resetUser: (state) => {
            return {
                user_id: "",
                user_name: "",
                role: "",
                personal_info: "",
            };
        },
    },
});

export const { setUser, resetUser } = UserSlice.actions;

export default UserSlice.reducer;
