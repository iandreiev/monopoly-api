module.exports = app =>{
    const uProject = require("../controllers/userprojects.controller");

    app.post("/buy", uProject.buy);
    
}