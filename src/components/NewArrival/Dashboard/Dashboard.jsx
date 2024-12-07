import React from "react";
import { Flex, Layout } from "antd";
const { Header, Footer, Sider, Content } = Layout;

function Dashboard() {
  return (
    <Flex>
      <Layout >
        <Sider width="25%" >
          Sider
        </Sider>
        <Layout>
          <Header >Header</Header>
          <Content >Content</Content>
          <Footer >Footer</Footer>
        </Layout>
      </Layout>
    </Flex>
  );
}

export default Dashboard;
