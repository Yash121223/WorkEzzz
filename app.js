const express=require('express');
const app=express();
const port=134;
const pool =require('./models/pool');
const body_parser=require('body-parser');
const multer =require('multer');
const {v4:uuid,parse} = require('uuid')
const path = require('path')
console.log(uuid())

app.use(express.static('public'));
app.set('view engine','hbs');




app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(body_parser.urlencoded({
    extended:false
}));
app.use(body_parser.json());


const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./public/images")
    },
    filename:function(req,file,cb){
        let extension = file.originalname.split('.')
        extension=extension[extension.length-1]
        let filename=uuid()+'.'+extension
        req.photuz=filename;
        cb(null,filename)
    }
})

const uploadedimg=multer({storage:storage})




app.get('/',(req,res)=>{

    pool.query ('select * from team ' , (err,obj)=>{
        if (err){
            console.log (err);

            res.render ('index' , {data : []});
        }

        else{
            res.render ('index' , {data : obj});
        }
    })
    // res.render('index');
})

app.get('/memberapply',(req,res)=>{
    res.render('teamMember');
})

app.post('/apply',(req,res)=>{
    console.log(req.body);
    let qry="INSERT INTO team (Name, Year, Expertise, Experience, Photo, Sample) VALUES (?,?,?,?,?,?);"
    pool.query(qry,[req.body.name, req.body.year, req.body.expertise, req.body.experience, req.photuz, req.body.sample ]), (err,result)=>{
        if(err)
        console.log(err)
    else{
        alert('Team member applied')
    }
    }
})

app.get('/members',(req,res)=>{
    let qry=`select * from team`
    pool.query(qry,(err,data1)=>{
        if(err)
        console.log(err)
    else{
        testdetail=data1
        // res.render('team',{Name:req.Name,Year:req.Year,Expertise:req.Expertise, Experience:req.Experience, Photo:req.Photo, Sample:req.Sample});
        res.render('team',{data:testdetail});
        console.log('data sent!');
        console.log(data1)
    }
    })
})

app.listen(port,()=>{
    console.log('server connected');
})