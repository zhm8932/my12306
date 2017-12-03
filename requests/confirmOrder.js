const request = require('./request');
const qs = require('querystring');
const apiPath = require('./../utils/apiPath');

//正式提交订单
//判断当前乘客是否可以排队
//https://kyfw.12306.cn/otn/confirmPassenger/confirmSingleForQueue

module.exports = function (state) {

    const postData = qs.stringify({
        'REPEAT_SUBMIT_TOKEN': state.info.submitToken,
        'passengerTicketStr': state.passengerTicketStr,
        'oldPassengerStr': state.oldPassengerStr,
        'randCode': '',
        'purpose_codes': state.info.purposeCodes,   // 默认取ADULT,表成人,学生表示为：0X00
        'key_check_isChange': state.info.keyCheckIsChange,
        'leftTicketStr': state.info.leftTicketStr,
        'train_location': state.info.trainLocation,
        'choose_seats': '',
        'seatDetailType': '000',
        'roomType': '00',
        'dwAll': 'N'
    });

    const options = {
        path: '/otn/confirmPassenger/confirmSingleForQueue',
        method: 'POST',
        headers: {
            'Cookie': state.cookie,
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Content-Length': Buffer.byteLength(postData)
        }
    }

    return request(options, postData)
        .then((result) => {
            console.log("判断当前乘客是否可以排队-result:",result)
            const body = JSON.parse(result.body);
            if (!body.status) {
                return Promise.reject('confirm order failed');
            }
            return Object.assign({}, state, { confirm: true });
        });

};
