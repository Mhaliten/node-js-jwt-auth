const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

//Adatbázis kapcsolat létrehozása
  //ennek a meghívásával kaphatod meg a connectiont
  function getDatabaseConnection() {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'szabo_mate_zarodoga'
    })
    connection.connect()

    return connection;
  }


  app.get('/tipusok', (req, res) => {
    getDatabaseConnection().query('SELECT * from tipus', function (err, rows, fields) {
      // if (err) res.send('Hiba történt a tipusok lekérdezésében')
      if (err) res.send(err)

      res.send(rows)
    })

    getDatabaseConnection().end()
  
  })


  
  // sajatbackend | Végpontok


  // Törlés teszt

  app.post('/torles', (req, res) => {

    getDatabaseConnection().query('DELETE FROM tipus WHERE tipus_id ='+req.body.bevitel1, function (err, rows, fields) {
      if (err) throw err
    
      console.log(rows)
  
      res.send(rows)
    })

    getDatabaseConnection().end()
  
  })


  app.get('/etkez', (req, res) => {
    getDatabaseConnection().query('SELECT * from etel_tipusok ='+req.body.bevitel1, function (err, rows, fields) {
      if (err) throw err
    
      console.log(rows)
  
      res.send(rows)
    })

    getDatabaseConnection().end()
  
  })



  app.post('/recept_lekerdez', (req, res) => {
  getDatabaseConnection().query('SELECT * from receptek where recept_tipus_id ='+req.body.bevitel1, function (err, rows, fields) {
    if (err) throw err
  
    console.log(rows)

    res.send(rows)
  })

  getDatabaseConnection().end()

})



  // Ez alatt van a termék törlés

  app.post('/termektorles', (req, res) => {
    getDatabaseConnection().query('DELETE FROM termekek WHERE termek_id ='+req.body.bevitel1, function (err, rows, fields) {
      if (err) throw err
    
      console.log(rows)
  
      res.send(rows)
    })

    getDatabaseConnection().end()
  
  })


  app.get('/termekek_lekerdezes', (req, res) => {
    getDatabaseConnection().query('SELECT * from termekek', function (err, rows, fields) {
      if (err) throw err
    
      console.log(rows)
  
      res.send(rows)
    })

    getDatabaseConnection().end()
  
  })




app.post('/tipusfelvitel', (req, res) => {
  getDatabaseConnection().query('INSERT INTO tipus VALUES (NULL, "' + req.body.bevitel1 + '")', function (err, rows, fields) {
    if (err) res.send('Hiba történt a tipus felvitelekor!')

    console.log(rows)

    res.send(rows)
  })

  getDatabaseConnection().end()

})

app.post('/eteltipus_felvitel', (req, res) => {
  getDatabaseConnection().query('INSERT INTO etel_tipusok VALUES (NULL, "' + req.body.bevitel1 + '")', function (err, rows, fields) {
    if (err) res.send('Hiba történt a tipus felvitelekor!')

    console.log(rows)

    res.send(rows)
  })

  getDatabaseConnection().end()

})

// Termék felvitel (NINCS KÉSZ!)

app.post('/termek_felvitel', (req, res) => {
    getDatabaseConnection().query("INSERT INTO termekek VALUES (NULL, "+req.body.bevitel1+", '"+req.body.bevitel2+"', "+req.body.bevitel3+", '"+req.body.bevitel4+"') ", function (err, rows, fields) {
    if (err) res.send('Hiba történt a tipus felvitelekor!')

    console.log(rows)

    res.send(rows)
  })

  getDatabaseConnection().end()

})



app.post('/tipus_lekerdez', (req, res) => {
  getDatabaseConnection().query('SELECT * from termekek where termektipus_id = '+req.body.bevitel1, function (err, rows, fields) {
    if (err) throw err
  
    console.log(rows)

    res.send(rows)
  })
  
  getDatabaseConnection().end()   

})
};