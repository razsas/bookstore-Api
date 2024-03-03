import * as dotenv from "dotenv"
import {connectToTheGoose} from "./src/goose"
import express from "express"
import cors from 'cors'
import { bookRouter } from "./src/router/booksRouter"
import { cartRouter } from "./src/router/cartRouter"

dotenv.config({path:"config/dev.env"})
const app = express()
app.use(express.json())
app.use(cors())
app.use(bookRouter)
app.use(cartRouter)
const port = process.env.PORT
connectToTheGoose()
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`)
})