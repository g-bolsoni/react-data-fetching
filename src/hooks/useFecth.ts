import React,{useEffect,useState} from "react";
import axios, { AxiosRequestConfig } from 'axios'

export function useFetch<T= unknown>(url: string, options?: AxiosRequestConfig ){
    const [data, setData] = useState<T | null>(null);
    const [isFetching, setIsFetching ] = useState(true);
    const [error, setError ] = useState<Error | null >(null);
    
    const api = axios.create({
        baseURL: 'https://api.github.com',
    });

    useEffect(()=>{
        api.get(url,options )
        .then(response => {
            setData(response.data);
        })
        .catch((err) =>{
            setError(err)
        })
        .finally(() =>{
            setIsFetching(false);
        })
      });
      return {data,isFetching,error};
}

/*
function APP(){
    const {
        data : repositories,
        isFetching
      } = useFetch<Repository[]>('users/g-bolsoni/repos')
}*/