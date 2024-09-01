import Auditorio from "../models/auditorios.js";
import mongoose from "mongoose";

const mostrarAuditorios = async (req, res) => {
  try {
    const auditorios = await Auditorio.find();
    if (!auditorios || auditorios.length === 0) {
      res.status(200).json({ message: "No existen registros de auditorios" });
    } else {
      res.status(200).json(auditorios);
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los auditorios" });
    console.log(error);
  }
};

const buscarAuditorio = async (req, res) => {
  const auditorioID = req.params.id;
  try {
    const auditorio = await Auditorio.findById(auditorioID);
    if (!auditorio) {
      res.status(404).json({ message: "No existe ese auditorio" });
    } else {
      res.status(200).json(auditorio);
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el auditorio" });
    console.log(error);
  }
};

const registrarAuditorio = async (req, res) => {
  const { nombre, capacidad, ubicacion } = req.body;
  try {
    const existente = await Auditorio.findOne({ nombre });
    if (existente) {
      return res.status(200).json({ message: "Ya existe un auditorio con ese nombre" });
    } else {
      const nuevoAuditorio = new Auditorio({
        _id: new mongoose.Types.ObjectId(),
        nombre,
        capacidad,
        ubicacion
      });
      await nuevoAuditorio.save();
      res.status(200).json({ message: "Auditorio registrado", auditorio: nuevoAuditorio });
    }
  } catch (err) {
    res.status(500).json({ error: "Error al registrar el auditorio" });
    console.log(err);
  }
};

const actualizarAuditorio = async (req, res) => {
  const auditorioID = req.params.id;
  try {
    const auditorioActualizado = await Auditorio.findByIdAndUpdate(auditorioID, req.body, { new: true });
    if (!auditorioActualizado) {
      return res.status(404).json({ error: "No se encontró el auditorio para actualizar" });
    }
    res.status(200).json({ message: "Auditorio actualizado", auditorio: auditorioActualizado });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el auditorio" });
    console.log(error);
  }
};

const borrarAuditorio = async (req, res) => {
  const auditorioID = req.params.id;
  try {
    const auditorioEliminado = await Auditorio.findByIdAndDelete(auditorioID);
    if (!auditorioEliminado) {
      return res.status(404).json({ error: "No se encontró el auditorio para eliminar" });
    }
    res.status(200).json({ message: "Auditorio eliminado" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el auditorio" });
    console.log(error);
  }
};

export {
  mostrarAuditorios,
  buscarAuditorio,
  registrarAuditorio,
  actualizarAuditorio,
  borrarAuditorio
};