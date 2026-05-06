import { useState, useEffect, useCallback } from 'react';
// import useToastHandler from './useToastHandler';
import createAxiosInstance from '../utils/axiosInstance';
import { useAuth } from '../context/AuthContext';
import Cookies from 'js-cookie';

const useAxios = (initialConfig = {}, options = {}) => {
//   const { showToast } = useToastHandler();
  const { manual = true } = options;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);  
  const [error, setError] = useState(null);

const { token: contextToken } = useAuth();
const token = contextToken || Cookies.get('TOKEN');

  const axiosInstance = createAxiosInstance(token); // Reuse common instance

  const fetchData = useCallback(
    async ({ url, method = 'GET', data: bodyData, headers = {}, showloader = true, toast = true } = {}) => {
      setLoading(true);
      setError(null);

      try {
        const response = await axiosInstance({
          ...initialConfig,
          url: url || initialConfig.url,
          method: method || initialConfig.method,
          data: bodyData || initialConfig.data,
          headers: { ...initialConfig.headers, ...headers },
        });

        const message = response.data.message || response.data.msg || response.data.error || 'Success';
        // if (toast) showToast(message, 'success');
         if(response.data.success){

           setData(response.data.data);
         }
        return response.data;
      } catch (err) {
        const msg = err.response?.data?.message || err.message || 'An error occurred';
        // showToast(msg, 'error');
        setError(msg);
        throw err.response?.data;
      } finally {
        setLoading(false);
      }
    },
    [initialConfig, axiosInstance]
  );

  useEffect(() => {
    if (!manual && initialConfig.url) {
      fetchData();
    }
  }, [fetchData, manual]);

  return { data, loading, error, fetchData };
};

export default useAxios;
