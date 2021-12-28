const express = require('express');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const connection = require(`./db`)

const app = express();
app.use(cors());
app.use(bodyParser.json());

// get all tasks
app.get('/tareas/:idTareas', (req, res) => {
  const SELECT_ALL_TASKS = `SELECT * FROM todo-listdl.tareas where idTareas = ${req.params.userid} `;
  connection.query(SELECT_ALL_TASKS, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post('/agregarTarea', (req, res) => {
  const ADD_TASK = `INSERT INTO todo-listdl.tareas (tarea, idTareas) VALUES ('${req.body.task}', ${req.body.userId})`;
  console.log(ADD_TASK, `add tas`);
  connection.query(ADD_TASK, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.send('Agregado');
    }
  });
});

app.delete('/tarea/:idTareas', (req, res) => {
  const DELETE_TASK = `DELETE FROM todo-listdl.tareas WHERE (idTareas = ${req.params.taskid});`;
  connection.query(DELETE_TASK, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send('Borrado');
    }
  });
});

app.listen(4000, () => {
  console.log('Server escuchando en puerto 4000');
});
