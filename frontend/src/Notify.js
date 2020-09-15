import {toast} from 'react-toastify';

class Notify {
    constructor(message) {
        toast(message)
    }
}

export default Notify;