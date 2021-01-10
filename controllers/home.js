var doc_links = { Documentation:{ hyper_link: 'https://en.wikipedia.org/wiki/Home_automation', font_awesome:'fa fa-file-text'}, Illustration:{ hyper_link:'illustration', font_awesome:'fa fa-arrow-right'}};

var nav_array = {'Home': '/' , 'Blog': 'blog' , 'tools': 'tools' , 'Why Choose Us!': 'why' , 'Contact Us': 'contact'};

const passport = require('passport-local');

module.exports.home = function(req, res){
    return res.render('home',{title: 'Home', DocLinks: doc_links, navLinks : nav_array});
}

module.exports.Illustration = function(req,res){
    return res.render('illustration', {title : 'Illustration', navLinks : nav_array});
}

module.exports.tools = function(req, res){
    return res.render('Tools',{title: 'Tools', navLinks : nav_array});
}