'use strict';
const moment = require('moment');
const https = require('https');
const qs = require('querystring');
const fs = require('fs');
// var ca = fs.readFileSync('../cert/srca.cer.pem');
var ca = fs.readFileSync('../cert/srca_der.cer');

module.exports = function (options, data) {

    const defaultOptions = {
        hostname: 'kyfw.12306.cn',
        rejectUnauthorized: false
    };

    const defaultHeaders = {
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36',
        'headers':{
	        ca:[ca]
        }
        //
    };

    const headers = Object.assign({}, defaultHeaders, options.headers || {});
    options = Object.assign({}, defaultOptions, options, { headers: headers });


    console.log("options-request:",options.path,"data:",data)
    return new Promise((resolve, reject) => {

        const req = https.request(options, (res) => {
            let body = '';
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                body += chunk;
            });
            res.on('end', () => {
                if(!/!DOCTYPE/.test(body)){
                    // console.log("body:",typeof body,body)
                }
                console.log("body:",typeof body,body)

                // console.log("res:",res)
                resolve({
                    status: res.statusCode,
                    headers: res.headers,
                    body: body
                });
            });
        });

        req.on('error', (err) => {
            reject(err);
        });

        if (data) {
            req.write(data);
        }

        // console.log("req:",req)
        req.end();

    });

};
