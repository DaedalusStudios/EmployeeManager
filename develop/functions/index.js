


exports.showLogo = function() {
    showLogo();
}







const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: '321LayOn',
      database: 'employee_db'
    },
    console.log(`Connected to DB: employee_db.`)
  );


var showLogo = function() {
    console.clear();
    console.log(`
    ┌───────────────────────────────────────────┐
    │  ┬ ┬┌─┐┬─┐┬┌─┌─┐┌─┐┬─┐┌─┐┌─┐╔╦╗╔═╗╔═╗╦ ╦  │
    │  ││││ │├┬┘├┴┐├┤ │ │├┬┘│  ├┤  ║║╠═╣╚═╗╠═╣  │
    │  └┴┘└─┘┴└─┴ ┴└  └─┘┴└─└─┘└─┘═╩╝╩ ╩╚═╝╩ ╩  │
    └───────────────────────────────────────────┘
    `);   //Attrib: https://patorjk.com/software/taag/
};


exports.showAllEmployees = function() {
    var sql =  "select * from employees";
    var params = "";
    db.query(sql, params, (err, result) => {
        if (err) {
            console.log(err);
        }
            showLogo();
            showHeader("All Employees View");
            startData();
            for(var i = 0; i < result.length; i++) {
                var stringData = `${result[i].id} ${result[i].first_name} ${result[i].last_name} ${result[i].role_id} ${result[i].manager_id}`;
                showData(stringData);
            }
            endData();
            MainMenu();
        });
    
}


function showHeader(header) {
    const maxHeaderLength = 30;
    const truncateHeader = header.slice(0, maxHeaderLength);
    const formattedHeader = truncateHeader.padEnd(maxHeaderLength, " ");
    console.log("┌──────────────────────────────┐");
    console.log(`│${formattedHeader}│`);
    console.log("└──────────────────────────────┘");
}


function startData() {
    console.log("┌───────────────────────────────────────────────────────────────────────────┐");
}
function endData() {
    console.log("└───────────────────────────────────────────────────────────────────────────┘");
}

function showData(stringData) { 
    const maxLength = 75;
    const truncateData = stringData.slice(0, maxLength);
    const formattedData = truncateData.padEnd(maxLength, " ");
    console.log(`│${formattedData}│`);
}


