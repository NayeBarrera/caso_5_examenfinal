import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import routerLogin from './routers/router_login.js'
import routerConferencistas from './routers/router_conferencistas.js'
import routerAuditorio from './routers/router_auditorios.js'
import routerReserva from './routers/router_reservas.js'

const app = express()
dotenv.config()

app.use(express.json())
app.use(cors())
app.set('port', process.env.port || 3000)

app.use('/api/login', routerLogin)
app.use('/api/conferencista', routerConferencistas)
app.use('/api/auditorio', routerAuditorio)
app.use('/api/reserva', routerReserva)

app.use((req, res) => res.status(404).end())

export default app