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

import { Avatar, Flex, Switch, Typography, Card, Dropdown, Button } from "antd";
import Search from "antd/es/input/Search";
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function HeaderNew({ onSwitchChange, theme, page }) {
  const [check, setCheck] = useState(true);
  const userName = localStorage.getItem("username");
  const userSurname = localStorage.getItem("surname");
  const navigate = useNavigate();
  const onSwitchChange2 = () => {
    navigate("/SparepartinventorySystem/selectpage");
  };
  const items = [
      {
        key: "1",
        label: (
          <a
            href="/SparepartinventorySystem/"
            style={{ display: "flex", alignItems: "center" }}
            onClick={() => localStorage.clear()}
          >
            Logout
            <LoginOutlined style={{ marginLeft: 8 }} />
          </a>
        ),
      },
    ];
  return(
     <Flex
          align="center"
          justify="space-between"
          style={{ background: theme === true ? "#fff" : "#061018" }}
        >
          <Typography.Title
            level={2}
            type="secondary"
            style={{ color: 'white', marginTop: "2px" }}
          >
            {page === "1"
              ? "Dashboard"
              : page === "2"
              ? "Scan In"
              : page === "3"
              ? "Scan Out"
              : page === "4"
              ? "Add Broken Items"
              : page === "5"
              ? "Modify Items"
              : page === "6"
              ? "Add Type"
              : "Report"}
          </Typography.Title>
          <Flex align="center" gap="1rem">
            <Flex align="center" gap="10px">
              <Dropdown menu={{ items }} placement="bottom">
                <Button style={{ backgroundColor:"#061018",color: "white" }}>
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
                style={{ backgroundColor: "#061018", color: "white" }}
                onClick={onSwitchChange2}
              >
                Switch Program
              </Button>
              <Switch
                checkedChildren={<SunOutlined />}
                unCheckedChildren={<MoonFilled />}
                checked={check}
                className="custom-switch"
                onChange={() => {
                  setCheck(!check);
                  onSwitchChange(!check);
                }}
              />
            </Flex>
          </Flex>
        </Flex>
  )
}

export default HeaderNew;
