import React, { useState } from "react";
import { Button, Card, Flex, Select, Input, Table, Tag } from "antd";
import { FileSearchOutlined } from "@ant-design/icons";


function ModifyItems() {
  return (
    <>
      <Flex gap="10px">
        <Card className="openCard">
          {/* <Search
            id="SearchSerial"
            placeholder="Input Serial Number"
            allowClear
            enterButton="Search"
            size="large"
            className="CheckSearchSerial"
            prefix={<FileSearchOutlined />}
            value={serialNumber}
            onChange={(e) => setSerialNumber(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSearch();
              }
            }}
            onSearch={onSearch}
          /> */}

          <div className="divModifyData">
            <table>
              <tr>
                <td className="ModifyTd">Item Name : </td>
                <td>
                  <Input
                    className="ModifyDataTextF"
                    id="txtItemName"
                    type="text"
                    // onChange={(e) => setItemname(e.target.value)}
                    // value={itemname}
                  />
                </td>
                <td className="ModifyTd">Mac Address : </td>
                <td>
                  <Input
                    className="ModifyDataTextF"
                    id="txtMacAddress"
                    type="text"
                    // onChange={(e) => setMacAddress(e.target.value)}
                    // value={macAddress}
                  />
                </td>
                <td className="ModifyTd">Fix Assets Code : </td>
                <td>
                  <Input
                    className="ModifyDataTextF"
                    id="txtFixAssetsCode"
                    type="text"
                    // onChange={(e) => setFixAssetsCode(e.target.value)}
                    // value={fixAssetsCode}
                  />
                </td>
                <td>
                  <Button
                    type="primary"
                    // onClick={onUpdateData}
                    // disabled={UpdatebtnDisable}
                  >
                    Update
                  </Button>
                </td>
              </tr>
            </table>
          </div>
          {/* {DtDataState && (
            <Table
              className="ModifyDataTable"
              columns={columns}
              dataSource={DtData}
              scroll={{ x: 100 * 5 }}
              pagination={{
                pageSize: 6,
              }}
            />
          )} */}
        </Card>
      </Flex>
    </>
  );
}

export default ModifyItems;
