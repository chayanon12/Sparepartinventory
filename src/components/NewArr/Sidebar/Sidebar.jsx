import { Flex, Menu } from "antd";
import React from "react";
import { FaLeaf } from "react-icons/fa6";
// import LogoFullImg from "../../assets/Fujikura.png";
import LogoFullImg from "../../../assets/Fujikura.png";
// import LogoFullImg from "../assets/Fujikura.png";
import LogoCutimage from "../../../assets/FujikuraF.png";

import {
  UserOutlined,
  ProfileOutlined,
  LoginOutlined,
  OrderedListOutlined,
  CarryOutOutlined,
  SettingOutlined,
  ScanOutlined,
  PrinterOutlined,
  BarChartOutlined ,
  FileSearchOutlined,
  SearchOutlined,
  SignatureOutlined,
  ToolOutlined 
} from "@ant-design/icons";
import "./Sidebar.css";
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
            icon: <BarChartOutlined />,
            label: "Dashboard",
          },
          { key: "2", icon: <ScanOutlined />, label: "Scan In" },
          { key: "3", icon: <LoginOutlined />, label: "Scan Out" },
          { key: "4", icon: <PrinterOutlined />, label: "Barcode Genarate" },
          { key: "5", icon:<SearchOutlined />, label: "Modify items" },
          { key: "6", icon: <SignatureOutlined />, label: "Add Type" },
          { key: "7", icon: <FileSearchOutlined />, label: "Report" },
        ]}
        onClick={(e) => pageChange(e.key)}
      />
    </>
  );
}

export default Sidebar;
