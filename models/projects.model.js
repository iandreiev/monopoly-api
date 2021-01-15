const sql = require("./db.js");

const Project = function(project){
    this.title = project.title;
    this.title_en = project.title_en;
    this.title_ch = project.title_ch;
    this.category = project.category;
    this.projectBrief = project.projectBrief;
    this.projectBrief_en = project.projectBrief_en;
    this.projectBrief_ch = project.projectBrief_ch;
    this.funded = project.funded;
    this.pledged = project.pledged;
    this.backers = project.backers;
    this.createdAt = new Date().toDateString();
    this.entrance = project.entrance;
    this.image = project.image;
    this.yield = project.yield;
    this.returns = project.returns;
    this.minimum = project.minimum;
    this.cost = project.cost;
    this.location = project.location;
    this.location_en = project.location_en;
    this.location_ch = project.location_ch;
}




//Create
Project.create = (newProject, result) => {
    sql.query("INSERT INTO projects SET ?", newProject, (err,res)=>{
        if(err){
            console.log("Error: ", err);
            result(err,null);
            return;
        }

        console.log("Project item created: ", {id: res.insertId, ...newProject});
        result(null, {id: res.insertId, ...newProject}); 
    })
}

//GetAll
Project.getAll = result => {
    sql.query("SELECT * FROM projects", (err,res)=>{
       
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }

          console.log("Project ID", res[0].id)
      
          console.log("Project: ", res);
          result(null, res);  
    })
}

//GetById
Project.findById = (projectId, result) => {
    sql.query("SELECT * FROM projects WHERE id = ?", projectId, (err,res)=>{
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
      
          if (res.length) {
            console.log("found project item: ", res[0]);
            result(null, res[0]);
            return;
          }
      
          // not found project with the id
          result({ kind: "not_found" }, null);
    })
}

Project.getByCat = (catId, result) =>{
    sql.query("SELECT * FROM projects WHERE category = ?", catId, (err,res)=>{
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

//Update
Project.updateById = (id, project, result) => {
    sql.query("UPDATE projects SET title = ?, category = ?, projectBrief = ?, funded = ?, backers = ?, createdAt = ?, entrance = ?, image = ?, videos = ?, yield = ?, returns = ?, minimum = ?, cost = ?, location = ?, title_en = ?, projectBrief_en = ?, location_en = ?, title_ch = ?, projectBrief_ch= ?, location_ch = ? WHERE id = ?",
    [project.title, project.category, project.projectBrief, project.funded, project.backers, project.createdAt, project.entrance, project.image, project.videos, project.yield, project.returns, project.minimum, project.cost, project.location, project.title_en, project.projectBrief_en, project.location_en, project.title_ch, project.projectBrief_ch, project.location_ch, id],
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

        console.log("updated project: ", {id:  id, ...project});
        result(null, {id:id, ...project});
    }
    );   
}

//Remove
Project.remove = (id, result) => {
    sql.query("DELETE FROM projects WHERE id = ?", id, (err, res) => {
        if(err){
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if(res.affectedRow == 0){
            result({kind: "not_found"}, null);
            return;
        }

        console.log("deleted project with id: ", id);
        result(null, res);
    });
  };



module.exports = Project;

