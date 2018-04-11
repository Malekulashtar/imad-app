var express = require('express');
var morgan = require('morgan');
var path = require('path');
var pool=require('pg').pool;

var config={
    user:'afmul53',
    database:'afmul53',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD,
};

var app = express();
app.use(morgan('combined'));

var articles = {
'article-one':{
title:"Article one|Malekulashtar",
heading:"Article one",
date:"Sep 5,2018",
data:
`<p>
This is my first article.This is my first article.This is my first article.This is my first article.This is my first article.This is my first article.This is my first article.This is my first article.This is my first article.
</p>`
},
'article-two':{
title:"Article two|Malekulashtar",
heading:"Article two",
date:"Sep 10,2018",
data:
`<p>
This is my second article.This is my first article.This is my first article.This is my first article.This is my first article.This is my first article.This is my first article.This is my first article.This is my first article.
</p>`
},
'article-three':{
title:"Article three|Malekulashtar",
heading:"Article three",
date:"Sep 15,2018",
data:
`<p>
This is my third article.This is my first article.This is my first article.This is my first article.This is my first article.This is my first article.This is my first article.This is my first article.This is my first article.
</p>`
}
             };

function createtemplate(content)
{
var title=content.title;
var heading=content.heading;
var date=content.date;
var data=content.data;
var htmltemplate=`
<html>
 <head>
     <title>
       ${title}
     </title>
     <link href="/ui/style.css" rel="stylesheet" /> 
 </head>
<body>
<div class="container">
    <div>
        <a href="/">home</a>
    </div>
    <hr/>
    <h1>${heading}</h1>
      <div> 
       ${date}
      </div>
    <div>
     ${data}
    </div>
</div>
</body>    
</html>
`;
return htmltemplate;
}


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});


var pool=new pool(config);
app.get('/articles/:articlename',function(req,res){
pool.query("SELECT * FROM article WHERE title='"+req.params.artclename+"'",function(err,result){
       if(err){res.status(500).send(err,toString());}
       else{
           if(result.rows.length===0)
           {
               res.status(404).send('article not found')
           }
           else
           {
           res.send(JSON.stringify(result));
       }}
       
   });
});




var counter=0;
app.get('/counter',function(req,res){
    counter=counter+1;
    res.send(counter.toString());
});

var names=[];
app.get('/submit-name',function(req,res){
    var name=req.query.name;
    names.push(name);
    res.send(JSON.stringify(names));
    
});

app.get('/articles/:articlename', function (req, res){ 
   pool.query("SELECT * FROM article WHERE title='"+req.params.artclename+"'",function(err,result){
       if(err){res.status(500).send(err,toString());}
       else{
           if(result.rows.length===0)
           {
               res.status(404).send('article not found');
           }
           else
           {
           var articledata=result.rows[0];
           res.send(createtemplate(articledata));
       }}
       
   });
var articlename=req.params.articlename;

   
});

var counter=0;
app.get('/counter',function(req,res){
    counter=conter+1;
    res.send(counter.toString());
});



app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function() {
 console.log('IMAD course app listening on port ${port}!');
});
