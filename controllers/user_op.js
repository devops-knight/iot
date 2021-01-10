const User_detail = require('../models/user_detail');
const Device_detail = require('../models/device_detail');
const Relay_detail = require('../models/relay_detail');
const { localsName } = require('ejs');
const fs = require('fs');
const path = require('path');
var nav_array = {'Home': '/' , 'Blog': '/blog' , 'tools': '/tools' , 'Why Choose Us!': '/why' , 'Contact Us': '/contact'};

const uri = `https://storage.googleapis.com`;


module.exports.user_signup = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/user/dashboard');
    }
    return res.render('s&s',{title : 'SignUp & SignIn', navLinks:nav_array});
}

module.exports.create_signin = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/user/dashboard');
    }
    return res.render('s&s',{title : 'SignUp & SignIn', navLinks:nav_array});
}

module.exports.create_device = function(req,res){
        console.log(req.user._id);
        try{
            Device_detail.create({
            user: req.user._id,
            name: req.body.name,
            ip : req.body.ip
        }, function(err, device){
            if(err){
                console.log('Error While Fetching Device Request',err);
                return res.redirect('back');;
            }
            console.log('********',device);
            return  res.redirect('back');
        });
        }
        catch(err){
            return console.log(err);
        }
}

module.exports.delete_device = function(req, res){
    Device_detail.findById(req.params.id, function(err, device){
        if(device.user == req.user.id){
            console.log('Device Deleted',device);
            device.remove();
            Relay_detail.deleteMany({device: req.params.id},function(err){
                return  res.redirect('back');
            })
        }
        else{
            return res.redirect('back');
        }
    })
}

module.exports.dashboard = function(req, res){
    Device_detail.find({user:req.user._id}).populate('relays').exec(function(err, dev){
        // console.log(dev);
        return res.render('dashboard',{title: 'Dashboard', navLinks : nav_array, dev: dev});
    })
}

module.exports.create_user = function(req,res){
    User_detail.findOne({email: req.body.email}, function(err,user){
        if(err){
            console.log(`Error In Finding The Email : ${err}`);
            return;
        }
        if(!user)
        {
            User_detail.create(req.body,function(err, user){
                if(err){
                    console.log(`Error In creating user : ${err}`);
                    return;
                }
            })
            console.log("Successfull Created")
            return  res.redirect('../');
        }
        else{
            console.log(`there was an error while creating account: ${err}`);
            return  res.redirect('back');
        }
    })
}


module.exports.profile = function(req, res){
        console.log('welcome!!!!');
        return res.render('user_profile',{title : 'Profile', navLinks : nav_array});
};

module.exports.update_profile = async function(req, res){
    // if(req.user._id == req.params.id){
    //     User_detail.findByIdAndUpdate(req.params.id,req.body, function(err, user){
    //         return res.redirect('back');      
    //     });
    // }
    // else{
    //     return res.status(401).send('Unauthorized');
    // }
    if(req.user._id == req.params.id){
        try{
            let user = await User_detail.findById(req.params.id);
            User_detail.uploadedAvatar(req,res, function(err){
                if(err){
                    console.log(`Multer Err: ${err}`);
                }
                user.name = req.body.uname;
                user.adrs = req.body.adrs;
                user.description = req.body.description;

                if(req.file){

                    // if(user.avatar){
                    //     fs.unlinkSync(path.join(__dirname),'..',user.avatar);
                    // }
                    user.avatar = User_detail.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return  res.redirect('back');
            });
        }
        catch{
            return  res.redirect('back');
        }
    }
    else{
            return res.status(401).send('Unauthorized');
        }
}

module.exports.create_session = function(req, res){
    req.flash('success',' Successfully Logged In');
    return res.redirect('/user/dashboard');
}

module.exports.end_session = function(req, res){

    req.logout();
    req.flash('sucess', 'Successfully Logged Out');
    return res.redirect('/');
}

module.exports.error = function(req,res){
    Relay_detail.find({device:req.params.id},function(err, devices){
            Device_detail.findById(req.params.id,function(err, dev){
                return res.render('error',{title : 'Relay Dashboard', navLinks : nav_array, device: devices, id:req.params.id, dev:dev});
            })
            
    });

}

module.exports.create_relay = function(req, res){
    Device_detail.findById(req.params.id,function(err, device){
        if(device){
            try{
                Relay_detail.create({
                user: req.user._id,
                device : req.params.id,
                name: req.body.name,
                min_val : req.body.min_val,
                max_val: req.body.max_val,
                on_message: req.body.on_message,
                off_message: req.body.off_message,
                status: false,
            }, function(err, device){
                if(err){
                    console.log('Error While Fetching Device Request',err);
                    return res.redirect('back');;
                }
                console.log('********',device);
                return  res.redirect('back');
            });
            }
            catch(err){
                return console.log(err);
            }
        }
    })
};


module.exports.delete_relay = function(req, res){
    Relay_detail.findById(req.params.id, function(err, relay){
        console.log(relay.id);
        if(relay.id == req.params.id){
            console.log('Relay Deleted',relay);
            relay.remove();
            return res.redirect('back');
        }
        else if(err){
            return res.redirect('back',err);
        }
    })
}


module.exports.update_relay = function(req, res){
        Relay_detail.findById(req.params.id, function(err, relay){
            if(relay.status == false)
            {
                Relay_detail.findByIdAndUpdate(req.params.id,{status: true},function(err){
                    if(err){
                        console.log(err);
                    }
                    else{
                        console.log(`Updated ID:${relay.id} ,status:${relay.status}`);
                    }
                })
            }
            else if(relay.status == true)
            {
                Relay_detail.findByIdAndUpdate(req.params.id,{status: false},function(err){
                    if(err){
                        console.log(err);
                    }
                    else{
                        console.log(`Updated ID:${relay.id} ,status:${relay.status}`);
                    }
                })
            }
            // relay.save();
            return res.redirect('back');      
        });
}