// exports.render = function(req, res){
//    res.render('index', {
//        'title' : 'Hello World',
//        'message' : 'How are things',
//        'test' : 'wow'
//    });

   // res.send('Hello World');

exports.render = function(req, res){
   var isLoggedIn = false;

   if(typeof req.session.remember !== 'undefined'){
       isLoggedIn = req.session.remember;
   }

   res.render('index', {
       title: 'Hello World',
       isLoggedIn: isLoggedIn
   })
   
};