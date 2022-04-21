const { response, request } = require("express")
const express = require("express")
const app = express()

// membaca request dari body dengan tipe json
app.use(express.json())

//panggil models
const models = require("../models/index")

// panggil model "outlet"
const outlet = models.outlet

// panggil fungsi auth -> validasi token
const {auth} = require("./login")

// fungsi auth dijadikan middleware
app.use(auth)

//endpoint for get all outlet
app.get("/", async (request, response) => {
    let dataoutlet = await outlet.findAll()

    return response.json(dataoutlet)
})

//endpoint add new outlet
app.post("/", (request, response) => {
    let newoutlet = {
        nama_outlet: request.body.nama_outlet,
        alamat: request.body.alamat
    }

    outlet.create(newoutlet)
    .then(result => {
        response.json({
            message: `Data berhasil ditambahkan`,
            data: result
        })
    })
    .catch(error => {
        response.json({
            message: error.message
        })
    })
})

//endpoint update data outlet
app.put("/:id_outlet", (request, response) => {
    // tampung data outlet
    let data = {
        nama_outlet: request.body.nama_outlet,
        alamat: request.body.alamat
    }

    let parameter = {
        id_outlet: request.params.id_outlet
    }

    // proses update
    outlet.update(data, {where: parameter})
    .then(result => {
        return response.json({
            message: `Data berhasil diubah`,
            data: result
        })
    })
    .catch(error => {
        return response.json({
            message: error.message
        })
    })
})

//endpoint hapus data outlet
app.delete("/:id_outlet", (request, response) => {
    //tampung data yang akan dihapus
    let parameter = {
        id_outlet: request.params.id_outlet
    }

    // proses hapus
    outlet.destroy({where: parameter})
    .then(result => {
        return response.json({
            message: `Data berhasil dihapus`,
            data: result
        })
    })
    .catch(error => {
        return response.json({
            message: "maaf anda tidak berhak untuk menghapus outlet ini"
        })
    })
})

module.exports = app