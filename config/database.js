var sql = require('mssql');
//connect database
var config = {
    user:'sa',
    password:'123456',
    server:'DESKTOP-9SRSOSG\\ECE9017',
    database:'test'
};
//connect to database
sql.connect(config,function(err){
    global.db = new sql.Request();
    if(!err) 
        console.log('SQL Server conncetion succeed...');
    else
        console.log('Error in DB connection' + JSON.stringify(err,undefined,2));
});