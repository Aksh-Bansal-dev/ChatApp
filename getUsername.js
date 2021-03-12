const url = require("url");

const getUsername = (link)=>{
    const query = url.parse(link,true).query;
    return query;
}

module.exports = getUsername;