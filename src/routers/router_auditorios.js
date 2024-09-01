import express from "express";
import {
    actualizarAuditorio,
    borrarAuditorio,
    buscarAuditorio,
    mostrarAuditorios,
    registrarAuditorio
} from "../controllers/auditorios_controllers.js";

import { verificadoAutentication } from "../controllers/login_controllers.js";

const routerAuditorio = express.Router();

routerAuditorio.use(express.json());

routerAuditorio.get('/listar', verificadoAutentication, mostrarAuditorios);

routerAuditorio.get('/obtener/:id', verificadoAutentication, buscarAuditorio);

routerAuditorio.post('/register', verificadoAutentication, registrarAuditorio);

routerAuditorio.put('/actualizar/:id', verificadoAutentication, actualizarAuditorio);

routerAuditorio.delete('/eliminar/:id', verificadoAutentication, borrarAuditorio);

routerAuditorio.use((req, res) => res.status(404).end());

export default routerAuditorio;