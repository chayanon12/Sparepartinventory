import { Card, Flex, Table } from "antd";
import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import Sun from "/src/assets/Sun.png";
import Reuse from "/src/assets/reuse.png";
import { fn_dashboard } from "./fn_dashboard";
import "./Dashboard.css";
import Warehouse from "/src/assets/inventory.png";

function SecondContent() {
  const { count, time, DtData, columns, formattedDate } = fn_dashboard();
  const colors = [
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#F39C12",
    "#D35400",
    "#1ABC9C",
    "#9B59B6",
    "#34495E",
    "#F1C40F",
    "#E67E22",
    "#2ECC71",
    "#E74C3C",
    "#8E44AD",
    "#3498DB",
    "#2C3E50",
    "#16A085",
    "#27AE60",
    "#C0392B",
    "#BDC3C7",
  ];
  const series = [
    {
      name: "Quantity",
      type: "column",
      data: DtData.map((item) => item.quantity),
    },
  ];

  const options = {
    chart: {
      height: 350,
      type: "bar",
      stacked: false,
    },
    dataLabels: {
      enabled: false,
    },
    title: {
      text: "Product Quantity Analysis",
      align: "left",
    },
    xaxis: {
      categories: DtData.map((item) => item.type_name),

      labels: {
        show: false,
      },
    },
    yaxis: {
      title: {
        text: "Quantity",
      },
    },
    tooltip: {
      fixed: {
        enabled: true,
        position: "topLeft",
        offsetY: 30,
        offsetX: 60,
      },
    },
    legend: {
      horizontalAlign: "left",
      offsetX: 40,
    },
    colors: colors,
  };

  return (
    <>
      <div>
        <Flex gap="10px">
          <div>
            <Card className="logoCard">
            <span style={{ display: "flex", alignItems: "center",gap:'20px' }}>
                
                <img
                  src={Warehouse}
                  alt="Clock Icon"
                  style={{ width: "100px", height: "100px", marginLeft: "40px" }}
                />
                <h1 style={{}}>Spare Part Inventory</h1>
              </span>
          
            </Card>
            <Card className="chartCard">
              <ReactApexChart
                options={options}
                series={series}
                type="bar"
                height={430}
              />
            </Card>
          </div>
          <div>
            <Card
              className="dashboardsmallCard"
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
                  fontSize: "50px",
                }}
              >
                {time.toLocaleTimeString()}
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
                {formattedDate}
              </p>
            </Card>
            <Card className="tableData">
              <Table
                className="TableDashboard"
                columns={columns}
                dataSource={DtData}
              />
            </Card>
          </div>
          <div style={{ height: 150 }}>
            <Card
              className="dashboardsmallCard"
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
                      src={Reuse}
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
                  fontSize: "50px",
                }}
              >
                {count}
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
                Total Sparepart Inventory
              </p>
            </Card>
          </div>
        </Flex>
      </div>
    </>
  );
}

export default SecondContent;
