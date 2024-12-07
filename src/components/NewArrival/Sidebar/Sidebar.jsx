import React, { useEffect, useState } from "react";
import { Layout, Button, Flex, Row, Col, theme, Menu } from "antd";
import LogoFullImg from "../../../assets/Fujikura.png";
import LogoCutimage from "../../../assets/FujikuraF.png";
import axios from "axios";
import * as AntIcons from "@ant-design/icons";
import "./Sidebar.css";
function Sidebar({ collapsed, theme, pageChange }) {
  const [menuData, setMenuData] = useState([]);
  const getDataFunction = async (type, params = null) => {
    try {
      if (params) {
        const response = await axios.post(`/newarrival/api/${type}`, params);
        return response.data;
      } else {
        const response = await axios.get(`/newarrival/api/${type}`);
        return response.data;
      }
    } catch (error) {
      console.error(`Error fetching data for type: ${type}`, error);
      return [];
    }
  };
  const getIcon = (iconName) => {
    const IconComponent = AntIcons[iconName];
    return IconComponent ? <IconComponent /> : null;
  };
  async function pageload() {
    const menu_data = await getDataFunction("getmenuname");
    const mappedMenuData = menu_data.map((item) => ({
      key: item.id.toString(),
      icon: getIcon(item.menu_icon),
      label: item.menu_name,
    }));
    setMenuData(mappedMenuData);
  }
  useEffect(() => {
    pageload();
  }, []);
  return (
    <>
      <Flex align="center" justify="center" className="FlexSidebar">
        <div className="logoSidebar">
          <img
            src={collapsed ? LogoCutimage : LogoFullImg}
            width={collapsed ? "40px" : "180px"}
            height="40px"
          />
        </div>
      </Flex>
      <Menu
        className="menu-bar-newarr"
        style={{ color: "white" }}
        defaultSelectedKeys={["1"]}
        items={menuData}
      />
    </>
  );
}

export default Sidebar;
