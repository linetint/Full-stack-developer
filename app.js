//웹서버를 띄워보자

//웹을 서비스할수 있게 해주는 서버이다

//웹은 기본적으로 IP를 가지고 있는데 현재 실습환경에는 서버환경이 없기때문에
//현재 내컴퓨터(로컬환경)에서 실습을 진행한다
//내컴퓨터(로컬환경)은 127.0.0.1 IP를 사용하며 외부에서 접속이 불가능하다


//require:불러오기 기능(불러와야 해당 모듈을 쓸수 있다)
//export:내보내기 기능

// ES6->ECMAScript2015 이후 버전
// let과 const
// let->var와 비슷하다
// let(블럭단위)->var(함수단위)와 비슷하다
// const->상수


//var로 해도 되지만 누구도 사용할수 없는 변수로 만들기위해 const를 썼다
//express모듈을 불러와서 변수 express에 담았다
const express=require('express');

//불러와서 express함수를 호출하는 것을 변수 app에 담았다
const app=express();


//npm body-parser모듈을 설치했으니 해당 패키지를 불러와야 쓸수 있다
const bodyParser=require('body-parser');



//8000번 포트를 통해서 해당 웹 서버에 접속하도록 한다
//포트번호는 특정번호를 제외하고 마음대로 쓸수 있다
app.listen(8000);




//static(정적)파일 관리하는 방법
//고정적 파일을 관리한다
//미들웨어
//public이라는 폴더에 무슨 파일이 있는지 확인할수 있다

app.use(express.static('public'));
//이 기능을 쓰면 localhost:8000/logo.png를 쳐서 해당 폴더내에 있는 파일을 웹사이트에서 불러올수 있다




//이 두개의 선언은 기계어를 사용자가 보기 편하게 한번 파싱해주는 선언이라고 보면 된다(무조건 선언.걍 외우기)

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());



//ejs는 views라는 폴더에서 만들어지는 것만 작업을 진행한다(그래서 views라는 폴더를 만든다)
//이것도 그냥 외우기
//ejs를 사용하기 위한 방법들임(확장자가 ejs인 파일을 사용하기 위함이다)
//__dirname은 현재 이 파일(app.js)가 속해있는 위치를 말한다
app.set('view engine','ejs');
app.set('views',__dirname+'/views');









// 라우트(경로=URL)에 따라서 사용자는 각각 다른 화면을 볼수 있다

// /main이라는 라우트에 접속하면 밑의 메시지를 보여준다
// /main앞에는 localhost:8000이 생략 되어 있는 것이다
// req(request)에는 사용자(웹페이지)가 서버에 전달한 정보들이 자동으로 들어있다
// res(response)에는 서버가 사용자(웹페이지)에게 응답할 정보들이 들어있다
app.get('/main',function(req,res){
    
    console.log("main페이지입니다");
    
//    console.log(req);
//    console.log(res);

    
//res.send();를 통해 클라이언트가 서버에 요청한 것에 대한 응답을 해줘야한다
//응답은 무조건 필수이다(하지 않으면 해당 사이트에서 무한 루프에 돌게 된다)
//웹은 기본적으로 요청과 응답형태이기때문에 무조건 요청에 대한 응답을 해줘야한다    
//    res.send("main 페이지입니다");

    
    
    
// sendFile: main.html파일을 보내줘서 여기 라우터에 들어오면 자동으로 main.html을 띄워준다
// __dirname은 현재 이 app.js가 있는 위치를 의미한다
// 그래서 뒤에 +'/public/main.html'를 해주면 public폴더안에 있는 main.html을 가져온다는 의미이다
//주의! 위에서 res.send가 있으면 이 명령을 실행할수 없다(res는 한번만 가능하기 때문에)
    res.sendFile(__dirname+'/public/main.html');
    
    

    
});







// /user라우터에 들어왔을때
app.get('/user',function(req,res){
    
    
   res.send("/user라우터의 get방식");
    
});

//근데 만약 main.html에서 post방식으로 데이터를 보내면 app.get형식으로 되어있는 
///user라우터는 Cannot POST /user가 뜨게 된다(get방식으로 되어있는 페이지이기때문에)
//그래서 이러한 오류를 막기위해 POST방식의 라우터를 만들어줘야한다

app.post('/user',function(req,res){


//    res.send("/user라우터의 post방식");
    
//    req안에 body안에 있는 name들의 값을 가져온다
    console.log(req.body.username);
    console.log(req.body.userid);
    console.log(req.body.userpass);
    
    res.send("닉네임:"+req.body.username+", 아이디:"+req.body.userid+", 비밀번호:"+req.body.userpass);
//    main.html에 있는 form태그안에 있는 input에서 전송한 데이터의 값을 가져와서 찍음
    
    
});
//여기 /user라우터에는 main.html에 있는 사용자(웹 사이트)를 통해 데이터를 넘겨받은 정보가 들어있다
//그 정보들은 req.body에 담겨져있다
//(왜 req.body냐면 html에 body태그안에 input이 있고 거기서 데이터를 가져오기때문이다)
//이 정보들을 가져오려면 바디를 변환을 해서 가져와야하는데 그 바디를 변환해서 보여주는 npm이 body-parser이다
//npm install body-parser --save 을 통해 해당 npm을 먼저 설치해야한다
//body-parser를 설치했으면 위에서 해당 모듈을 가져오기 위해서 선언해준다(위로 올라가기)

//위에서 이것을 제대로 선언해줬으면 데이터를 가져올수 있다
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());











// /blog라우터에 들어왔을때
// ejs파일을 가져온다
app.get('/blog',function(req,res){
    
//   res.send("/blog라우터");
    
//blog.ejs를 랜더링하기 위함이다(뒤에 확장자 .ejs를 생략해도 된다)    
//   res.render('./blog.ejs');

    res.render('../views/blog.ejs',{title:'어플리케이션'});  
//이렇게 서버에서 ejs파일인 사용자쪽으로 변수(값)을 전달해줄수도 있다 
});




