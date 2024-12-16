import React, { useEffect, useState } from "react";
import axios from "axios";
import { notification } from "antd";
function fn_scanin() {
  const [ddlData, setDdlData] = useState([]);
  const [ddlvalue, setDdlValue] = useState(null);
  const [ddlDataInState, setDdlDataInState] = useState(false);
  const fac = import.meta.env.VITE_FAC;
  useEffect(() => {
    PageLoad();
  }, []);
  async function PageLoad() {
    await submitData("DDLNEW", "");
  }
  async function submitData(option, params) {
    if (option == "DDLNEW") {
      await axios
        .get(`/Sparepart/api/common/getData?strType=DDLNEW&strPlantCode=${fac}`)
        .then((res) => {
          setDdlData(res.data);
        })
        .catch((err) => {
          notification.error({
            message: "Error",
            description: err,
          });
        });
    }
  }
  return { ddlvalue, setDdlValue, ddlData, ddlDataInState, setDdlDataInState };
}

export { fn_scanin };
