import app from 'firebase/app';
import firebase from 'firebase';
import {
    createBrowserHistory
} from 'history';
import ErrorHandler from './ErrorHandler';

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
        this.authed = this.auth.currentUser;

        this.googleAuthProvider = new firebase.auth.GoogleAuthProvider();

        this.history = createBrowserHistory();
    }

    isAuthed() {
        if (this.auth.currentUser) {
            return true;
        } else {
            return false;
        }
    }

    doCreateUserWithEmailAndPassword = (username, email, password) => {
        this.auth.createUserWithEmailAndPassword(email, password).then(result => result.user.updateProfile({
            displayName: username
        })).catch(err => new ErrorHandler(err.message));
    }

    doSignInWithEmailAndPassword = (email, password) => {
        this.auth.signInWithEmailAndPassword(email, password).catch(err => new ErrorHandler(err.message));
    }

    doSignInWithGoogle = async () => {
        await this.auth.signInWithPopup(this.googleAuthProvider).catch(err => new ErrorHandler(err.message));

        localStorage.setItem('user', JSON.stringify(this.auth.currentUser));
    }

    doSignOut = () => this.auth.signOut();
}

export default Firebase;