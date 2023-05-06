const express = require('express')
const exphbs = require('express-handlebars')

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const router = require("./routes")

require("./config/mongoose")

const app = express()
const port = process.env.PORT

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.static("public"));

app.use(router)

app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})