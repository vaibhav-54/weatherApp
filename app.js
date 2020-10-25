const express=require("express");
const http=require("http");
const bp=require("body-parser");

const app=express();
app.set('view engine','ejs');
app.use(bp.urlencoded({extended:true}));
app.get("/",function(req,res){

    res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res)
{
   var apikey="3a2609e1a05e56af1c325f12d739e826"
    var city=req.body.city;
    var url="http://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&appid=3a2609e1a05e56af1c325f12d739e826";
    http.get(url,function(r)
    {
        r.on("data",function(data)
        {
            const weatherdata=JSON.parse(data);
            console.log(weatherdata.main.temp);
            var t=weatherdata.main.temp;
            var flike=weatherdata.main.feels_like;
            var mint=weatherdata.main.temp_min;
            var maxt=weatherdata.main.temp_max;
            var descrption=weatherdata.weather[0].description;
            var hum=weatherdata.main.humidity;
            res.render('list',{
                tem:t,
                fl:flike,
                mt:mint,
                mxt:maxt,
                d:descrption,
                 h:hum
                
            });
       

        }) 
            
        })

    
});
app.post("/list.ejs",function(req,res){
    res.redirect("/");
})
app.listen(4000,function(){
    console.log("the app is running on port");
});
