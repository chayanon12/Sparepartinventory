// import { Warehouse } from "@mui/icons-material";
import { Card, Flex, Table } from "antd";
import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import Sun from "/src/assets/Sun.png";
import Reuse from "/src/assets/reuse.png";
import Box from '/src/assets/boxnewarr.png'
// import { fn_dashboard } from "./fn_dashboard";
import Warehouse from "/src/assets/comnew3D.png";
import './DashboardNew.css';


function Dashboard() {
  return (
    <>
      <div style={{ overflow: "" }}>
        <Flex gap="10px">
          <div>
            <Card className="logoCardNew">
              <span
                style={{ display: "flex", alignItems: "center", gap: "20px" }}
              >
                <img
                  src={Warehouse}
                  alt="Clock Icon"
                  style={{
                    width: "130px",
                    height: "100px",
                  }}                  
                />
                <h1>New Arrival Inventory</h1>
              </span>
            </Card>
            <Card className="chartCardNew">
              {/* <ReactApexChart
                style={{ width: "700px" }}
                options={options}
                series={series}
                type="bar"
                height={410}
              /> */}
            </Card>
          </div>
          <div>
            <Card
              className="dashboardsmallCardNew"
              title={
                <span>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "20px",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={Sun}
                      className="spin"
                      style={{
                        width: "60px",
                        height: "60px",
                        marginLeft: "8px",
                      }}
                      alt="Weather icon"
                    />
                  </span>
                </span>
              }
            >
              <Flex
                gap="10px"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "45px",
                }}
              >
                {/* {formattedTime} */}
              </Flex>
              <p
                style={{
                  fontSize: "10px",
                  color: "gray",
                  fontWeight: "none",
                  marginLeft: "8px",
                  marginBottom: "5px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {/* {formattedDate} */}
              </p>
            </Card>
            <Card className="tableDataNew">
              {/* <Table
                className="TableDashboard"
                columns={columns}
                dataSource={DtData}
                pagination={{
                  pageSize: 3,
                }}
              /> */}
            </Card>
          </div>
          <div style={{ height: 150 }}>
            <Card
              className="dashboardsmallCardNew"
              title={
                <span>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "20px",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      className="spin"
                      src={Box}
                      style={{
                        width: "60px",
                        height: "60px",
                        marginLeft: "8px",
                      }}
                      alt="Reuse icon"
                    />
                  </span>
                </span>
              }
            >
              <Flex
                gap="10px"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "45px",
                }}
              >
                {/* {count} */}
              </Flex>
              <p
                style={{
                  fontSize: "10px",
                  color: "gray",
                  fontWeight: "none",
                  marginLeft: "8px",
                  marginBottom: "5px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                Total Items In New Arrival Inventory
              </p>
            </Card>
          </div>
        </Flex>
      </div>
    </>
  );
}

export default Dashboard;
