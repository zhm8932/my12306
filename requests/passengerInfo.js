//passengerTicketStr:1(座位类型),0,1(车票类型),张三(乘客姓名),1(证件类型),320xxxxxx(身份证号),151xxxx(手机号),N（多个的话，以逗号分隔）
//passengerTicketStr:  座位编号,0,票类型,乘客名,证件类型,证件号,手机号码,保存常用联系人(Y或N)
//oldPassengerStr :   张三(乘客姓名),1(证件类型),320xxxxxx(身份证号),1_

//获取用户信息，座位类型，车票类型，乘客姓名，证件类型，身份证号，号码；
module.exports = function (state) {
    console.log("initOrder-passengerInfo:",JSON.stringify(state))
    return Promise.resolve(Object.assign({}, state, {
        passengerTicketStr: getPassengerTicketStr(state),
        oldPassengerStr: getOldPassengerStr(state)
    }));
};
//座位类型
/*
 ‘硬座’ => ‘1’
 ‘硬卧’ => ‘3’,
 ‘软卧’ => ‘4’,
 ‘二等座’ => ‘O’,
 ‘一等座’ => ‘M’,
* */

//车票类型
/*
 成人票  => 1
 儿童票  => 2
 学生票  => 3
 残军票  => 4
*
* */

function getPassengerTicketStr(state) {
    const seatType = state.seatType;  //席别种类 商务座 特等座 一等座 二等座 高级软卧 软卧 硬卧 动卧 高级动卧 软座 硬座 无座
    // const seatType = 'O';  //席别种类 商务座 特等座 一等座 二等座 高级软卧 软卧 硬卧 动卧 高级动卧 软座 硬座 无座
    const second = '0';
    const ticketType = '1';
    // const name = state.name;  //购票人
    const idType = '1';       //证件种类，身份证
    const idNo = state.idno;  //购票人身份证
    const phone = state.phone;  //手机号
    const saveStatus = 'N';

    let passengerTicketStr='';
    // for (let item of state.userInfo){
    //     // console.log("item:",item)
    //     passengerTicketStr+=`${seatType},${second},${ticketType},${item.name},${idType},${item.idno},${item.phone},${saveStatus}`;
    // }
    let len = state.userInfo.length;
    console.log("购票人数:",len)  //购票人数
    if(len){
        state.userInfo.forEach(function (item,index) {
            if(len==1){  //单人购票
                passengerTicketStr+=`${seatType},${second},${ticketType},${item.name},${idType},${item.idno},${item.phone},${saveStatus}`;
            }else{      //多人购票
                if(index <= len-2){
                    passengerTicketStr+=`${seatType},${second},${ticketType},${item.name},${idType},${item.idno},${item.phone},${saveStatus}_`;
                }else{
                    passengerTicketStr+=`${seatType},${second},${ticketType},${item.name},${idType},${item.idno},${item.phone},${saveStatus}`;
                }
            }

        })
    }else{
        return Promise.reject(new Error('没有购票人信息'))

    }

    return passengerTicketStr;
    // return `${seatType},${second},${ticketType},${name},${idType},${idNo},${phone},${saveStatus}`;
}

// function getPassengerTicketStr(state) {
//     const seatType = '3';  //席别种类 商务座 特等座 一等座 二等座 高级软卧 软卧 硬卧 动卧 高级动卧 软座 硬座 无座
//     const second = '0';
//     const ticketType = '1';
//     const name = state.name;  //购票人
//     const idType = '1';       //证件种类，身份证
//     const idNo = state.idno;  //购票人身份证
//     const phone = state.phone;  //手机号
//     const saveStatus = 'N';
//     return `${seatType},${second},${ticketType},${name},${idType},${idNo},${phone},${saveStatus}`;
// }

function getOldPassengerStr(state) {
    const name = state.name;
    const idType = '1';
    const idNo = state.idno;
    const passengerType = '1';
    let len = state.userInfo.length;
    let oldPassengerStr = '';
    state.userInfo.forEach(function (item,index) {
        oldPassengerStr+=`${item.name},${idType},${item.idno},${passengerType}_`;
    });
    return oldPassengerStr;
    // return `${name},${idType},${idNo},${passengerType}_`;
}
