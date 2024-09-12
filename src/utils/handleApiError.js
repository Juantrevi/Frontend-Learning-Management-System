export const handleApiError = (error, defaultMessage) => {
    console.error(error);
    return {
        data: null,
        error: error.response?.data?.detail || defaultMessage
    };
};