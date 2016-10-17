var router = require('express').Router();
var pg = require('pg');

var config = {
  database: 'rho',
};

var pool = new pg.Pool(config);
router.get('/', function (req, res) {
  pool.connect(function (err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to DB', err);
        res.sendStatus(500);
        return;
      }

      client.query('SELECT * FROM tasks ORDER BY id;', function (err, result) {
        if (err) {
          console.log('Error querying the DB', err);
          res.sendStatus(500);
          return;
        }

        res.send(result.rows);
      });
    } finally {
      done();
    }
  });//end of pool.connect
}); //end of get request

router.post('/', function (req, res) {
  pool.connect(function (err, client, done) {
    try {
      if (err) {
        console.log('Issue connecting the DB', err);
        res.sendStatus(500);
        return;
      }

      client.query('INSERT INTO tasks (to_do, complete) VALUES ($1, $2) returning *',
                    [req.body.to_do, req.body.complete],
                function (err, result) {
                  if (err) {
                    console.log('Issue querying the DB', err);
                    res.sendStatus(500);
                    return;
                  }

                  res.send(result.rows);
                });
    }// end of try
    finally {
      done();
    }
  });//End of pool.connect
});//End of post request

router.delete('/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  pool.connect(function (err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to the DB', err);
        res.sendStatus(500);
        return;
      }

      client.query('DELETE FROM tasks WHERE id=$1', [id],
        function (err) {
          if (err) {
            console.log('Error querying the DB', err);
            res.sendStatus(500);
            return;
          }

          res.sendStatus(204);
        });
    }
    finally {
      done();
    }
  });//End of pool.connect
});//End of delete request

router.put('/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  pool.connect(function (err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to the DB', err);
        res.sendStatus(500);
        return;
      }

      client.query('UPDATE tasks SET complete = NOT complete WHERE id=$1;', [id],
        function (err) {
          if (err) {
            console.log('Error querying the DB', err);
            res.sendStatus(500);
            return;
          }

          res.sendStatus(204);
        });
    }
    finally {
      done();
    }
  });//End of pool.connect
});//End of delete request


module.exports = router;
