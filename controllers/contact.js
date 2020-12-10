var form_option = {'Design': 'Design', 'Development': 'Development', 'Deployment': 'Deployment', 'Others': 'Others'};
contact_text = "Tell us about your vision: which challenges are you facing? What are your goals and expectation? What would success look and how much are you planning to spend to get there?";
var social_links = {Facebook:{hyper_link: 'https://www.facebook.com/', class:'fab fa-facebook-f', style : 'color: #3d5b99'},
                    Instagram:{hyper_link: 'https://www.instagram.com/techknightsindia/', class:'fab fa-instagram', style: 'background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;" aria-hidden="true'},
                    Twitter:{hyper_link: 'https://twitter.com/?lang=en', class:'fab fa-twitter', style: 'color: #1da1f2'},
                    Linkedin:{hyper_link: 'https://www.linkedin.com/', class:'fab fa-linkedin-in', style: 'color: #2867b2'}
}

var nav_array = {'Home': '/' , 'Blog': 'blog' , 'tools': 'tools' , 'Why Choose Us!': 'why' , 'Contact Us': 'contact'};


module.exports.contact = function(req,res){
    return res.render('contact',{title : 'Contact Us', navLinks : nav_array, formOption: form_option, contactText : contact_text, socialLinks : social_links});
}


module.exports.contact_request = function(req, res,err){
    try{

        Contact_detail.create({
        category : req.body.category,
        name: req.body.name,
        email: req.body.email,
        project_detail: req.body.project_detail
    }, function(err, newCD){
        if(err){
            console.log('Error While Fetching Contact Request');
        return;
        }
        console.log('********',newCD);
        return  res.redirect('Thankyou');
    });
    }
    catch(err){
        return console.log(err);
    }
};