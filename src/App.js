import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inicio from "./components/pages/Inicio";
import "bootstrap/dist/css/bootstrap.min.css";
import ListaProductos from "./components/productos/ListaProductos";
import AgregarProducto from "./components/productos/AgregarProducto";
import EditarProducto from "./components/productos/EditarProducto";
import Navigation from "./components/common/Navigation";
import Footer from "./components/common/Footer";
import Error404 from "./components/pages/Error404";
import { useState, useEffect } from "react";

function App() {
  //declarar variables
  const URL = process.env.REACT_APP_API_URL;
  //console.log(URL);
  const [productos, setProductos] = useState([]);
  

  useEffect(() => {
    consultaAPI();
  }, []);

  const consultaAPI = async () => {
    try {
      const respuesta = await fetch(URL);
      const datos = await respuesta.json();
      //console.log(datos);
      setProductos(datos);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Inicio></Inicio>}></Route>
        <Route
          path="/productos"
          element={<ListaProductos productos={productos} consultaAPI={consultaAPI}></ListaProductos>}
        ></Route>
        <Route
          path="/productos/nuevo"
          element={<AgregarProducto consultaAPI={consultaAPI}></AgregarProducto>}
        ></Route>
        <Route
          path="/productos/editar/:id"
          element={<EditarProducto consultaAPI={consultaAPI}></EditarProducto>}
        ></Route>
        <Route path="*" element={<Error404></Error404>}></Route>
      </Routes>
      <Footer>
        
      </Footer>
    </Router>
  );
}

export default App;
