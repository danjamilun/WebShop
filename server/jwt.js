const jwt = require('jsonwebtoken');
//izrada jwt-a
/*Token se dobije tako što se u funkciju sa SECRET-om pošalje i objekt sa ključem sub.
 U objekt se osim ključa “sub” mogu poslati i ostali podaci o korisniku.  */
function signJwt(user_id) {
    const token = jwt.sign({sub: user_id}, process.env.SECRET);
    if (!token) return false;
    return token;
}
//provjera jwt-a
function verifyJwt(req, res, next) {
    const authorization = req.header('authorization');// u request-u traži zaglavlje ‘authorization’
    //Ukoliko ga ne pronađe ili ne uspije pronaći token nakon ključne riječi Bearer, vraća odgovor “401”.
    const token = authorization ? authorization.split('Bearer ')[1] : undefined;
    if(!token) {
        return res.send(401, "Unauthorized");
    }
    jwt.verify(token, process.env.SECRET, (err, payload)=>{//Ukoliko je traženi token tu, u funckiju se salje token,secret i callback funkcija
        if (err || !payload.sub) {//. Ukoliko dođe do greške, ili u objektu (payload) nedostaje ključ sub, vraća se 401. 
            return res.send(401, "Unauthorized");
        }
        return next();
        /*Budući da je funkcija verifyJwt() middleware, ukoliko se token uspješno verificira, poziva se next()funkcija
         kako bi se prešlo na sljedeći middleware koji je vezan za tu rutu.  */
    })
}

module.exports = {signJwt, verifyJwt};