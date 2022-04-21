// memanggil express
const express = require("express")

// membuat object app dari express
const app = express()

// memanggil cors
const cors = require("cors")
app.use(cors())

// panggil router outlet
const outlet = require("./routers/outlet")

app.use("/api/outlet", outlet)


// panggil router member
const member = require("./routers/member")

app.use("/api/member", member)


// panggil router paket
const paket = require("./routers/paket")

app.use("/api/paket", paket)

// panggil router users
const users = require("./routers/users")

app.use("/api/users", users)

// panggil router transaksi
const transaksi = require("./routers/transaksi")

app.use("/api/transaksi", transaksi)

// panggil router login
const { login } = require("./routers/login")

app.use("/api/login", login)

// membuat port
app.listen(8000, () => {
    console.log(`Server run on port 8000`);
})