const express = require('express'),
app = express(),
fs = require("fs"),
path = require("path"),
port = process.env.PORT || 3012;
// port = process.env.PORT || 3000;

const cors = require('cors')
// const options = {
//     key: fs.readFileSync(path.join(__dirname, 'ssl_credential/Privatekey.pem')),
//     cert: fs.readFileSync(path.join(__dirname, 'ssl_credential/app_synergicbanking_in.pem')),
//     ca: [
//         fs.readFileSync(path.join(__dirname, 'ssl_credential/DigiCertCA.crt')),
//         fs.readFileSync(path.join(__dirname, 'ssl_credential/My_CA_Bundle.crt'))
//     ]
//   };()

  // TO ACCEPT ALL DATA FROM CLIENT SIDE USING GET/POST REQUEST
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
// END

app.use(express.static(path.join(__dirname, "assets/")));

const fileUpload = require("express-fileupload");

app.use(fileUpload());


// ROUTERS INITIALIZATION
const { appApiRouter } = require('./router/oracle_api');
const { sqlRouter } = require('./router/mysql_api');
const { brn_managerRouter } = require('./router/brn_manager_api');
const { credit_managerRouter } = require('./router/credit_manager_api');
const { ceo_Router } = require('./router/ceo_api');

// END

// USE ROUER FOR SPECIFIC URL
app.use("/oracle", appApiRouter);
app.use("/sql", sqlRouter);
app.use("/brn",brn_managerRouter);
app.use('/credit',credit_managerRouter);
app.use('/ceo', ceo_Router);


// END

app.get('/', (req, res) => {
  res.send('Welcome to api template.PURDCS Loan Module')
})

app.listen(port, (err) => {
    if(err) throw err;
    else console.log(`App is running at http://localhost:${port}`);
})