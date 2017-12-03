//匹配可以购买的车次，座位

/*
 "yz_num": "",    硬座
 "rz_num": "--",    软座
 "yw_num": "--",    硬卧
 "rw_num": "无",    软卧
 "gr_num": "--",    高级软卧
 "zy_num": "--",    一等座
 "ze_num": "--",    二等座
 "tz_num": "--",    特等座
 "wz_num": "7",    无座
 "qt_num": "--"  ,  其他
 "swz_num": "--"    商务座
* */

/*
* prefered_train   ${Array}  [T96,Z24];
*
*
* */
module.exports = function (state) {

    return new Promise((resolve, reject) => {

        let ticket = null;
        let ticketIndex = -1;
        console.log("state:",JSON.stringify(state))
        state.tickets.forEach((info) => {
            // console.log("t:",JSON.stringify(t));
            // const info = t.station_train_code;  //车次信息
            const index = state.prefered_train.indexOf(info.station_train_code);  //获取预订的车次信息：station_train_code 车次  T96
            if(index !==-1){
                // console.log("info:",index,JSON.stringify(info));
            }

            //如果存在购票的车次；
            // "ze_num":二等座;"yz_num": 硬座;"yw_num": 硬卧;"rz_num":软座
            if (index !== -1
                && info.canWebBuy === 'Y'   //可预订车次
                && (
                    (info.ze_num !== '--' && info.ze_num !== '无') ||  //有二等座
                    (info.yw_num !== '--' && info.yw_num !== '无') ||   //或有硬卧
                    (info.yz_num !== '--' && info.yz_num !== '无')   //或有硬座位
                )
            ) {
                if (ticketIndex === -1 || index < ticketIndex) {
                    ticket = info;　　　//获取第一个可购车次信息
                    ticketIndex = index;
	                console.log("车次信息:",index,JSON.stringify(info));
                }
            }
        });

        if (!ticket) {
            reject(new Error('没有所购的车次和席位'));
            return;
        }
        console.log("ticket：",ticketIndex,JSON.stringify(ticket))
        resolve(Object.assign({}, state, { ticket: ticket }));
    });

};
