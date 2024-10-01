import { LanTwoTone } from "@mui/icons-material";
import { Button, Card, Flex, Layout } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import CustomHeader from "./components/Header";
import ScanIN from "./components/Scanin/ScanIn";
import ScanOut from "./components/ScanOut/ScanOut";
import SecondContent from "./components/Dashboard/Dashboard";
import GenarateBarcode from "./components/Generatebarcode/GenerateBarcode";
import CheckSerial from "./components/ChcekSerial/CheckSerial";
import "./App.css";
import axios from "axios";

function App() {
  const backendUrl = import.meta.env.VITE_SERVICE_URL;
  axios.defaults.baseURL = backendUrl;
  const { Sider, Content, Header } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const [hoverEnabled, setHoverEnabled] = useState(false);
  const [switchValue, setSwitchValue] = useState(true);
  const [page, setPage] = useState("1");
  const handleSwitchChange = (value) => {
    setSwitchValue(value);
  };
  const [open, setOpen] = useState(false);

  const handlePageChange = (value) => {
    setPage(value);
  };
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
    1: <SecondContent state={open}></SecondContent>,
    2: <ScanIN state={open} />,
    3: <ScanOut state={open} />,
    4: <GenarateBarcode state={open} />,
    5: <CheckSerial state={open} />,
  };
  return (
    <Layout className={switchValue === false ? "dark-theme" : ""}>
      <Sider
        theme={switchValue ? "light" : "dark"}
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="sider"
        onMouseEnter={() => {
          hoverEnabled && setCollapsed(false);
          if (open == false) {
            setOpen(true);
          }
        }}
        onMouseLeave={() => {
          hoverEnabled && setCollapsed(true);
          if (hoverEnabled == true) {
            setOpen(false);
          }
        }}
      >
        <Sidebar
          collapsed={collapsed}
          theme={switchValue}
          pageChange={handlePageChange}
        />
      </Sider>
      <Layout>
        <Header
          className="header"
          style={{ background: switchValue == false ? "#001529" : "" }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => {
              setCollapsed(!collapsed);
              setHoverEnabled(!hoverEnabled);
              if (open == false) {
                setOpen(true);
              }
            }}
            style={collapsed ? btnStyleClose : btnStyleOpen}
          />
          <CustomHeader
            onSwitchChange={handleSwitchChange}
            theme={switchValue}
            page={page}
          />
        </Header>
        <Content className="content">
          <Flex gap="large"> {contentMap[page] || <SecondContent />} </Flex>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
