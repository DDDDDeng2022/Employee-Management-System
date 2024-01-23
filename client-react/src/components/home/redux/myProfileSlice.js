import { createSlice } from "@reduxjs/toolkit";

export const myProfileSlice = createSlice({
    name: 'myProfile',
    initialState: {
        // 格式可能会修改，可能nameSection和contactSection里的内容提出来，
        profile: {
            last_name: "Deng",
            first_name: "Bei",
            photo: "https://m.media-amazon.com/images/I/71hDhuRKjqL._AC_SX679_.jpg",
            gender: "female",
            email: "ddddd@gmail.com",
            ssn: "ssn1234",
            birth_date: "08-08-2008",
            cell_phone_number: "123456789",
            work_phone_number: "123456789",
            address: {
                street: "aptA 20th St",
                buiding: "Unit A",
                city: "Los Angeles",
                state: "CA",
                zip: "900000",

            },
            opt: {
                title: "f1",
                start_date: '05-09-2021',
                end_date: '05-09-2029',
            },
            emergency_contact: {
                last_name: "D",
                first_name: "B",
                phone_num: "098657265",
                email: "hhhh@gmail.com",
                relationship: "parents",
            },
            documentSection: null,
        }
    },
    reducers: {
        setMyProfile: (state, action) => {
            state.profile = action.payload;
        },
        setEditable: (state, action) => {
            const { sectionName, editable } = action.payload;
            state.profile[sectionName].editable = editable;
        },
    }
})
export const { setMyProfile, setEditable } = myProfileSlice.actions;

export default myProfileSlice.reducer;