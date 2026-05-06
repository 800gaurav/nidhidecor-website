import { useState } from 'react'
import useAxios from '../utils/useAxios'

const useApi = () => {
  const { data, loading, error, fetchData } = useAxios()
  const [products, setProducts] = useState([])
  const [myOrders, setMyOrders] = useState([])

  const getAllProducts = async () => {
    try {
      const res = await fetchData({
        url: `/api/v1/admin/product/get-all`,
      })
      if (res?.success) {
        setProducts(res.data || [])
      }
    } catch (error) {
      console.error("Error fetching products:", error)
    }
  }
  
  const getMyOrder = async (status)=>{
    try {
        
      const res = await fetchData({
        url: `/api/v1/user/order/get-all?${status ? `status=${status}`:""}`,
      })
      if (res?.success) {
        setMyOrders(res.data || [])
      }
    } catch (error) {
      console.error("Error fetching products:", error)
    }
  }
  


  return {
    products,
    setProducts, // optional: agar bahar se manually set karna ho to
    loading,
    error,
    getAllProducts,
    getMyOrder,
    myOrders
  }
}

export default useApi
