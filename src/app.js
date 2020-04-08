const express = require("express");
const cors = require("cors");

const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

function validateUuid(request, response, next) {
  const { id } = request.params;

  if(!isUuid(id)) {
      return response.status(400).json({ error: "Invalid repository ID." });
  }

  return next(); // Próximo Middleware
}

app.use('/repositories/:id', validateUuid);

app.get("/repositories", (request, response) => {
  // TODO
  response.json(repositories);
});

app.post("/repositories", (request, response) => {
  // TODO
  const { title, url, techs } = request.body;

  repository = {id: uuid(), title, url, techs, likes: 0}

  repositories.push(repository);

  response.json(repository);

});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;
  const { title, url, techs } = request.body;

  // Procura posição da array usando uuid
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  // Verifica se o uuid realmente existe no array
  if (repositoryIndex < 0) {
      return response.status(404).json({error: 'Repository not found'});
  }

  // Atribuindo novos dados a array
  repositories[repositoryIndex].title = title;
  repositories[repositoryIndex].url = url;
  repositories[repositoryIndex].techs = techs;

  return response.json(repositories[repositoryIndex]);

});

app.delete("/repositories/:id", (req, res) => {
  // TODO
  const {id} = req.params;

  // Procura posição da array usando uuid
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  // Verifica se o uuid realmente existe no array
  if (repositoryIndex < 0) {
      return response.status(404).json({error: 'Repository not found'});
  }

  repositories.splice(repositoryIndex, 1);

  return res.status(204).send();


});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const { id } = request.params;

  // Procura posição da array usando uuid
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  // Verifica se o uuid realmente existe no array
  if (repositoryIndex < 0) {
      return response.status(404).json({error: 'Repository not found'});
  }

  // Atribuindo novos dados a array
  repositories[repositoryIndex].likes += 1;

  return response.json(repositories[repositoryIndex]);

});

module.exports = app;
