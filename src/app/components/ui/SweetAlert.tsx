import Swal from "sweetalert2";

const SweetAlert = ({
  title,
  content,
  icon,
  confirmButtonText,
  children
}: any) => {
  const showAlert = () => {
    Swal.fire({
      title: title || "Default Title",
      width: 1000,
      padding: "1em",
      html: `<div>${content}</div>`,
      icon: icon || "info",
      confirmButtonText: confirmButtonText || "Great",
      confirmButtonColor: "#4f46e5"
    });
  };

  return <button onClick={showAlert}>{children}</button>;
};

export default SweetAlert;
