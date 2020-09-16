import {toast} from 'react-toastify';

class Notify {
    constructor(message) {
        toast.success(message)
    }
}

export default Notify;