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


  app.get('/tipus', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'szabo_mate_zarodoga'
    })
    
    connection.connect()
    
    connection.query('SELECT * from tipus', function (err, rows, fields) {
      if (err) throw err
    
      console.log(rows)
  
      res.send(rows)
    })
    
    connection.end()    
  
  })
  // sajatbackend | Végpontok


  // Törlés teszt

  app.post('/torles', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'szabo_mate_zarodoga'
    })
    
    connection.connect()
    
    connection.query('DELETE FROM tipus WHERE tipus_id ='+req.body.bevitel1, function (err, rows, fields) {
      if (err) throw err
    
      console.log(rows)
  
      res.send(rows)
    })
    
    connection.end()    
  
  })
};
