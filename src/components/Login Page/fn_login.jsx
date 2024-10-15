import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
function fn_login() {
  const navigate = useNavigate();
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin2 = async () => {
    setIsLoading(true);
    axios
      .post(
        "/Sparepart/api/common/getUserLogin",
        {
          username: loginId,
          password: password,
        },
        {
          validateStatus: function (status) {
            return true;
          },
        }
      )
      .then((res) => {
        setTimeout(() => {
          setIsLoading(false);
          if (res.status === 200) {
            localStorage.setItem("username", res.data.value.user_fname);
            localStorage.setItem("surname", res.data.value.user_surname);
            localStorage.setItem("user_empcode", res.data.value.user_emp_id);

            Swal.close();
            Swal.fire("Success", "เข้าสู่ระบบสำเร็จ", "success").then(
              (result) => {
                if (result.isConfirmed) {
                  navigate("/SparepartinventorySystem/mainPage");
                }
              }
            );
          } else if (res.status === 400) {
            Swal.fire("ผิดพลาด", "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง", "error");
            setLoginId("");
            setPassword("");
          } else {
            Swal.fire("Error", `Unexpected status: ${res.status}`, "error");
          }
        }, 700);
      })
      .catch((error) => {
        setIsLoading(false);
        Swal.fire("Please Try Again", error.message, "error");
      });
  };
  return {
    loginId,
    setLoginId,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    isLoading,
    setIsLoading,
    handlePasswordChange,
    togglePasswordVisibility,
    handleLogin2,
  };
}

export { fn_login };
