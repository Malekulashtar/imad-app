console.log('Loaded!');
var element=document.getElementById('main_text');
element.innerHTML='New value';

var img=document.getElementById('madi');
var marginLeft=0;
function moveright()
{
    marginLeft=marginLeft+1;
    img.style.marginLeft=marginLeft+'px';
}
img.onclick=function()
{
    var interval=setInterval(moveright,10)
};