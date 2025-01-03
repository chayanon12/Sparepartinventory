import { Layout, Button, Flex, Row, Col ,theme } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import Sidebar from "../Sidebar/Sidebar";
import CustomHeader from "../Header/Header";
import ScanIN from "../Scanin/ScanIn";
import ScanOut from "../ScanOut/ScanOut";
import SecondContent from "../Dashboard/Dashboard";
import GenarateBarcode from "../Generatebarcode/GenerateBarcode";
import CheckSerial from "../ChcekSerial/CheckSerial";
import ModifyItems from "../ModifyItems/ModifyItems";
import Addtype from "../Addtype/addtype";
import Report from "../Report/report";
import { useState } from "react";
// import "./App.css";
import './MainPage.css';

const MainPage = ({ switchValue, setSwitchValue }) => {
  const { Sider, Content, Header } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const [hoverEnabled, setHoverEnabled] = useState(false);
  const [open, setOpen] = useState(false);
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
    1: <SecondContent state={open} />,
    2: <ScanIN state={open} />,
    3: <ScanOut state={open} />,
    4: <GenarateBarcode state={open} />,
    5: <ModifyItems state={open} />,
    6: <Addtype state={open} />,
    7: <Report state={open} />,
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
          if (open === false) {
            setOpen(true);
          }
        }}
        onMouseLeave={() => {
          hoverEnabled && setCollapsed(true);
          if (hoverEnabled) {
            setOpen(false);
          }
        }}
      >
        <Sidebar collapsed={collapsed} theme={switchValue} pageChange={setPage} />
      </Sider>
      <Layout>
        <Header
          className="header"
          style={{ background: switchValue === false ? "#001529" : "" }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => {
              setCollapsed(!collapsed);
              setHoverEnabled(!hoverEnabled);
              if (open === false) {
                setOpen(true);
              }
            }}
            style={collapsed ? btnStyleClose : btnStyleOpen}
          />
          <CustomHeader onSwitchChange={setSwitchValue} theme={switchValue} page={page} />
        </Header>
        <Content className="content" >
          <Flex gap="large">{contentMap[page] || <SecondContent />}</Flex>
        </Content>
       
      </Layout>
    </Layout>
  );
};

export default MainPage;
