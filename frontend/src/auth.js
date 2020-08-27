import app from 'firebase/app';
import {
    User,
    auth
} from 'firebase/app';
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

        this.user = User;

        this.history = createBrowserHistory();
    }

    isAuthed() {
        if (this.auth.currentUser) {
            return true;
        } else {
            return false;
        }
    }

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password).catch(err => new ErrorHandler(err.message));

    doSignInWithEmailAndPassword = (email, password) => {
        this.auth.signInWithEmailAndPassword(email, password).catch(err => new ErrorHandler(err.message));
    }

    doSignInWithGoogle = async () => {
        await this.auth.signInWithPopup(this.googleAuthProvider).catch(err => new ErrorHandler(err.message));

        // const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
        // await this.auth.setPersistence(app.auth.Auth.Persistence.SESSION).then(function () {
        //         // Existing and future Auth states are now persisted in the current
        //         // session only. Closing the window would clear any existing state even
        //         // if a user forgets to sign out.
        //         // ...
        //         // New sign-in will be persisted with session persistence.
        //         return firebase.auth().signInWithPopup(googleAuthProvider);
        //     })
        //     .catch(function (error) {
        //         new ErrorHandler(error.message);
        //     });

        localStorage.setItem('user', JSON.stringify(this.auth.currentUser));
        // this.redirectRoDashboard();
    }

    doSignOut = () => this.auth.signOut();

    redirectRoDashboard() {
        window.location.href = '/dashboard';

        // this.history.push('/dashboard');
    }
}

export default Firebase;