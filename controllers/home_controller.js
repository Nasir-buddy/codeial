module.exports.home = (req, res)=>{
    console.log("Cookies value : ", req.cookies);
    return res.render('home',{
        title: "Home"
    });
}  