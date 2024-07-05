import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  doctor: localStorage.getItem("doctor")
    ? JSON.parse(localStorage.getItem("doctor"))
    : null,
  doctor_specialities: localStorage.getItem("specialities")
    ? JSON.parse(localStorage.getItem("specialities"))
    : null,
  doctor_clinics: localStorage.getItem("clinics")
    ? JSON.parse(localStorage.getItem("clinics"))
    : null,
};

const doctorSlice = createSlice({
  name: "doctor",
  initialState: initialState,
  reducers: {
    setDoctor(state, value) {
      state.doctor = value.payload;
    },
    setDoctorSpecialities(state, value) {
      state.doctor_specialities = value.payload;
    },
    setDoctorClinics(state, value) {
      state.doctor_clinics = value.payload;
    },
  },
});

export const { setDoctor, setDoctorSpecialities, setDoctorClinics } = doctorSlice.actions;

export default doctorSlice.reducer;
