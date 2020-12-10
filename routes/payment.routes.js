const Coinpayments = require('coinpayments');
const pay = require("../controllers/payment.controller")
    
var client = new Coinpayments({
    key: "fe0a53535bb85a5305c0cb0695940c83b6357710b1a96a2961e81a637db735e6",
    secret: "0CC260cB0f19675eC4348A3cb0bC4194F4977321e6fcAd4306Dbc773ce1557Fd",
  });
  
  client.balances((err,res)=>{
      if(err){
          console.log(err)
      } else {
          console.log(res)
      }
  })

module.exports = app => {
      app.post("/doTx", pay.create);
      app.get("/doTx", pay.findAll);
      app.patch("/doTx/setType/:txId/:typeId", pay.setType);
      app.get("/doTx/user/:userId", pay.findOne);

}



  // Create payment
  // - Create transaction with data from client
