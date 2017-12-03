const request = require('./request');
const apiPath = require('./../utils/apiPath');

//获取相应参数

module.exports = function (state) {

    const options = {
        path: '/otn/confirmPassenger/initDc',
        method: 'POST',
        headers: {
            'Cookie': state.cookie
        }
    };

    return request(options)
        .then((result) => {
            return Object.assign({}, state, { info: parse(result.body) });
        });

};

const SUBMIT_TOKEN_REGEX = /var globalRepeatSubmitToken = '(.+?)'/;
const KEY_CHECK_REGEX = /'key_check_isChange':'(.+?)'/;
const PURPOSE_CODES_REGEX = /'purpose_codes':'(.+?)'/;
const LEFT_TICKET_STR_REGEX = /'leftTicketStr':'(.+?)'/;
const TRAIN_LOCATION_REGEX = /'train_location':'(.+?)'/;

function parse(html) {
    const r = {};
    r.submitToken = SUBMIT_TOKEN_REGEX.exec(html)[1];
    r.keyCheckIsChange = KEY_CHECK_REGEX.exec(html)[1];
    r.purposeCodes = PURPOSE_CODES_REGEX.exec(html)[1];
    r.leftTicketStr = LEFT_TICKET_STR_REGEX.exec(html)[1];
    r.trainLocation = TRAIN_LOCATION_REGEX.exec(html)[1];
    return r;
}
