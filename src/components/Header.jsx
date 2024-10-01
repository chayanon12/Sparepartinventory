import {
  NotificationOutlined,
  MessageOutlined,
  UserOutlined,
  SunOutlined,
  MoonFilled,
} from "@ant-design/icons";
import { Avatar, Flex, Switch, Typography } from "antd";
import Search from "antd/es/input/Search";
import React, { useState } from "react";

function Header({onSwitchChange,theme,page}) {
  const [check, setCheck] = useState(true);

  return (
    <Flex align="center" justify="space-between" style={{background:theme === true ? '#fff' : '#001529'}}>
    

      <Typography.Title level={2} type="secondary" style={{color:theme === false ? '#fff' : '#3f4840ea'}}>
        {page === '1' ? "Dashboard" : page === '2' ? "Scan In" : page === '3' ? "Scan Out" : page === '4' ? "Barcode Generate" : 'Check Items'}
      </Typography.Title>
      <Flex align="center" gap="3rem">
        <Search placeholder="Search" allowClear />
        <Flex align="center" gap="10px">
          <MessageOutlined className="header-icons" />
          <NotificationOutlined className="header-icons" />
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
