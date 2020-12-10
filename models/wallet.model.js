const sql = require("./db")
const Wallet = function (wallet) {
        this.userID = wallet.userID;
        this.balance = wallet.balance;
        this.btcAddress = wallet.btcAddress;
}

Wallet.getAll = result => {
    sql.query("SELECT * FROM wallet", (err,res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }
      
          console.log("shop: ", res);
          result(null, res);
    });
};

Wallet.findById = (userId, result) => {
    sql.query("SELECT * FROM wallet WHERE userID = ?", userId, (err,res)=>{
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
      
          if (res.length) {
            console.log("found user item: ", res[0]);
            result(null, res[0]);
            return;
          }
      
          // not found Customer with the id
          result({ kind: "not_found" }, null);
    })
}

Wallet.updateByID = (id, wallet, result) => {
    sql.query("UPDATE wallet SET balance = ? btcAddress ? WHERE userID = ?"),
    [wallet.balance, wallet.btcAddress, id],
    (err,res) => {
        if (err){
            console.log("error: ", err);
            result(null,err);
            return;
        }

        if(res.affectedRow == 0){
            result({kind: "not_found"}, null);
            return;
        }

        console.log("updated user: ", {id:  id, ...wallet});
        result(null, {id:id, ...wallet});
    }
}

module.exports = Wallet;
