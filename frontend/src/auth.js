import app from 'firebase/app';
import firebase from 'firebase';
import {
    createBrowserHistory
} from 'history';

const firebaseConfig = {
    apiKey: "AIzaSyD186peFKoxgtKsi2vhrs1OZKc0iQwALlU",
    authDomain: "budget-planner-f5ee3.firebaseapp.com",
    databaseURL: "https://budget-planner-f5ee3.firebaseio.com",
    projectId: "budget-planner-f5ee3",
    storageBucket: "budget-planner-f5ee3.appspot.com",
    messagingSenderId: "541868588347",
    appId: "1:541868588347:web:66a0aa88797504ecec0b1e",
    measurementId: "G-04JWXTDKWW"
};

const firebaseApp = app.initializeApp(firebaseConfig);
app.analytics(firebaseApp);

class Firebase {
    constructor() {
        this.auth = app.auth();
        this.googleAuthProvider = new firebase.auth.GoogleAuthProvider();

        this.history = createBrowserHistory();
    }


    isAuthed = false;

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doSignInWithGoogle = async () => {
        await this.auth.signInWithPopup(this.googleAuthProvider);
        localStorage.setItem('uid', JSON.stringify(this.auth.currentUser));
        this.history.push('/dashboard');
    }
}

export default Firebase;