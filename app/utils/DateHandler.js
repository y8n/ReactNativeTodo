let DateHandler = (function(){
    return {
        formatDate: (date) => {
            let dt = new Date(+date);
            let year = dt.getFullYear(),
                month = prefixNumber(dt.getMonth() + 1),
                day = prefixNumber(dt.getDate()),
                hour = prefixNumber(dt.getHours()),
                minute = prefixNumber(dt.getMinutes())
            return `${year}-${month}-${day} ${hour}:${minute}`;
        },
        parseDate: (data) => {
            let dt = new Date();
            dt.setFullYear(data.year);
            dt.setMonth(data.month);
            dt.setDate(data.day);
            dt.setHours(data.hour);
            dt.setMinutes(data.minute);
            return dt;
        },
        isToday: (date) => {
            let dt = new Date(+date);
            return new Date().toLocaleDateString() === dt.toLocaleDateString();
        },
        isTomorrow: (date) => {
            let dt = new Date(+date);
            let today = new Date();
            today.setDate(today.getDate() + 1);
            return today.toLocaleDateString() === dt.toLocaleDateString();
        },
        isPast: (date) => {
            let dt = new Date(+date);
            let today = new Date();
            today.setHours(0);
            today.setMinutes(0);
            today.setSeconds(0);
            return today.getTime() > dt.getTime();
        },
        isLater: (date) => {
            let dt = new Date(+date);
            let twoDayLater = new Date();
            twoDayLater.setDate(twoDayLater.getDate() + 1);
            twoDayLater.setHours(23);
            twoDayLater.setMinutes(59);
            twoDayLater.setSeconds(59);
            return twoDayLater.getTime() < dt.getTime();
        }
    }
})();

function prefixNumber(num){
    return (num>9?'':'0') + num;
}

export default DateHandler;


