import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Header from "../../../initialpage/Sidebar/header";
import Sidebar from "../../../initialpage/Sidebar/sidebar";
import { Table, Checkbox } from "antd";
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../../paginationfunction";
import "../../antdstyle.css";
import { useSelector, useDispatch } from "react-redux";
import { emptyConfig } from "../../../Entryfile/features/static/emptyConfig";

import {
  addConfig,
  deleteConfig,
  updateConfig,
} from "../../../Entryfile/features/configsSlice";
import faker from "faker";
import EmployeeProfile from "./employeeprofile";
import { downloadConfig } from "../../../utils/downloadConfig";
import { convertToCorrectType } from "../../../utils/convertType";
import AddConfigModal from "./Modals/AddConfigModal";
import EditConfigModal from "./Modals/EditConfigModal";

const Config = () => {
  const [menu, setMenu] = useState(false);
  const configs = useSelector((state) => state.configs);
  const [configState, setConfigState] = useState(emptyConfig);
  const [selectedRow, setSelectedRow] = useState(null);
  const [skuData, setSkuData] = useState({ image: "", sku: "" });
  const [step, setStep] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const nextStep = () => {
    if (step === 2) {
    } else {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step === 2) {
      setStep(step - 1);
    } else {
    }
  };

  const toggleMobileMenu = () => {
    setMenu(!menu);
  };

  useEffect(() => {
    const config = localStorage.getItem("configs");
    if (!config) return;
    const savedData = JSON.parse(config);
    savedData.map((data) => dispatch(addConfig(data)));
  }, []);

  const importConfig = (event) => {
    const reader = new FileReader();
    const file = event.target.files?.[0];
    if (file) {
      reader.readAsText(file);
      reader.onload = () => {
        try {
          const importedConfig = JSON.parse(reader.result);
          dispatch(addConfig({ ...importedConfig, id: faker.random.uuid() }));
        } catch (error) {
          console.error("Error parsing the file", error);
        }
      };
    }
  };

  const selectMerchantEdit = (id) => {
    setSelectedRow((prev) => ({
      ...prev,
      merchants: prev.merchants.includes(id)
        ? prev.merchants.filter((merchantId) => merchantId !== id)
        : [...prev.merchants, id],
    }));
  };

  const highlightMerchantEdit = (id) => {
    setSelectedRow((prev) => ({
      ...prev,
      merchantsSponsored: prev.merchantsSponsored.includes(id)
        ? prev.merchantsSponsored.filter((merchantId) => merchantId !== id)
        : [...prev.merchantsSponsored, id],
    }));
  };

  const preferedMerchantEdit = (id) => {
    setSelectedRow((prev) => ({
      ...prev,
      merchantsPrefered: prev.merchantsPrefered.includes(id)
        ? prev.merchantsPrefered.filter((merchantId) => merchantId !== id)
        : [...prev.merchantsPrefered, id],
    }));
  };

  const handleChange = (e, edit = false) => {
    const { name, value } = e.target;

    const deepCloneObject = (obj) => {
      return JSON.parse(JSON.stringify(obj));
    };

    const keys = name.split(".");
    const changeCb = (prevConfig) => {
      let updatedConfig = deepCloneObject(prevConfig);
      let temp = updatedConfig;
      keys.forEach((key, index) => {
        if (index === keys.length - 1) {
          temp[key] = convertToCorrectType(value);
        } else {
          if (!temp[key]) temp[key] = {};
          temp = convertToCorrectType(temp[key]);
        }
      });
      return updatedConfig;
    };
    if (edit) {
      setSelectedRow((prev) => changeCb(prev));
    } else {
      setConfigState((prev) => changeCb(prev));
    }
  };

  const handleSkuChange = (e) => {
    const { name, value } = e.target;
    setSkuData((prev) => ({ ...prev, [name]: value }));
  };

  const selectMerchant = (id) => {
    setConfigState((prev) => ({
      ...prev,
      merchants: prev.merchants.includes(id)
        ? prev.merchants.filter((merchantId) => merchantId !== id)
        : [...prev.merchants, id],
    }));
  };

  const highlightMerchant = (id) => {
    setConfigState((prev) => ({
      ...prev,
      merchantsSponsored: prev.merchantsSponsored.includes(id)
        ? prev.merchantsSponsored.filter((merchantId) => merchantId !== id)
        : [...prev.merchantsSponsored, id],
    }));
  };

  const preferedMerchant = (id) => {
    setConfigState((prev) => ({
      ...prev,
      merchantsPrefered: prev.merchantsPrefered.includes(id)
        ? prev.merchantsPrefered.filter((merchantId) => merchantId !== id)
        : [...prev.merchantsPrefered, id],
    }));
  };

  const handleSortingSelect = (value, edit = false) => {
    if (edit) {
      setSelectedRow((prev) => ({
        ...prev,
        sorting: value,
      }));
    } else {
      setConfigState((prev) => ({
        ...prev,
        sorting: value,
      }));
    }
  };

  const removePackshot = (indexToRemove, edit = false) => {
    const cb = (prev) => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove),
    });
    if (edit) {
      setSelectedRow(cb);
    } else {
      setConfigState(cb);
    }
  };

  const save = () => {
    dispatch(addConfig({ ...configState, id: faker.random.uuid() }));
    setConfigState(emptyConfig);
  };

  const saveEdit = () => {
    dispatch(updateConfig(selectedRow));
    setSelectedRow(null);
  };

  const removeConfig = (config) => {
    dispatch(deleteConfig(config));
    setSelectedRow(null);
  };

  const addPackshot = () => {
    setConfigState((prev) => ({
      ...prev,
      images: [
        ...prev.images,
        {
          ...skuData,
          width: convertToCorrectType(skuData.width),
          height: convertToCorrectType(skuData.height),
        },
      ],
    }));
    setSkuData({
      image: "",
      sku: "",
      width: 0,
      height: 0,
    });
  };

  const editPackshot = () => {
    setSelectedRow((prev) => ({
      ...prev,
      images: [
        ...prev.images,
        {
          ...skuData,
          width: convertToCorrectType(skuData.width),
          height: convertToCorrectType(skuData.height),
        },
      ],
    }));
    setSkuData({
      image: "",
      sku: "",
      height: 0,
      width: 0,
    });
  };

  const columns = [
    {
      title: "Config ID",
      dataIndex: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Config Text",
      dataIndex: "text",
      sorter: (a, b) => a.text.localeCompare(b.text),
    },
    {
      title: "Action",
      render: (text, record) => (
        <div className="dropdown dropdown-action text-end">
          <a
            href="#"
            className="action-icon dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="material-icons">more_vert</i>
          </a>
          <div className="dropdown-menu dropdown-menu-right">
            <a
              className="dropdown-item"
              href="#"
              data-bs-toggle="modal"
              data-bs-target="#edit_department"
              onClick={() => {
                setSelectedRow(record);
                setShowEditModal(true);
              }}
            >
              <i className="fa fa-pencil m-r-5" /> Edit
            </a>
            <button
              className="dropdown-item"
              onClick={() => {
                removeConfig(record);
              }}
            >
              <i className="fa fa-trash-o m-r-5" /> Delete
            </button>
          </div>
        </div>
      ),
    },
    {
      title: "Download",
      render: (text, record) => (
        <div className="dropdown dropdown-action text-end">
          <a
            href="#"
            className="action-icon dropdown-toggle"
            onClick={() => downloadConfig(record)}
          >
            <i className="fa fa-download" />
          </a>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
        <Header onMenuClick={(value) => toggleMobileMenu()} />
        <Sidebar />
        <div className="page-wrapper">
          <Helmet>
            <title>Config - HRMS Admin Template</title>
            <meta name="description" content="Login page" />
          </Helmet>

          {/* Page Content */}
          <div className="content container-fluid">
            {/* Page Header */}
            <div className="page-header">
              <div className="row align-items-center">
                <div className="col">
                  <h3 className="page-title">Config</h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/app/main/dashboard">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active">Config</li>
                  </ul>
                </div>
                <div className="col-auto float-end ms-auto">
                  <button
                    className="btn add-btn"
                    data-bs-toggle="modal"
                    data-bs-target="#add_department"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowAddModal(true);
                    }}
                  >
                    <i className="fa fa-plus" /> Add config
                  </button>
                </div>
                <div className="col-auto float-end ms-auto">
                  <label className="btn add-btn" htmlFor="fileInput">
                    <i className="fa fa-plus"></i> Import config
                  </label>
                  <input
                    id="fileInput"
                    ref={fileInputRef}
                    onChange={importConfig}
                    type="file"
                    accept=".json"
                    style={{ display: "none" }}
                  />
                </div>
              </div>
            </div>
            {/* /Page Header */}
            <div className="row">
              <div className="col-md-12">
                <div className="table-responsive">
                  <Table
                    className="table-striped"
                    pagination={{
                      total: configs.length,
                      showTotal: (total, range) =>
                        `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                      showSizeChanger: true,
                      onShowSizeChange: onShowSizeChange,
                      itemRender: itemRender,
                    }}
                    onRow={(record, rowIndex) => {
                      return {
                        onClick: (event) => {
                          setSelectedRow(record);
                        },
                      };
                    }}
                    style={{ overflowX: "auto" }}
                    columns={columns}
                    dataSource={configs}
                    rowKey={(record) => record.id}
                    rowClassName={(record) =>
                      record.id === selectedRow?.id ? "selected-row" : ""
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          {/* /Page Content */}
          {/* Add Config Modal */}
          <AddConfigModal
            open={showAddModal}
            step={step}
            close={() => {
              setShowAddModal(false);
            }}
            configState={configState}
            addPackshot={addPackshot}
            removePackshot={removePackshot}
            handleChange={handleChange}
            save={save}
            prevStep={prevStep}
            nextStep={nextStep}
            handleSkuChange={handleSkuChange}
            skuData={skuData}
            setStep={setStep}
            handleSortingSelect={handleSortingSelect}
            selectMerchant={selectMerchant}
            highlightMerchant={highlightMerchant}
            preferedMerchant={preferedMerchant}
          />

          {/* /Add Config Modal */}
          {/* Edit Config Modal */}
          <EditConfigModal
            open={showEditModal}
            close={() => {
              setShowEditModal(false);
            }}
            step={step}
            selectedRow={selectedRow}
            handleChange={handleChange}
            handleSortingSelect={handleSortingSelect}
            handleSkuChange={handleSkuChange}
            skuData={skuData}
            editPackshot={editPackshot}
            prevStep={prevStep}
            nextStep={nextStep}
            setStep={setStep}
            removePackshot={removePackshot}
            selectMerchantEdit={selectMerchantEdit}
            highlightMerchantEdit={highlightMerchantEdit}
            preferedMerchantEdit={preferedMerchantEdit}
            saveEdit={saveEdit}
          />
          {/* /Edit Config Modal */}
          {/* Delete Config Modal */}

          {/* /Delete Config Modal */}
        </div>
      </div>

      <EmployeeProfile selectedRow={selectedRow} />
    </>
  );
};

export default Config;
