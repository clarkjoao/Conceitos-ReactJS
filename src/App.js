import React, { useEffect, useState } from "react";

import "./styles.css";
import api from "./services/api";
function App() {
  const [repositorys, setRepo] = useState([]);

  useEffect(() => {
    api.get("/repositories").then((repos) => {
      setRepo(repos.data);
    });
  }, []);

  async function handleAddRepository() {
    const data = {
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    };
    const resp = await api.post("/repositories", data);
    if (resp.status !== 200) {
      return;
    }
    setRepo([...repositorys, resp.data]);
  }

  async function handleRemoveRepository(id) {
    const resp = await api.delete(`/repositories/${id}`);
    if (resp.status !== 204) {
      return;
    }
    const repoIndex = repositorys.findIndex((repo) => repo.id === id);
    repositorys.splice(repoIndex, 1);
    setRepo([...repositorys]);
  }
  return (
    <div>
      <ul data-testid="repository-list">
        {repositorys?.map((repo, index) => {
          return (
            <li key={repo.id}>
              {repo.title}
              <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
              </button>
            </li>
          );
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
