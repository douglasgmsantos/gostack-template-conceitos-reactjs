import React, { Component } from "react";

import "./styles.css";
import api from "./services/api";

export default class App extends Component {
  state = {
    repositories: []
  };

  // Carregar os dados do localStorage
  componentDidMount() {
    api.get("/repositories").then(res => {
      if (res.data) {
        this.setState({ repositories: res.data });
      }
    })

  }

  handleAddRepository = () => {
    api.post("/repositories", {
      id: "123",
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    }).then(resp => {
      var repositories = this.state.repositories
      repositories.push(resp.data)
      this.setState({ repositories });
    });

  }

  handleRemoveRepository = async (id) => {
    api.delete(`/repositories/${id}`).then((resp) => {
      var repositories = this.state.repositories.filter(rep => rep.id != id);
      this.setState({ repositories });
    })
  }

  render() {
    const { repositories } = this.state;
    return (
      <div>
        <ul data-testid="repository-list">
          {repositories.map(repo => (
            <li key={repo.id}>
              {repo.title}
              <button onClick={() => this.handleRemoveRepository(repo.id)}>
                Remover
              </button>
            </li>
          ))}
        </ul>

        <button onClick={this.handleAddRepository}>Adicionar</button>
      </div>
    );
  }
}

