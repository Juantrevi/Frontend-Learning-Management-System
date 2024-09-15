import Swal from "sweetalert2";

export const handleApiError = (error, defaultMessage) => {
    console.log(error);
    let errorMessage = defaultMessage;

    if (error.response && error.response.data) {
        const data = error.response.data;
        const firstErrorKey = Object.keys(data)[0];
        if (Array.isArray(data[firstErrorKey]) && data[firstErrorKey].length > 0) {
            errorMessage = data[firstErrorKey][0];
        } else {
            errorMessage = error.toString();
        }
    } else {
        errorMessage = error.toString();
    }

    // Capitalize the first letter of the error message
    errorMessage = errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1);

    Swal.fire({
        title: 'Error',
        text: errorMessage,
        icon: 'error'
    });

    return {
        data: null,
        error: errorMessage
    };
};