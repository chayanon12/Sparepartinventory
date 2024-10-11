import React, { useState } from "react";
import { Button, Card, Flex, Select, Input, Table, Tag } from "antd";
import { FileSearchOutlined } from "@ant-design/icons";
import { fn_CcheckSerial } from "./fn_CcheckSerial";
import "./CheckSerial.css";
import "../Common/StyleCommon.css";
function CheckSerial() {
  const {
    columns,
    onSearch,
    setSerialNumber,
    serialNumber,
    DtDataState,
    DtData,
    Search,
    ddlItems,
    ddlItemsValue, 
    setDdlItemsValue
  } = fn_CcheckSerial();

  return (
    <Flex gap="10px">
      <Card className="openCard">
         <Select
              id="ddlFac"
              showSearch
              placeholder="Select Items"
              optionFilterProp="label"
              value={ddlItemsValue}
              onChange={(event, newValue) => {
                setDdlItemsValue(newValue);
              }}
              options={ddlItems.map((item) => ({
                label: item.type_name,
                // label: `${item.cc_ctr} : ${item.cc_desc}`,
                value: item.type_id,
              }))}
              style={{ width: 200, height: 40 }}
            ></Select>
        <Search
          id="SearchSerial"
          placeholder="Input Serial Number"
          allowClear
          enterButton="Search"
          size="large"
          className="CheckSearchSerial"
          prefix={<FileSearchOutlined />}
          onChange={(e) => setSerialNumber(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSearch();
            }
          }}
          onSearch={onSearch}
        />
        {DtDataState && (
          <Table
            className="TableCheckSerial"
            columns={columns}
            dataSource={DtData}
            scroll={{ x: 100 * 5 }}
            pagination={{
              pageSize: 6,
            }}
          />
        )}
      </Card>
    </Flex>
  );
}

export default CheckSerial;
