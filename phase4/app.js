const http = require('http') ;
var mysql = require('mysql');
var url = require('url');
var qs = require('querystring');
const { post } = require('jquery');

const port = 5000 ;



var con = mysql.createConnection({
  host: "localhost",
  user: "mohamad",
  password: "mhBINABAJY1379",
  database: "mydb"
});
 
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  sql = "call get_all_customer()";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
  });
});

const server = http.createServer (function(req , res) {
  const headers = {
    'Access-Control-Allow-Origin': '*', /* @dev First, read about security */
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    'Access-Control-Max-Age': 2592000, // 30 days
    /** add other headers as per requirement */
  };

  if(url.parse(req.url ,true).pathname == "/login"){
    var body = '';
    req.on('data', function (data) {
        body += data;
        if (body.length > 1e6)
        req.connection.destroy();
    });
    req.on('end', function () {
        var POST = qs.parse(body);

        var sql = `call insert_customer(${POST.NationalId},'${POST.firstName}','${POST.lastName}','${POST.type}','${POST.city}','${POST.password}')`;
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log(result);
        });

        sql = "call get_all_customer()";
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log(result);
        });
    });
  }
  else if(url.parse(req.url ,true).pathname == "/creatAccount"){
    var body = '';
    req.on('data', function (data) {
        body += data;
        if (body.length > 1e6)
        req.connection.destroy();
    });
    req.on('end', function () {
        var POST = qs.parse(body);
        
        var sql = `call authenticate_customer(${POST.NationalId},"${POST.password}")`;
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log(result);
          res.writeHead(200, headers);
          res.write(result[0][0].result);
          return res.end();
        });
    });
  }
  else if (url.parse(req.url ,true).pathname == "/user/allProduct"){

    var sql = `call user_get_all_Product_test()`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result[0][0]);
      res.writeHead(200, headers);
      res.write(JSON.stringify(result[0]));
      return res.end();
    });

  }
  else if (url.parse(req.url ,true).pathname == "/user/typedProduct"){


    var body = '';
    req.on('data', function (data) {
        body += data;
        if (body.length > 1e6)
        req.connection.destroy();
    });
    req.on('end', function () {
        var POST = qs.parse(body);
        
        var sql = `call user_get_typed_product_test("${POST.type}")`;
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log(result);
          res.writeHead(200, headers);
          res.write(JSON.stringify(result[0]));
          return res.end();
        });
    });
  }
  else if (url.parse(req.url ,true).pathname == "/user/mostSoldProductWeek"){
    var sql = `call user_get_most_sold_product_week()`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result);
      res.writeHead(200, headers);
      res.write(JSON.stringify(result[0]));
      return res.end();
    });
  }
  else if (url.parse(req.url ,true).pathname == "/user/mostSoldProductMonth"){
    var sql = `call user_get_most_sold_product_month()`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result);
      res.writeHead(200, headers);
      res.write(JSON.stringify(result[0]));
      return res.end();
    });
  }
  else if (url.parse(req.url ,true).pathname == "/user/allOffProduct"){

    var sql = `call user_get_all_off_Product_test()`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result[0][0]);
      res.writeHead(200, headers);
      res.write(JSON.stringify(result[0]));
      return res.end();
    });

  }
  else if (url.parse(req.url ,true).pathname == "/user/lastBuy"){
    var body = '';
    req.on('data', function (data) {
        body += data;
        if (body.length > 1e6)
        req.connection.destroy();
    });
    req.on('end', function () {
        var POST = qs.parse(body);
        
        var sql = `call user_get_last_buy(${POST.NationalId})`;
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log(result);
          res.writeHead(200, headers);
          res.write(JSON.stringify(result[0]));
          return res.end();
        });
    });
  }
  else if (url.parse(req.url ,true).pathname == "/user/getAccount"){
    var body = '';
    req.on('data', function (data) {
        body += data;
        if (body.length > 1e6)
        req.connection.destroy();
    });
    req.on('end', function () {
        var POST = qs.parse(body);
        
        var sql = `call user_get_customer(${POST.NationalId})`;
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log(result);
          res.writeHead(200, headers);
          res.write(JSON.stringify(result[0][0]));
          return res.end();
        });
    });
  }
  else if (url.parse(req.url ,true).pathname == "/user/updateAccount"){
    var body = '';
    req.on('data', function (data) {
        body += data;
        if (body.length > 1e6)
        req.connection.destroy();
    });
    req.on('end', function () {
        var POST = qs.parse(body);
        
        var sql = `call user_set_customer(${POST.NationalId} , "${POST.fN}" , "${POST.lN}" , "${POST.city}" , "${POST.pass}")`;
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log(result);
          res.writeHead(200, headers);
          res.write("DONE");
          return res.end();
        });
    });
  }

});

server.listen (port, function (error) {
  if (error) {
        console.log (error);
        throw new Error (error.message) ;
    }
    else {
        console.log (' listening on port ' + port);
    }
})
