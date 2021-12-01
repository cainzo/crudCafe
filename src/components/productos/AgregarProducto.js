import React, {useState} from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { campoRequerido, rangoNumero } from "../validaciones/helpers";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AgregarProducto = (props) => {
  const [nombreProducto, setNombreProducto] = useState('');
  const [precioProducto, setPrecioProducto] = useState(0);
  const [categoria, setCategoria] = useState('');
  const [error , setError] = useState(null);
  const URL = process.env.REACT_APP_API_URL;
  const navigation = useNavigate();

  const handleSubmit = async(e) =>{
    e.preventDefault();
    //validar los datos del form
    if (campoRequerido(nombreProducto) && campoRequerido(categoria) && rangoNumero(precioProducto)){
      setError(false);
      //crear producto y guardarlo en api
      
      const productoNuevo = {
        nombreProducto,
        precioProducto,
        categoria
      }
      try{
        const parametros={
          method: "POST",
          headers:{
            "Content-Type": "application/json"
          },
          body: JSON.stringify(productoNuevo)
        }
        const repuesta = await fetch(URL, parametros);
        console.log(repuesta);
        if(repuesta.status === 201){
          console.log('El producto se cargo correctamene')
          Swal.fire(
            'Producto creado',
            'Su producto fue correctamente creado',
            'success'
          )
          //resetear el formulario
          e.target.reset();
          // volver a consultar api
          props.consultaAPI();
          //redireccionar a la pagina de mostrar productos
          navigation("/productos");
        }else{
          console.log('El producto no se cargo correctamene')
        }
      }catch(error){
        console.log(error);
      }
      
    }else{
      //si no se carga, se muetra cartel de error
      console.log('NO se creo el producto');
      setError(true);
    }

  }
  return (
    <Container>
      <h1 className="display-3 text-center my-4">Nuevo Producto</h1>
      <hr />
      <Form className="my-5" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Nombre del producto*</Form.Label>
          <Form.Control type="text" placeholder="Ej: café" onChange={(e)=>{setNombreProducto(e.target.value)}} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Precio*</Form.Label>
          <Form.Control type="number" placeholder="ej: 50" onChange={(e)=>{setPrecioProducto(e.target.value)}} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Label>Categoria*</Form.Label>
          <Form.Select onChange={(e)=>{setCategoria(e.target.value)}}>
            <option value=''>Seleccione una opcion</option>
            <option value='bebida-caliente'>Bebida Caliente</option>
            <option value='bebida-fria'>Bebida Fria</option>
            <option value='sandwich'>Sandwich</option>
            <option value='dulce'>Dulce</option>
            <option value='salado'>Salado</option>
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100">
          Guardar
        </Button>
      </Form>
      {error === true ?
      <Alert variant='danger'>
        Debe cargar todos los datos y el precio debe estar entre 1 y $4999.
      </Alert>
      : null}
    </Container>
  );
};

export default AgregarProducto;
