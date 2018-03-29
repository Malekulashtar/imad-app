var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles={
article_one:
{
    title:"Article one|Malekulashtar",
    heading:"Article one",
    date:"Sep 5,2018",
    data:
        `<p>
     This is my first article.This is my first article.This is my first article.This is my first article.This is my first article.This is my first article.This is my first article.This is my first article.This is my first article.
     </p>`,
},
article_two:
{
    title:"Article two|Malekulashtar";
    heading:"Article two";
    date:"Sep 10,2018";
    data:
        `<p>
     This is my second article.This is my first article.This is my first article.This is my first article.This is my first article.This is my first article.This is my first article.This is my first article.This is my first article.
     </p>`,
},
article_three:
{
    title:"Article three|Malekulashtar",
    heading:"Article three",
    date:"Sep 15,2018",
    data:
        `<p>
     This is my third article.This is my first article.This is my first article.This is my first article.This is my first article.This is my first article.This is my first article.This is my first article.This is my first article.
     </p>`,
},
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
</html>';

return htmltemplate;
}


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});



//app.get('/:articlename', function (req, res) {
//var articlename=req.params.articlename;
  // res.send(createtemplate(articles[articlename]);
//});


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 8080;
app.listen(port, function () {
 console.log(`IMAD course app listening on port ${port}!`);
});
