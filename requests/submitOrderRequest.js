const request = require('./request');
const qs = require('querystring');
const apiPath = require('./../utils/apiPath');

//预提交订单
//https://kyfw.12306.cn/otn/leftTicket/submitOrderRequest

module.exports = function (state) {

    console.log("选中车次：",JSON.stringify(state.ticket))
    var postData = {
        secretStr: decodeURIComponent(state.ticket.secretStr),  //每个车次对应一个，并且每次都不一样，需要实时解析
        train_date: state.date,                                 //订票日期
        // back_train_date: '2016-12-22',                          //返程日期
        tour_flag: 'dc',                                        //单程
        purpose_codes: 'ADULT',                                 //成人票
        query_from_station_name: state.from_station_name,       //出发站
        query_to_station_name: state.to_station_name,           //目的站
        'undefined': ''                                         //空字符串
    }
    // console.log("postData：",JSON.stringify(postData));
    postData = qs.stringify(postData);



    const options = {
        path: '/otn/leftTicket/submitOrderRequest',
        method: 'POST',
        headers: {
            'Cookie': state.cookie,
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Content-Length': Buffer.byteLength(postData),
        }
    };

    return request(options, postData)
        .then((result) => {
            const body = JSON.parse(result.body);
            if (!body.status) {  //验证”status”:true
                return Promise.reject(new Error('submit order failed'));
            }
            return state;
        });

};
