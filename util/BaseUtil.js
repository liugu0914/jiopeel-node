const moment = require('moment');

var BaseUtil = {
    now: function (params) {
        return moment(params).format('YYYY-MM-DD HH:mm:ss')
    }


}
module.exports=BaseUtil;