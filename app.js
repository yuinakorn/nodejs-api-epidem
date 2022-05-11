const axios = require('axios');
const https = require("https");
const fs = require("fs");
require('dotenv').config()

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

const MOPH_USER = process.env.MOPH_USER
const MOPH_PASSWORD = process.env.MOPH_PASSWORD
const HCODE = process.env.HCODE

const config = {
    method: 'get',
    url: process.env.EPI_MOPH_URL + `&user=${MOPH_USER}&password_hash=${MOPH_PASSWORD}&hospital_code=${HCODE}`,
    headers: {}
};


const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
    // cert: fs.readFileSync("./usercert.pem"),
    // key: fs.readFileSync("./key.pem"),
});



try {
    axios(config, {httpsAgent})
        .then(function (response) {
            var result = JSON.stringify(response.data)
            console.log(result);
        })
        .catch(function (error) {
            console.log(error);
        });
} catch (error) {
    console.log(error)
}



// axios(config, {httpsAgent})
//     .then(function (response) {
//         var result = JSON.stringify(response.data)
//         console.log(result);
//     })
//     .catch(function (error) {
//         console.log(error);
//     });
