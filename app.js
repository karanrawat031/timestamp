var express 	= require('express');
var app     	= express();
var bodyParser  = require('body-parser');
var port    	= process.env.PORT || 8080;

app.set('view engine','ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',function(req,res){
	res.render('landing');
});

app.get('/newstamp',function(req,res){
	res.render('form');
});

app.post('/newstamp',function(req,res){
	var stamp = req.body.stamp;
	var millistamp = new Date(stamp*1000);
	var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = millistamp.getFullYear();
    var month = months[millistamp.getMonth()];
    var date = millistamp.getDate();
    var formattedTime = month + ' ' + date + ', ' + year;
    res.render('show',{stamp:req.body.stamp,formattedTime:formattedTime});
});

function unixtonatural(unix){
	var date = new Date(unix*1000);
	var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = date.getFullYear();
    var month = months[date.getMonth()];
    var date = date.getDate();
    var result = month + ' ' + date + ', ' + year;
    return result;
}

function naturaltounix(natural){
    
}

app.get('/:time',function(req,res){
	if(!isNaN(req.params.time)){
		var result = unixtonatural(req.params.time);
		var data = {unix:req.params.time,natural:result};
		res.json(data);
	}else{
		var natural = new Date(req.params.time);
		if(!isNaN(natural)){
			var unix = natural/1000;
			var data = {natural:req.params.time,unix:unix};
			res.json(data);	
		}
	}
});

app.listen(port);
console.log('The magic happens on port ' + port);