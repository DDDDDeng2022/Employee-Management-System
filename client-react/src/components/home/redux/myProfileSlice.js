import { createSlice } from "@reduxjs/toolkit";

export const myProfileSlice = createSlice({
    name: 'myProfile',
    initialState: {
        profile: {
            nameSection: {
                lastName: "Deng",
                firstName: "Bei",
                photo: "https://m.media-amazon.com/images/I/71hDhuRKjqL._AC_SX679_.jpg",
                gender: "Female",
                email: "ddddd@gmail.com",
                SSN: "ssn1234",
                birth_date: "08-08-2008",

            },
            addressSection: {
                street: "aptA 20th St",
                city: "Los Angeles",
                state: "CA",
                zip: "900000",

            },
            contactSection: {
                cellPhoneNumber: "123456789",
                workPhoneNumber: "123456789",

            },
            visa: {
                title: "F1",
                start_date: '05-09-2021',
                end_date: '05-09-2029',
            },
            emergencySection: {
                lastName: "D",
                firstName: "B",
                phone: "098657265",
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