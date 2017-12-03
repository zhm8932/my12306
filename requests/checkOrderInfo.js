const request = require('./request');
const qs = require('querystring');
const apiPath = require('./../utils/apiPath');
//检测是否可以确认提交.
// 检查用户选择的乘客信息的合法性
//接口：https://kyfw.12306.cn/otn/confirmPassenger/checkOrderInfo

module.exports = function (state) {

    console.log("state-checkOrderInfo:",JSON.stringify(state))
    const postData = qs.stringify({
        'cancel_flag': '2',
        'bed_level_order_num': '000000000000000000000000000000',
        'passengerTicketStr': state.passengerTicketStr,  //座位类型，0，车票类型，姓名，身份正号，电话，N（多个的话，以逗号分隔）
        'oldPassengerStr': state.oldPassengerStr,       //姓名，证件类别，证件号码，用户类型
        'tour_flag': 'dc',              //单程
        'randCode': '',                 //预定验证码
        '_json_att': '',                //空字符串
        'REPEAT_SUBMIT_TOKEN': state.info.submitToken   //从上一步获取
    });

    const options = {
        path: '/otn/confirmPassenger/checkOrderInfo',
        method: 'POST',
        headers: {
            'Cookie': state.cookie,
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Content-Length': Buffer.byteLength(postData)
        }
    };

    return request(options, postData)
        .then((result) => {
            const body = JSON.parse(result.body);
            if (!body.status) {
                return Promise.reject(new Error('check order failed'));
            }
            return state;
        })

};
