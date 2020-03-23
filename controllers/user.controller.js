var db = require('../db');
const shortid = require('shortid');
const Joi = require('joi');

module.exports.index = function(req,res) {
    res.render("users/index",{
        users: db.get('users').value()
    });
};

module.exports.search = function(req,res) {
    var q = req.query.q;
    var matchedUsers = db.get('users').value().filter(user => {
     return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
     });
    res.render("users/index",{
        users: matchedUsers
    });
};

module.exports.create = function(req,res){
    res.render("users/create");
};

module.exports.get = function (req,res){
    var id = req.params.id;
    var user = db.get("users").find({id: id}).value();
    res.render("users/view",{
        user: user
    });
};

module.exports.postCreate = function(req,res) {
    req.body.id = shortid.generate();

    const schema = {
        name: Joi.string()
            .min(3)
            .max(30)
            .required(),
        phone: Joi.string()
            .min(3)
            .max(30)
            .required(),
        id: Joi.string()
    };
    const {error} = Joi.validate(req.body,schema);
    if(error)
    {
        res.render("users/create",{
            errors: error.details[0].message,
            values: req.body
        });
        return;
    }
    db.get('users').push(req.body).write();
    res.redirect("/users/");
};