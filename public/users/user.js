// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-auth.js";
import { getDatabase, ref, child, get, onValue, set } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-database.js";
import { getStorage, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-storage.js";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD9_HQKZyMZPPG9721IAkuo2pIp9ZmOL1A",
  authDomain: "video8-599ee.firebaseapp.com",
  databaseURL: "https://video8-599ee.firebaseio.com",
  projectId: "video8-599ee",
  storageBucket: "video8-599ee.appspot.com",
  messagingSenderId: "144664529191",
  appId: "1:144664529191:web:80dc2ed7468f950ded4102",
  measurementId: "G-BXCWPL8JCN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const storage = getStorage();
const db = getDatabase();


var icon = document.getElementById('usersiconsfir');
var name = document.getElementById('username');
var post = document.getElementById('postnumber');
var follow = document.getElementById('video-post');
var followcount = document.getElementById('follownumber');





const myname = window.location.search;
const urlparams = new URLSearchParams(myname);
const param1 = urlparams.get('name');
const nextuser = "1" + param1;
console.log(nextuser);



onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log(user.uid)
    //userid get

    const userid = user.uid;

    document.getElementById('videoshowid').onclick = function () {
      var x = document.getElementById('videonumberid');
      var y = document.getElementById('postnumberid');

      if (x.style.display == 'block') {
        x.style.display = 'none';
        y.style.display = 'block';


      }
      else {
        x.style.display = 'block';
        y.style.display = 'none';


      }

    }
    document.getElementById('postshowid').onclick = function () {
      var y = document.getElementById('postnumberid');
      var x = document.getElementById('videonumberid');

      if (y.style.display == 'block') {
        y.style.display = 'none';
        x.style.display = 'block';


      }
      else {
        y.style.display = 'block';
        x.style.display = 'none';



      }
    }
    //menubar code
     //upload data post into database 
      //menubar btn
      document.getElementById('homebtn').onclick = function () {
        window.location = '/home/index.html';
      }
      document.getElementById('serachbtn').onclick = function () {
       // window.location = '/users/home.html';
      }
      document.getElementById('explorebtn').onclick = function () {
        window.location = '/exp/exp.html';
      }
      document.getElementById('chatbtn').onclick = function () {
        window.location = '/home/chat.html';
      } 
      document.getElementById('notificationsbtn').onclick = function () {
        window.location = '/users/notification.html';
      }
      document.getElementById('profilebtn').onclick = function () {
        window.location = '/users/user.html';
      }
       document.getElementById('createbtn').onclick = function () {
        window.location = '/home/post.html';
      }
      document.getElementById('menubtn').onclick = function () {
        window.location = '/users/user.html';
      }
      //end 

    //end code 
    document.getElementById('editinfromation').onclick = function () {
      set(ref(db, 'login/' + userid + "/chat/" + param1), {
        id: param1,
        name: name.innerHTML,
        image: icon.src

      });
      window.location = '/home/chat.html?id=' + param1 + "&icon=" + icon.src + "&name=" + name.innerHTML;
      localStorage.setItem("lastname", icon.src);
    }


    //meassages btn

    //end editinfromation

    var currentuserid;
    var requestown = document.getElementById('followsend');

    function getuserdata() {
      if (nextuser == "1null") {
        function usergetid() {
          return onValue(ref(db, 'login/' + userid), (snapshot) => {
            icon.src = (snapshot.val() && snapshot.val().profile) || 'Anonymous';
            name.innerHTML = (snapshot.val() && snapshot.val().username_id) || 'Anonymous';
          }, {
            onlyOnce: true
          });
        }
        usergetid();
        const dbRefs = ref(db, `login/${userid}/post/video/`);
        const dbRef = ref(db, `login/${userid}/post/image/`);
        getData(dbRef);
        getDatavideo(dbRefs);
        const followlist = ref(db, `login/${userid}/followlist`);
        getfollowlist(followlist);
        currentuserid = userid;

        document.getElementById('followsend').style.visibility = 'hidden';


      } else {
        function param1get() {
          return onValue(ref(db, 'login/' + param1), (snapshot) => {
            icon.src = (snapshot.val() && snapshot.val().profile) || 'Anonymous';
            name.innerHTML = (snapshot.val() && snapshot.val().username_id) || 'Anonymous';
          }, {
            onlyOnce: true
          });
        }
        param1get();
        const dbRefs = ref(db, `login/${param1}/post/video/`);
        const followlist = ref(db, `login/${param1}/followlist`);
        getfollowlist(followlist);
        const dbRef = ref(db, `login/${param1}/post/image/`);
        getData(dbRef);
        getDatavideo(dbRefs);
        currentuserid = param1;
  

        function getowndata() {
          return onValue(ref(db, 'login/' + userid + "/followlist/" + param1), (snapshot) => {
            requestown.innerHTML = (snapshot.val() && snapshot.val().active) || 'follow';
          }, {
            onlyOnce: true
          });
        }
        getowndata();

        if (requestown.innerHTML != "follow") {
          document.getElementById('followsend').innerHTML = 'follow';
        
        } else {
          document.getElementById('followsend').innerHTML = requestown.innerHTML;
        }
        document.getElementById('followsend').style.visibility = 'visible';

      }

    }

    getuserdata();


    //getdata if users are login 

    let studio = 0;

    function getData(dbRef) {
      onValue(dbRef, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          const childKey = childSnapshot.key;
          const childData = childSnapshot.val();
          var profile = childSnapshot.val().profile_picture;
          var usergetid = childSnapshot.val().postnameid;
          additemTolist(profile, usergetid);

          // ...
        });
      }, {
        onlyOnce: true
      });
    }


    function getDatavideo(dbRefs) {
      onValue(dbRefs, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          const childKey = childSnapshot.key;
          const childData = childSnapshot.val();
          var profile = childSnapshot.val().profile_picture;
          var usergetid = childSnapshot.val().postnameid;
          additemTolists(profile, usergetid);

          // ...
        });
      }, {
        onlyOnce: true
      });
    }


    function  getfollowlist(followlist) {
      onValue(followlist, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          const childKey = childSnapshot.key;
          const childData = childSnapshot.val();
         listcount(childKey)

          // ...
        });
      }, {
        onlyOnce: true
      });
    }

var keycount;
var keycounts;
let listfollowcount =0;
function listcount(childKey){
  keycount = document.createElement('p');
  keycounts = document.createElement('P');
  keycounts.innerHTML = childKey;
  followcount.innerHTML = ++listfollowcount + "<b> " + "FOLLOW" + "<b>";
  keycount.appendChild(keycounts);
}



    var userdataboxs;
    var peruserbox;
    var userprofile;

    function additemTolist(profile, usergetid) {
      userdataboxs = document.getElementById('postnumberid');
      peruserbox = document.createElement('div');
      userprofile = document.createElement('img');

      peruserbox.id = "peruserbox";


      userprofile.src = profile;
      userprofile.id = "imgicons";
      userprofile.alt = usergetid;
      userprofile.addEventListener("click", dosomething);


      post.innerHTML = ++studio + "<b> " + "POST" + "<b>";

      userdataboxs.appendChild(peruserbox);
      peruserbox.appendChild(userprofile);

    }


    // user profile button click go to user.html get user detils

    function dosomething(e) {
      if (e.target.userprofile !== e.currentTarget) {

        var clickedItem = e.target.alt;
        window.location.href = "/users/userphoto.html?name=" + clickedItem + "&age=image" + "&currentuserid=" + currentuserid;
        //document.location.href = url;
        //console.log(clickedItem);

      }

      e.stopPropagation();
    }


    let viseostudio = 0;

    function additemTolists(profile, usergetid) {
      userdataboxs = document.getElementById('videonumberid');
      peruserbox = document.createElement('div');
      userprofile = document.createElement('video');

      peruserbox.id = "peruserbox";

      userprofile.src = profile;
      userprofile.id = "imgicons";
      userprofile.alt = usergetid;
      userprofile.controls = true;

      follow.innerHTML = ++viseostudio + "<b> " + "VIDEO" + "<b>";

      peruserbox.style.fontSize = "10px";
      //buttonusers.alt = userget;
      userprofile.addEventListener("click", dosomethings);

      userdataboxs.appendChild(peruserbox);
      peruserbox.appendChild(userprofile);

    }

    function dosomethings(e) {
      if (e.target.userprofile !== e.currentTarget) {

        var clickedItem = e.target.alt;
        window.location.href = "/users/userphoto.html?name=" + clickedItem + "&age=video" + "&currentuserid=" + currentuserid;
        //document.location.href = url;
        //console.log(clickedItem);

      }

      e.stopPropagation();
    }

    //follow request send to get own information
    var currentsendid;
    var currentsendname;
    var currentsendicon;
    var active;
    function getowndata() {
      return onValue(ref(db, 'login/' + userid), (snapshot) => {
        currentsendicon = (snapshot.val() && snapshot.val().profile) || 'Anonymous';
        currentsendname = (snapshot.val() && snapshot.val().username_id) || 'Anonymous';
        currentsendid = (snapshot.val() && snapshot.val().userget) || 'Anonymous';
      }, {
        onlyOnce: true
      });
    }
    getowndata();
    document.getElementById('followsend').onclick = function () {
      if (requestown.innerHTML == "follow") {
        document.getElementById('followsend').innerHTML = requestown.innerHTML;
        set(ref(db, 'login/' + param1 + "/followlist/" + currentsendid), {
          name: currentsendname,
          id: currentsendid,
          icon: currentsendicon,
          active: "confirm"
        });
        setfollowaccept();
      } else if(requestown.innerHTML == "request"){
        document.getElementById('followsend').onclick = false;
      
      }
     
    }
    function setfollowaccept() {
      set(ref(db, 'login/' + userid + "/followlist/" + param1), {
        name: name.innerHTML,
        id: param1,
        icon: icon.src,
        active: "request"
      });
    }



    //end follow

  } else {
    // User is signed out
    window.location = "/loginpage/register.html";
    // ...
  }


});


