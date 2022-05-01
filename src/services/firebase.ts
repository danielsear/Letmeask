import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/database'

const firebaseConfig = {
  apiKey: 'AIzaSyCeGnUKgFRA4cTSWVkH6rMGNZTKGPtZ-XM',
  authDomain: 'letmeask-12785.firebaseapp.com',
  databaseURL: 'https://letmeask-12785-default-rtdb.firebaseio.com',
  projectId: 'letmeask-12785',
  storageBucket: 'letmeask-12785.appspot.com',
  messagingSenderId: '825238687093',
  appId: '1:825238687093:web:abb8242323e4e6ba0d173c'
}

firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const database = firebase.database()

export { auth, database, firebase }
