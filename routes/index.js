// noinspection JSIgnoredPromiseFromCall,JSUnresolvedVariable

const express = require('express');
const cors = require('cors')
const router = express.Router();
router.use(cors());
const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'badgods',
  password: '3Zc6PEpidfjEtY2X',
  database: 'badgods'
})
connection.connect()


/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', {title: 'Express'});
});

router.get('/sections/',
  function (req, res) {

    connection.query('SELECT slug, moniker FROM sections ORDER BY sequence', (err, rows) => {
      if (err) {
        console.log('err', err);
      }
      res.json(rows);
    })

  });

router.get('/sections/:sectionSlug',
  function (req, res) {

    connection.query(`SELECT slug, moniker
                      FROM sections
                      WHERE slug = "${req.params.sectionSlug}"`, (err, rows) => {
      if (err) {
        console.log('err', err);
      }
      res.json(rows[0]);
    })

  });

router.get('/sections/:sectionSlug/posts/',
  function (req, res) {

    connection.query(`SELECT p.slug,
                             p.moniker,
                             p.media_type as mediaType,
                             p.post_date  as postDate,
                             s.slug       as sectionSlug
                      FROM posts p
                               JOIN sections s on s.id = p.section_id
                      WHERE s.slug = "${req.params.sectionSlug}"
                        AND live = 1
ORDER BY p.post_date;`, (err, rows) => {
      if (err) {
        console.log('err', err);
      }
      res.json(rows);
    })

  });

router.get('/posts/', function (req, res) {

  connection.query(`SELECT p.slug,
                           p.moniker,
                           p.media_type as mediaType,
                           p.post_date  as postDate,
                           s.slug       as sectionSlug
                    FROM posts p
                             JOIN sections s on s.id = p.section_id
                    WHERE live = 1`, (err, rows) => {
    if (err) {
      console.log('err', err);
    }
    res.json(rows);
  })

});

router.get('/posts/:postSlug', function (req, res) {


  connection.query(
    `SELECT p.slug,
            p.moniker,
            p.media_type as mediaType,
            p.post_date  as postDate,
            s.slug       as sectionSlug
     FROM posts p
              JOIN sections s on s.id = p.section_id
     WHERE p.slug = "${req.params.postSlug}"
       AND live = 1`, (err, rows) => {
      if (err) {
        console.log('err', err);
      }
      res.json(rows[0]);
    });

});

module.exports = router;
