import React,{createContext, useEffect, useState} from 'react';

export const Context = createContext();

export const Data = ({ children }) => {
    //Shopping Cart (NavBar) • Quantity
    const [counter, setCounter] = useState(0);

    //Shopping Cart • Add products to my cart (Array)
    const [cartProducts, setCartProducts] = useState([]);

    //Shopping Cart • Total Price #TP01
    const [totalPrice, setTotalPrice] = useState(0);

    //My Order • Current Order
    const [order, setOrder] = useState([]);

    //Get Products • From API Call #GP00
    const [products, setProducts] = useState(null);

    //Filtered Products • #FI04
    const [filteredProducts, setFilteredProducts] = useState(null);
    //Search by Title • Input from /Home #SE02
    const [searchByTitle, setSearchByTitle] = useState(null);
    //Search by Category • #SE05
    const [searchByCategory, setSearchByCategory] = useState(null);

    

    /* ***************** Functions ***************** */
    // Shopping Cart • Calculate total price #TP01
    useEffect(() => {
        const totalCartPrice = cartProducts.reduce((acc, product) => {
            const itemPrice = product.price * product.quantity;
            return acc + itemPrice;
        }, 0);
        
        setTotalPrice(totalCartPrice);
        //console.log(totalCartPrice);
    }, [cartProducts]);

    //Get Products • From API Call #GP00
    useEffect(() =>{
        fetch('https://fakestoreapi.com/products')
        .then(res=>res.json())
        .then(json=>{
            //console.log(json)
            setProducts(json)
        })
    },[]);

    //Filtered Products by Title fn • #FI04 #SE02
    const filteredProductsByTitle = (products, searchByTitle) => {
        return products?.filter(prod => prod.title.toLowerCase().includes(searchByTitle.toLowerCase()));
    }

    //Filtered Products by Category fn • #FI04 #SE05
    const filteredProductsByCategory = (products, searchByCategory) => {
        return products?.filter(prod => prod.category.toLowerCase().includes(searchByCategory.toLowerCase()));
    }

    //filterBy #FI04 #SE02 #SE05
    const filterBy = (type, products, searchByTitle, ) => {
        if(type === 'BY_TITLE'){
            return filteredProductsByTitle(products, searchByTitle);
        }
        if(type === 'BY_CATEGORY'){
            return filteredProductsByCategory(products, searchByCategory);
        }
        //Para filtrar por ambos, primero se hace por category y después se añade un .filter
        if(type === 'BY_TITLE_AND_CATEGORY'){
            return filteredProductsByCategory(products, searchByCategory)
                .filter(prod => prod.title.toLowerCase().includes(searchByTitle.toLowerCase()));
        }
        if(!type){
            return products;
        }
    }

    // Filtered by ... #FI04 #SE02 #SE05
    useEffect(() =>{ 
        if (searchByTitle && !searchByCategory) {
            setFilteredProducts(filterBy('BY_TITLE', products, searchByTitle, searchByCategory));
        }
        if (searchByCategory && !searchByTitle) {
            setFilteredProducts(filterBy('BY_CATEGORY', products, searchByTitle, searchByCategory));
        }
        if (searchByCategory && searchByTitle) {
            setFilteredProducts(filterBy('BY_TITLE_AND_CATEGORY', products, searchByTitle, searchByCategory));
        }
        if (!searchByCategory && !searchByTitle) {
            setFilteredProducts(filterBy(null, products, searchByTitle, searchByCategory));
        }
    },[products, searchByTitle, searchByCategory]);
    

    /* ********************************** */
    //Shopping Cart • Functions to add, remove, +qty or -qty from cart
    const addProductsToCart = (product) =>{
        //Buscar product en el cart: true/false
        const productExists = cartProducts.some(p => p.id === product.id);
        console.log('product exists: '+productExists);
    
        //Si el producto existe:
        if (productExists) {
            const productCart = cartProducts.find(p => p.id === product.id); // Busca el producto
            productCart.quantity += 1; // Cantidad = +1
        } else {
            product.quantity = 1; // Si no, crea la propiedad quantity = 1.
            setCartProducts([...cartProducts, product]);
        }
        setCounter(counter+1);
        closeProductDetail();
        openCheckoutSM();
    }

    const removeFromCart = (productId) => {
        //update cart navbar
        const productItem = cartProducts.filter((item) => item.id === productId);
        //console.log('Remove from cart: ', productItem[0]);
        setCounter(counter - productItem[0].quantity);

        //remove
        const updatedCartProducts = cartProducts.filter((item) => item.id !== productId);
        setCartProducts(updatedCartProducts);
    };

    const quantityAdd = (productId) => {
        const updatedCartProducts = cartProducts.map((item) => {
            if (item.id === productId && item.quantity < 10) {
                setCounter(counter+1); //cart navbar icon update
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
            });
            setCartProducts(updatedCartProducts);
    }
        
    const quantitySubtract = (productId) => {
        const updatedCartProducts = cartProducts.map((item) => {
        if (item.id === productId && item.quantity > 1) {
            setCounter(counter-1); //cart navbar icon update
            return { ...item, quantity: item.quantity - 1 };
        }
        return item;
        });
        setCartProducts(updatedCartProducts);
    }

    /* ********************************** */
    //Checkout Side Menu • Open/Close
    const [isCheckoutSMOpen, setIsCheckoutSMOpen] = useState(false);
    const openCheckoutSM = () => setIsCheckoutSMOpen(true);
    const closeCheckoutSM = () => setIsCheckoutSMOpen(false);

    //Product Detail • Open/Close
    const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
    const openProductDetail = () => setIsProductDetailOpen(true);
    const closeProductDetail = () => setIsProductDetailOpen(false);

    //Product Detail • Fill/Show Content
    const [productToShow, setProductToShow] = useState({});

    //console logs
    useEffect(() => {
        console.log('product to show*', productToShow);
    }, [productToShow]);
    useEffect(() => {
        //console.log('orders*', order);
    }, [order]);
    useEffect(() => {
        //console.log('my cart*', cartProducts);
    }, [cartProducts]);
    useEffect(() => {
        //console.log('search by title*', searchByTitle);
    }, [searchByTitle]);
    useEffect(() => {
        //console.log('search by category*', searchByCategory);
    }, [searchByCategory]);
    useEffect(() => {
        console.log('filtered products*', filteredProducts);
    }, [filteredProducts]);


    return (
        <Context.Provider value={{
            counter, setCounter,
            openProductDetail, closeProductDetail, isProductDetailOpen,
            productToShow, setProductToShow,
            cartProducts, setCartProducts, totalPrice, addProductsToCart, removeFromCart, quantityAdd, quantitySubtract,
            isCheckoutSMOpen, setIsCheckoutSMOpen, openCheckoutSM, closeCheckoutSM,
            order, setOrder,
            products, setProducts,
            searchByTitle, setSearchByTitle,
            searchByCategory, setSearchByCategory,
            filteredProducts, setFilteredProducts,

        }}>
            { children }
        </Context.Provider>
    )
}