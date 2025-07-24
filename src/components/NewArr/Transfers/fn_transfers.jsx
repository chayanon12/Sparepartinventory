import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  EyeOutlined,
  InfoCircleOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { Checkbox } from "antd";
import {
  Button,
  Card,
  Input,
  Modal,
  notification,
  Table,
  Select,
  Popconfirm,
} from "antd";
import axios from "axios";
import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef,
} from "react";
import moment from "moment";

function fn_transfers() {
  // UI components
  const { Search } = Input;
  // Parameters
  const [selectedTab, setSelectedTab] = useState("Transfer By Request Number");
  const [reqNumber, setReqNumber] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [dataReequestNumber, setDataRequestNumber] = useState([]);
  const [dataSerialNumber, setDataSerialNumber] = useState([]);
  const [Tofactory, setTofactory] = useState("");
  const [dtShowDataAccept, setDtShowDataAccept] = useState([]);
  const [dtDetailDataAccept, setDtDetailDataAccept] = useState([]);
  const [strCurrentReq, setStrCurrentReq] = useState([]);

  const [strtxtReqNo, setStrtxtReqNo] = useState("");
  const reqNumberRef = useRef(null);
  const serialNumberRef = useRef(null);
  //State
  const [isModalReqnoOpen, setIsModalReqnoOpen] = useState(false);
  const [isTableDataOpen, setIsTableDataOpen] = useState(false);
  const [isTableSerialOpen, setIsTableSerialOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const selectedTabRef = useRef(selectedTab);
  const [isModalOpen, setIsModalOpen] = useState(false);
  //btnClear
  const btnClear = useMemo(() => {
    return (
      <Button
        style={{ color: "white", background: "red", marginLeft: "10px" }}
        onClick={() => SetClear()}
      >
        Clear
      </Button>
    );
  }, []);
  useEffect(() => {
    selectedTabRef.current = selectedTab;
    if (selectedTab == "Waiting Receive") {
      getData("getShowTransfer", {
        plant: localStorage.getItem("factory"),
        flg: "All",
      });
    }
  }, [selectedTab]);
  const SetClear = useCallback(() => {
    if (selectedTabRef.current === "Transfer By Request Number") {
      setDataRequestNumber([]);
      setReqNumber("");
      reqNumberRef.current.focus();
    } else if (selectedTabRef.current === "Transfer By Serial Number") {
      setDataSerialNumber([]);
      setIsTableSerialOpen(false);
      setSerialNumber("");
      document.getElementById("searchSerial").focus();
    }
  }, []);
  //Search by Request Number
  const SearchByRequestNumber = useCallback(async () => {
    // if (reqNumber == "") {
    //   notification.error({
    //     message: "Error",
    //     description: "Please input serial number",
    //     duration: 2,
    //     placement: "bottomRight",
    //   });
    //   return;
    // }
    const dtData = await getData("getdataByRequestNumber", reqNumber);

    if (dtData.length > 0) {
      setIsTableDataOpen(true);
      // setReqNumber("");
      const groupedData = dtData.reduce((acc, item) => {
        const existing = acc.find((row) => row.req_no === item.req_no);
        if (existing) {
          existing.subData.push({
            key: `${item.req_no}-${item.serial_number}`,
            serial_number: item.serial_number,
            product_status: item.product_status,
            admin_scanin: item.admin_scanin,
            scan_in_date: item.scan_in_date,
          });
        } else {
          acc.push({
            key: item.req_no,
            factory: item.factory,
            req_no: item.req_no,
            subData: [
              {
                key: `${item.req_no}-${item.serial_number}`,
                serial_number: item.serial_number,
                product_status: item.product_status,
                admin_scanin: item.admin_scanin,
                scan_in_date: item.scan_in_date,
              },
            ],
          });
        }
        return acc;
      }, []);

      setDataRequestNumber(groupedData);
    } else {
      if (dtData.length === 0) {
        notification.error({
          message: "Error",
          description: "Data not found",
          duration: 2,
          placement: "bottomRight",
        });
        return;
      }
      if (dtData.message !== "") {
        setReqNumber("");
        notification.error({
          message: "Error",
          description: "This request number is alerady transfered",
          duration: 2,
          placement: "bottomRight",
        });
      }
    }
  }, [reqNumber]);

  const Reqcolumns = [
    {
      title: "Factory",
      dataIndex: "factory",
      key: "factory",
      align: "center",
    },
    {
      title: "Request Number",
      dataIndex: "req_no",
      key: "req_no",
      align: "center",
    },
    {
      title: "Transfers",
      key: "transfers",
      align: "center",
      render: (text, record) => (
        <Button
          type="primary"
          onClick={() => {
            console.log(record.req_no);
            setStrtxtReqNo(record.req_no);
            setIsModalReqnoOpen(true);
          }}
        >
          Transfers
        </Button>
      ),
    },
  ];
  const ReqsubColumns = [
    {
      title: "Serial Number",
      dataIndex: "serial_number",
      key: "serial_number",
      align: "center",
    },
    {
      title: "Item Status",
      dataIndex: "product_status",
      key: "product_status",
      align: "center",
    },
    {
      title: "Admin Scan-In",
      dataIndex: "admin_scanin",
      key: "admin_scanin",
      align: "center",
    },
    {
      title: "Scan In Date",
      dataIndex: "scan_in_date",
      key: "scan_in_date",
      align: "center",
    },
  ];
  const dataTable = useMemo(() => {
    return (
      <Table
        style={{ marginTop: "10px" }}
        columns={Reqcolumns}
        dataSource={dataReequestNumber}
        scroll={{ y: 300 }}
        className="TableAll"
        expandable={{
          expandedRowRender: (record) => (
            <Table
              columns={ReqsubColumns}
              dataSource={record.subData}
              pagination={false}
              className="TableSub"
            />
          ),
          defaultExpandedRowKeys: dataReequestNumber.map((item) => item.req_no),
        }}
      />
    );
  }, [dataReequestNumber]);

  async function send_email(toFac, quantity) {
    const formattedDate = moment().format("DD MMMM YYYY");
    const strSubjecy = "Delivery Notifications";
    let strPlantCodeFrom = localStorage.getItem("factory");
    let strPlantCodeDestination = toFac;
    let strTotalquantity = quantity;
    const res = await axios.post("/newarrival/api/EmailSend", {
      strPlantCodeFrom: strPlantCodeFrom,
      strSubject: strSubjecy,
      strDate: formattedDate,
      strPlantCodeDestination: strPlantCodeDestination,
      strTotalquantity: strTotalquantity,
    });
  }
  const onConfirmdata = useCallback(async () => {
    let _strError = "";
    if (Tofactory == localStorage.getItem("factory") || Tofactory == "") {
      notification.error({
        message: "Error",
        description: "Can't transfer same factory pls,try again!",
        duration: 3,
        placement: "bottomRight",
      });
      return;
    }
    if (selectedTabRef.current === "Transfer By Request Number") {
      for (let i = 0; i < dataReequestNumber[0].subData.length; i++) {
        console.log(dataReequestNumber);
        const res = await axios.post("/newarrival/api/settrasferfactory", {
          strItemsid: dataReequestNumber[0].subData[i].serial_number,
          strReqNo: strtxtReqNo,
          strFromfac: localStorage.getItem("factory"),
          strTofac: Tofactory,
          strAdminid: localStorage.getItem("username"),
        });
        if (res.data.message != "Success") _strError = "Error";
      }
      if (_strError == "") {
        // await send_email(Tofactory, dataReequestNumber[0].subData.length);
        notification.success({
          message: "Success",
          description: "Transfer Success",
          duration: 2,
          placement: "bottomRight",
        });
        setIsModalReqnoOpen(false);
        SetClear();
        setTofactory(null);
        console.log("Transfer Success");
      } else {
        notification.error({
          message: "Error",
          description: "Transfer Error",
          duration: 2,
          placement: "bottomRight",
        });
      }
    } else if (selectedTabRef.current === "Transfer By Serial Number") {
      let _strError = "";
      let dtDatainsSerial = dataSerialNumber.filter((item) =>
        selectedRows.includes(item.serial_number)
      );
      for (let i = 0; i < dtDatainsSerial.length; i++) {
        const res = await axios.post("/newarrival/api/settrasferfactory", {
          strItemsid: dtDatainsSerial[i].serial_number,
          strReqNo: dtDatainsSerial[i].req_no,
          strFromfac: localStorage.getItem("factory"),
          strTofac: Tofactory,
          strAdminid: localStorage.getItem("username"),
        });
        if (res.data.message !== "Success") _strError = "Error";
      }
      if (_strError == "") {
        // await send_email(Tofactory, dtDatainsSerial.length);
        notification.success({
          message: "Success",
          description: "Transfer Success",
          duration: 2,
          placement: "bottomRight",
        });
        setIsModalReqnoOpen(false);
        SetClear();
      } else {
        notification.error({
          message: "Error",
          description: "Transfer Error",
          duration: 2,
          placement: "bottomRight",
        });
      }
    }
    setDataSerialNumber([]);
    setTofactory("");
    setDataRequestNumber([]);
  }, [
    reqNumber,
    Tofactory,
    dataReequestNumber,
    selectedTabRef,
    setDataSerialNumber,
    setDataRequestNumber,
    selectedRows,
  ]);
  const Reqno_modal = useMemo(() => {
    {
      return (
        <Modal
          title="You want to transfer this request number?"
          open={isModalReqnoOpen}
          onCancel={() => setIsModalReqnoOpen(false)}
          footer={[
            <Button key="cancel" onClick={() => setIsModalReqnoOpen(false)}>
              Cancel
            </Button>,
            <Popconfirm
              key="confirm"
              title="Are you sure you want to send?"
              onConfirm={() => {
                onConfirmdata();
              }}
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary" icon={<SendOutlined />}>
                Send
              </Button>
            </Popconfirm>,
          ]}
        >
          <Card>
            Send To Factory :
            <Select
              showSearch
              style={{
                width: 300,
                marginLeft: 10,
              }}
              placeholder="Search to Select"
              optionFilterProp="label"
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              value={Tofactory}
              options={[
                { value: "K1", label: "K1" },
                { value: "P1", label: "P1" },
                { value: "BKK", label: "BKK" },
                { value: "HQ", label: "HQ" },
                { value: "N1", label: "N1" },
                { value: "A1", label: "A1" },
              ]}
              onChange={(value) => setTofactory(value)}
            />
          </Card>
        </Modal>
      );
    }
  });
  const Transferbyreq = useMemo(() => {
    return (
      <div style={{ width: "100%", height: "100%", marginTop: "10px" }}>
        <Card title="Transfer By Request Number">
          <Search
            placeholder="input request number"
            enterButton="Search"
            size="medium"
            style={{ width: "50%" }}
            loading={false}
            value={reqNumber}
            onChange={(e) => setReqNumber(e.target.value)}
            ref={reqNumberRef}
            onKeyDown={(e) => {
              if (e.key === "Enter") SearchByRequestNumber();
            }}
            onSearch={SearchByRequestNumber}
          />
          {btnClear}
          {isTableDataOpen && dataReequestNumber.length > 0 && dataTable}
          {Reqno_modal}
        </Card>
      </div>
    );
  }, [
    reqNumber,
    SearchByRequestNumber,
    dataReequestNumber,
    dataTable,
    Reqno_modal,
    btnClear,
  ]);

  //end

  // Search by Serial Number
  const onSearchbySerialNumber = useCallback(async () => {
    if (serialNumber == "") {
      notification.error({
        message: "Error",
        description: "Please input serial number",
        duration: 2,
        placement: "bottomRight",
      });
      return;
    }
    const dtData = await getData("getdataBySerialNumber", serialNumber);
    if (dtData.length > 0) {
      const duplicateItems = dtData.filter((newItem) =>
        dataSerialNumber.some(
          (item) => item.serial_number === newItem.serial_number
        )
      );
      if (duplicateItems.length > 0) {
        notification.error({
          message: "Duplicate Data",
          description: `พบข้อมูลซ้ำ Serial Number : ${duplicateItems
            .map((item) => item.serial_number)
            .join(", ")}`,
          duration: 2,
          placement: "bottomRight",
        });
      } else {
        setDataSerialNumber((prevData) => [...prevData, ...dtData]);
      }
      setIsTableSerialOpen(true);
      setSerialNumber("");
    } else {
      if (dtData.message !== "") {
        notification.error({
          message: "Error",
          description: dtData.message ? dtData.message : "Data not found",
          duration: 2,
          placement: "bottomRight",
        });
        return;
      }
    }
  }, [serialNumber]);
  const SerialColumns = [
    {
      align: "center",
      title: (
        <Checkbox
          onChange={(e) => {
            if (e.target.checked) {
              const allkeys = dataSerialNumber.map(
                (item) => item.serial_number
              );
              setSelectedRows(allkeys);
            } else {
              setSelectedRows([]);
            }
          }}
        />
      ),
      dataIndex: "serial_number",
      render: (text, record) => (
        <Checkbox
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedRows((prev) => [...prev, record.serial_number]);
            } else {
              setSelectedRows((prev) =>
                prev.filter((key) => key !== record.serial_number)
              );
            }
          }}
          checked={selectedRows.includes(record.serial_number)}
        />
      ),
    },
    {
      title: "Factory",
      dataIndex: "factory",
      key: "factory",
      align: "center",
    },
    {
      title: "Request Number",
      dataIndex: "req_no",
      key: "req_no",
      align: "center",
    },
    {
      title: "Serial Number",
      dataIndex: "serial_number",
      key: "serial_number",
      align: "center",
    },
    {
      title: "Product Status",
      dataIndex: "product_status",
      key: "product_status",
      align: "center",
    },
    {
      title: "Admin Scan-In",
      dataIndex: "admin_scanin",
      key: "admin_scanin",
      align: "center",
    },
    {
      title: "Scan In Date",
      dataIndex: "scan_in_date",
      key: "scan_in_date",
      align: "center",
    },
    // {
    //   title: "Transfers",
    //   key: "transfers",
    //   align: "center",
    //   render: (text, record) => (
    //     <Button type="primary" onClick={() => setIsModalReqnoOpen(true)}>
    //       Transfers
    //     </Button>
    //   ),
    // },
  ];
  const dataTableSerial = useMemo(() => {
    return (
      <Table
        style={{ marginTop: "10px" }}
        columns={SerialColumns}
        dataSource={dataSerialNumber}
      />
    );
  }, [dataSerialNumber, selectedRows, setSelectedRows]);

  const btnSubmit = useMemo(() => {
    return (
      <Button
        style={{ color: "white", background: "green", marginLeft: "10px" }}
        // onClick={() => {
        //   onConfirmdatabySerial();
        // }}
        onClick={() => {
          setIsModalReqnoOpen(true);
          console.log(selectedRows);
        }}
      >
        Submit
      </Button>
    );
  }, [selectedRows]);
  const Transferbyserial = useMemo(() => {
    return (
      <div style={{ width: "100%", height: "100%", marginTop: "10px" }}>
        <Card title="Transfer By Serial Number">
          <Search
            placeholder="input serial number"
            enterButton="Search"
            size="medium"
            id="searchSerial"
            style={{ width: "50%" }}
            loading={false}
            value={serialNumber}
            ref={serialNumberRef}
            onChange={(e) => setSerialNumber(e.target.value)}
            onSearch={() => onSearchbySerialNumber()}
          />
          {btnClear}
          {btnSubmit}
          {isTableSerialOpen && dataTableSerial}
          {Reqno_modal}
        </Card>
      </div>
    );
  }, [
    serialNumber,
    onSearchbySerialNumber,
    dataTableSerial,
    isTableSerialOpen,
    btnClear,
    SetClear,
    selectedTab,
    btnSubmit,
    Reqno_modal,
  ]);

  //end
  const showModal = (req_no) => {
    setStrCurrentReq(req_no);
    handleGetdataDetail();
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    let admin = localStorage.getItem("username");
    let Factory = localStorage.getItem("factory");
    let _strError = "";
    for (let i = 0; i < dtDetailDataAccept.length; ++i) {
      let data = await getData("setReciveItems", {
        strstrSerialNo: dtDetailDataAccept[i].serial_no,
        strAdminName: admin,
        strReqNo: strCurrentReq,
        Fac: Factory,
      });
      if (data.message !== "Success") _strError = "Error";
    }
    console.log(_strError, "error");
    if (_strError == "") {
      notification.success({
        message: "Success",
        description: "Data Accept Successfully",
        placement: "bottomRight",
        duration: 3,
      });
      // setDtShowDataAccept([]);
      getData("getShowTransfer", {
        plant: localStorage.getItem("factory"),
        flg: "All",
      });
      setIsModalOpen(false);
    } else {
      notification.error({
        message: "Error",
        description: "Error Pls,Try Again!",
        placement: "bottomRight",
        duration: 3,
      });
    }
  };

  const handleCancel = async () => {
    let adminName = localStorage.getItem("username");
    let strCancel = await getData("setCancelTransferfactory", {
      req_no: strCurrentReq,
      admin_name: adminName,
    });
    if (strCancel.message == "Success") {
      // setDtShowDataAccept([]);
        getData("getShowTransfer", {
        plant: localStorage.getItem("factory"),
        flg: "All",
      });
      //send mail
      notification.success({
        message: "Success",
        description: "Data Deleted",
        placement: "bottomRight",
        duration: 3,
      });
    } else {
      notification.error({
        message: "Error",
        description: "Fail To Delete Data Pls,Try Again!",
        placement: "bottomRight",
        duration: 3,
      });
    }
    setIsModalOpen(false);
  };
  const handleGetdataDetail = async () => {
    let data = await getData("getShowTransfer", {
      plant: localStorage.getItem("factory"),
      flg: "",
    });
    setDtDetailDataAccept(data);
  };
  const DetailColumn = [
    {
      title: "From Factory",
      dataIndex: "send_from",
      key: "send_from",
      align: "center",
    },
    {
      title: "Request Number",
      dataIndex: "req_no",
      key: "req_no",
      align: "center",
    },
    {
      title: "Serial Number",
      dataIndex: "serial_no",
      key: "serial_no",
      align: "center",
    },
    {
      title: "Send By",
      dataIndex: "send_by",
      key: "send_by",
      align: "center",
    },
    {
      title: "Send Date",
      dataIndex: "send_date",
      key: "send_date",
      align: "center",
    },
  ];
  const DetailTable = useMemo(() => {
    return (
      <Table
        style={{ marginTop: "10px" }}
        columns={DetailColumn}
        dataSource={dtDetailDataAccept.filter(
          (item) => item.req_no === strCurrentReq
        )}
      />
    );
  }, [dtDetailDataAccept, DetailColumn]);

  const Waitcolumns = [
    {
      title: "From Factory",
      dataIndex: "send_from",
      key: "send_from",
      align: "center",
    },
    {
      title: "Request Number",
      dataIndex: "req_no",
      key: "req_no",
      align: "center",
    },
    {
      title: "Send By",
      dataIndex: "send_by",
      key: "send_by",
      align: "center",
    },
    {
      title: "Detail",
      align: "center",
      render: (text, record) => (
        <Button
          // style={{ background: "blue", color: "white" }}
          type="primary"
          icon={<EyeOutlined />}
          iconPosition="end"
          onClick={() => showModal(record.req_no)}
        >
          Open Detail
        </Button>
      ),
    },
    // {
    //   title: "Action",
    //   align: "center",
    //   render: (text, record) => (
    //     <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
    //       <Button
    //         style={{ background: "green", color: "white" }}
    //         icon={<CheckCircleOutlined />}
    //         iconPosition="end"
    //         onClick={() => handleAction(record)}
    //       >
    //         Accept
    //       </Button>
    //       <Button
    //         style={{ background: "red", color: "white" }}
    //         icon={<CloseCircleOutlined />}
    //         iconPosition="end"
    //         onClick={() => handleAction(record)}
    //       >
    //         Reject
    //       </Button>
    //     </div>
    //   ),
    // },
  ];

  const WaitingReceivedataTable = useMemo(() => {
    return (
      <Table
        style={{ marginTop: "10px" }}
        columns={Waitcolumns}
        dataSource={dtShowDataAccept}
        pagination={false}
      />
    );
  }, [dtShowDataAccept]);

  const WaitingReceive = useMemo(() => {
    return (
      <div style={{ width: "100%", height: "100%", marginTop: "10px" }}>
        <Card title="Waiting Receive">{WaitingReceivedataTable}</Card>
        <Modal
          title="Basic Modal"
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
          width="80%"
          style={{
            maxWidth: "800px",
            minWidth: "300px",
          }}
        >
          {DetailTable}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "10px",
              marginTop: "20px",
            }}
          >
            <Button
              style={{
                backgroundColor: "#f44336",
                borderColor: "#f44336",
                color: "white",
              }}
              onClick={handleCancel}
            >
              Reject
            </Button>
            <Button
              style={{
                backgroundColor: "#4CAF50",
                borderColor: "#4CAF50",
                color: "white",
              }}
              onClick={handleOk}
            >
              Accept
            </Button>
          </div>
        </Modal>
        {/* <Modal
          title="Basic Modal"
          open={isModalOpen}
          onOk={handleOk}
          okButtonPdrops={{
            style: {
              backgroundColor: "#4CAF50",
              borderColor: "#4CAF50",
              color: "white",
            },
          }}
          cancelButtonProps={{
            style: {
              backgroundColor: "#f44336",
              borderColor: "#f44336",
              color: "white",
            },
          }}
          okText="Accept"
          cancelText="Reject"
          onCancel={handleCancel}
          width="80%"
          style={{
            maxWidth: "800px",
            minWidth: "300px",
          }}
        >
          {DetailTable}
        </Modal> */}
      </div>
    );
  }, [
    WaitingReceivedataTable,
    dtShowDataAccept,
    showModal,
    handleOk,
    isModalOpen,
    handleCancel,
  ]);

  const components = useMemo(
    () => ({
      "Transfer By Request Number": Transferbyreq,
      "Transfer By Serial Number": Transferbyserial,
      "Waiting Receive": WaitingReceive,
    }),
    [Transferbyreq, Transferbyserial, WaitingReceive]
  );

  //getData
  async function getData(type, params) {
    let data = [];
    try {
      if (type == "getdataByRequestNumber") {
        await axios
          .get(
            `/newarrival/api/getDatatoTranferbyReqNo?strReqNo=${params}&strFac=${localStorage.getItem(
              "factory"
            )}`
          )
          .then((res) => {
            data = res.data;
          });
      } else if (type == "getdataBySerialNumber") {
        await axios
          .get(
            `/newarrival/api/getDatatoTranferbySerial?strSerialNumber=${params}&strFac=${localStorage.getItem(
              "factory"
            )}`
          )
          .then((res) => {
            data = res.data;
          });
      } else if (type == "getShowTransfer") {
        await axios
          .get(
            `/newarrival/api/getShowTransfer?strPlantCode=${params.plant}&strFlg=${params.flg}`
          )
          .then((res) => {
            data = res.data;
            if (params.flg != "") {
              setDtShowDataAccept(data);
            }
          });
      } else if (type == "setReciveItems") {
        await axios
          .post(`/newarrival/api/setReceivedTransferfactory`, {
            strstrSerialNo: params.strstrSerialNo,
            strAdminName: params.strAdminName,
            strReqNo: params.strReqNo,
            strTofac: params.Fac,
          })
          .then((res) => {
            data = res.data;
          });
      } else if (type == "setCancelTransferfactory") {
        await axios
          .post("/newarrival/api/setCancelTransferfactory", {
            strReqNo: params.req_no,
            strAdminName: params.admin_name,
          })
          .then((res) => {
            data = res.data;
          });
      } else if (type == 'getCountNotify'){
         axios
        .get(`/newarrival/api/GetCountNewarrDashboard`)
        .then((res) => {
          // setCount(res.data[0].count_spare);
          localStorage.setItem("countNotify", res.data[0].count_spare);
        })
        .catch((err) => {
          notification.error({
            message: "Error",
            description: err,
            placement: "bottomRight",
            duration : 2
          });
        });
      }
      return data;
    } catch (error) {
      notification.error({
        message: "Error",
        description: error.message,
        duration: 2,
        placement: "bottomRight",
      });
      return data;
    }
  }
  return {
    selectedTab,
    setSelectedTab,
    components,
    setReqNumber,
    setSerialNumber,
    Transferbyreq,
    Transferbyserial,
  };
}

export { fn_transfers };
