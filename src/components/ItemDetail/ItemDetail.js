import Counter from "../Counter/Counter"
import "./ItemDetail.css"
import {useState} from "react"
import { useContext } from "react"
import Contexto from "../../ContextoCarrito/ContextoCarrito"
import {Link} from "react-router-dom"

const ItemDetail = ({name, imagen, descripcion, stock, id, precio}) => {
    const [count, setCount] = useState(0)


    const { agregarItem, buscarCantidadProd} = useContext(Contexto)

    const sumaCarro = (cantidad) => {
        
        setCount (cantidad)
        const productoAgregar =  {
            id, name, precio, cantidad, imagen
        }
        agregarItem(productoAgregar) 
    }

    const definirCantidad = buscarCantidadProd(id)

    const montoParcial = precio * definirCantidad
   


    return(
        <>
        <div className="zoomup card-image "><img src={imagen} alt={imagen}/>
        <h1><span className="card-title">{name}</span></h1>
        </div>
        <div className="content">
        <blockquote>{descripcion}</blockquote>
        <h6>Importe: <b>${precio}</b>  Disp: <b>{stock}</b></h6>
        <h5>Agreegadas al Carrito: <b>{!definirCantidad ? 0 : definirCantidad}</b> Monto: ${!montoParcial ? 0 : montoParcial}</h5>
        {count === 0 ? 
            <Counter stock={stock} key={id} agregar={sumaCarro} initial={definirCantidad} />
            : <>  <Counter stock={stock} key={id} agregar={sumaCarro} initial={definirCantidad} /> <h4>  <span className="btn-floating btn-large purple pulse"><Link to="/Carrito"><i className="large material-icons">shopping_basket</i></Link></span><br></br> Terminar Compra </h4> </>
        }
        </div>
        </>
    )
}

export default ItemDetail