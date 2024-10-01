import { Flex, Menu } from "antd";
import React from "react";
import { FaLeaf } from "react-icons/fa6";
import PersonIcon from "@mui/icons-material/Person";
import LogoFullImg from "../assets/Fujikura.png";
import LogoCutimage from "../assets/FujikuraF.png";
import dashboard from "../assets/Dashboard.png";
import {
  UserOutlined,
  ProfileOutlined,
  LoginOutlined,
  OrderedListOutlined,
  CarryOutOutlined,
  SettingOutlined,
  ScanOutlined,
  PrinterOutlined,
} from "@ant-design/icons";

function Sidebar({ collapsed, theme, pageChange }) {
  return (
    <>
      <Flex align="center" justify="center">
        <div className="logo">
          <img
            src={collapsed ? LogoCutimage : LogoFullImg}
            width={collapsed ? "40px" : "180px"}
            height="40px"
          />
        </div>
      </Flex>
      <Menu
        theme={theme == true ? "light" : "dark"}
        mode="inline"
        defaultSelectedKeys={["1"]}
        className="menu-bar"
        items={[
          {
            key: "1",
            icon: <UserOutlined />,
            label: "Dashboard",
          },
          { key: "2", icon: <ScanOutlined />, label: "Scan In" },
          { key: "3", icon: <LoginOutlined />, label: "Scan Out" },
          { key: "4", icon: <PrinterOutlined />, label: "Barcode Genarate" },
          { key: "5", icon: <LoginOutlined />, label: "Check Items" },
        ]}
        onClick={(e) => pageChange(e.key)}
      />
    </>
  );
}

export default Sidebar;
