const dateFromTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);

    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()
    
    const hour = date.getHours()
    var minute = date.getMinutes()
    var minuteStr;

    if (minute<10){
        minuteStr = "0"+minute
    }
    else{
        minuteStr = minute.toString()
    }

    return `${year}-${month}-${day} ${hour}:${minuteStr}`;
}

export default dateFromTimestamp;