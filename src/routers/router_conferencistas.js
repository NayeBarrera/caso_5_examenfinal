import express from "express";
import {
  actualizarConferencista,
  borrarConferencista,
  buscarConferencista,
  mostrarConferencistas,
  registrarConferencista
} from "../controllers/conferencistas_controllers.js";

import { verificadoAutentication } from "../controllers/login_controllers.js";

const routerConferencistas = express.Router();

routerConferencistas.use(express.json());

routerConferencistas.get('/listar', verificadoAutentication, mostrarConferencistas);

routerConferencistas.get('/obtener/:id', verificadoAutentication, buscarConferencista);

routerConferencistas.post('/register', verificadoAutentication, registrarConferencista);

routerConferencistas.put('/actualizar/:id', verificadoAutentication, actualizarConferencista);

routerConferencistas.delete('/eliminar/:id', verificadoAutentication, borrarConferencista);

routerConferencistas.use((req, res) => res.status(404).end());

export default routerConferencistas;