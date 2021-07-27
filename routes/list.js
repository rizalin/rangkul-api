const express = require('express');
const router = express.Router();

const dummy = require("../public/javascripts/dummy")

/* GET all project. */
router.get('/projects', (req, res, next) => {
  try{
    res.send({message: "Data ditemukan", data: dummy});
  } catch (e) {
    res.send({message: "Terjadi kesalahan"})
    res.status(500)
  }
});

/* GET project detail. */
router.get('/projects/:id', (req, res, next) => {
  const id = req.params.id

  if(!id){
    res.send({message: "Id tidak ditemukan"})
    return res.status(204)
  }

  try {
    const project = dummy.filter(item => item.id === parseInt(id))

    if (project.length > 0) {
      res.send({message: "Data ditemukan", data: project[0]});
    } else {
      res.send({message: "Data tidak ditemukan", data: []})
      res.status(204)
    }
  } catch (e) {
    res.send({message: "Terjadi kesalahan"})
    res.status(500)
  }


});

/* GET all donation from project. */
router.get('/donations/:id', (req, res, next) => {
  const id = req.params.id

  if(!id){
    res.send({message: "Id tidak ditemukan"})
    return res.status(204)
  }

  try {
    const project = dummy.filter(item => item.id === parseInt(id))

    if (project.length > 0) {
      const donations = project[0].donations

      if(donations.length > 0){
        res.send({message: "Data ditemukan", data: donations});
      }

    } else {
      res.send({message: "Data tidak ditemukan", data: []})
      res.status(204)
    }
  } catch (e) {
    console.log(e)
    res.send({message: "Terjadi kesalahan"})
    res.status(500)
  }
});

module.exports = router;
