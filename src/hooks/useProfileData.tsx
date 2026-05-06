import React, { useEffect } from 'react'
import useAxios from '../utils/useAxios'

const useProfileData = () => {
  const { data, loading, error, fetchData } = useAxios()

  const getProfile = async () => {
    try {
      await fetchData({ url: "/api/v1/user/profile/get-profile" });
    } catch (err) {
      console.error("Error fetching profile:", err)
    }
  }

  useEffect(() => {
    getProfile()

  }, [])

  return {
    getProfile,
    profileData: data,  
    loading,
    error,
  }
}

export default useProfileData
