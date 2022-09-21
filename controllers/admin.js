const User = require('../models/user');

exports.postAddUser = (req, res, next) => {
    //console.log('req body in controller:',req.body);
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    
    User.create({
        name: name,
        email: email,
        phone: phone
    })
        .then(result => {
            console.log('user created', result);
            res.status(200).json({});
        })
        .catch(err => {
            res.status(500);
            console.log(err);
        })
}

exports.getUsers = (req, res, next) => {
    try{
        User.findAll()
            .then((result) => {
                console.log('get request result: ', result);
                res.status(200).json(result);
            })
            .catch(err => console.log(err));
    } catch(err) {
        console.log(err);
    }   
}

exports.getEditUser = (req, res, next) => {
    let id = req.params.id;
    let toSendUser;
    User.findByPk(id)
        .then(user => {
            toSendUser = user;
            return user.destroy();
        })
        .then(() => {
            res.status(200).json(toSendUser);
        })
        .catch(err => console.log(err));
}

exports.getDeleteUser = (req, res, next) => {
    let id = req.params.id;
    let deletedUser;
    User.findByPk(id)
        .then(user => {
            deletedUser = user;
            return user.destroy();
        })
        .then(() => {
            res.status(200).json(deletedUser);
        })
        .catch(err => console.log(err));
}