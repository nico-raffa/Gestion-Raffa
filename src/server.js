import express from 'express'
import { routerCargarHoras, routerEmpleados } from './controllers/index.js'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { engine } from 'express-handlebars'
import './models/associations.js'
import Handlebars from 'handlebars'
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access'
import path from 'path'
import handlebarsDateformat from 'handlebars-dateformat'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
app.use(express.static(path.join(__dirname, 'public')))

app.listen(8081, () => console.log('Server abierto en el puerto 8081'))

app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    helpers:{
        dateFormat: handlebarsDateformat
    }
}))
app.set('views', './src/views')
app.set('view engine', 'hbs')

app.use('/empleados', routerEmpleados)
app.use('/empleados/horas', routerCargarHoras)
app.get('*', (req, res) => {
    res.send({
        error: -2,
        descripcion: `Ruta ${req.path} no implementada`
    })
})

app.post('/webhook', (req, res) => {
    if (req.body.ref === 'refs/heads/master') {
      exec('sh /home/server1/scripts/deploy.sh', (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`)
          return res.sendStatus(500)
        }
        console.log(`stdout: ${stdout}`)
        console.error(`stderr: ${stderr}`)
      })
    }
    res.sendStatus(200)
  })