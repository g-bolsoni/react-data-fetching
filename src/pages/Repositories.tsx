import axios from "axios";
import { useEffect,  useState } from "react";
/*import { useFetch } from "./hooks/useFecth";*/
import { useQuery } from 'react-query'
import { Link } from "react-router-dom";

export type Repository ={
  full_name: string;
  description:string;
}
export function Repos() {
  const {data, isFetching} = useQuery<Repository[]>('repos', async ()=> {
    const response =  await axios.get('https://api.github.com/users/g-bolsoni/repos')

    return response.data;
  },{
    /*refetchOnWindowFocus: false, quando o user volta a página ele faz a req dnv*/ 
    staleTime: 1000 *60 //quando de tempo eu quero manter os dados em cache até falar que os dados estão absoletos
    
  })
  return (
    <ul>
      {isFetching && <p> Carregando ....</p>}
      {data?.map(repo =>{
        return (
          <li key={repo.full_name}>
            <Link to={`repo/${repo.full_name}`}>{repo.full_name}</Link>
            <p>{repo.description}</p>
          </li>
        )
      })}
    </ul>
  )
}

