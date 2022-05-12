const axios = require('axios');
const https = require("https");
require('dotenv').config()

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

// local db
const mysql = require('mysql')
const connection = mysql.createConnection({
    host: process.env.HIS_HOST,
    user: process.env.HIS_USER,
    password: process.env.HIS_PASSWORD,
    database: process.env.HIS_DATABASE,
    port: process.env.HIS_PORT,
})

// Example query from Endpoint
let query = "SELECT customer_name FROM customers WHERE customer_id = 2";

connection.query(query, (error, result) => {
    try {
        if (error) {
            console.log(error)
        } else {
            let json_result = JSON.stringify(result)
            // console.log("json_result: "+ json_result)
            sendEpid(json_result)
        }

    } catch (error) {
        console.log(error)
    }
    connection.end();
})

// API MOPH
const MOPH_USER = process.env.MOPH_USER
const MOPH_PASSWORD = process.env.MOPH_PASSWORD
const HCODE = process.env.HCODE
const config = {
    method: 'get',
    url: process.env.MOPH_URL_TOKEN + `&user=${MOPH_USER}&password_hash=${MOPH_PASSWORD}&hospital_code=${HCODE}`,
    headers: {}
};


const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
});


function sendEpid(json_result) {
    let j = JSON.parse(json_result)
    let cid = j[0].customer_name
    try {
        axios(config, {httpsAgent})
            .then((response) => {

                let result = JSON.stringify(response.data)
                sendMoph(result)

            })
            .catch(function (error) {

                console.log(error);

            });

        function sendMoph(tokens) {
            const token = tokens.slice(1, -1)
            const config2 = {
                method: 'get',
                url: process.env.MOPH_EPID + `?cid=${cid}&hospital_code=${HCODE}`,
                headers: {Authorization: `Bearer ${token}`}
            }

            try {
                axios(config2)
                    .then((response) => {
                        let result = JSON.stringify(response.data)
                        console.log(result)
                    }).catch(function (error) {
                    console.log(error);
                });
            } catch (error) {
                console.log(error)
            }

        }

    } catch (error) {
        console.log(error)
    }
}
