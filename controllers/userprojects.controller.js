const UserProject = require("../models/userprojects.model")

exports.buy = (req,res)=>{
    if (!req.body) {
        res.status(400).send({
            message: "Content cannotbe empty!"
        });
    }
    
    const uProject = new UserProject({
        userID: req.body.userID,
        projectID: req.body.projectID,
        createdAt: req.body.createdAt,
        userfunded: req.body.userfunded,
        percentage: req.body.percentage,
        shareSize: req.body.shareSize
    });

    UserProject.buy(uProject, (err,data)=>{
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occured while buying project."
            });
        else res.send(data);
    })

}