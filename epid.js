var request = require('request');
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

request({
    "url": 'https://cvp1.moph.go.th/token?Action=get_moph_access_token&user=Admin_00037&password_hash=A2BAAF7D1A728CAF553CA6A73AA93478EC5CFDE80272CE498D9380B2D6AEB398&hospital_code=00037',
    "method": "GET",
    "headers":{},
}, function(err, response, body){
    console.log(err);
    console.log(response);
    console.log(body);
});