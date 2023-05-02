require('dotenv').config();
const express = require('express');
const handlebars = require('express-handlebars');
const routes = require('./routes');
const app = express();

const hbs = handlebars.create({
	partialsDir: ['views/partials']
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({
	extended: true
}))

app.use(routes);

app.listen(process.env.SERVER_PORT, _ => {
	console.log('commercial site running on port %d', process.env.SERVER_PORT);
})