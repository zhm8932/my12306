const request = require('./request');
const qs = require('querystring');
const apiPath = require('./../utils/apiPath');

//查询车次
//https://kyfw.12306.cn/otn/leftTicket/queryA
module.exports = function (state) {

    const params = {
        'leftTicketDTO.train_date': state.date,             //购票日期
        'leftTicketDTO.from_station': state.from_station,   //出发站编码
        'leftTicketDTO.to_station': state.to_station,       //到达站编码
        'purpose_codes': 'ADULT'                            // 旅客编码：成人为ADULT,学生为:0X00
    };

    const options = {
        // path: `/otn/leftTicket/queryA?${qs.stringify(params)}`,
        path: `/otn/leftTicket/query?${qs.stringify(params)}`,
        headers: {
            'Cookie': state.cookie
        }
    }

    return request(options, null)
        .then((result) => {
            // let passengerTicketStr = getPassengerTicketStr(state);
            // console.log("passengerTicketStr:",passengerTicketStr)
            // console.log("查询车次结果:",JSON.parse(result.body).data)
            var data = JSON.parse(result.body).data.result;
	        console.log("所有车次1：",JSON.stringify(data))
            var _newData = [],newData=[];
            if(data.length){
	            data.forEach(function (item) {
		            _newData.push(item.split('|'))
	            })
            }
	        _newData.forEach(function (item) {
		        newData.push({
			        station_train_code:item[3], //车次
			        from_station:item[4],
                    start_time:item[8],
                    end_time:item[9],
			        duration_time:item[10],
			        canWebBuy:item[11],
			        secretStr:item[12],
			        date:item[13],
			        syw_num:item[32],  //商务
			        zy_num:item[31],  //一等座
			        ze_num:item[30],  //二等座
			        srrb_num:item[33],  //动卧
			        rw_num:item[23],  //软卧
			        yw_num:item[28],  //硬卧
			        rz_num:item[24],  //软座
			        yz_num:item[29],  //硬座
			        wz_num:item[26],  //无座

                })
            })
            // data = data.split("&");
	        console.log("所有车次2：",JSON.stringify(newData))
            const newState = Object.assign({}, state, {
                tickets: newData
            });
            return newState;
        });

};
//
// function getPassengerTicketStr(state) {
//     const seatType = '3';  //席别种类 商务座 特等座 一等座 二等座 高级软卧 软卧 硬卧 动卧 高级动卧 软座 硬座 无座
//     const second = '0';
//     const ticketType = '1';
//     // const name = state.name;  //购票人
//     const idType = '1';       //证件种类，身份证
//     const idNo = state.idno;  //购票人身份证
//     const phone = state.phone;  //手机号
//     const saveStatus = 'N';
//
//     let passengerTicketStr='';
//     // for (let item of state.userInfo){
//     //     // console.log("item:",item)
//     //     passengerTicketStr+=`${seatType},${second},${ticketType},${item.name},${idType},${item.idno},${item.phone},${saveStatus}`;
//     // }
//     let len = state.userInfo.length;
//     console.log("购票人数:",len)  //购票人数
//     if(len){
//         state.userInfo.forEach(function (item,index) {
//             if(len==1){  //单人购票
//                 passengerTicketStr+=`${seatType},${second},${ticketType},${item.name},${idType},${item.idno},${item.phone},${saveStatus}`;
//             }else{      //多人购票
//                 if(index <= len-2){
//                     passengerTicketStr+=`${seatType},${second},${ticketType},${item.name},${idType},${item.idno},${item.phone},${saveStatus}_`;
//                 }else{
//                     passengerTicketStr+=`${seatType},${second},${ticketType},${item.name},${idType},${item.idno},${item.phone},${saveStatus}`;
//
//                 }
//             }
//
//         })
//     }else{
//         new Error('没有购票人信息')
//     }
//
//     return passengerTicketStr;
//     // return `${seatType},${second},${ticketType},${name},${idType},${idNo},${phone},${saveStatus}`;
// }
