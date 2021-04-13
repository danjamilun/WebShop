//postavke
require('dotenv').config()//iscitavanje svih varijabli definiranih u .env-u
const express=require('express')//dohvacanje expressa
const mongoose= require('mongoose')//postavke za monga
const cors=require('cors')//cors je middleware
const bodyParser=require('body-parser')
const app=express()
//const db=mongoose.connect('mongodb://localhost:3000/product');
const port = process.env.PORT || 3000;
// console.log(require('crypto').randomBytes(64).toString('hex')) ovo je za secret

//dohvat modela
const Product=require('./models/productModel');
const User=require('./models/userModel');
//rute
const productRouter=express.Router()
const detailsProductRouter=express.Router()
const userRouter=express.Router()
const itemZaKosaricu=express.Router()
//jwt
const {signJwt,verifyJwt}=require('./jwt')
//middleware
app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

//povezivanje na bazu, ucitava se link iz .env-a
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useCreateIndex:true    
}).then(()=> console.log('Database connect'));
//pazi ovo, svaka ruta doli navedena ce bit definirana ovako npr. /api/login, /api/register
//register
userRouter.route("/register").post((req, res) => {
    console.log(req.body.email + req.body.password);
    //pretraga da li user sa odredenim email-on postoji, ako postoji nista od registracije, ako nepostoji ispravna je
    User.find({ email: req.body.email }, function (error, users) {//pretraga prema email-u
      if (error || users.length > 0) {
        console.log(users.length);
        return res.send(error);
      }
      let user = new User({//korisnik ne postoji, dohvaca se uneseno ime, email i password
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      user.save();
      return res.json(user);//vrati unesenog korisnika
    });
  });
app.use("/api", userRouter);

//login
userRouter.route('/login') //ruta za login,provjera valjanosti emaila i sifre unesene te izdavanje tokena u slucaju valjanosti
.post((req,res)=>{
    //pretraga prema navadenim kriterijima, pazi prvi argument find funkcije je kriterij pretrage a drugi funkcija
    //koja ovisno o tome je li pronaden korisnik ili ne se izvsava
    User.find({email: req.body.email}, function(error,users){
        if(error || users.length===0){//ako korisnik nepostoji
            return res.send(error)
        }
        if(req.body.password !== users[0].password){//kriva lozinka
            return res.send("wrong password")
        }
        const token=signJwt(users[0]._id);//sve je oke, izdaje se token, pogledati signJwt metodu
        return res.json({accessToken: token, user: users[0].email});
        //znaci vraca se odgovor kao accresToken i podaci o useru

    })
});
app.use("/api", userRouter);

//products
productRouter.route('/products')
.get(verifyJwt,(req,res)=>{
    //nije naveden uvjet pretrage kao prvi argument funkcije find pa dohvacamo sve podatke iz baze 
    // console.log(process.env.SECRET); //provjera da smo ucitali SECRET iz .env-a
    Product.find((err,product)=>{ //ovisno o tome da li je uspijesna pretraga ili ne, izvrsit ce se error ili vratiti produkti
        if(err){
            return res.send(err)
        }
        else{
            return res.json(product)
        }
    });

});
app.use("/api",productRouter);
// detalji products
productRouter.route('/products/:_id')//dohvacanje elementa prema zadanom id-u iz baze produkata
.get(verifyJwt,(req,res)=>{ 
    const query = {}; //filter objekt za upit u bazu preko mongoose-a
    if (req.query._id) {
        query.name = req.query._id;
    }
    Product.findById(query, (err,product)=>{//imamo funkciju findById koja filtrira pretragu a kao prvi argument uzima 
        //ono po cemu ce filtrirati a to je prema id-u
        if(err){ //ako je pretraga pogresna, ako nije naden
            return res.send(err);
        }
        else{ //ako je naden vrati podatak sa tim id-om u json formatu
            return res.json(product)
        }

    });
});
app.use("/api",productRouter);


//provjera
app.get('/',(req,res)=>{
    res.send("welcome to my api");
})
//provjera na kojem portu se slusa
app.listen(port ,() =>{ 
    console.log('Server is running on port',port)
})