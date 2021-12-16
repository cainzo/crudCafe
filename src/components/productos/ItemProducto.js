import React from "react";
import { ListGroup, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const ItemProducto = (props) => {
  const URL = process.env.REACT_APP_API_URL + '/'+ props.producto.id;
  
  function eliminarProducto(){
    console.log(URL);
    Swal.fire({
      title: 'Esta seguro de eliminar el producto?',
      text: "Una vez borrado el producto no puede ser recuperado",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar',
      cancelButtonText: 'Cancelar'
    }).then(async(result) => {
      if (result.isConfirmed) {
        //borro el producto
        try{
          const repuesta = await fetch(URL, {
            method: "DELETE",
            headers:{
              "Content-Type": "application/json"
            }
          });
          console.log(repuesta);
          if(repuesta.status === 200){
            //cartel para el usuario
        Swal.fire(
          'Producto eliminado',
          'El producto fue eliminado de la base de datos',
          'success'
        )
        // volver a consultar api
        props.consultaAPI();
          }
        }catch(error){
          console.log(error);
        }
      }
    })
  }
  return (
    <ListGroup.Item className="d-flex justify-content-between">
      <p>
        {props.producto.nombreProducto }
        <span className="fw-bolder">- Precio:$ {props.producto.precioProducto}</span>
      </p>
      <div>
      <Link className="btn btn-warning me-2" to={`/productos/editar/${props.producto.id}`}>Editar</Link>
        <Button variant="danger" onClick={()=> eliminarProducto()}>Borrar</Button>
      </div>
    </ListGroup.Item>
  );
};

export default ItemProducto;
