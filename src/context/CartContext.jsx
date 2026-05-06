
import { useEffect, useState } from 'react';
import React, { createContext } from 'react'
import useAxios from '../utils/useAxios';
import { useAuth } from './AuthContext';

const getLocalStorage = () => {
    const cartData = localStorage.getItem('dhantagCart');
    if (cartData) {
        return JSON.parse(cartData)
    }
    localStorage.setItem('dhantagCart', JSON.stringify({}));
    return {}


}


export const cartCont = createContext(null);
export const CartContextProvider = ({ children }) => {

    const { fetchData } = useAxios()
    const { isLoggedIn } = useAuth()
    const [cart, setCart] = useState(getLocalStorage());
    console.log(cart)

    useEffect(() => {
        localStorage.setItem('dhantagCart', JSON.stringify(cart));
    }, [cart]);

    // const addToCart = (product, quantity) => {
    //     console.log(product)
    //     const cartItems = { ...cart }
    //     const isAvailable = cartItems[product._id]
    //     if (isAvailable) {
    //         cartItems[product._id] = quantity
    //     } else {
    //         cartItems[product._id] = quantity || 1

    //     }
    //     setCart(cartItems)
    // };

    const addToCart = (product, quantity) => {
        // Purana cart hatao, naya item-only cart banao
        const newCart = {};

        newCart[product._id] = quantity || 1;

        setCart(newCart);
    };

   const addToCartApi = async () => {

    if (!cart) return;

    const cartKeys = Object.keys(cart);  // 👈 renamed
    const cartId = cartKeys.length ? cartKeys[0] : null;

    if (!cartId) return;

    const res = await fetchData({
        url: '/api/v1/user/cart/add',
        method: 'POST',
        data: {
            productId: cartId
        }
    });

    if (res.success) {
        clearCart();
    }
};


    useEffect(() => {
        console.log('herer')
        if (isLoggedIn) {
            console.log('logged')
            addToCartApi()
        }else{
            clearCart()
        }
    }, [isLoggedIn])


    const removeFromCart = (productId) => {
        const cartItems = { ...cart }

        delete cartItems[productId]
        setCart(cartItems)
    };

    const clearCart = () => {

        setCart({});
        localStorage.setItem('dhantagCart', JSON.stringify({}));
    };



    return (
        <cartCont.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </cartCont.Provider>
    );
};




