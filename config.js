import * as firebase from 'firebase'

require("@firebase/firestore")

  var firebaseConfig = {
    apiKey: "AIzaSyAVYsKf-Cz5Y8cqjcXwuF_WoN7xsJ_QA9E",
    authDomain: "library-management-35720.firebaseapp.com",
    projectId: "library-management-35720",
    storageBucket: "library-management-35720.appspot.com",
    messagingSenderId: "1010636029751",
    appId: "1:1010636029751:web:5b008f233ce40c5ea224b2"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export default firebase.firestore()