import './App.css';
import { Outlet } from "react-router-dom";
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import useAuth from './hooks/useAuth';

function App() {
  const { currentUser, handleUserLogin, handleUserLogout } = useAuth();  

  return (
    <div className="bg-white">
      <NavBar currentUser={currentUser} handleUserLogout={handleUserLogout} />
      <main className='relative'>
        <Outlet context={[currentUser, handleUserLogin, handleUserLogout]}/>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
