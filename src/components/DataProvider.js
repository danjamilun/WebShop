import React, {createContext, useState, useEffect} from 'react'

export const DataContext = createContext();//kreira se context

export const DataProvider = (props) => {
    const [products, setProducts] = useState([])
    //
    useEffect(() =>{
        const options = {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
        };
        fetch("http://localhost:3000/api/products",options)
        .then((response)=>response.json())
        .then((products)=>setProducts(products));
    },[]);
    //console.log(products)



    const [cart, setCart] = useState([])//state, po tipu niz

    const addCart = (id) =>{//arrow funkcija
        const check = cart.every(item =>{//provjera za svaki item, check sadrži true ili false izraz, odnosno boolean vrijednost
            return item._id !== id //vratit ce true ako taj id ne postoji u cart-u, vratit ce false ako postoji(odnosno pritrazit cili cart i ako ne postoji taj id vratit true)
        })
        if(check){//ako je check true, proizvod sa tim id-om nije na kartici
            const data = products.filter(product =>{
                /*filter zadrzava tu vrijednost ako je provjera u returnu-u vratila true, tu provjeru radi za svaki element */
                return product._id === id//vrati true ako se nade odgovarajuci id, sa istom vrijednošću i tipom podatka
            })
            setCart([...cart, ...data])//izraz ...nesto predstavlja Spread syntax, moguce vise argumenata, elemenata
        }else{//ako je check false
            alert("The product has been added to cart.")
        }
    }

    useEffect(() =>{
       const dataCart =  JSON.parse(localStorage.getItem('dataCart'))//dohvati tog naziva
       if(dataCart) setCart(dataCart)//ako je dohvaceno odnosno true postavi podatke sa lokalne memorije o kartici na karticu
    },[])

    useEffect(() =>{ //za karticu se kreira lokalna memorija
        localStorage.setItem('dataCart', JSON.stringify(cart))
    },[cart])


    const value = {//spremanje sve u jedan objekt
        products: [products, setProducts],
        cart: [cart, setCart],
        addCart: addCart
    }

    
    return (
        <DataContext.Provider value={value}>
            {props.children}
        </DataContext.Provider>
    )
}
