import express from "express";
import {
    actualizarReserva,
    borrarReserva,
    buscarReserva,
    mostrarReservas,
    registrarReserva
} from "../controllers/reservas_controllers.js";

import { verificadoAutentication } from "../controllers/login_controllers.js";

const routerReserva = express.Router();

routerReserva.use(express.json());

routerReserva.get('/listar', verificadoAutentication, mostrarReservas);

routerReserva.get('/obtener/:id', verificadoAutentication, buscarReserva);

routerReserva.post('/register', verificadoAutentication, registrarReserva);

routerReserva.put('/actualizar/:id', verificadoAutentication, actualizarReserva);

routerReserva.delete('/eliminar/:id', verificadoAutentication, borrarReserva);

routerReserva.use((req, res) => res.status(404).end());

export default routerReserva;