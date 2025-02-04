import axios from "axios";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { notification } from "antd";

function fn_dashboard() {
  // const fac = import.meta.env.VITE_FAC;
  const fac = localStorage.getItem("factory");
  const [count, setCount] = useState([]);
  const [time, setTime] = useState(new Date());
  const [DtData, setDtdata] = useState([]);
  const [DtDataAction, setDtDataAction] = useState([]);
  const Date2 = new Date();
  const formattedDate = moment(Date2).format('D MMMM YYYY');
  const formattedTime = time.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
  const columns = [
    {
      title: "",
      dataIndex: "type_icon",
      key: "type_icon",
      render: (type_icon) => (
        type_icon ? (
          <img
            src={`data:image/png;base64,${type_icon}`}
            alt="icon"
            style={{ width: "30px", height: "30px" ,alignItems:'center'}}
          />
        ) : (
          ""
        )
      ),
    },
    {
      title: "Product",
      dataIndex: "type_name",
      key: "type_name",

    },
    {
      title: "Items remaining",
      dataIndex: "onhands",
      key: "onhands",
    }
  ];
  
  useEffect(() => {
    getData("getCount", "");
    getData("getDttable", "");
    getData("getDttableAction", "");
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  async function getData(option, params) {
    if (option == "getCount") {
      axios
        .get(`/Sparepart/api/common/GetCountDashboard`)
        .then((res) => {
          setCount(res.data[0].count_spare);
        })
        .catch((err) => {
          notification.error({
            message: "Error",
            description: err,
            duration: 2,
            placement: "bottomRight",
          });
        });
    } else if (option == "getDttable") {
      await axios
        .get(`/Sparepart/api/common/getDttable`)
        .then((res) => {
          setDtdata(res.data);
        })
        .catch((err) => {
          notification.error({
            message: "Error",
            description: err,
            duration: 2,
            placement: "bottomRight",
          });
        });
    } else if (option == "getDttableAction") {
      await axios
        .get(`/Sparepart/api/common/getOutSum`)
        .then((res) => {
          setDtDataAction(res.data);
        })
        .catch((err) => {
          notification.error({
            message: "Error",
            description: err,
            duration: 2,
            placement: "bottomRight",
          });
        });
  }
}
  return { count, time, DtData,columns,formattedDate,DtDataAction,formattedTime };
}

export { fn_dashboard };
