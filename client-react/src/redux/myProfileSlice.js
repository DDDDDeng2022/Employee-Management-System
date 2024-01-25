import { createSlice } from "@reduxjs/toolkit";

export const myProfileSlice = createSlice({
    name: "myProfile",
    initialState: {
        // 格式可能会修改，可能nameSection和contactSection里的内容提出来，
        profile: {},
    },
    reducers: {
        setMyProfile: (state, action) => {
            state.profile = action.payload;
        },
        setEditable: (state, action) => {
            const { sectionName, editable } = action.payload;
            state.profile[sectionName].editable = editable;
        },
    },
});
export const { setMyProfile, setEditable } = myProfileSlice.actions;

export default myProfileSlice.reducer;
