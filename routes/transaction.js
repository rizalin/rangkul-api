const express = require('express');
const router = express.Router();

const dummy = require("../public/javascripts/dummy")

/* Add project. */
router.post('/project', (req, res, next) => {
  try {
    const body = req.body
    let isValidated = true
    const errorObject = {}

    if (!body.project_name) {
      isValidated = false
      errorObject.project_name = "Nama project wajib diisi"
    }

    if (!body.image) {
      isValidated = false
      errorObject.image = "Gambar wajib diisi"
    }

    if (!body.short_description) {
      isValidated = false
      errorObject.short_description = "Deskripsi pendek wajib diisi"
    }

    if (!body.description) {
      isValidated = false
      errorObject.description = "Deskripsi wajib diisi"
    }

    if (!body.goal_amount) {
      isValidated = false
      errorObject.goal_amount = "Target jumlah wajib diisi"
    }

    // if(!body.current_amount){
    //   isValidated = false
    //   errorObject.current_amount = "Jumlah saat ini wajib diisi"
    // }

    if (!body.expired_date) {
      isValidated = false
      errorObject.expired_date = "Masa waktu wajib diisi"
    }

    if (!isValidated) {
      res.send({message: "Beberapa belum diisi", error: errorObject},)
      res.status(400)
    } else {
      res.send({message: "Data berhasil dinput", data: {...body, createdAt: new Date()}},)
      res.status(201)
    }

  } catch (e) {
    res.send({message: "Terjadi kesalahan"})
    res.status(500)
  }
});

/* Add donasi. */
router.post('/donasi/:id', (req, res, next) => {
  const id = req.params.id

  if (!id) {
    res.send({message: "Id tidak ditemukan"})
    return res.status(204)
  }


  try {
    const project = dummy.filter(item => item.id === parseInt(id))

    if (project.length > 0) {
      const donations = project[0].donations

      const body = req.body
      let isValidated = true
      const errorObject = {}

      if (!body.name) {
        isValidated = false
        errorObject.project_name = "Nama wajib diisi"
      }

      if (!body.amount) {
        isValidated = false
        errorObject.amount = "Jumlah donasi wajib diisi"
      }

      if (!isValidated) {
        res.send({message: "Beberapa belum diisi", error: errorObject},)
        res.status(400)
      } else {
        res.send({message: "Data berhasil dinput", data: {...body, project_id: id, createdAt: new Date()}},)
        res.status(201)
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
