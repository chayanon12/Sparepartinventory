import React, { useState } from "react";
import { Layout, Button, Flex, Row, Col, theme } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import Sidebar from "../Sidebar/Sidebar";
import "./Homepage.css";
function Homepage() {
  const { Sider, Content, Header } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const [page, setPage] = useState("1");
  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="siderNewArrival"
      >
        <Sidebar collapsed={collapsed} pageChange={setPage} />
      </Sider>
      <Layout style={{ background: "#15202B", minWidth: "100vh" }}>
        <Header className="headerNewArrival"></Header>
        <Content className="contentNewArrival"></Content>
      </Layout>
    </Layout>
  );
}

export default Homepage;
