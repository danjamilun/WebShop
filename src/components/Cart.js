import React,{useContext, useState, useEffect} from 'react'
import {DataContext} from './DataProvider'
import Colors from './Colors'
import Sizes from './Sizes'
import {Link} from '@reach/router'

export default function Cart() {
    const value = useContext(DataContext)//pozvat context
    const [cart, setCart] = value.cart;
    const [total, setTotal] = useState(0)//definiran state sa defaultnom vrijednoscu 0


    //update-anje DOM-a
    useEffect(() =>{ //ovo se stavlja pod useEffect jer kada react rendera nasu komponentu, pamtit ce se effect koji smo koristili i update-at DOM-a
        const getTotal = () => {
            const res = cart.reduce((prev, item) => {// spremamo u prev(predstavlja akumulator) te nadodajemo novu vrijednost na prev
                return prev + (item.price * item.count)//dodavanje na prethodnika odnosno na akumulator
            },0)
            setTotal(res)//postavi res koji je definiran u arrow funkciji
        }
        getTotal()//vracanje funkcije
    },[cart])//drugi argument je niz koji sadrži dependency za usporedbu

    const reduction = id => { //smanjenje count-a, šaljemo id proizvoda kojeg želimo smanjiti
        cart.forEach(item =>{//prolazimo se loop petljon kroz sve iteme(proizvode) te trazimo odgovarajući i povecavamo count bez da ista vracamo !!
            if(item._id === id){//ako je ovo true, tjtrazi dok ne naides na true
                item.count === 1 ? item.count = 1 : item.count -= 1;//provjera izraza, ako je true(count je 1) onda ne smanjuj,a inače smanji
            }
        })
        setCart([...cart])//ponovno postavi promjenu na kartici
    }
    const increase = id => {
        cart.forEach(item =>{
            if(item._id === id){
                item.count += 1 ;
            }
        })
        setCart([...cart])
    }

    //funkcija  za brisanje proizvoda iz box-a 
    const removeProduct = id => { //klikom na x se poziva ova funkcija
        if(window.confirm("Do you want to delete this product?")){ //da li je na prozoru prikazano ovaj tekst
            cart.forEach((item, index) => {
                if(item._id === id){
                    cart.splice(index, 1)
                }
            })
            setCart([...cart])
        }
    }
    

    if(cart.length === 0)
        return <h2 style={{textAlign: "center", fontSize: "5rem"}}>Cart Empty</h2>

    return (
        <>
           {
               cart.map(product =>(//za svki proizvod u kartici 
                   <div className="details cart" key={product._id}>
                       <div className="img-container" 
                       style={{backgroundImage: `url(${product.images[0]})`}} />{/*slika */}

                       <div className="box-details">{/*box sa detaljima */}
                           <h2 title={product.title}>{product.title}</h2>
                           <h3>${product.price}</h3>
                           {/* <Colors colors={product.colors} /> */}
                           {/* <Sizes sizes={product.sizes} /> */}
                           <p>{product.description}</p>
                           <p>{product.content}</p>
                           
                           <div className="amount">{/*botuni za smanjenje, povecanje i brisanje proizvoda */}
                               <button className="count" onClick={() => reduction(product._id)}> - </button>
                               <span>{product.count}</span>
                               <button className="count" onClick={() => increase(product._id)}> + </button>
                           </div>

                           <div className="delete" onClick={() => removeProduct(product._id)}>X</div>
                       </div>

                   </div>
               ))
           }

           <div className="total">
               <Link to="/payment">Payment</Link>{/*kao navigacija,klikom na to idemo u /payment */}
               <h3>Total: $ {total}</h3>
           </div>
        </>
    )
}
