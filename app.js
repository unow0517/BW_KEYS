const express = require('express')
const app = express()
const port = 3000
const mysql = require('mysql');
const bp = require('body-parser');
const ejsMate = require('ejs-mate');

// SQL Connection 
const connection = mysql.createConnection({
  host     : 'database-1.c4kji6aomgu8.eu-central-1.rds.amazonaws.com',
  user     : 'admin',
  password : 'Fhtep2031!',
  database : 'bw_keys'
});

connection.connect();

q = 'SELECT * from land'

// connection.query(q, function (error, results, fields) {
//   if (error) throw error;
//   console.log('console.log', typeof (results[0]));
//   console.log('stringify', typeof (JSON.stringify(results[0])));
//   const r = JSON.stringify(results[0])
// });
// connection.end();
// SQL Connection

app.use(bp.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.engine('ejs',ejsMate)
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  q = `SELECT * FROM bw_keys.regbez RIGHT JOIN bw_keys.region ON regbez.RegbezNr = region.Regbez_id RIGHT JOIN bw_keys.kreis ON kreis.RegionNr = region.RegionNr RIGHT JOIN bw_keys.gemeinde ON gemeinde.KreisNr = kreis.KreisNr RIGHT JOIN bw_keys.gemarkung ON gemarkung.GemeindeNr = gemeinde.GemeindeNr RIGHT JOIN bw_keys.flurname ON flurname.GemarkungNr = gemarkung.GemarkungNr`
  connection.query(q, function (error, results, fields) {
    if (error) throw error;
    const regBez = [];
    const region = [];
    const kreis = [];
    const gemeinde = [];
    const gemarkung = [];
    const flurname = []
    for (let i = 0; i < results.length; i++){
      regBez.push(results[i].Regbez);
      region.push(results[i].Region);
      kreis.push(results[i].Kreis);
      gemeinde.push(results[i].Gemeinde);
      gemarkung.push(results[i].Gemarkung);
      flurname.push(results[i].Flurname);
    }
    const setRegbez = [... new Set(regBez)]
    const setRegion = [... new Set(region)]
    const setKreis = [... new Set(kreis)]
    const setGemeinde = [... new Set(gemeinde)]
    const setGemarkung = [... new Set(gemarkung)]
    const setFlurname = [... new Set(flurname)]
    res.render('home', {
      data: {
        setRegbez, setRegion, setKreis, setGemeinde, setGemarkung, setFlurname,results
      }
    })
  });

})

app.post('/searchregbez', (req, res) => {
  console.log(req.body.regbez)
const userFilter=JSON.stringify(req.body)
  q = `SELECT RegbezNr,Regbez,region.RegionNr,Region,kreis.KreisNr,Kreis,gemeinde.GemeindeNr,Gemeinde,gemarkung.GemarkungNr,Gemarkung,FlurNr,Flurname FROM bw_keys.regbez RIGHT JOIN bw_keys.region ON regbez.RegbezNr = region.Regbez_id RIGHT JOIN bw_keys.kreis ON kreis.RegionNr = region.RegionNr RIGHT JOIN bw_keys.gemeinde ON gemeinde.KreisNr = kreis.KreisNr RIGHT JOIN bw_keys.gemarkung ON gemarkung.GemeindeNr = gemeinde.GemeindeNr RIGHT JOIN bw_keys.flurname ON flurname.GemarkungNr = gemarkung.GemarkungNr WHERE Regbez='${req.body.regbez}';`
  console.log(q)
  connection.query(q, function (error, results, fields) {
    if (error) throw error;
    const regBez = [];
    const region = [];
    const kreis = [];
    const gemeinde = [];
    const gemarkung = [];
    const flurname = []
    for (let i = 0; i < results.length; i++){
      regBez.push(results[i].Regbez);
      region.push(results[i].Region);
      kreis.push(results[i].Kreis);
      gemeinde.push(results[i].Gemeinde);
      gemarkung.push(results[i].Gemarkung);
      flurname.push(results[i].Flurname);
    }
    const setRegbez = [... new Set(regBez)]
    const setRegion = [... new Set(region)]
    const setKreis = [... new Set(kreis)]
    const setGemeinde = [... new Set(gemeinde)]
    const setGemarkung = [... new Set(gemarkung)]
    const setFlurname = [... new Set(flurname)]
    res.render('search', {
      data: {
        setRegbez, setRegion, setKreis, setGemeinde, setGemarkung, setFlurname, results,userFilter
      }
    })
  });
})

app.post('/searchregion', (req, res) => {
  console.log(req.body)
const userFilter=JSON.stringify(req.body)
  q = `SELECT RegbezNr,Regbez,region.RegionNr,Region,kreis.KreisNr,Kreis,gemeinde.GemeindeNr,Gemeinde,gemarkung.GemarkungNr,Gemarkung,FlurNr,Flurname FROM bw_keys.regbez RIGHT JOIN bw_keys.region ON regbez.RegbezNr = region.Regbez_id RIGHT JOIN bw_keys.kreis ON kreis.RegionNr = region.RegionNr RIGHT JOIN bw_keys.gemeinde ON gemeinde.KreisNr = kreis.KreisNr RIGHT JOIN bw_keys.gemarkung ON gemarkung.GemeindeNr = gemeinde.GemeindeNr RIGHT JOIN bw_keys.flurname ON flurname.GemarkungNr = gemarkung.GemarkungNr WHERE Region='${req.body.region}';`
  connection.query(q, function (error, results, fields) {
    if (error) throw error;
    const regBez = [];
    const region = [];
    const kreis = [];
    const gemeinde = [];
    const gemarkung = [];
    const flurname = []
    for (let i = 0; i < results.length; i++){
      regBez.push(results[i].Regbez);
      region.push(results[i].Region);
      kreis.push(results[i].Kreis);
      gemeinde.push(results[i].Gemeinde);
      gemarkung.push(results[i].Gemarkung);
      flurname.push(results[i].Flurname);
    }
    const setRegbez = [... new Set(regBez)]
    const setRegion = [... new Set(region)]
    const setKreis = [... new Set(kreis)]
    const setGemeinde = [... new Set(gemeinde)]
    const setGemarkung = [... new Set(gemarkung)]
    const setFlurname = [... new Set(flurname)]
    res.render('search', {
      data: {
        setRegbez, setRegion, setKreis, setGemeinde, setGemarkung, setFlurname,results,userFilter
      }
    })
  });
  });

app.post('/searchkreis', (req, res) => {
  console.log(req.body)
const userFilter=JSON.stringify(req.body)
  q = `SELECT RegbezNr,Regbez,region.RegionNr,Region,kreis.KreisNr,Kreis,gemeinde.GemeindeNr,Gemeinde,gemarkung.GemarkungNr,Gemarkung,FlurNr,Flurname FROM bw_keys.regbez RIGHT JOIN bw_keys.region ON regbez.RegbezNr = region.Regbez_id RIGHT JOIN bw_keys.kreis ON kreis.RegionNr = region.RegionNr RIGHT JOIN bw_keys.gemeinde ON gemeinde.KreisNr = kreis.KreisNr RIGHT JOIN bw_keys.gemarkung ON gemarkung.GemeindeNr = gemeinde.GemeindeNr RIGHT JOIN bw_keys.flurname ON flurname.GemarkungNr = gemarkung.GemarkungNr WHERE Kreis='${req.body.kreis}';`
  connection.query(q, function (error, results, fields) {
    if (error) throw error;
    const regBez = [];
    const region = [];
    const kreis = [];
    const gemeinde = [];
    const gemarkung = [];
    const flurname = []
    for (let i = 0; i < results.length; i++){
      regBez.push(results[i].Regbez);
      region.push(results[i].Region);
      kreis.push(results[i].Kreis);
      gemeinde.push(results[i].Gemeinde);
      gemarkung.push(results[i].Gemarkung);
      flurname.push(results[i].Flurname);
    }
    const setRegbez = [... new Set(regBez)]
    const setRegion = [... new Set(region)]
    const setKreis = [... new Set(kreis)]
    const setGemeinde = [... new Set(gemeinde)]
    const setGemarkung = [... new Set(gemarkung)]
    const setFlurname = [... new Set(flurname)]
    res.render('search', {
      data: {
        setRegbez, setRegion, setKreis, setGemeinde, setGemarkung, setFlurname,results,userFilter
      }
    })
  });
})

app.post('/searchgemeinde', (req, res) => {
  console.log(req.body)
const userFilter=JSON.stringify(req.body)
  q = `SELECT RegbezNr,Regbez,region.RegionNr,Region,kreis.KreisNr,Kreis,gemeinde.GemeindeNr,Gemeinde,gemarkung.GemarkungNr,Gemarkung,FlurNr,Flurname FROM bw_keys.regbez RIGHT JOIN bw_keys.region ON regbez.RegbezNr = region.Regbez_id RIGHT JOIN bw_keys.kreis ON kreis.RegionNr = region.RegionNr RIGHT JOIN bw_keys.gemeinde ON gemeinde.KreisNr = kreis.KreisNr RIGHT JOIN bw_keys.gemarkung ON gemarkung.GemeindeNr = gemeinde.GemeindeNr RIGHT JOIN bw_keys.flurname ON flurname.GemarkungNr = gemarkung.GemarkungNr WHERE Gemeinde='${req.body.gemeinde}';`
  connection.query(q, function (error, results, fields) {
    if (error) throw error;
    const regBez = [];
    const region = [];
    const kreis = [];
    const gemeinde = [];
    const gemarkung = [];
    const flurname = []
    for (let i = 0; i < results.length; i++){
      regBez.push(results[i].Regbez);
      region.push(results[i].Region);
      kreis.push(results[i].Kreis);
      gemeinde.push(results[i].Gemeinde);
      gemarkung.push(results[i].Gemarkung);
      flurname.push(results[i].Flurname);
    }
    const setRegbez = [... new Set(regBez)]
    const setRegion = [... new Set(region)]
    const setKreis = [... new Set(kreis)]
    const setGemeinde = [... new Set(gemeinde)]
    const setGemarkung = [... new Set(gemarkung)]
    const setFlurname = [... new Set(flurname)]
    res.render('search', {
      data: {
        setRegbez, setRegion, setKreis, setGemeinde, setGemarkung, setFlurname,results,userFilter
      }
    })
  });
})

app.post('/searchgemarkung', (req, res) => {
  console.log(req.body)
const userFilter=JSON.stringify(req.body)
  q = `SELECT RegbezNr,Regbez,region.RegionNr,Region,kreis.KreisNr,Kreis,gemeinde.GemeindeNr,Gemeinde,gemarkung.GemarkungNr,Gemarkung,FlurNr,Flurname FROM bw_keys.regbez RIGHT JOIN bw_keys.region ON regbez.RegbezNr = region.Regbez_id RIGHT JOIN bw_keys.kreis ON kreis.RegionNr = region.RegionNr RIGHT JOIN bw_keys.gemeinde ON gemeinde.KreisNr = kreis.KreisNr RIGHT JOIN bw_keys.gemarkung ON gemarkung.GemeindeNr = gemeinde.GemeindeNr RIGHT JOIN bw_keys.flurname ON flurname.GemarkungNr = gemarkung.GemarkungNr WHERE Gemarkung='${req.body.gemarkung}';`
  connection.query(q, function (error, results, fields) {
    if (error) throw error;
    const regBez = [];
    const region = [];
    const kreis = [];
    const gemeinde = [];
    const gemarkung = [];
    const flurname = []
    for (let i = 0; i < results.length; i++){
      regBez.push(results[i].Regbez);
      region.push(results[i].Region);
      kreis.push(results[i].Kreis);
      gemeinde.push(results[i].Gemeinde);
      gemarkung.push(results[i].Gemarkung);
      flurname.push(results[i].Flurname);
    }
    const setRegbez = [... new Set(regBez)]
    const setRegion = [... new Set(region)]
    const setKreis = [... new Set(kreis)]
    const setGemeinde = [... new Set(gemeinde)]
    const setGemarkung = [... new Set(gemarkung)]
    const setFlurname = [... new Set(flurname)]
    res.render('search', {
      data: {
        setRegbez, setRegion, setKreis, setGemeinde, setGemarkung, setFlurname,results,userFilter
      }
    })
  });
})

app.post('/searchflurname', (req, res) => {
  console.log(req.body)
const userFilter=JSON.stringify(req.body)
  q = `SELECT RegbezNr,Regbez,region.RegionNr,Region,kreis.KreisNr,Kreis,gemeinde.GemeindeNr,Gemeinde,gemarkung.GemarkungNr,Gemarkung,FlurNr,Flurname FROM bw_keys.regbez RIGHT JOIN bw_keys.region ON regbez.RegbezNr = region.Regbez_id RIGHT JOIN bw_keys.kreis ON kreis.RegionNr = region.RegionNr RIGHT JOIN bw_keys.gemeinde ON gemeinde.KreisNr = kreis.KreisNr RIGHT JOIN bw_keys.gemarkung ON gemarkung.GemeindeNr = gemeinde.GemeindeNr RIGHT JOIN bw_keys.flurname ON flurname.GemarkungNr = gemarkung.GemarkungNr WHERE Flurname ='${req.body.flurname}';`
  connection.query(q, function (error, results, fields) {
    if (error) throw error;
    const regBez = [];
    const region = [];
    const kreis = [];
    const gemeinde = [];
    const gemarkung = [];
    const flurname = [];
    console.log(results)
    for (let i = 0; i < results.length; i++){
      regBez.push(results[i].Regbez);
      region.push(results[i].Region);
      kreis.push(results[i].Kreis);
      gemeinde.push(results[i].Gemeinde);
      gemarkung.push(results[i].Gemarkung);
      flurname.push(results[i].Flurname);
    }
    const setRegbez = [... new Set(regBez)]
    const setRegion = [... new Set(region)]
    const setKreis = [... new Set(kreis)]
    const setGemeinde = [... new Set(gemeinde)]
    const setGemarkung = [... new Set(gemarkung)]
    const setFlurname = [... new Set(flurname)]
    res.render('search', {
      data: {
        setRegbez, setRegion, setKreis, setGemeinde, setGemarkung, setFlurname, results, userFilter
      }
    })
  });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


