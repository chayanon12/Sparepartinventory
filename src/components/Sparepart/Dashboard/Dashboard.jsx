import { Card, Flex, Table } from "antd";
import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import Sun from "/src/assets/Sun.png";
import Reuse from "/src/assets/reuse.png";
import { fn_dashboard } from "./fn_dashboard";
import "./Dashboard.css";
import Warehouse from "/src/assets/inventory.png";
import Spare3D from "../../../assets/spare3D.png";
function SecondContent() {
  const {
    count,
    time,
    DtData,
    columns,
    formattedDate,
    DtDataAction,
    formattedTime,
    DtDataFixedFac,
  } = fn_dashboard();
  const combinedData = {};
  const fac = localStorage.getItem("factory");
  DtData.forEach((item) => {
    if (!combinedData[item.type_name]) {
      combinedData[item.type_name] = { quantity: 0, out_count: 0 };
    }
    combinedData[item.type_name].onhands = item.onhands;
  });
  DtDataFixedFac.forEach((item) => {
    if (!combinedData[item.type_name]) {
      combinedData[item.type_name] = { quantity: 0, out_count: 0 };
    }
    combinedData[item.type_name].out_count = item.total_in_stock;
  });
  // DtDataAction.forEach((item) => {
  //   if (!combinedData[item.type_name]) {
  //     combinedData[item.type_name] = { quantity: 0, out_count: 0 };
  //   }
  //   combinedData[item.type_name].out_count = item.out_count;
  // });
  const categories = Object.keys(combinedData);
  const quantityData = categories.map((cat) => combinedData[cat].onhands);
  const outCountData = categories.map((cat) => combinedData[cat].out_count);
  const [chartHeight, setChartHeight] = useState("400vh");
  const [tableScrollY, setTableScrollY] = useState(200);
  const [tablePagination, setTablePagination] = useState(5);
  useEffect(() => {
    const dpr = window.devicePixelRatio;
    if (dpr >= 1.25) {
      setChartHeight("400vh");
      setTableScrollY(200);
      setTablePagination(5);
    } else {
      setChartHeight("600vh");
      setTableScrollY(400);
      setTablePagination(10);
    }
  }, []);
  let countout = 0;
  for (let i = 0; i < categories.length; i++) {
    countout = countout + outCountData[i];
  }
  const series = [
    {
      name: `${fac}`,
      data: outCountData,
    },
    {
      name: `All Factory`,
      data: quantityData,
    },
  ];

  const options = {
    chart: {
      type: "bar",
      width: "100%",
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "80%",
        endingShape: "rounded",
        borderRadius: 6,
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "last",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: categories,
      labels: {
        show: true,
      },
    },
    yaxis: {
      title: {
        text: "Pieces",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " Pieces";
        },
      },
    },
    responsive: [
      {
        breakpoint: 900,
        options: {
          plotOptions: {
            bar: {
              horizontal: false,
            },
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
      }}
    >
      <div style={{ width: "60%" }}>
        <Card className="SparelogoCard">
          <span style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <img
              src={Spare3D}
              alt="Clock Icon"
              style={{
                width: "120px",
                height: "100px",
              }}
            />
            <h1>Spare Part Inventory</h1>
          </span>
        </Card>
        <Card className="SparechartCard">
          <ReactApexChart
            height={chartHeight}
            options={options}
            series={series}
            type="bar"
          />
        </Card>
      </div>
      <div
        style={{
          width: "40%",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          marginLeft: "20px",
        }}
      >
        <div style={{ display: "flex", gap: "20px" }}>
          <Card
            className="SparedashboardsmallCard"
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
                    className="Sparespin"
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
              {formattedTime}
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
          <Card
            className="SparedashboardsmallCard"
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
                    className="Sparespin"
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
                fontSize: "45px",
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
              Total Sparepart All Factory
            </p>
          </Card>
        </div>
        <div>
          <Card className="SparetableData">
            <Table
              className="SpareTableDashboard"
              columns={columns}
              dataSource={DtData}
              pagination={{
                pageSize: tablePagination,
              }}
              scroll={{ y: tableScrollY }}
            />
          </Card>
        </div>
      </div>
    </div>
  );
}

export default SecondContent;
