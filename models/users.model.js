const sql = require("./db.js");

const User = function (user) {
    this.name = user.name;
    this.surname = user.surname;
    this.fathername = user.fathername;
    this.avatar = user.avatar;
    this.email = user.email;
    this.token = user.token;
    this.sex = user.sex;
    this.taxid = user.taxid;
    this.passport_1 = user.passport_1;
    this.passport_2 = user.passport_2;
    this.phone = user.phone;
    this.isVerified = user.isVerified;
    this.isPhoneVerified = user.isPhoneVerified;
    this.isEmailVerified = user.isEmailVerified;
    this.affiliate = user.email;
    this.status = user.status;
    this.rating = user.rating;
    this.invested = user.invested;
    this.sharings = user.sharings;
    this.avgReturns = user.avgReturns;
    this.totalReturns = user.totalReturns;
};


/*
Roles
0 - user
1 - admin
2 - moderator
3 - banned

Statuses
4 - Gold
5 - Platinum
6 - Silver
*/

User.create = (newUser, result) => {

    const user = newUser
    //Check, if user exists
    sql.query("SELECT * FROM users WHERE email = ?", user.email, (err, rows)=>{

        const emailDb = rows[0] ? rows[0].email : '';

        if(!emailDb){

            sql.query(`INSERT INTO users SET ?`, user, (err, res)=>{
               
                if(err){
                    console.log(err);
                }

                console.log(null, {id: res.insertId, ...newUser});
                result(null, {id: res.insertId, ...newUser})
                
                const userId = res.insertId

                sql.query(`INSERT INTO wallet SET userID = ?`, userId,(err,res)=>{
                    if(err){
                        console.log(err);
                    }

                })          
                return;                
            })
        }else{
            sql.query("SELECT * FROM users WHERE email = ?", rows[0].email, (err, res) => {
                console.log("Logged as: ", res[0]);
                result(null,res[0]);
                return;
            })
        }
    })
}

User.getAll = result => {
    sql.query("SELECT * FROM users", (err,res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }
      
          console.log("shop: ", res);
          result(null, res);
    });
};

User.findById = (userId, result) => {
    sql.query("SELECT * FROM users INNER JOIN userprojects ON userprojects.userID = users.id INNER JOIN userstats ON userstats.userID = users.id WHERE users.id = ?", userId, (err,res)=>{
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

User.updateById = (id,user, result) => { 
    sql.query("UPDATE users SET name = ?, surname = ?, displayName = ?, taxid = ?, phone = ?, email = ?, sex = ?, isVerified = ?, isPhoneVerified = ?, isEmailVerified = ?, passport_1 = ?, passport_2 = ? WHERE id = ?",
    [user.name, user.surname, user.displayName, user.taxid, user.phone, user.email, user.sex, user.isVerified, user.isPhoneVerified, user.isEmailVerified, user.passport_1, user.passport_2, id],
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

        console.log("updated user: ", {id:  id, ...user});
        result(null, {id:id, ...user});
    })
}

User.remove = (id, result) => {
    sql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
        if(err){
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if(res.affectedRow == 0){
            result({kind: "not_found"}, null);
            return;
        }

        console.log("deleted user with id: ", id);
        result(null, res);
    });
  };

  User.getUserProjects = (id,result) =>{
      sql.query("SELECT projects.*, userprojects.userID, userprojects.createdAt, userprojects.userfunded, userprojects.percentage, userprojects.shareSize from projects inner join userprojects on userprojects.projectId = projects.id WHERE userID = ?", id, (err,res)=>{
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }
      
          console.log("user projects: ", res);
          result(null, res);
      })
  }

User.setRole = (id, type) => {
    sql.query("UPDATE users SET type = ? WHERE id = ?", [type, id], (err,res)=>{
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }
      
          console.log("set role: ", res);
          result(null, res);
      })
}

module.exports = User;
