const sql = require("./db")

/*
Payment types

Coinpayments: 101
VISA: 102
MC: 103

Conditions as proviso:
Enrollment: 200
Provided: 201
Canceled: 401
*/

const Payment = function (pay) {
    this.userID = pay.userID;
    this.type = pay.type;
    this.amount = pay.amount;
    this.rate_btc = pay.rate_btc;  
    this.projectID = pay.projectID;
    this.createdAt = new Date();  
    this.shareSize = pay.shareSize;
}


// Provide payment data to the system
Payment.create = (newPay, result) => {
    sql.query("INSERT INTO transactions SET ?", newPay, (err,res)=>{
        if(err){
            console.log("Error: ", err);
            result(err,null);
            return;
        }

        console.log("TX created: ", {id: res.insertId, ...newPay});
        result(null, {id: res.insertId, ...newPay}); 
    })
}

//Update status of current payment data
// Available statuses:
// - 0 - cancelled
// - 1 - success
// - 2 - pending

Payment.updateType = (id, type, result) => {
    sql.query("UPDATE transactions SET type = ? WHERE id = ?", [type, id], (err,res)=>{
        if (err){
            console.log("error: ", err);
            result(null,err);
            return;
        }

        if(res.affectedRow == 0){
            result({kind: "not_found"}, null);
            return;
        }

        console.log("updated project: ", {id:  id, type: type});
        result(null, {id:id, type: type});
    })
}

// Get all transactions

Payment.getAll = result => {
    sql.query("SELECT * FROM transactions", (err,res)=>{
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }
      
          console.log("Project: ", res);
          result(null, res);  
    })
}

Payment.findById = (userId, result) =>{
    sql.query("SELECT * FROM transactions WHERE userID = ?", userId, (err,res)=>{
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
      
          if (res.length) {
            console.log("found project item: ", res);
            result(null, res);
            return;
          }
      
          // not found project with the id
          result({ kind: "not_found" }, null); 
    })
}

module.exports =  Payment;