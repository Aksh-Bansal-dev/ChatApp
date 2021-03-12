const formatMessage = (username,msg, room=null) =>{
    
    return {
        username,
        msg,
        time: getTime(),
        room
    }
} 

const getTime = ()=>{
    const d = new Date(Date.now());
    let hr = d.getHours();
    let min = d.getMinutes();
    if(min<10){
        min = "0"+min;
    }
    const x = hr>11?"pm":"am";
    hr = hr%12===0?12:hr%12;
    return hr+":"+min+" "+x;
}


module.exports = formatMessage;