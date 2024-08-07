import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import ListingPage from "./pages/ListingPage";
import DoctorPage from "./pages/DoctorProfilePage";
import LoginPage from "./pages/LoginPage";
import SlotPage from "./pages/SlotPage";
import PaymentSummaryPage from "./pages/PaymentSummaryPage";
import AppointmentConfirmation from "./pages/AppointmentConfirmation";
function App() {
  return (
    <div className="">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/search/speaciality/:spec_name/:location"
          element={<ListingPage />}
        />
        <Route path="/search/doctor/:id" element={<DoctorPage />} />
        <Route path="/doctor/slot/:doc_id" element={<SlotPage />} />
        <Route path="/slot/:slot_time/payment-summary" element={<PaymentSummaryPage />} />
        <Route path="/appointment-confirmation" element={<AppointmentConfirmation/>}/>
      </Routes>
    </div>
  );
}

export default App;
