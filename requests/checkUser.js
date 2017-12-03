const request = require('./request');
const apiPath = require('./../utils/apiPath');
//检查用户登录

/**
 * @param [object] state
 * @param [string] state.cookie
 */
module.exports = function (state) {

    if (!state.cookie) {
        console.log("state.cookie：请设置cookie")
        return Promise.reject(new Error('no login'));
    }

    const options = {
        // path: '/otn/login/checkUser',
        path: apiPath.loginCheckUser,
        method: 'POST',
        headers: {
            'Cookie': state.cookie
        }
    };

    // console.log("options-checkUser:",JSON.stringify(options))
    return request(options)
        .then((result) => {
            const body = JSON.parse(result.body);
            if (body && body.data && body.data.flag) {  //body.data.flag=true 表示已登录状态
                return Object.assign({}, state, { login: true });
            }
            return Promise.reject(new Error('no login'));
        });

};
