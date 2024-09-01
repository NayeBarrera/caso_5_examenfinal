import Reserva from '../models/reservas.js'
import Auditorio from "../models/auditorios.js";
import Conferencista from "../models/conferencistas.js";
import mongoose from "mongoose";


const mostrarReservas = async (req, res) => {
    try {
      const Reservas = await Reserva.find();
      if (!Reservas || Reservas.length === 0) {
        return res.json({ message: 'No existen registros de Reservas' });
      }
      res.status(200).json(Reservas);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener las Reservas" });
      console.log(error);
    }
}

const buscarReserva = async (req, res) => {
    const ReservaId = req.params.id;
    try {
      const Reservas = await Reserva.findById(ReservaId);
      if (!Reserva) {
        return res.status(404).json({ error: "No se encontró la Reserva" });
      }else{
        res.status(200).json(Reservas);
      }
    } catch (error) {
      res.status(500).json({ error: "Error al obtener la Reserva" });
      console.log(error);
    }
}

const registrarReserva = async (req, res) => {
    const { auditorio, codigo, descripcion, cedula, fecha } = req.body;
    let { conferencista, capacidad } = req.body
    try {
    const buscarConferencista = await Conferencista.find({ cedula });
    const buscarAuditorio = await Auditorio.find({ auditorio });
    let ConferencistaEncontrado = null;
    let AuditorioEncontrada = null;
    for (let i = 0 ; i < buscarConferencista.length ; i++){
      if(cedula == buscarConferencista[i].cedula){
        ConferencistaEncontrado = buscarConferencista[i].cedula
        conferencista = buscarConferencista[i].nombre
        break
      }
    }
    for (let i = 0 ; i < buscarAuditorio.length ; i++){
      if(auditorio == buscarAuditorio[i].nombre){
        AuditorioEncontrada = buscarAuditorio[i].nombre
        capacidad = buscarAuditorio[i].capacidad
        break
      }
    }
    if(ConferencistaEncontrado == null && AuditorioEncontrada == null) return res.status(404).json({ message : 'No existe la Auditorio y tampoco el Conferencista'})
    else if(ConferencistaEncontrado==null) return res.status(404).json({ message : 'No existe ese Conferencista'})
    else if(AuditorioEncontrada==null) return res.status(404).json({ message : 'No existe esa Auditorio'})
    else {
      const exisAuditorio = await Reserva.findOne({ auditorio })
      const exisConferencista = await Reserva.findOne({ conferencista })
      const exisCodigo = await Reserva.findOne({ codigo })
      const exisFecha = await Reserva.findOne({ fecha })
      if(exisConferencista && exisAuditorio && exisCodigo && exisFecha) return res.status(200).json({ message : 'El Conferencista ya tiene Reservado ese Auditorio, ese dia y con ese codigo'})
      else if (exisAuditorio && exisFecha && exisCodigo) return res.json({ message : 'Ese auditorio ya esta reservado en esa fecha y con ese codigo'})
      const nuevaReserva = await Reserva.create({
        _id: new mongoose.Types.ObjectId(),
        codigo,
        descripcion,
        conferencista,
        cedula,
        auditorio,
        capacidad,
        fecha
      });
      res.status(201).json({ message: "Reserva creada", Reserva : nuevaReserva });
    }
    } catch (error) {
      res.status(500).json({ error: "Error al crear la Reserva" });
      console.log(error);
    }
}

const actualizarReserva = async (req, res) => {
    const ReservaId = req.params.id;
    const { auditorio, codigo, descripcion, cedula } = req.body;
    let { conferencista, capacidad } = req.body
    try {
    const buscarConferencista = await Conferencista.find({ cedula });
    const buscarAuditorio = await Auditorio.find({ auditorio });
    let ConferencistaEncontrado = null;
    let AuditorioEncontrada = null;
    for (let i = 0 ; i < buscarConferencista.length ; i++){
      if(cedula == buscarConferencista[i].cedula){
        ConferencistaEncontrado = buscarConferencista[i].cedula
        conferencista = buscarConferencista[i].nombre
        break
      }
    }
    for (let i = 0 ; i < buscarAuditorio.length ; i++){
      if(auditorio == buscarAuditorio[i].nombre){
        AuditorioEncontrada = buscarAuditorio[i].nombre
        capacidad = buscarAuditorio[i].capacidad
        break
      }
    }
    if (AuditorioEncontrada == null && ConferencistaEncontrado == null) {
      return res.status(404).json({ message: 'No se puede actualizar porque no existe ese Conferencista y tampoco la Auditorio' });
    } else if (ConferencistaEncontrado == null) {
      return res.status(404).json({ message: 'No se puede actualizar porque no existe ese Conferencista' });
    } else if (AuditorioEncontrada == null) {
      return res.status(404).json({ message: 'No se puede actualizar porque no existe esa Auditorio' });
    } else {
      const ReservaActualizada = await Reserva.findByIdAndUpdate(
        ReservaId,
        {
            codigo,
            descripcion,
            conferencista,
            cedula,
            auditorio,
            capacidad
          },
          {
            new: true
        });
      if (!ReservaActualizada) return res.status(404).json({ error: "No se encontró la Reserva para actualizar" });
      res.status(200).json({ message: "Reserva actualizada", Reserva: ReservaActualizada });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la Reserva" });
    console.log(error);
  }
};

const borrarReserva = async (req, res) => {
    const ReservaId = req.params.id;
    try {
      const ReservaEliminada = await Reserva.findByIdAndDelete(ReservaId);
      if (!ReservaEliminada) {
        return res
          .status(404)
          .json({ error: "No se encontró la Reserva para eliminar" });
      }
      res.status(200).json({ message: "Reserva eliminada" });
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar la Reserva" });
      console.log(error);
    }
}

export {
    mostrarReservas,
    buscarReserva,
    registrarReserva,
    actualizarReserva,
    borrarReserva
}