import React, {useContext} from 'react'
import {DataContext} from './DataProvider'
import {Link} from '@reach/router'

export default function Products() {
    const value = useContext(DataContext)//dohvat contexta
    const [products] = value.products//dohvacanje proizvoda iz context-a
    const addCart = value.addCart//funkcije addCart iz contexta

    return (
        <div className="products">
            {
                products.map(product =>(
                    <div className="card" key={product._id}>
                        <Link to={`/products/${product._id}`}>{/*stvara se link na detalje, mogucnost klika */}
                            <img src={product.images[0]} alt=""/>
                        </Link>
                        <div className="box">
                        <h3 title={product.title}>
                            <Link to={`/products/${product._id}`}>{product.title}</Link>
                        </h3>
                        <p>{product.description}</p>
                        <h4>${product.price}</h4>
                        <button onClick={() => addCart(product._id)}>
                            Add to cart
                        </button>
                        </div>
                    </div>
                ))
            }
          
          
        </div>
    )
}
