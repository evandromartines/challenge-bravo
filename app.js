const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const sqlite3 = require('sqlite3').verbose();
const dbSctruct = require('./config/dbStruct');
const serviceCurrency = require('./services/currencieService');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//LOAD ROUTES
app.use(require('./routes'));

app.use((err, req, res) => {
  res.status(err.status || 500);

  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  });
});


//CONNECT DATABASE
global.db = new sqlite3.Database('../data/challenge-bravo.db', (err) => {
  if (err) {
    console.error(err.message);
  }else{
    global.db.run(dbSctruct.createTableCurrencies);
    serviceCurrency.insertDefaultsCoins();
    console.log('Connected to the challenge-database database SQLITE.');
  }
});



app.listen(3000, () =>
  console.log('START IN PORT:' + 3000),
);

