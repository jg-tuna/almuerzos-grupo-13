// Importación dependencias
import reportWebVitals from "./reportWebVitals";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faMagnifyingGlass, faBell } from "@fortawesome/free-solid-svg-icons";

// Importación componentes

import App from "./App";
import LandingPage from "./routes/LandingPage";
import RestaurantDetails from "./routes/RestaurantDetails";
import Login from "./routes/login/Login";
import Register from "./routes/login/Register";
import AdminLocals from "./routes/admin/Locals";
import AdminUsers from "./routes/admin/Users";
import NewRestaurant from "./routes/NewRestaurant";
import EditRestaurant from "./routes/EditRestaurant";
import NewFood from './routes/NewFood';
import EditFood from './routes/EditFood';
import NewReview from './routes/NewReview';
import EditReview from './routes/EditReview';

// Importación de AuthProvider
import AuthContextProvider from "./contexts/AuthContext";


// Importación "otros"
import "./index.css";

library.add(fab, faMagnifyingGlass, faBell);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<LandingPage />} />
            <Route path="/local/:id" element={<RestaurantDetails />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="/admin/locals" element={<AdminLocals />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/restaurants/new" element={<NewRestaurant />} />
            <Route path="/restaurants/edit/:id" element={<EditRestaurant />} />
            <Route path='/restaurants/:id/newfood' element={<NewFood/>} />
            <Route path='/foods/edit/:id' element={<EditFood/>} />
            <Route path='/restaurants/:id/newreview' element={<NewReview/>} />
            <Route path='/reviews/:id' element={<EditReview/>} />
          </Route>
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
