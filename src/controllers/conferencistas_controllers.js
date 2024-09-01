import Conferencista from "../models/conferencistas.js";
import mongoose from "mongoose";

const mostrarConferencistas = async (req, res) => {
  try {
    const conferencistas = await Conferencista.find();
    if (!conferencistas || conferencistas.length === 0) {
      res.status(200).json({ message: "No existen registros de conferencistas" });
    } else {
      res.status(200).json(conferencistas);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los conferencistas' });
    console.log(error);
  }
};

const buscarConferencista = async (req, res) => {
  const conferencistaID = req.params.id;
  try {
    const conferencista = await Conferencista.findById(conferencistaID);
    if (!conferencista) {
      res.status(404).json({ message: 'No existe ese conferencista' });
    } else {
      res.status(200).json(conferencista);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los conferencistas' });
    console.log(error);
  }
};

const registrarConferencista = async (req, res) => {
  const { nombre, cedula, email, especialidad, temas } = req.body;
  try {
    const existente = await Conferencista.findOne({ $or: [{ cedula }, { email }] });
    if (existente) {
      if (existente.cedula === cedula && existente.email === email) {
        return res.status(200).json({ message: 'Ya existe un conferencista con esa cedula y correo' });
      } else if (existente.cedula === cedula) {
        return res.status(200).json({ message: 'Ya existe un conferencista con esa cedula' });
      } else if (existente.email === email) {
        return res.status(200).json({ message: 'Ya existe un conferencista con ese correo' });
      }
    } else {
      const nuevoConferencista = new Conferencista({
        _id: new mongoose.Types.ObjectId(),
        nombre,
        cedula,
        email,
        especialidad,
        temas,
      });
      await nuevoConferencista.save();
      res.status(200).json({ message: 'Conferencista registrado', conferencista: nuevoConferencista });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error al registrar el conferencista' });
    console.log(err);
  }
};

const actualizarConferencista = async (req, res) => {
  const conferencistaID = req.params.id;
  try {
    const conferencistaActualizado = await Conferencista.findByIdAndUpdate(conferencistaID, req.body, { new: true });
    if (!conferencistaActualizado) {
      return res.status(404).json({ error: 'No se encontró el conferencista para actualizar' });
    }
    res.status(200).json({ message: 'Conferencista actualizado', conferencista: conferencistaActualizado });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el conferencista' });
    console.log(error);
  }
};

const borrarConferencista = async (req, res) => {
  const conferencistaID = req.params.id;
  try {
    const conferencistaEliminado = await Conferencista.findByIdAndDelete(conferencistaID);
    if (!conferencistaEliminado) {
      return res.status(404).json({ error: 'No se encontró el conferencista para eliminar' });
    }
    res.status(200).json({ message: 'Conferencista eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el conferencista' });
    console.log(error);
  }
};

export {
  mostrarConferencistas,
  buscarConferencista,
  registrarConferencista,
  actualizarConferencista,
  borrarConferencista
};