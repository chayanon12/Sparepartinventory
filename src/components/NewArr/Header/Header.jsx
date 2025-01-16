import {
  NotificationOutlined,
  MessageOutlined,
  UserOutlined,
  SunOutlined,
  MoonFilled,
  DownOutlined,
  LoginOutlined,
  WindowsOutlined,
  BlockOutlined,
} from "@ant-design/icons";
import NewrrImg from "/src/assets/comnew3D.png";
import { Avatar, Flex, Switch, Typography, Card, Dropdown, Button } from "antd";
import Search from "antd/es/input/Search";
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function Header({ onSwitchChange, theme, page }) {
  const [check, setCheck] = useState(true);
  const Pagename = "New Arrivals Inventory System";
  const userName = localStorage.getItem("username");
  const userSurname = localStorage.getItem("surname");
  const navigate = useNavigate();
  const onSwitchChange2 = () => {
    navigate("/InventorymanagementSystem/selectpage");
  };
  const items = [
    {
      key: "1",
      label: (
        <a
          href="/InventorymanagementSystem/"
          style={{ display: "flex", alignItems: "center" }}
          onClick={() => localStorage.clear()}
        >
          Logout
          <LoginOutlined style={{ marginLeft: 8 }} />
        </a>
      ),
    },
  ];
  return (
    <Flex
      align="center"
      justify="space-between"
      style={{ background: theme === true ? "#fff" : "#001529" ,marginLeft: "20px"}}
    >
      <Typography.Title
        level={2}
        type="secondary"
        style={{
          display: "flex", // ใช้ Flexbox จัดเรียง
          alignItems: "center", // จัดให้อยู่ในแนวกลาง
          color: theme === false ? "#fff" : "#3f4840ea",
          gap: "10px", // เพิ่มระยะห่างระหว่างรูปและข้อความ
        }}
      >
        {/* <img
          src={NewrrImg}
          alt="Sun Icon"
          style={{
            width: "50px", 
            height: "30px",
          }}
        /> */}
        {page === "1"
          ? "Dashboard" + "  (" + Pagename + ")"
          : page === "2"
          ? "Scan In" + "  (" + Pagename + ")"
          : page === "3"
          ? "Scan Out" + "  (" + Pagename + ")"
          : page === "4"
          ? "Barcode Generate" + "  (" + Pagename + ")"
          : page === "5"
          ? "Modify Items" + "  (" + Pagename + ")"
          : page === "6"
          ? "Add Type" + "  (" + Pagename + ")"
          : "Report" + "  (" + Pagename + ")"}
      </Typography.Title>

      <Flex align="center" gap="1rem">
        <Flex align="center" gap="10px">
          <Dropdown menu={{ items }} placement="bottom">
            <Button>
              <Avatar
                icon={<UserOutlined />}
                style={{
                  height: 20,
                  width: 20,
                  backgroundColor: "#fde3cf",
                  color: "#f56a00",
                }}
              />
              {userName} {userSurname}
              <DownOutlined />
            </Button>
          </Dropdown>
          <Button
            icon={<BlockOutlined />}
            style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}
            onClick={onSwitchChange2}
          >
            Switch Program
          </Button>
          <Switch
            checkedChildren={<SunOutlined />}
            unCheckedChildren={<MoonFilled />}
            checked={theme}
            className="custom-switch"
            onChange={() => {
              // setCheck(!check);
              onSwitchChange(!theme);
            }}
          />
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Header;
