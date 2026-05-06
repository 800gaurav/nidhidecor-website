import React, { useContext } from 'react'
import { cartCont } from '../context/CartContext'

const useCart = () => {
    const cartcontext = useContext(cartCont)
    if (!cartcontext) {
        throw new Error("useCart must be used within a CartContextProvider")
    }
    return cartcontext
}

export default useCart
