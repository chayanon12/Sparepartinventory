import React, { useEffect, useRef } from "react";
import "./selectsystem.css";
import VanillaTilt from "vanilla-tilt";
import { Card, Typography } from "@mui/material";
import { Image } from "antd";
import Sparepart from "/src/assets/spare3D.png";
import NewItems from "/src/assets/comnew3D.png";
// import "@fontsource/roboto/300.css";
// import "@fontsource/roboto/400.css";
// import "@fontsource/roboto/500.css";
// import "@fontsource/roboto/700.css";
import Snowfall from "react-snowfall";
function selectsystem() {
  // const tiltRef = useRef(null);
  const newItemsRef = useRef(null);
  const spareRef = useRef(null);
  useEffect(() => {
    if (spareRef.current) {
      VanillaTilt.init(spareRef.current, {
        max: 25,
        speed: 400,
        glare: true,
        "max-glare": 0.5,
      });
    }
    if (newItemsRef.current) {
      VanillaTilt.init(newItemsRef.current, {
        max: 25,
        speed: 400,
        glare: true,
        "max-glare": 0.5,
      });
    }
  }, []);

  return (

    <div className="container">
      <Snowfall  snowflakeCount={50}/>
      <svg width="100%" className="select-page-title">
        <text x="50%" y="100%" className="select-page-title-text">
          store Inventory management system
        </text>
      </svg>
      <a href="/InventorymanagementSystem/Sparepart">
        <div className="CardBox" ref={spareRef}>
          <h2 className="Cardname">Spare Parts Inventory</h2>
          <a href="/InventorymanagementSystem/Sparepart" className="goto">
            GO TO
          </a>
          <img src={Sparepart} className="product" />
        </div>
      </a>
      <a href="/InventorymanagementSystem/newarrival">
        <div className="CardBox" ref={newItemsRef}>
          <h2 className="Cardname">New Arrival Inventory</h2>
          <a href="/InventorymanagementSystem/newarrival" className="goto">
            GO TO
          </a>
          <img src={NewItems} className="product" />
        </div>
      </a>
    </div>
  );
}

export default selectsystem;
