import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/database'

const firebaseConfig = {
  apiKey: ,
  authDomain:,
  databaseURL: ,
  projectId: ,
  storageBucket: ,
  messagingSenderId: ,
  appId: 
}

firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const database = firebase.database()

export { auth, database, firebase }
