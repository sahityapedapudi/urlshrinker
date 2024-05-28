const express=require('express')
const mongoose=require("mongoose")
const shortUrl=require("./models/shortUrl")
mongoose.connect('mongodb://localhost/urlshortener')
const app=express()
app.set("view engine",'ejs')
app.use(express.urlencoded({extended:false}))
app.get('/',async(req,res)=>{
    const shortUrls=await shortUrl.find();
    res.render('index',{shortUrls:shortUrls})
})
app.post('/shorturls',async(req,res)=>{
    await shortUrl.create({full:req.body.urlful})
    res.redirect('/')
})
app.get('/:ShortUrl',async(req,res)=>
{
    const ShortUrl=await shortUrl.findOne({short:req.params.ShortUrl})
    if(ShortUrl==null)return res.sendStatus(404)
    ShortUrl.clicks++
    ShortUrl.save()
    res.redirect(ShortUrl.full);

})
app.listen(5000);