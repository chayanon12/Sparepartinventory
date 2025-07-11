import { Button, Card, notification, Table } from "antd";
import React, { useState } from "react";
import "./CheckUser.css";
import { TextField } from "@mui/material";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
function CheckUser() {
  const [txtData, setTextData] = useState({ req_no: "" });
  const [dataSource, setDataSource] = useState([]);
  const columns = [
    {
      title: "Request Number",
      dataIndex: "req_no",
      key: "req_no",
    },
    {
      title: "ID Code",
      dataIndex: "id_code",
      key: "id_code",
      render: (text) => {
        const fallbackCopy = (copyText) => {
          const textarea = document.createElement("textarea");
          textarea.value = copyText;
          textarea.style.position = "fixed";
          document.body.appendChild(textarea);
          textarea.focus();
          textarea.select();

          try {
            const successful = document.execCommand("copy");
            if (successful) {
              notification.success({
                message: "Success",
                description: `Copied : ${copyText}`,
                placement: "bottomRight",
                duration: 5,
              });
            } else {
              notification.error({
                message: "Failed",
                description: `Copy failed`,
                placement: "bottomRight",
                duration: 5,
              });
            }
          } catch (err) {
            notification.error({
              message: "Failed",
              description: `Copy failed`,
              placement: "bottomRight",
              duration: 5,
            });
          }

          document.body.removeChild(textarea);
        };

        const handleCopy = () => {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard
              .writeText(text)
              .then(() => {
                notification.success(`Copied: ${text}`);
              })
              .catch(() => {
                fallbackCopy(text);
              });
          } else {
            fallbackCopy(text);
          }
        };

        return (
          <span
            style={{ cursor: "pointer", color: "#1677ff" }}
            onClick={handleCopy}
          >
            {text}
          </span>
        );
      },
    },
    {
      title: " Request Amount",
      dataIndex: "amount",
      key: "amount",
      width: 150,
    },
    {
      title: "User Name",
      dataIndex: "user_name",
      key: "user_name",
    },
    {
      title: "User SurName",
      dataIndex: "user_surname",
      key: "user_surname",
    },
    {
      title: "User Dept",
      dataIndex: "user_req_dept",
      key: "user_req_dept",
    },
    {
      title: "User Divition",
      dataIndex: "user_divition",
      key: "user_divition",
    },
  ];
  async function handleSearchData() {
    if (txtData.req_no === "") {
      notification.error({
        message: "Error",
        description: "Pleaese enter Request Number to search",
        placement: "bottomRight",
        duration: 3,
      });
      return;
    } else {
      const response = await axios.get(
        `/newarrival/api/getdataFromReqno?strRequestNumber=${txtData.req_no}`
      );
      if (response.data != "") {
        notification.success({
          message: "Success",
          description: `Search Data Completed`,
          placement: "bottomRight",
          duration: 5,
        });
        console.log(response.data);
        setDataSource([response.data]);
      } else {
        notification.error({
          message: "Error",
          description: "No data found for the provided Request Number",
          placement: "bottomRight",
          duration: 3,
        });
        setTextData((prev) => ({ ...prev, req_no: "" }));
        document.getElementById("txtReqno").focus();
        return;
      }
    }
  }
  return (
    <div style={{ width: "100%" }}>
      {console.log(dataSource)}

      <Card className="SpareopenCardChecker">
        <div className="Scanhead">
          <h1 style={{ fontSize: "35px", color: "#4f6f52" }}>
            Check Request Number
          </h1>
        </div>
        <div style={{ marginTop: 10, display: "flex", gap: 10 }}>
          <TextField
            sx={{ width: 300 }}
            size="small"
            id="txtReqno"
            label="Enter Request Number"
            value={txtData.req_no}
            onChange={(e) =>
              setTextData((prev) => ({ ...prev, req_no: e.target.value }))
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearchData();
              }
            }}
          />
          <Button
            type="primary"
            icon={<SearchOutlined />}
            style={{ height: 40 }}
            onClick={handleSearchData}
          >
            Search
          </Button>
        </div>
        <div style={{ marginTop: 10, display: "flex", gap: 10 }}>
          <Table
            className="TableAll"
            style={{ width: "100%" }}
            dataSource={dataSource}
            columns={columns}
          />
        </div>
      </Card>
    </div>
  );
}

export default CheckUser;
