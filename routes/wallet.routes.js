module.exports = app =>{
    const wallet = require("../controllers/wallet.controller")

    app.get("/users/wallets", wallet.findAll);
    app.get("/users/:userId/wallet", wallet.findOne);
    app.patch("/users/:userId/wallet", wallet.update);
    
}