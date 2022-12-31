// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-auth.js";
import { getDatabase, ref, push, set, onChildAdded, child, get, onValue } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-database.js";
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


//show delete button
document.getElementById('downbtn-list').onclick = function () {
  var x = document.getElementById('show-not');
  if (x.style.display == "none") {
    x.style.display = "block";
  }
  else {
    x.style.display = "none";
  }
}



const myname = window.location.search;
const urlparams = new URLSearchParams(myname);
const param3 = urlparams.get('id');
const im = urlparams.get('icon');
const age = urlparams.get('alt');
const showimage =urlparams.get('token');
const param1 = urlparams.get('name');



var iconschatusers = document.getElementById('chooseicon').src = localStorage.getItem("lastname");;
var namechatusers = document.getElementById('namewidth').innerHTML = param1;
var currentidchat = document.getElementById('currentidchat').innerHTML = param3;
//text value
var chatsend = document.getElementById('input-out-chat');

onAuthStateChanged(auth, (user) => {
  if (user) {
    const dbRef = ref(db, `login/${user.uid}/chat/`);
    console.log(user.uid)
    function getData() {
      onValue(dbRef, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          const childKey = childSnapshot.key;
          const childData = childSnapshot.val();
          var profile = childSnapshot.val().image;
          var nameuser = childSnapshot.val().name;
          var usergetid = childSnapshot.val().id;
          console.log(profile, nameuser, usergetid);
          additemTolist(profile, nameuser, usergetid);
          // ...
        });
      }, {
        onlyOnce: true
      });
    }


    getData()
    var myicons;
    function usersprofile(){
    return onValue(ref(db, 'login/' + userid), (snapshot) => {
      myicons = (snapshot.val() && snapshot.val().profile) || 'Anonymous';
     
    }, {
      onlyOnce: true
    });
  }
  userprofile()

    var userdataboxs;
    var peruserbox;
    var username;
    var userprofile;
    var buttonusers;


    function additemTolist(profile, nameuser, usergetid) {
      userdataboxs = document.getElementById('filter-list');
      peruserbox = document.createElement('div');
      username = document.createElement('a');
      userprofile = document.createElement('img');


      peruserbox.id = "peruserbox";
      peruserbox.alt = profile;
      userprofile.addEventListener("click", dosomething);

      userprofile.src = profile;
      userprofile.id = "imgicons";
      userprofile.alt = nameuser;
      userprofile.map = usergetid;

      username.innerHTML = nameuser;
      username.id = "username";



      userdataboxs.appendChild(peruserbox);
      peruserbox.appendChild(userprofile);
      peruserbox.appendChild(username);

    }

    // user profile button click go to user.html get user detils
   
    function dosomething(e) {
      if (e.target.userprofile !== e.currentTarget) {

        var clickedItem = e.target.src;
        var nameitem = e.target.alt;
        var iditem = e.target.map;
        //location change url to get  database
         localStorage.setItem("lastname", clickedItem);
        window.location= '/home/chat.html?id=' + iditem +"&icon="+ clickedItem +"&name="+nameitem;
        document.getElementById('getusers').style.display = "none";
      }
      e.stopPropagation();
    }
    //end code 

    //click after get userid to send new users id for chat commications
    function adduserid() {
      if (currentidchat.innerHTML== "") {
        alert('nothing')
      }
      else {
        document.getElementById('getusers').style.display = "block";
      }
    }
adduserid()

    //send also create new database chatuser to send users
    document.getElementById('send-out-put').onclick = function () {
      if (chatsend.value == "") {
        alert('text here somthing')
      }
      else {
        var twouserid = user.uid + currentidchat;
        const postListRef = ref(db, `chatid/${twouserid}`);
        const newPostRef = push(postListRef);

        var d = new Date();
        d.toLocaleTimeString();
        set(newPostRef, {
          icons: myicons,
          meassage: chatsend.value,
          id: user.uid,
          time: d.toLocaleTimeString(),
          nameid: namechatusers
        });
        chatsend.value = "";
      }
    }


      const dbRefs = ref(db, `chatid/${user.uid + param3}`);
      onChildAdded(dbRefs, (data) => {
        if (data.val().id == user.uid) {
          var divdata = ' <div class="box-output-right"> <div  class="img-counter"><a class="time-right">' + data.val().time + ' </a><a href=" /users/user.html?name=' + data.val().id + '" class="time-rights">' + data.val().nameid + ' </a><img src="' + data.val().icons + '" alt="" class="logo-users"></div><div class="text-box-input-show"><a class="user-output-right">' + data.val().meassage + '</a></div> </div>';
          var d1 = document.getElementById('getusers');
          d1.insertAdjacentHTML('beforebegin', divdata);
        }
        else {
          var divdata = '<div class="box-output" > <div class="img-counter"><img src="' + data.val().icons + '" alt="" class="logo-users"><a href=" /users/user.html?name=' + data.val().id + '" class="time-lefts">' + data.val().nameid + ' </a><a class="time-left">' + data.val().time + ' </a></div><div class="text-box-input-show"><a class="user-output">' + data.val().meassage + '</a></div> </div>';
          var d1 = document.getElementById('getusers');
          d1.insertAdjacentHTML('beforebegin', divdata);
        }
        console.log(dbRefs);
      });
    

  } else {
    // User is signed out
    window.location = "/loginpage/register.html";
    // ...
  }
});


