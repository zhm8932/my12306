const config = require('./../config');
const checkUser = require('./../requests/checkUser');
const queryTickets = require('./../requests/queryTickets');
const filterTickets = require('./../requests/filterTickets');
const submitOrderRequest = require('./../requests/submitOrderRequest');
const initOrder = require('./../requests/initOrder');
const passengerInfo = require('./../requests/passengerInfo');
const checkOrderInfo = require('./../requests/checkOrderInfo');
const confirmOrder = require('./../requests/confirmOrder');
const moment = require('moment');

const initState = Object.assign({}, config);
// console.log("initState:",initState)

function lumos(state) {
    var time = new Date();
    console.log('--------------------------------------------------------');
    console.time('查询余票');
    console.log(`${moment(new Date()).format('YYYY-MM-DD hh:mm:ss:::SSS')}`);
    // console.log(`${time} have a try...`);
    checkUser(state)
        .then(queryTickets)         //查询车次
        .then(filterTickets)        //查询余票
        .then(submitOrderRequest)   //预提交订单
        .then(initOrder)            //获取相应参数
        .then(passengerInfo)        //座位，购票人信息
        .then(checkOrderInfo)       //检查用户选择的乘客信息的合法性
        .then(confirmOrder)         //提交订单
        .then((result) => {
            console.timeEnd('查询余票');
            if (result.confirm) {
                console.log('Oh hahahahahah!!! You got the ticket! Just to pay your order!')
            } else {
                console.log('It ends. But I am not sure what happened...')
            }
})
.catch((err) => {
        console.timeEnd('查询余票');
        console.error(`err: ${err.message}`);
        if (err.message === 'no login') {
            console.log('Please login and fill the right cookie!');
            return;
        }
        let intervalTime = state.intervalTime;
        // let intervalTime = 1000;
        console.log(`${intervalTime}ms后再次查询...`);
        setTimeout(() => lumos(initState),intervalTime);
    });
}
exports.lumos = lumos;

// lumos(initState);
