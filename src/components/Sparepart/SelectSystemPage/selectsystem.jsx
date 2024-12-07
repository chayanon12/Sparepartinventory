import React, { useEffect, useRef } from "react";
import "./selectsystem.css";
import VanillaTilt from "vanilla-tilt";
import { Card, Typography } from "@mui/material";
import { Image } from "antd";
import Sparepart from "/src/assets/spare3D.png";
import NewItems from "/src/assets/comnew3D.png";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
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
    // <div className="selectsystem-container">
    //   <Card component={Card} className="selectsystem-card">
    //     <Card className="selectsystem-card-header">
    //       <span className="dotRed"></span>
    //       <span className="dotYellow"></span>
    //       <span className="dotGreen"></span>
    //     </Card>
    //     <div className="selectsystem-card-selected">
    //       <div className="selectsystem-card-selected-spare">
    //         <img
    //           src={NewItems}
    //           alt="image"
    //           className="selectsystem-card-selected-img-card"
    //         />
    //       </div>
    //       <div className="selectsystem-card-selected-new">
    //         <img
    //           src={Sparepart}
    //           alt="image"
    //           className="selectsystem-card-selected-img-card"
    //         />
    //       </div>
    //     </div>

    //     {/* <div class="container">
    //       <div class="card__container">
    //         <article class="card__article">
    //           <img src={Sparepart} alt="image" class="card__img" />

    //           <div class="card__data">
    //             <span class="card__description">
    //               Vancouver Mountains, Canada
    //             </span>
    //             <h2 class="card__title">The Great Path</h2>
    //             <a href="#" class="card__button">
    //               Read More
    //             </a>
    //           </div>
    //         </article>

    //         <article class="card__article">
    //           <img src={NewItems} alt="image" class="card__img" />

    //           <div class="card__data">
    //             <span class="card__description">Poon Hill, Nepal</span>
    //             <h2 class="card__title">Starry Night</h2>
    //             <a href="#" class="card__button">
    //               Read More
    //             </a>
    //           </div>
    //         </article>
    //         <article class="card__article">
    //           <img src={NewItems} alt="image" class="card__img" />

    //           <div class="card__data">
    //             <span class="card__description">Poon Hill, Nepal</span>
    //             <h2 class="card__title">Starry Night</h2>
    //             <a href="#" class="card__button">
    //               Read More
    //             </a>
    //           </div>
    //         </article>
    //       </div>
    //     </div> */}
    //   </Card>
    // </div>
    <div className="container">
      <svg width="100%" className="select-page-title">
        <text x="50%" y="100%" className="select-page-title-text">
          store Inventory management system
        </text>
      </svg>
      <a href="/SparepartinventorySystem/Sparepart">
        <div className="CardBox" ref={spareRef}>
          <h2 className="Cardname">Spare Parts Inventory</h2>
          <a href="/SparepartinventorySystem/Sparepart" className="goto">
            GO TO
          </a>
          <img src={Sparepart} className="product" />
        </div>
      </a>
      <a href="/SparepartinventorySystem/newarrival">
        <div className="CardBox" ref={newItemsRef}>
          <h2 className="Cardname">New Arrival Inventory</h2>
          <a href="/SparepartinventorySystem/newarrival" className="goto">
            GO TO
          </a>
          <img src={NewItems} className="product" />
        </div>
      </a>
    </div>
  );
}

export default selectsystem;
