import {
  NotificationOutlined,
  MessageOutlined,
  UserOutlined,
  SunOutlined,
  MoonFilled,
  DownOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { Avatar, Flex, Switch, Typography, Card, Dropdown, Button } from "antd";
import Search from "antd/es/input/Search";
import React, { useState } from "react";

function Header({ onSwitchChange, theme, page }) {
  const [check, setCheck] = useState(true);
  const userName = localStorage.getItem("username");
  const userSurname = localStorage.getItem("surname");
  const items = [
    {
      key: "1",
      label: (
        <a href="/SparepartinventorySystem/" style={{ display: 'flex', alignItems: 'center' }}  onClick={() => localStorage.clear()}>
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
      style={{ background: theme === true ? "#fff" : "#001529" }}
    >
      <Typography.Title
        level={2}
        type="secondary"
        style={{ color: theme === false ? "#fff" : "#3f4840ea" }}
      >
        {page === "1"
          ? "Dashboard"
          : page === "2"
          ? "Scan In"
          : page === "3"
          ? "Scan Out"
          : page === "4"
          ? "Barcode Generate"
          : page === "5"
          ? "Check Items"
          : page === "6"
          ? "Modify Items"
          : page === "7"
          ? "Add Type"
          : "Report"
        }

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
  );
}

export default Header;
