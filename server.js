
// npm중 하나인 express를 가져오고 서버에 접속하기 위한 선언을 해줌
var express = require('express');
var app = express();


// npm중 하나인 mysql을 가져오고 mysql서버에 접속하기 위한 선언을 해줌
// 여기 server.js에 연결되는 순간 mysql서버에 연결해서 쿼리를 날림(mysql서버에 날리는 것임)
var mysql = require('mysql');

// 이것은 연결할 데이터 베이스 정보이다(데이터베이스는 기본 3306포트를 사용함)
// 연결한 데이터베이스의 user와 password, database명을 입력해준다
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  // port : "3306", 생략가능
  database : "home" //연결할 데이터베이스를 입력한다(테이블 아님!!)
});


// mysql서버에 연결되면 함수를 실행한다
// 이 함수는 에러가 있으면 에러정보를 err변수에 담아 출력한다(반드시 선언해줘야 함)
con.connect(function(err) {
  // 만약 에러가 있다면 에러를 띄우고 함수를 끝냄(return)
  if (err){
    console.log(err);
    return;
  }
// mysql서버에 잘 연결이 되면 잘 연결이 되었다고 뜨는 메시지를 준다
// 연결실패시 긴 에러메시지가 나온다
// 서버에 연결되어있는 상태를 런타임 상태라고 한다
  console.log("Connected!");
});


// function (){}대신 ES6문법인 ()=>{} arrow function형태로 쓸수도 있다
// 만약 / 라우터에 들어오면 index.ejs파일을 랜더링해서 뿌려준다
// title은 서버에서 ejs로 값을 객체형식으로 전달한다
app.get('/', function (req, res) {
  // res.send('Hello World!2');

  // res.render('../views/index.ejs',{title:"타이틀"});

 // /라우터에 들어오면 쿼리를 날린다(쿼리를 날리는 내용은 person이라는 테이블을 조회하는 것이다)
// res.send든 res.render든 한번만 쓸수 있으므로 밑에서 쓰려면 위에 res.render를 주석 처리 해줘야 한다



// /라우터에 접속시 query()메소드를 통해 mysql서버로 쿼리를 전달한다
// 전달한 쿼리 내용은 person테이블을 조회하고 함수를 실행한다
// err에는 에러발생시 에러에 대한 정보가 들어오고 rows에는 앞에서 실행한 쿼리문에 대한 결과값이 들어있다
// select실행시 전체 테이블에 대한 정보를, insert실행시 insert한 테이블에 대한 정보를 등등...
con.query("SELECT*from person",function(err,rows){

  if(err){
    console.log(err);
    return;
  }

  console.log(rows);

// 웹 서버에서 ejs로 데이터(값)를 보낼때는 객체형식으로 키:벨류 형태로 보내야 한다

  res.render('../views/index.ejs',{title:"데이터베이스",result:rows})


});








});

app.listen(3000, function () {
  console.log('server.js listening on port 3000!');
});




// ejs를 사용,연결하기 위한 기본 세팅
app.set('view engine','ejs');
app.set('views','./views');
