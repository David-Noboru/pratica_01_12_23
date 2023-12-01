const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')




//configure template handlebars
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')


//parser para leitura do body
app.use(
express.urlencoded({
extended: true
})
)
app.use(express.json())

//ADICIONANDO CAMINHO CSS
app.use(express.static('public'))

app.get('/users/add', (req, res) => {
res.render('userform')
})

app.post('/users/save', (req, res) => {
const name = req.body.name
const age = req.body.age
const user = { name: name, age: age }
res.render('viewuser', { user: user })

})

const usuario = {
login: 'teste',
senha: 123

}


app.get('/', (req, res) => {

res.render('login')
})

var auth = false

app.post('/user/login', (req, res) => {
const login = req.body.login
const senha = req.body.senha
let message = ""

if (login == usuario.login && senha == usuario.senha) {
auth = true
message = "Usuário logado com sucesso!"
res.render('home', { usuario: usuario, auth, message })
}
else {
auth = false
message = "Usuário e/ou senha inválidos!"
res.render('login', { auth, message })
}

})

//pagina 404
app.use(function (req, res, next) {
res.status(404).render('404')
})


//webserver
app.listen(port, () => {
console.log('Server Started')
})