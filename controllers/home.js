var doc_links = { Documentation:{ hyper_link: 'https://en.wikipedia.org/wiki/Home_automation', font_awesome:'fa fa-file-text'}, Illustration:{ hyper_link:'illustration', font_awesome:'fa fa-arrow-right'}};
var nav_array = {'Home': '/' , 'Blog': 'blog' , 'tools': 'tools' , 'Why Choose Us!': 'why' , 'Contact Us': 'contact'};

let user = 1;

module.exports.home = function(req, res){
    return res.render('home',{title: 'Home', DocLinks: doc_links, navLinks : nav_array, user : user});
}