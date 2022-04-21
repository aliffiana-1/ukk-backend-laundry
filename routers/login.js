const express = require ("express")
const md5 = require("md5")
const login = express()
login.use(express.json())
const jwt = require("jsonwebtoken")
const secretKey = "underpresser"

const models = require("../models/index")
const { response } = require("express")
const user = models.users;

login.post('/', async(request, response) => {
    let newLogin = {
        username: request.body.username,
        password: md5(request.body.password)
    }
    let dataUser = await user.findOne({
        where: newLogin
    });
    
    if(dataUser){
        let payload = JSON.stringify(dataUser)
        let  token = jwt.sign(payload,secretKey)
        return response.json({
            logged: true,
            token: token,
            user: dataUser,
        })
    } else {
        return response.json({
            logged: false,
            message: `Invalid username or password`
        })
    }
})

// fungsi auth digunakan untuk verifikasi token yang dikirimkan
const auth = (request, response, next) => {
    // mendapatkan data authorization
    let header = request.headers.authorization
    // header = Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZF91c2Vy

    // ambil data token
    let token = header && header.split(" ")[1]

    if(token == null){
        // jika token kosong
        return response.status(401).json({
            message: `Unauthorized`
        })
    } else {
        let jwtHeader = {
            algorithm: "HS256"
        }

        // verifikasi token yang diberikan 
        // mengembalikan ke bentuk semula
        jwt.verify(token, secretKey, jwtHeader, error => {
            if(error){
                return response.status(401).json({
                    message: `Invalid token`
                })
            } else {
                next()
            }
        })
    }
}

module.exports = {login, auth}