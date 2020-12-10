module.exports = app =>{
    const user = require("../controllers/users.controller.js");

    app.post("/users", user.create);
    app.get("/users", user.findAll);
    app.get("/users/:userId", user.findOne);
    app.get("/users/projects/:userId", user.getUP);
    app.patch("/users/:userId", user.update);
    app.patch("/users/:userId/:roleId", user.role);
    app.delete("/users/:userId", user.delete);
}