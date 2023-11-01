const express=require('express');
const app=express();
const port=134;


app.use(express.static('public'));
app.set('view engine','hbs');

app.get('/',(req,res)=>{
    res.render('index');
})

app.listen(port,()=>{
    console.log('server connected');
})