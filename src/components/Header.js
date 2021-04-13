import React, {useState, useContext} from 'react'
import Menu from './svg/bars-solid.svg'
import Close from './svg/times-solid.svg'
import Cart from './svg/cart.svg'
import {Link} from '@reach/router'
import {DataContext} from './DataProvider'
import Logout from './Logout'

export default function Header() {
    const [menu, setMenu] = useState(false)
    const value = useContext(DataContext)
    const [cart] = value.cart

    const toggleMenu = () =>{
        setMenu(!menu) //menu=true
    }

    const styleMenu = {
        left: menu ? 0 : "-100%"
    }

    return (//definicija zaglavlja
        <header>
            <div className="menu" onClick={toggleMenu}>
                <img src={Menu} alt="" width="30" />
            </div>

            <div className="logo">
                <h1><Link to="/products">Chocolate Products</Link></h1>
            </div>
            <ul style={styleMenu}>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/products">Products</Link></li>
                  
                 <li><Link to="/contact">Contact</Link></li> 
                 <li><Link to="/login">Login</Link></li> 
                 <li><Link to="/register">Registriraj se</Link></li>
                 <button onClick={Logout}>Logout</button>
                <li onClick={toggleMenu}>
                    <img src={Close} alt="" width="30" className="menu" />
                </li>
            </ul>

            <div className="cart-icon">
                <span>{cart.length}</span>
                <Link to="/cart">
                    Cart
                </Link>
            </div>
            
      </header>
    )
}
