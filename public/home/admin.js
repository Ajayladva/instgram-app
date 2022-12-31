// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-auth.js";
import { getDatabase, ref, set,child, onValue, get, query, orderByChild } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-database.js";
//import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-analytics.js";
import { getStorage, ref as Refs, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-storage.js";


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

const db = getDatabase();
const dbRef = ref(db, 'login/');
const auth = getAuth(app);
const analytics = getAnalytics(app);

const storage = getStorage();

function getdata() {

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      // var stdno = 0;
      console.log(user.uid);
      var icon = document.getElementById('usersicons');
      const dbRefs = ref(db, `login/${user.uid}/`);
      //getdata if users are login 
      function getuserdata() {
        return onValue(ref(db, 'login/' + user.uid), (snapshot) => {
          icon.src = (snapshot.val() && snapshot.val().profile) || 'Anonymous';
          // ...
        }, {
          onlyOnce: true
        });
      }
      getuserdata();

      function getData() {
        onValue(dbRef, (snapshot) => {
          snapshot.forEach((childSnapshot) => {
            const childKey = childSnapshot.key;
            const childData = childSnapshot.val();
            var profile = childSnapshot.val().profile;
            var nameuser = childSnapshot.val().username_id;
            var usergetid = childSnapshot.val().userget;
            // console.log(profile,nameuser,usergetid);
            additemTolist(profile, nameuser, usergetid);
            // ...
          });
        }, {
          onlyOnce: true
        });
      }


      getData()
      //
      //

      var userdataboxs;
      var peruserbox;
      var username;
      var userprofile;
      var buttonusers;
      var boxstyle;

      function additemTolist(profile, nameuser, usergetid) {
        userdataboxs = document.getElementById('userboxs');
        peruserbox = document.createElement('div');
        username = document.createElement('p');
        userprofile = document.createElement('img');
        boxstyle = document.createElement('a');
        buttonusers = document.createElement('button');

        peruserbox.id = "peruserbox";


        userprofile.src = profile;
        userprofile.id = "imgicons";
        userprofile.alt = usergetid;

        username.innerHTML = nameuser;
        username.id = "username";
        buttonusers.id = "buttonusers";
        buttonusers.innerHTML = "FOLLOW";
        buttonusers.alt = usergetid;
        buttonusers.addEventListener("click", dosomething);

        boxstyle.id = 'boxstyle';



        userdataboxs.appendChild(peruserbox);
        peruserbox.appendChild(userprofile);
        peruserbox.appendChild(boxstyle);
        boxstyle.appendChild(username);
        boxstyle.appendChild(buttonusers);

      }



      // user profile button click go to user.html get user detils

      function dosomething(e) {
        if (e.target.buttonusers !== e.currentTarget) {

          var clickedItem = e.target.alt;
          window.location.href = "/users/user.html?name=" + clickedItem;
          //document.location.href = url;
          //console.log(clickedItem);

        }

        e.stopPropagation();
      }

      //hover auto play event


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


       
      //homepost all users get database
      let studio = 0;
      function fetalldata() {
          const dbRef = ref(db);
          get(child(dbRef, "login/"))
              .then((snapshot) => {
                  snapshot.forEach((childSnapshot) => {
                      const childKey = childSnapshot.key;
                      const childData = childSnapshot.val().userget;
                      loopslist(childData)
      
                  });
              })
            
      }
      fetalldata()

      function loopslist(childData){
        for(let i=0;i<=0;i++){
            console.log(childData)
            const dbRef = ref(db);
            get(child(dbRef, `login/${childData}/post/image`))
                .then((snapshot) => {
                    snapshot.forEach((childSnapshot) => {
                        const childKey = childSnapshot.key;
                        const icon = childSnapshot.val().profile_picture;
                        const name = childSnapshot.val().postnameid;
                        const decid =childSnapshot.val().decid;
                        const id =childData;
                       additemTolistpost(icon,name,decid,id)
        
                    });
                })
        }
    }
    

var postboxlist;
var postlistusers;
var userposts;
var usernamesdata;
var space;
var follows;
var saved;
var iconuserspost;
var boxsize;
var boxsizename;

function additemTolistpost(icon, name, decid, id) {
    postboxlist = document.getElementById("postgetallusers");
    boxsize = document.createElement('div');
    boxsizename = document.createElement('div');
    postlistusers = document.createElement('div');
    iconuserspost = document.createElement('img');
    userposts = document.createElement('img');
    usernamesdata = document.createElement('p');
    space = document.createElement('br');
    follows = document.createElement('button');
    saved = document.createElement('button');

    postlistusers.id = "postlistusers";

    iconuserspost.id ="iconuserspost";
    iconuserspost.src = icon;
    iconuserspost.alt = id;
 
    boxsize.id ="boxsize";
    boxsizename.id ="boxsizename";
    userposts.src = icon;
    userposts.id = "imgiconsd";
    userposts.alt = id;
    //users check
    userposts.addEventListener("click", dosomethingicon);
    // followaccept
    usernamesdata.id = "usernamesid";
    usernamesdata.innerHTML = name;

    follows.innerHTML = "forum";
    follows.alt = id;
    follows.name = decid;
    follows.icon = name;
    follows.id = 'followid';
    follows.className ="material-symbols-outlined";
    follows.addEventListener("click", playsomething);

    saved.innerHTML = " favorite";
    saved.className ="material-symbols-outlined";
    saved.alt = id;
    follows.icon = name;
    saved.id = 'deleteid';
    saved.addEventListener("click", savedomething);


    postboxlist.appendChild(postlistusers);
    postlistusers.appendChild(boxsize);
    boxsize.appendChild(boxsizename);
    boxsizename.appendChild(userposts);
    boxsizename.appendChild(usernamesdata);
    boxsize.appendChild(iconuserspost);
    boxsize.appendChild(space);
    boxsize.appendChild(follows);
    boxsize.appendChild(saved);
  


}
function dosomethingicon(e) {
  if (e.target.userposts !== e.currentTarget) {

    var clickedItem = e.target.alt;
    window.location.href = "/users/user.html?name=" + clickedItem;
    //document.location.href = url;
    //console.log(clickedItem);

  }

  e.stopPropagation();
}

function savedomething(e) {
  if (e.target.saved !== e.currentTarget) {

    var clickedItem = e.target.alt;
    var currentuserid =e.target.icon;
    window.location.href = "/users/userphoto.html?name=" + currentuserid + "&age=image" + "&currentuserid=" + clickedItem;
    //document.location.href = url;
    //console.log(clickedItem);

  }

  e.stopPropagation();
}


function playsomething(e) {
  if (e.target.follows !== e.currentTarget) {

    var clickedItem = e.target.alt;
    var currentuserid =e.target.icon;
    window.location.href = "/users/userphoto.html?name=" + currentuserid + "&age=image" + "&currentuserid=" + clickedItem;
    //document.location.href = url;
    //console.log(clickedItem);

  }

  e.stopPropagation();
}

document.getElementById('followshow').onclick = function(){
  var x = document.getElementById('userboxs');
  if(x.style.display == "block"){
    x.style.display = "none";

  }else{
    x.style.display = "block";
  }
}
      // ...
    } else {
      // User is signed out
      window.location = "/loginpage/register.html";
      // ...
    }
  });

}
getdata()

//load all uers post only