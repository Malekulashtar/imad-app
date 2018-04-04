var button=document.getElementByI;


var counter=0;
button.onclick=function(){
    var request=new XMLhttpRequest();
    
    
    request.onreadystatechange=function(){
        if(request.readystate==XMLhtpRequest.DONE){
        if(request.status==200){
            var counter=request.responseText;
            var span=document.getElementById('count');
            span.innerHTML=counter.toString();
        }
        }
    };
    
    request.open('GET',http://afmul53.imad.hasura-app.io/counter,true);
    request.send(null);
};