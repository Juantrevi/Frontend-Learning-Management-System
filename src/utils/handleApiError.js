import Swal from "sweetalert2";

export const handleApiError = (error, defaultMessage) => {
    let errorMessage = error.toString() || defaultMessage;

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