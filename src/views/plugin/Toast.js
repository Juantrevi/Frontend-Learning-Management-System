import Swal from "sweetalert2";

function Toast(){
    return Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true
    })
}

export default Toast