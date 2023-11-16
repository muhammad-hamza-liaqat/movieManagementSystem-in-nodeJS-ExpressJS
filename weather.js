// const express = require("express");
// const fetch = require("node-fetch");
// const app = express();
// const weatherModel = require("./Models/waether");
// const PORT = 8080;

// app.get("/weather", async (req, res) => {
//   const response = await fetch(
//     "https://api.openweathermap.org/data/2.5/weather?lat=31.520&lon=74.358&appid=65e6e54a1cad67cf9e26505200fabeda"
//   );
//   if (!response.ok){
//     res.status(400).send({message: "Unable to find the data through API"});
//   }
//   const dataJson = await response.json();

//   res.json(dataJson);

// });

// app.get('/', (req,res)=>{
//     res.end("endpoint")
// })


// app.listen(PORT, ()=>[
//     console.log(`the server is running on port:${PORT}`)
// ])