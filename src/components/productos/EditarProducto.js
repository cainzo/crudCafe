import React, {useState, useEffect, useRef} from 'react';
import { Form, Modal, Button, Container } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import { campoRequerido, rangoNumero } from "../validaciones/helpers";
import Swal from "sweetalert2";




const EditarProducto = (props) => {
  const {id} = useParams();
  const [producto, setProducto] = useState({});
  const [categoria, setCategoria] = useState('');
  const URL = process.env.REACT_APP_API_URL + "/"+ id;
  const nombreProductoRef = useRef('');
  const precioProductoRef = useRef(0);

  useEffect(async()=>{
    //consutal a la api por el prodcuto que tiene el id que guardamos en la dir
    try{
      const repuesta = await fetch(URL);
      if(repuesta.status === 200){
        const dato = await repuesta.json();
        setProducto(dato);
        setCategoria(dato.categoria);
      }else{

      }
      
    }catch(error){
      console.error();
    }
  }, []);

  const handleSubmit = async(e) =>{
    e.preventDefault();
    //validar los campes
    //console.log(nombreProductoRef);
    //console.log(nombreProductoRef.current.value);
    if(campoRequerido(nombreProductoRef.current.value) && rangoNumero(precioProductoRef.current.value) && campoRequerido(categoria)){
       //construir el objeto a enviar a la api
      
       try{
        const productoModificado = {
          nombreProducto: nombreProductoRef.current.value,
          precioProducto: precioProductoRef.current.value,
          categoria: categoria
        };
        const respuesta = await fetch(URL,{
          method: "PUT",
          headers: {"Content-Type" : "application/json"},
          body: JSON.stringify(productoModificado)
        })
        if(respuesta.status === 200){
          //cartel para el usuario
      Swal.fire(
        'Producto eliminado',
        'El producto fue eliminado de la base de datos',
        'success'
      )
      // volver a consultar api
       props.consultaAPI();
       }
        props.consultaApi();
       }catch(error){
         console.log(error)
       }

    }else{
      //si hay un error, notificarlo
    }
  };
  
    return (
        <Container>
        <h1 className='display-3 text-center my-4'>Editar Producto</h1>
        <hr />
      <Form className='my-5' onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Nombre del producto*</Form.Label>
          <Form.Control type="text" defaultValue={producto.nombreProducto} ref={nombreProductoRef}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Precio*</Form.Label>
          <Form.Control type="number" defaultValue={producto.precioProducto} ref={precioProductoRef}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox" >
          <Form.Label>Categoria*</Form.Label>
          <Form.Select value={categoria} onChange={(e)=>{setCategoria(e.target.value)}}>
            <option>Seleccione una opcion</option>
            <option value='bebida-caliente' >Bebida Caliente</option>
            <option value='bebida-fria'>Bebida Fria</option>
            <option value='sandwich'>Sandwich</option>
            <option value='dulce'>Dulce</option>
            <option value='salado'>Salado</option>
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit" className='w-100'>
          Guardar cambios
        </Button>
      </Form>
    </Container>
    );
};

export default EditarProducto;