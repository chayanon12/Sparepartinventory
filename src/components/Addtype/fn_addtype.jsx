import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  notification,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Table,
  Typography,
  message,
} from "antd";

function fn_addtype() {
  const [txtItemName, setTxtItemName] = useState("");
  const [txtItemType, setTxtItemType] = useState("");
  const [DtDataState, setDtDataState] = useState(false);
  const [DtData, setDtData] = useState([]);
  const [form] = Form.useForm();
  const [data, setData] = useState(DtData);
  const [editingKey, setEditingKey] = useState("");
  const [txtAbbr, setTxtAbbr] = useState("");
  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[{ required: true, message: `Please Input ${title}!` }]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({ type_name: "", type_product: "", ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);     
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        console.log(newData[index]);
        console.log(newData[index].type_abbr.toString().length);
        if(newData[index].type_abbr.toString().length > 3){
          notification.error({
            message: "Error",
            description: "ABBR should be 3 characters",
            placement: "bottomRight",
            duration: 3,
          });
          return;
        }
        setData(newData);
        await getdata("Updatedata", {
          type_name:newData[index].type_name,
          type_id:newData[index].type_id,
          type_product:newData[index].type_product,
          type_abbr:newData[index].type_abbr
        });
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "Items Name",
      dataIndex: "type_name",
      key: "type_name",
      width: 200,
      editable: true,
    },
    {
      title: "Items Type",
      dataIndex: "type_product",
      key: "type_product",
      width: 200,
      editable: true,
    },
    ,
    {
      title: "Items ABBR",
      dataIndex: "type_abbr",
      key: "type_abbr",
      width: 200,
      editable: true,
    },
    {
      title: "operation",
      dataIndex: "operation",
      width: 100,
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{ marginRight: 8 }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "type_product" ? "text" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  useEffect(() => {
    pageLoad();
  }, []);

  async function pageLoad() {
    await getdata("getTypeData");
  }

  async function Checktype() {
    await getdata("getTypeData");
    setDtDataState(true);
  }

  const submitData = async () => {
    if (txtItemName !== "" && txtItemType !== "" && txtAbbr !== "") {
      if (txtAbbr.length > 3) {
        notification.error({
          message: "Error",
          description: "ABBR should be 3 characters",
          placement: "bottomRight",
          duration: 3,
        });
        return;
      }
      await getdata("addType", {
        type_name: txtItemName,
        type_product: txtItemType,
      });
      clearTxt();
    }else{
      notification.error({
        message: "Error",
        description: "Please Fill All Fields",
        placement: "bottomRight",
        duration: 3,
      });
    }
  };

  async function getdata(type, params) {
    try {
      if (type === "getTypeData") {
        setDtDataState(false);
        const res = await axios.get("/Sparepart/api/common/getType");
        if (res.data !== "") {
          setDtData(res.data);
          setData(
            res.data.map((item, index) => ({ ...item, key: index.toString() }))
          );
          setDtDataState(true);
        } else {
          notification.error({
            message: "Error",
            description: "No Data Found",
            placement: "bottomRight",
            duration: 3,
          });
        }
      } else if (type === "addType") {
        const res = await axios.post("/Sparepart/api/common/addNewType", {
          type_name: params.type_name,
          type_product: params.type_product,
        });
        if (res.data.state === "Success") {
          notification.success({
            message: "Success",
            description: "Data Added Successfully",
            placement: "bottomRight",
            duration: 3,
          });
          Checktype();
        } else {
          notification.error({
            message: "Error",
            description: "Can't Add Data Please try again",
            placement: "bottomRight",
            duration: 3,
          });
        }
      } else if (type === "Updatedata") {
        await axios
          .post("/Sparepart/api/common/setUpdatedata", {
            type_name: params.type_name,
            type_id: params.type_id,
            type_product: params.type_product,
            type_abbr:params.type_abbr
          })
          .then((res) => {
            if (res.data.state === "Success") {
              notification.success({
                message: "Success",
                description: "Data Updated Successfully",
                placement: "bottomRight",
                duration: 3,
              });
            } else {
              notification.error({
                message: "Error",
                description: "Can't Update Data Please try again",
                placement: "bottomRight",
                duration: 3,
              });
            }
          });
      }
    } catch (error) {
      notification.error({
        message: "Error",
        description: error.message,
        placement: "bottomRight",
        duration: 1,
      });
    }
  }

  function clearTxt() {
    setTxtItemName("");
    setTxtItemType("");
  }

  return {
    columns: mergedColumns,
    data,
    txtItemName,
    setTxtItemName,
    txtItemType,
    setTxtItemType,
    DtDataState,
    Checktype,
    submitData,
    form,
    EditableCell,
    data,
    mergedColumns,
    cancel,
    txtAbbr, setTxtAbbr
  };
}

export { fn_addtype };
