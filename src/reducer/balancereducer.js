const { set_balance, update_balance } = require("../action/balance");

const balanceReducer = (state = 0, action) => {
    const { type, data } = action
    switch (type) {
        case set_balance:
            return data
        case update_balance:
            const currentTime = new Date();
            const currentOffset = currentTime.getTimezoneOffset();
            const ISTOffset = 330;   // IST offset UTC +5:30 
            const ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset) * 60000);
            const hoursIST = ISTTime.getHours()
            const minutesIST = ISTTime.getMinutes()
            const hour = hoursIST * 0.1666
            const min = parseInt((minutesIST / 10).toString().split('.')[0]) * 0.0277
            return hour + min + data
        default:
            return state;
    }
}

export default balanceReducer