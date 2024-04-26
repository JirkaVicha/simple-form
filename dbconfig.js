import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyB-7kRj47FZBDvNkAd_8QIFbznnAAQLuxs",
  authDomain: "movies-project-2-3e239.firebaseapp.com",
  projectId: "movies-project-2-3e239",
  storageBucket: "movies-project-2-3e239.appspot.com",
  messagingSenderId: "129641969686",
  appId: "1:129641969686:web:5392999c5de909eeff5d37"
};

firebase.initializeApp(firebaseConfig)

const projectFirestore = firebase.firestore()

export { projectFirestore }

// using 'movies' database collection