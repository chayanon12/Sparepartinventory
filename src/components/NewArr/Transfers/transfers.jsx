import React, { useEffect } from "react";
import { Card, Segmented, Badge, Table } from "antd";
import { fn_transfers } from "./fn_transfers";
import "./Transfer.css";
function Transfers() {
  const {
    selectedTab,
    setSelectedTab,
    components,
    setReqNumber,
    setSerialNumber,
  } = fn_transfers();

  return (
    <div style={{ width: "100%" }}>
      <Card className="TransferopenCard" >
        <Segmented
          value={selectedTab}
          options={[
            {
              label: "Transfer By Request Number",
              value: "Transfer By Request Number",
            },
            {
              label: "Transfer By Serial Number",
              value: "Transfer By Serial Number",
            },
            {
              label: (
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                    justifyContent: "center",
                  }}
                >
                  Waiting Receive{" "}
                  <Badge
                    count={parseInt(localStorage.getItem("notify")) || 0}
                    style={{ marginLeft: 5 }}
                  />
                </span>
              ),
              value: "Waiting Receive",
            },
          ]}
          block
          onChange={(value) => {
            setSelectedTab(value);
            setReqNumber("");
            setSerialNumber("");
          }}
        />
        {components[selectedTab]}
      </Card>
    </div>
  );
}

export default Transfers;
