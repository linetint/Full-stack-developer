// nodejs에서 mysql에 관한 패키지 기능을 통해 mysql모듈을 다운받는다
// (npm install mysql --save)

// nodejs를 통해 mysql서버에 연결한다
// mysql서버에 있는 데이터베이스 정보를 가져오기 위해서이다

const mysql=require('mysql');

// mysql서버에 연결을 생성해준다
// 어떤 데이터베이스에 연결할 것인지 정보를 안에 써준다
// host:"localhost"(내 PC)
// port:"3306"(3306포트를 사용한다고 선언. 데이터베이스는 기본 3306포트를 사용함)
// user:"root" root권한(기본)
// password:"1234" 데이터베이스 패스워드
// database:"person" 연결할 테이블을 말한다
const con=mysql.createConnection({

  host:"localhost",
  user:"root",
  password:"1234",
  port:"3306",
  database:"home"

});


// 위에서 선언한 데이터베이스 정보를 참조해 해당 데이터베이스에 연결한다
// err에는 에러정보를 받는다

// 웹 서버에 연결하는 것이 아니기때문에 req와 res를 받을 필요가 없다
// 웹 사이트와 웹 서버간의 연결에서는 필요하지만 mysql서버와의 연결에서는 필요X
con.connect(function(err){

// 만약 에러가 있다면 에러를 찍고 함수를 스탑(return)한다
  if(err){
    console.log(err);
    return;
  }

  console.log("MYSQL서버에 연결 되었습니다");


});




// person테이블 전체를 조회함
// 위에까지는 nodejs를 통해 mysql서버에 접속하는 방법이고 밑에서부터는 nodejs를 통해 mysql서버를 컨트롤 하는 것이다
// node를 통해 mysql문인 쿼리문을 mysql서버로 날린다(날려서 mysql서버를 컨트롤함)
// rows에는 앞에서 쿼리문을 통해 실행한 "SELECT*from person에 대한 결과값(정보)이 들어있다
// con.query("SELECT*from person",{},function(err,rows){
//
//   if(err){
//     console.log(err);
//     return;
//   }
//
// // rows안에 들어있는 person 테이블에 대한 정보를 가져온다
// // 즉 nodejs를 통해 데이터베이스안에 있는 정보를 마음대로 컨트롤 할수 있는 것이다
//   // console.log(rows);
//   // console.log(rows.length);
//   console.log(rows[0].FirstName);
//   console.log(rows[3].LastName);
//   console.log(rows[5].Gender);
//
// });


// person테이블에 데이터를 추가함+전체 데이터를 조회함
// con.query("INSERT INTO person (PersonID, LastName, FirstName, Gender, City) VALUES (9,'KIM','BZ','Male','Gwangju')",{},function(err,rows){
//
//   if(err){
//     console.log(err);
//     return;
//   }
//
//   // console.log(rows);
//
//   // 콜백함수 형태로서 위에 INSERT(데이터 추가)를 먼저하고 에러가 있으면 에러를 띄우고 에러가 없으면
//   // SELECT를 통해 person테이블을 조회한다
//   con.query("SELECT*from person",{},function(err,rows){
//
//     if(err){
//       console.log(err);
//       return;
//     }
//
//     log(rows);
//
//   });
//
// });



// 특정 데이터를 삭제하고+전체 데이터를 조회함
// con.query("DELETE from person WHERE PersonID='9'",{},function(err,rows){
//
//   if(err){
//     console.log(err);
//     return;
//   }
//
//   // console.log(rows);
//
//   con.query("SELECT*from person",{},(err,rows)=>{
//
//     if(err){
//       console.log(err);
//       return;
//     }
//
//     console.log(rows);
//
//
//   });
//
//
//
// });



// 특정 데이터를 선택해서 그 정보만 데이터를 수정하고+전체 데이터를 조회한다
con.query("UPDATE person set Gender='male' WHERE Gender='Female'",{},(err,rows)=>{

  if(err){
    console.log(err);
    return;
  }

// 여기 rows에는 "UPDATE person set Gender='male' WHERE Gender='Female'"에 대한 결과를 보여주고
  console.log(rows);

  con.query("SELECT*from person",{},(err,rows)=>{

    if(err){
      console.log(err);
      return;
    }

// 여기 rows에는 "SELECT*from person"에 대한 결과를 보여준다
    console.log(rows);

  });


});
