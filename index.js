const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

// Comment this cores line below to use postman
const cors = require('cors');

dotenv.config();

mongoose.connect(
	process.env.MONGO_URL,
	{ useNewUrlParser: true },
	() => {
		console.log("Connected to MongoDB")
	}
);

// middleware
app.use(express.json());

// Comment lines from 27 to 40 for use postman
app.use(cors())
app.use((req, res, next) => {

	// Dominio que tengan acceso (ej. 'http://example.com')
	res.setHeader('Access-Control-Allow-Origin', '*');

	// Metodos de solicitud que deseas permitir
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

	// Encabecedados que permites (ej. 'X-Requested-With,content-type')
	res.setHeader('Access-Control-Allow-Headers', '*');

	next();
})

app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);


app.listen(8800, () => {
	console.log("Backend server is running!")
});