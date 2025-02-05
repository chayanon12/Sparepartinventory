import axios from "axios";
import QRCode from "qrcode";
import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { notification } from "antd";
function fn_GenerateBarcode() {
  const qrRef = useRef();
  // const fac = import.meta.env.VITE_FAC;
  const fac = localStorage.getItem("factory");
  const [ddlData, setDdlData] = useState([]);
  const [ddlvalue, setDdlValue] = useState(null);
  const [snnumber, setSnNumber] = useState([]);
  const [snState, setSnState] = useState(false);
  const [quantity, setQuantity] = useState("");
  const [quantityState, setQuantityState] = useState(false);
  const [page, setPage] = useState(1);

  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [pagination,setPagination] = useState(5);
  useEffect(() => {
    const dpr = window.devicePixelRatio;
    if (dpr >= 1.25) {
      setPagination(4);
    } else {
      setPagination(7);
    }
  }, []);
  const itemsPerPage = pagination;
  const totalPages = Math.ceil(snnumber.length / itemsPerPage);

  const displayedItems = snnumber.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handlePageChange = (event, value) => {
    setSelectAll(false);
    setPage(value);
  };
  useEffect(() => {
    getDDlData("DDL", "");
  }, []);
  async function getDDlData(type, params) {
    if (type == "genQr") {
      await axios
        .get(
          `/Sparepart/api/common/genSerial?strType=SERIAL&strPlantCode=${fac}&strItem=${params}&strItemId=${ddlvalue.typeid}&quantity=${quantity}`
        )
        .then((res) => {
          setSnNumber(res.data);
        })
        .catch((err) => {
          notification.error({
            message: "Error",
            description: err,
            duration: 2,
            placement: "bottomRight",
          });
        });
    } else if (type == "DDL") {
      await axios
        .get(`/Sparepart/api/common/getData?strType=DDL&strPlantCode=${fac}`)
        .then((res) => {
          setDdlData(res.data);
        })
        .catch((err) => {
          notification.error({
            message: "Error",
            description: err,
            duration: 2,
            placement: "bottomRight",
          });
        
        });
    }
  }
  function genType(selectedType) {
    const typeMapping = {
      KEYBOARD: "KEY",
      MOUSE: "MOU",
      "MOUSE PAD": "MOP",
      "NUMERIC KEY PAD": "NKP",
      "NOTEBOOK ADAPTER": "NBA",
      "SSD Notebook": "SSN",
      "SSD PC": "SSP",
      "LAN CARD": "LAC",
      RJ45: "RJ4",
      "SWITCH HUB": "SWH",
      UTP: "UTP",
      "OLD COMPUTER NOTEBOOK": "OCN",
      "OLD COMPUTER PC": "OCP",
      "MOBILE SCAN": "MBS",
      MONITOR: "MNT",
      OTHER: "OTH",
      UPS: "UPS",
    };

    return typeMapping[selectedType] || "";
  }
  const handleGeneClick = async () => {
    if (ddlvalue == null) {
      notification.error({
        message: "Error",
        description: "Please select a type to generate",
        duration: 2,
        placement: "bottomRight",
      });

     
      return;
    } else if (quantity == "") {
      setQuantityState(true);
      document.getElementById("quantity").focus();
    } else {
      const ddltype = ddlvalue.typename;
      const Item = genType(ddltype);
      await getDDlData("genQr", Item);
      setSnState(true);
      setQuantityState(false);
    }
  };
  // const exportPdf = async () => {
  //   if (selectedItems && selectedItems.size === 0) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Oops...",
  //       text: "Please select at least one item to export",
  //     });
  //     return;
  //   }
  //   try {
  //     const qrPromises = Array.from(selectedItems).map(async (serial) => {
  //       return QRCode.toDataURL(serial, { width: 300 });
  //     });
  //     const serial = Array.from(selectedItems);
  //     const qrCodes = await Promise.all(qrPromises);
  //     const qrSize = 20;
  //     const margin = 0;
  //     const pdf = new jsPDF({
  //       orientation: "portrait",
  //       unit: "mm",
  //       format: [qrSize + 2 * margin, qrSize + 2 * margin],
  //     });

  //     qrCodes.forEach((qrCode, index) => {
  //       if (index > 0) {
  //         pdf.addPage([qrSize + 2 * margin, qrSize + 2 * margin]);
  //       }
  //       pdf.addImage(qrCode, "PNG", margin, margin, qrSize, qrSize);
  //       pdf.setFontSize(10);
  //       pdf.text(serial, margin, qrSize + margin + 5);
  //     });

  //     pdf.save("qrcode.pdf");
  //   } catch (error) {
  //     console.error("Error generating QR codes or PDF:", error);
  //   }
  // };

  const exportPdf = async () => {
    if (selectedItems && selectedItems.size === 0) {
      notification.error({
        message: "Error",
        description: "Please select at least one item to export",
        duration: 2,
        placement: "bottomRight",
      });
     
      return;
    }
  
    try {
      const qrPromises = Array.from(selectedItems).map(async (serial) => {
        return {
          qrCode: await QRCode.toDataURL(serial, { width: 300 }),
          serial: serial
        };
      });

      const qrData = await Promise.all(qrPromises);
      const qrSize = 20;
      const margin = 0.5;
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: [qrSize + 2 * margin, qrSize + 2 * margin],
      });
      const strSerial = Array.from(selectedItems)[0].slice(0, 3);
      const serialData = Array.from(selectedItems)
      qrData.forEach((data, index) => {
        if (index > 0) {
          pdf.addPage([qrSize + 2 * margin, qrSize + 2 * margin]);
        }
        pdf.addImage(data.qrCode, "PNG", margin, margin, qrSize, qrSize);
        pdf.setFontSize(4);
        const textWidth = pdf.getTextWidth(data.serial);
        const xPosition = (qrSize + 2 * margin - textWidth) / 2; 
        pdf.text(data.serial, (xPosition -0.5) + margin, qrSize + margin ); 
      });
  
      pdf.save("qrcode_" + strSerial+".pdf");
    } catch (error) {
      notification.error({
        message: "Error",
        description: error,
        placement: "bottomRight",
        duration: 3,
      });
    }
  };
  
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems(new Set());
    } else {
      const newSelectedItems = new Set(
        displayedItems.map((item) => item.serial)
      );
      setSelectedItems(newSelectedItems);
    }
    setSelectAll(!selectAll);
  };

  const handleSelect = (serial) => {
    const newSelectedItems = new Set(selectedItems);
    if (newSelectedItems.has(serial)) {
      newSelectedItems.delete(serial);
    } else {
      newSelectedItems.add(serial);
    }
    setSelectedItems(newSelectedItems);
    setSelectAll(newSelectedItems.size === displayedItems.length);

  };
  const handleAutocompleteChange = (newValue) => {
    setSnNumber([]);
  };

  return {
    handleGeneClick,
    ddlData,
    ddlvalue,
    genType,
    fac,
    getDDlData,
    setDdlValue,
    snnumber,
    snState,
    exportPdf,
    qrRef,
    quantity,
    setQuantity,
    quantityState,
    page,
    itemsPerPage,
    totalPages,
    displayedItems,
    handlePageChange,
    handleSelectAll,
    handleSelect,
    selectedItems,
    selectAll,
    handleAutocompleteChange,
  };
}

export { fn_GenerateBarcode };
