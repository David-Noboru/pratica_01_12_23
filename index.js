const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const {LocalStorage} = require ("node-localstorage");

var localStorage = new LocalStorage('./scratch');

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
res.render('userform', {auth})
})


app.post('/users/save', (req, res) => {
const marca = req.body.marca;
const  potencia = req.body.potencia;
const motor = req.body.motor;
const nome = req.body.nome;
const cor = req.body.cor;
const anodf = req.body.anodf;


const user = { marca: marca, potencia: potencia, motor: motor, nome: nome, cor: cor, anodf:anodf}
localStorage.setItem('marca', `${marca}`)
localStorage.setItem('potencia', `${potencia}`)
localStorage.setItem('motor', `${motor}`)
localStorage.setItem('nome', `${nome}`)
localStorage.setItem('cor', `${cor}`)
localStorage.setItem('anodf', `${anodf}`)

console.log(localStorage.getItem('marca'))
console.log(localStorage.getItem('potencia'))
console.log(localStorage.getItem('motor'))
console.log(localStorage.getItem('nome'))
console.log(localStorage.getItem('cor'))
console.log(localStorage.getItem('anodf'))

res.render('viewuser', { user: user, auth })

})


const usuario = {
login: 'teste@gmail.com',
senha: 555

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