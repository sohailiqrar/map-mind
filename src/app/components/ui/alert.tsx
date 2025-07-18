import Swal from "sweetalert2";

export default function showAlert({
  title,
  content,
  icon,
  confirmButtonText
}: any) {
  Swal.fire({
    title: title || "Default Title",
    width: 500,
    padding: "1em",
    html: `<div>${content}</div>`,
    icon: icon || "info",
    confirmButtonText: confirmButtonText || "Okay",
    confirmButtonColor: "#4f46e5"
  });
}
