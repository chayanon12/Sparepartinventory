import React, { useState } from "react";
import { Button, Card, Flex, Select, Input, Table, Tag } from "antd";
import { FileSearchOutlined, FileExcelOutlined } from "@ant-design/icons";
// import "../components/Common/StyleCommon.css";
import '../Common/StyleCommon.css';
import "./report.css";
import { fn_report } from "./fn_report";
function report() {
  const {
    onDateChange,
    movementTypeOption,
    movemoentTypeSelected,
    setMovementTypeSelected,
    RangePicker,
    ddlItems,
    ddlItemsselected,
    setDdlItemsselected,
    ddlCostcenterSelected,
    setDdlCostcenterSelected,
    ddlCostcenter,
    DtDataState,
    onSearch,
    DtData,
    columns,
    exportExcelFile
  } = fn_report();
  return (
    <Flex gap="10px">
      <Card className="openCard">
        <div className="divReport">
          <label>Item status:</label>
          <Select
            showSearch
            style={{ width: 100 }}
            placeholder="Search to Select"
            optionFilterProp="label"
            value={movemoentTypeSelected}
            onChange={(value) => {
              setMovementTypeSelected(value);
            }}
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={movementTypeOption}
          />
          <label>Items name:</label>
          <Select
            showSearch
            style={{ width: 180 }}
            placeholder="Search to Select"
            optionFilterProp="label"
            value={ddlItemsselected}
            onChange={(value) => {
              setDdlItemsselected(value);
            }}
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={ddlItems.map((item) => ({
              label: item.type_name,
              value: item.type_id,
            }))}
            allowClear
          />
          <label>Cost Center:</label>
          <Select
            showSearch
            style={{ width: 100 }}
            placeholder="Search to Select"
            optionFilterProp="label"
            value={ddlCostcenterSelected}
            onChange={(value) => {
              setDdlCostcenterSelected(value);
            }}
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={ddlCostcenter.map((item) => ({
              label: item.cost_center,
              value: item.cost_center,
            }))}
            allowClear
          />
          <label>Date:</label>
          <RangePicker onChange={onDateChange} style={{ width: 270 }} />
          <Button
            type="primary"
            className="btnSearch"
            iconPosition={"end"}
            icon={<FileSearchOutlined />}
            onClick={onSearch}
          >
            Search
          </Button>

          <Button
            type="primary"
            style={{ backgroundColor: "#006600", borderColor: "#006600" }}
            iconPosition={"end"}
            icon={<FileExcelOutlined />}
            onClick={exportExcelFile}
          >
            Export
          </Button>
        </div>
        {DtDataState && (
          <Table
             className="ModifyDataTable"
            columns={columns}
            dataSource={DtData}
            scroll={{ x: 'max-content'}}
            pagination={{
              showSizeChanger: true,
              pageSizeOptions: ['6','10', '20', '50', '100',DtData.length.toString()],
              defaultPageSize:6
            }}
          />
        )}
      </Card>
    </Flex>
  );
}

export default report;
