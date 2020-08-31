import {
    toast
} from 'react-toastify';

class ErrorHandler {
    constructor(error) {
        toast.error(error);
    }
}

export default ErrorHandler;