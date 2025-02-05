import React, { useState } from "react";
import { Button, Card, Flex, Select, Input, Table, Tag } from "antd";
import { FileSearchOutlined, FileExcelOutlined } from "@ant-design/icons";
// import "../components/Common/StyleCommon.css";
import "../Common/StyleCommon.css";
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
    exportExcelFile,
    ddlFactory,
    setDdlFactory,
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
          <label>Factory :</label>
          <Select
            defaultValue="----Select----"
            style={{
              width: "200px",
              display: "block",
              marginTop: "5px",
              marginLeft: "5px",
            }}
            id="txtFSampleSize"
            value={ddlFactory}
            onChange={(value) => {
              setDdlFactory(value);
              // handleChangeSampleSize(value);
            }}
            options={[
              { value: "All", label: "All" },
              { value: "N2", label: "N2" },
              { value: "K1", label: "K1" },
              { value: "P1", label: "P1" },
              { value: "BKK", label: "BKK" },
              { value: "HQ", label: "HQ" },
              { value: "N1", label: "N1" },
              { value: "A1", label: "A1" },

            ]}
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
        </div>
        <div style={{marginTop: "10px"}}>
          <label>Date :</label>
          &nbsp;&nbsp;
          <RangePicker onChange={onDateChange} style={{ width: 270 }} />
          &nbsp;&nbsp;
          <Button
            type="primary"
            className="btnSearch"
            iconPosition={"end"}
            icon={<FileSearchOutlined />}
            onClick={onSearch}
          >
            Search
          </Button>
          &nbsp;&nbsp;
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
            className="reportTableSpare"
            columns={columns}
            dataSource={DtData}
            sticky
            style={{ marginTop: "10px" }}
            scroll={{ x: "max-content" ,y: 300 }}
            pagination={true}
          />
        )}
      </Card>
    </Flex>
  );
}

export default report;
