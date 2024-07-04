import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ListingPage from './pages/ListingPage';
import DoctorPage from './pages/DoctorProfilePage';
import LoginPage from './pages/LoginPage';
function App() {
  return (
    <div className="">
      <Header/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/search/speaciality/:spec_name' element={<ListingPage/>}/>
        <Route path='/search/doctor/:id' element={<DoctorPage/>}/>
      </Routes>
     

    </div>
  );
}

export default App;
