var sql = require('mssql');
var config = {
    user: '******',
    password: '******',
    server: 'evodev\\DEV', // You can use 'localhost\\instance' to connect to named instance 
    database: 'Evolution',
    port: 1433
};

var statement = "SELECT TOP 100 rtrim(InvtId) InvtId, rtrim(Descr) Descr FROM evoInventory WHERE ClassId = 'CA'";
// var statement = "evo_Inventory_Inquiry 'petunia wave pink'";



function getInventory_Async() {
    console.log('from getInventory_Async');

    var cn = new sql.Connection(config);
    cn.connect().then(function() {
        var rq = new sql.Request(cn);
        rq.query(statement).then(function(rs) {
            console.log(rs);
            cn.close();
        }).catch(function(err) {
            console.log(err);
            cn.close();
        });


    }).catch(function(err) {
        console.log(err);
    });


}

function getInventory() {

    console.log('from getInventory');
    var cn = new sql.Connection(config);
    var rq = new sql.Request(cn);

    cn.connect(function(err) {
        if (err) {
            console.log(err);
            return;
        }

        rq.query(statement, function(err, rs) {
            if (err) {
                console.log(err);
            } else {
                console.log(rs);
            }

            cn.close();

        });

    });

}


getInventory_Async();
// getInventory();