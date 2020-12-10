const User_detail = require('../models/user_detail');
var nav_array = {'Home': '/' , 'Blog': 'blog' , 'tools': 'tools' , 'Why Choose Us!': 'why' , 'Contact Us': 'contact'};


module.exports.user_signup = function(req,res){
    // if(req.cookies.user_id){
    //     User_detail.findById(req.cookies.user_id,function(err,user){
    //         if(user){
    //             return res.send(404);
    //         }
    //     else{
            return res.render('s&s',{title : 'SignUp & SignIn', navLinks:nav_array});
        }
//     })
//     }
// }

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


module.exports.create_session = function(req,res){
    User_detail.findOne({email: req.body.email}, function(err,user){
        if(err){
            console.log(`Error In Finding The Email : ${err}`);
            return;
        }
        if(user)
        {
           if(user.password != req.body.password){
               console.log('Password Does not match');
               return res.redirect('back');
           }
            res.cookie('user_id',user.id);
            console.log("Successfull SignIn");
            return  res.redirect('/user/profile');
        }
        else{
            console.log(`User Not Found!!!`);
            return  res.redirect('back');
        }
    })
}


module.exports.profile = function(req, res){
    if(req.cookies.user_id){
        User_detail.findById(req.cookies.user_id,function(err,user){
            if(user){
                return res.render('user_profile',{title : 'Profile', navLinks : nav_array,user,user});
            }
            return res.redirect('/user/signup');
        });
    }else{
        return res.redirect('/user/signup');
    }
};