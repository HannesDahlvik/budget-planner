import app from 'firebase/app';
import firebase from 'firebase';
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
        this.storage = app.storage();
        this.authed = this.auth.currentUser;

        this.firebase = firebaseApp;

        this.googleAuthProvider = new firebase.auth.GoogleAuthProvider();
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
        await this.auth.signInWithPopup(this.googleAuthProvider).then(() => {
            localStorage.setItem('user', JSON.stringify(this.auth.currentUser));
        }).catch(err => new ErrorHandler(err.message));
    }

    doSignOut = () => this.auth.signOut();

    doUploadProfilePicture = async (file, photoURL) => {
        photoURL = photoURL.replace('blob:', '');

        let returnData;
        const ref = this.storage.ref('avatars/' + file.name);
        await ref.put(file).then(res => {
            returnData = res.metadata.fullPath;
        }).catch(err => new ErrorHandler(err.message));
        const imageURL = await this.storage.ref(returnData).getDownloadURL();

        return imageURL;
    }
}

export default Firebase;