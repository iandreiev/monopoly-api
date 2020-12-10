const sql = require("./db")

const UserProject = function (userProject) {
    this.userID = userProject.userID;
    this.projectID = userProject.projectID;
    this.createdAt = new Date();
    this.userfunded = userProject.userfunded;
    this.percentage = userProject.percentage;
    this.shareSize = userProject.shareSize;
}


UserProject.buy = (newUserProject,result) => {
    sql.query("INSERT INTO userprojects SET ?", newUserProject, (err,res)=>{
      if(err){
          console.log("Error: ", err);
          result(err,null);
          return;
      }

      console.log("Project item created: ", {id: res.insertId, ...newUserProject});
      result(null, {id: res.insertId, ...newUserProject}); 
    })
}

UserProject.setToUser = (id, type, ) => {

}

module.exports = UserProject;