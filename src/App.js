import React, {useEffect, useState} from "react";

import "./styles.css";
import api from "services/api"

function App() {

  const [repositories, setRepositories] = useState([]);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    api.get('repositories').then( response => {
      setRepositories(response.data);
    })
  },[]);

  async function handleAddRepository() {
    const repository = {
      title,
      url,
      techs
    }
    api.post('repositories', repository).then( response => {
      const lst = [...repositories];
      lst.push(response.data);

      setRepositories(lst);
      clearForm();
    })
  }

  function clearForm(){
    setTitle('');
    setUrl('');
    setTechs([]);    
  }
  async function handleRemoveRepository(id) {
    api.delete('repositories/'+id).then( response => {
      const index = repositories.findIndex(repo => repo.id === id)
      const ls = [...repositories]
      ls.splice(index, 1)
      setRepositories(ls)
    })
  }

  function addOrRemoveTech(tech){
    const lst = [...techs];
    const index = lst.indexOf(tech)
    if(index === -1 ){
      lst.push(tech)
    } else {
      lst.splice(index, 1)
    }

    setTechs(lst);
  }

  return (
    <div>
      <label style={{fontWeight: 'bold'}}>REPOSITORIES</label>
      <ul data-testid="repository-list">
          {
            repositories.map( (repo, i) =>
              <li key={i}>{repo.title}
                <button onClick={() => handleRemoveRepository(repo.id)}>
                  Remover
                </button>
              </li>
            )
          }
      </ul>

      <br/>
      <div style={{display : 'inline'}}>
        <input type="text" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
        <input placeholder="url" value={url} onChange={(e) => setUrl(e.target.value)}/>
      </div>
      <div>
        <span>
          <input type="checkbox" value="html" onChange={(e) => addOrRemoveTech(e.target.value)}/>
          <label >HTML</label>
        </span>
        <span>
          <input type="checkbox" value="css" onChange={(e) => addOrRemoveTech(e.target.value)}/>
          <label >CSS</label>
        </span>         
        <span>
          <input type="checkbox" value="javascript" onChange={(e) => addOrRemoveTech(e.target.value)}/>
          <label >javascript</label>
        </span>

      </div>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
