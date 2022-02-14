import { useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { Repository } from "./Repositories";

export  function Repo() {
  const params = useParams();
  const currentRepository = params['*'] as string;
  
  const queryClient = useQueryClient();
  function handleChangeRepositorydescription(){
    queryClient.invalidateQueries(['repos']); // deixa atualizar as descrições
    //chamada API para atualizar a descrição do repositório
    const previousRepos = queryClient.getQueryData<Repository[]>('repos') /*retrona a lista que está em cache  */
    if(previousRepos){
      const nextRepos = previousRepos.map(repo => {
        if(repo.full_name == currentRepository){
          return { ...repo, description:"testando description"};
        }
        else{
          return repo;
        }
      })
      queryClient.setQueryData('repos',nextRepos);

    }
  }
  return (
    <>
      <h1>Projeto → <strong> {currentRepository}</strong></h1>
      <button onClick={handleChangeRepositorydescription}>Alterar</button>
    </>
  )
}
