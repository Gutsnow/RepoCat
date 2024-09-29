// ------------------ IMPORTAÇÕES------------------

import github from '../assets/github-logo.png'
import { Container } from '../pages/styles'
import Input from '../components/Input'
import ItemRepo from '../components/Input/ItemRepo';
import { ItemContainer } from '../components/Input/ItemRepo/styles';
import { useState } from 'react';
import Button from '../components/Button'
import { api } from '../services/api'


function App() {

// ------------------VARIAVEIS------------------

const [currentRepo, setCurrenctRepo] = useState('');
const [repos, setRepos] = useState([])

const handleSearchRepo = async () => {

const {data} = await api.get(`repos/${currentRepo}`)



  // -----------------CONDIÇÕES------------------
  if (data.id) {
    
    const existe = repos.find(repo => repo.id === data.id)

    if(!existe ){
      setRepos(prev => [...prev, data]);
      setCurrenctRepo('')
     return
    }
 
    alert("Esse repositorio já foi imprimido!")
  }
  }

  const handleRemoveRepo = (id) => {
    const atualizaRepos = repos.filter(repo => repo.id !== id); // Remove o repo pelo ID
    setRepos(atualizaRepos)

    
  }
// ------------------RENDERIZAÇÃO------------------
  return (

    <Container>
      <img src={github} width={75} height={75} alt='imagem' />
      <h1>Bem vindo ao RepoCat-Wiki!</h1>
      <p>Digite o usuario e o nome do repositorio</p>
      <Input value={currentRepo} onChange={(e) => setCurrenctRepo(e.target.value)} placeholder='User/Repositorio' />
      <Button onClick={handleSearchRepo} />
      {repos.map(repo => <ItemRepo repo={repo} handleRemoveRepo={handleRemoveRepo}  /> )}
      
      <ItemContainer />
     </Container>
  );
}

export default App;
