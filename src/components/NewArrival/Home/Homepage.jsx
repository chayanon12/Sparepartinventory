import React, { useState } from "react";
import { Layout, Button, Flex, Row, Col, theme } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import Sidebar from "../Sidebar/Sidebar";
import DashboardNew from "../DashboardNew/DashboardNew";
import HeaderNew from "../Header/HeaderNew";
import "./Homepage.css";
import ScanOut from "../Scanout/Scanout";
import ScanIn from "../Scanin/Scanin";
import Report from "../Report/Report";
import ModifyItems from '../ModifyItems/ModifyItems';
import GenarateBarcode from "../GenerateBarcode/GenerateBarcode";
import Addtype from '../Addtype/Addtype';
function Homepage({switchValue, setSwitchValue }) {
  const { Sider, Content, Header } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const [page, setPage] = useState("1");
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const btnStyleOpen = {
    fontSize: "16px",
    width: "50px",
    height: "50px",
    position: "fixed",
    top: "10px",
    left: "200px",
    color: switchValue == false ? "white" : "#111d2c",
  };
  const btnStyleClose = {
    fontSize: "16px",
    width: "50px",
    height: "50px",
    position: "fixed",
    top: "10px",
    left: "90px",
    color: switchValue == false ? "white" : "#111d2c",
  };
  const contentMap = {
    1: <DashboardNew state={open} />,
    2: <ScanIn state={open} />,
    3: <ScanOut state={open} />,
    4: <GenarateBarcode state={open} />,
    5: <ModifyItems state={open} />,
    6: <Addtype state={open} />,
    7: <Report state={open} />,
  };
  return (
    <Layout >
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="siderNewArrival"
      >
        <Sidebar collapsed={collapsed} pageChange={setPage} />
      </Sider>
      <Layout style={{ background: "#121d2b", minWidth: "100vh"}}>
        <Header className="headerNewArrival">
        <Button
            type="text"
            icon={collapsed ?  <MenuUnfoldOutlined style={{ color: 'white' }} /> :  <MenuFoldOutlined style={{ color: 'white' }} />}
            onClick={() => {
              setCollapsed(!collapsed);
              setHoverEnabled(!hoverEnabled);
              if (open === false) {
                setOpen(true);
              }
            }}
            style={collapsed ? btnStyleClose : btnStyleOpen}
          />
          <HeaderNew />
        </Header>
        <Content className="contentNewArrival">
          <Flex gap="large">
            {contentMap[page] || <DashboardNew state={open} />}
          </Flex>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Homepage;
