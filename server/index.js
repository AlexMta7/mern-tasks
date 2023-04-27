import express from 'express'
import cors from 'cors'
import { PORT } from './config.js'

import indexRoutes from './routes/index.routes.js'
import taskRoutes from './routes/tasks.routes.js'

const app = express()

app.use(express.json())

app.use(cors({}))
app.use(indexRoutes)
app.use(taskRoutes)

app.listen(PORT)
console.log(`Server is running on port ${PORT}`)
