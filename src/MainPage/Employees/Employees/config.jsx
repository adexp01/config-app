import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Header from "../../../initialpage/Sidebar/header";
import Sidebar from "../../../initialpage/Sidebar/sidebar";
import { Table, Checkbox, Select } from "antd";
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../../paginationfunction";
import "../../antdstyle.css";
import { useSelector, useDispatch } from "react-redux";
import { emptyConfig } from "../../../Entryfile/features/static/emptyConfig";
import Radio from "../../../_components/radio/radio";
import InputField from "../../../_components/inputField/inputField";
import CheckboxGroup from "../../../_components/checkbox/checkbox";

import {
  addConfig,
  deleteConfig,
  updateConfig,
} from "../../../Entryfile/features/configsSlice";
import faker from "faker";
import { merchantsList } from "../../../Entryfile/features/static/merchantsList";
import ClientProfile from "../../Pages/Profile/clientprofile";
import EmployeeProfile from "./employeeprofile";

const Config = () => {
  const [menu, setMenu] = useState(false);
  const configs = useSelector((state) => state.configs);
  const [configState, setConfigState] = useState(emptyConfig);
  const [selectedRow, setSelectedRow] = useState(null);
  const [skuData, setSkuData] = useState({ image: "", sku: "" });
  const [showMerchants, setShowMerchants] = useState(false);
  const [step, setStep] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

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

  const toggleMerchants = () => {
    setShowMerchants(!showMerchants);
  };

  useEffect(() => {
    if (searchQuery.length === 0) {
      setFilteredData(configs);
    } else {
      const filtered = configs.filter((config) =>
        config.text.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [searchQuery]);

  const toggleMobileMenu = () => {
    setMenu(!menu);
  };

  useEffect(() => {
    const config = localStorage.getItem("configs");
    if (!config) return;
    const savedData = JSON.parse(config);
    savedData.map((data) => dispatch(addConfig(data)));
  }, []);

  const downloadConfig = (config) => {
    const dataStr = JSON.stringify(config, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "config.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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

  const merchantColumns = [
    {
      title: "Apotheke",
      dataIndex: "apotheke",
      key: "apotheke",
    },
    {
      title: "Include",
      key: "include",
      render: (_, record) => (
        <Checkbox
          checked={configState.merchants.includes(record.id)}
          onChange={() => selectMerchant(record.id)}
        />
      ),
    },
    {
      title: "Exclude",
      key: "exclude",
      render: (_, record) => (
        <Checkbox
          checked={configState.merchants.includes(-record.id)}
          onChange={() => selectMerchant(-record.id)}
        />
      ),
    },
    {
      title: "Highlight",
      key: "highlight",
      render: (_, record) => (
        <Checkbox
          checked={configState.merchantsSponsored.includes(record.id)}
          onChange={() => highlightMerchant(record.id)}
        />
      ),
    },
    {
      title: "Prefer",
      key: "prefer",
      render: (_, record) => (
        <Checkbox
          checked={configState.merchantsPrefered.includes(record.id)}
          onChange={() => preferedMerchant(record.id)}
        />
      ),
    },
  ];

  const merchantColumnsEdit = [
    {
      title: "Apotheke",
      dataIndex: "apotheke",
      key: "apotheke",
    },
    {
      title: "Include",
      key: "include",
      render: (_, record) => (
        <Checkbox
          checked={selectedRow.merchants.includes(record.id)}
          onChange={() => selectMerchantEdit(record.id)}
        />
      ),
    },
    {
      title: "Exclude",
      key: "exclude",
      render: (_, record) => (
        <Checkbox
          checked={selectedRow.merchants.includes(-record.id)}
          onChange={() => selectMerchantEdit(-record.id)}
        />
      ),
    },
    {
      title: "Highlight",
      key: "highlight",
      render: (_, record) => (
        <Checkbox
          checked={selectedRow.merchantsSponsored.includes(record.id)}
          onChange={() => highlightMerchantEdit(record.id)}
        />
      ),
    },
    {
      title: "Prefer",
      key: "prefer",
      render: (_, record) => (
        <Checkbox
          checked={selectedRow.merchantsPrefered.includes(record.id)}
          onChange={() => preferedMerchantEdit(record.id)}
        />
      ),
    },
  ];

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
          temp[key] = value;
        } else {
          if (!temp[key]) temp[key] = {};
          temp = temp[key];
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

  const handleSortingSelect = (value) => {
    setConfigState((prev) => ({
      ...prev,
      sorting: value,
    }));
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
          {/* <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by text..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div> */}
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
                    dataSource={searchQuery.length > 0 ? filteredData : configs}
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
          <div
            id="add_department"
            className="modal custom-modal fade"
            role="dialog"
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Configurations</h5>
                  <button
                    type="button"
                    className="close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowAddModal(false);
                    }}
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form>
                    {showAddModal && step === 1 && (
                      <div className="create-config-wrapper">
                        <div className="create-config-container">
                          <InputField
                            type={"color"}
                            name={"style.btnColor"}
                            label={"Color of the buttons"}
                            onChange={handleChange}
                            value={configState.style.btnColor}
                          />
                          <InputField
                            type={"color"}
                            name={"style.btnTextColor"}
                            label={"Color of the buttons text"}
                            onChange={handleChange}
                            value={configState.style.btnTextColor}
                          />
                          <InputField
                            type={"color"}
                            name={"style.textColor"}
                            label={"Color of the texts"}
                            onChange={handleChange}
                            value={configState.style.textColor}
                          />
                          <InputField
                            type={"color"}
                            name={"style.headerTextColor"}
                            label={"Color of text in the header"}
                            onChange={handleChange}
                            value={configState.style.headerTextColor}
                          />
                          <InputField
                            type={"color"}
                            name={"style.primaryColor"}
                            label={"Color of the layout"}
                            onChange={handleChange}
                            value={configState.style.primaryColor}
                          />
                        </div>
                        <div className="create-config-container">
                          <Radio
                            name={"posBranding"}
                            label="Selection of POS branding"
                            options={[
                              { value: "1", label: "Round Icons" },
                              { value: "2", label: "Logos" },
                            ]}
                            selectedOption={configState.posBranding}
                            onChange={handleChange}
                          />
                          <InputField
                            type={"text"}
                            name={"brand.logoUrl"}
                            label={"Brand logo URL"}
                            onChange={handleChange}
                            value={configState.brand.logoUrl}
                          />
                          <InputField
                            type={"number"}
                            name={"brand.logoFormat.width"}
                            label={"Width"}
                            onChange={handleChange}
                            value={configState.brand.logoFormat.width}
                          />
                          <InputField
                            type={"number"}
                            name={"brand.logoFormat.height"}
                            label={"Height"}
                            onChange={handleChange}
                            value={configState.brand.logoFormat.height}
                          />
                          <Radio
                            name={"brand.logoFormat.align"}
                            label="Alignment of the logo"
                            options={[
                              { value: "left", label: "left" },
                              { value: "right", label: "right" },
                              { value: "center", label: "center" },
                              { value: "justify", label: "justify" },
                              { value: "initial", label: "initial" },
                            ]}
                            selectedOption={configState.brand.logoFormat.align}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="create-config-container">
                          <Radio
                            name={"layout"}
                            label="Selection of the layout"
                            options={[
                              { value: "1", label: "Inline" },
                              { value: "2", label: "Pop Up" },
                            ]}
                            selectedOption={configState.layout}
                            onChange={handleChange}
                          />
                          <Radio
                            name={"layoutOffline"}
                            label="Selection layout offline
            merchants"
                            options={[
                              { value: "1", label: "no separation" },
                              { value: "2", label: "tabed (online/offline)" },
                            ]}
                            selectedOption={configState.layoutOffline}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="create-config-container">
                          <Radio
                            name={"layoutMultiselect"}
                            label="Position of sku selector"
                            options={[
                              { value: "top", label: "top" },
                              { value: "inline", label: "inline" },
                            ]}
                            selectedOption={configState.layoutMultiselect}
                            onChange={handleChange}
                          />
                          <InputField
                            type={"text"}
                            name={"text"}
                            label={"Offer more information"}
                            onChange={handleChange}
                            value={configState.text}
                          />
                        </div>
                        <div className="create-config-container">
                          <Radio
                            name={"price"}
                            label="Show price"
                            options={[
                              { value: "true", label: "true" },
                              { value: "false", label: "false" },
                            ]}
                            selectedOption={configState.price}
                            onChange={handleChange}
                          />

                          <Radio
                            name={"stock"}
                            label="Show availability"
                            options={[
                              { value: "true", label: "true" },
                              { value: "false", label: "false" },
                            ]}
                            selectedOption={configState.stock}
                            onChange={handleChange}
                          />
                          <Radio
                            name={"ratings"}
                            label="Show ratings"
                            options={[
                              { value: "true", label: "true" },
                              { value: "false", label: "false" },
                            ]}
                            selectedOption={configState.ratings}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="create-config-container">
                          <CheckboxGroup
                            name={"sorting"}
                            label="Sorting"
                            options={[
                              { value: 1, label: "Price ascending" },
                              { value: 3, label: "Ratings" },
                              { value: 4, label: "Ratings amount" },
                              { value: 5, label: "Random" },
                              {
                                value: 6,
                                label: "List of preferred merchants",
                              },
                            ]}
                            selectedValues={configState.sorting}
                            onChange={handleSortingSelect}
                          />
                          <Radio
                            name={"sortingPrefered"}
                            label="Prefered sorting"
                            options={[
                              { value: "1", label: "Partner" },
                              { value: "2", label: "Preferred merchants" },
                            ]}
                            selectedOption={configState.sortingPrefered}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="create-config-container">
                          <Radio
                            name={"pagination"}
                            label="Pagination"
                            options={[
                              { value: "true", label: "true" },
                              { value: "false", label: "false" },
                            ]}
                            selectedOption={configState.pagination}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="create-config-container">
                          <InputField
                            type={"text"}
                            name={"image"}
                            label={"Packshot of the product"}
                            onChange={handleChange}
                            value={configState.image}
                          />
                          <div>
                            <InputField
                              type={"text"}
                              name={"image"}
                              label={"Packshots per SKU image URL"}
                              onChange={handleSkuChange}
                              value={skuData.image}
                            />
                            <InputField
                              type={"text"}
                              name={"sku"}
                              label={"Packshots per SKU data"}
                              onChange={handleSkuChange}
                              value={skuData.sku}
                            />
                            <button
                              className="btn add-btn"
                              onClick={(e) => {
                                e.preventDefault();
                                setConfigState((prev) => ({
                                  ...prev,
                                  images: [...prev.images, skuData],
                                }));
                                setSkuData({ image: "", sku: "" });
                              }}
                            >
                              <i className="fa fa-plus" /> ADD packshot
                            </button>
                          </div>
                        </div>
                        <div>
                          <InputField
                            type={"number"}
                            name={"style.zIndex"}
                            label={"Layer priority"}
                            onChange={handleChange}
                            value={configState.style.zIndex}
                          />

                          <Radio
                            name={"label.grouping"}
                            label="Tab Label Offline/Online"
                            options={[
                              { value: "1", label: "Online/Offline" },
                              {
                                value: "2",
                                label: "Online-Apotheken/ Apothekenvor Ort",
                              },
                            ]}
                            selectedOption={configState.label.grouping}
                            onChange={handleChange}
                          />
                          <Radio
                            name={"label.header"}
                            label="Tab Label Visibility"
                            options={[
                              { value: "true", label: "true" },
                              { value: "false", label: "false" },
                            ]}
                            selectedOption={configState.label.header}
                            onChange={handleChange}
                          />
                          <Radio
                            name={"label.headerIcon"}
                            label="Tab Label Icon Visibility"
                            options={[
                              { value: "true", label: "true" },
                              { value: "false", label: "false" },
                            ]}
                            selectedOption={configState.label.headerIcon}
                            onChange={handleChange}
                          />
                          <div className="submit-section">
                            <button
                              className="btn btn-primary submit-btn"
                              onClick={(e) => {
                                e.preventDefault();
                                nextStep();
                              }}
                            >
                              Next step
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {showAddModal && step === 2 && (
                      <div className="merchant-wrapper">
                        <Table
                          dataSource={merchantsList}
                          columns={merchantColumns}
                          rowKey="id"
                          pagination={false}
                          sticky={true}
                        />
                        <div className="submit-section">
                          <button
                            className="btn btn-primary submit-btn"
                            onClick={(e) => {
                              e.preventDefault();
                              prevStep();
                            }}
                          >
                            Prev step
                          </button>
                          <button
                            className="btn btn-primary submit-btn"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={(e) => {
                              e.preventDefault();
                              save();
                              setShowAddModal(false);
                              setStep(1);
                            }}
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* /Add Config Modal */}
          {/* Edit Config Modal */}
          <div
            id="edit_department"
            className="modal custom-modal fade"
            role="dialog"
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit Config</h5>
                  <button
                    type="button"
                    className="close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowEditModal(false);
                    }}
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form>
                    {selectedRow && showEditModal && step === 1 && (
                      <>
                        <div className="create-config-wrapper">
                          <div className="create-config-container">
                            <InputField
                              type={"color"}
                              name={"style.btnColor"}
                              label={"Color of the buttons"}
                              onChange={(e) => handleChange(e, true)}
                              value={selectedRow.style.btnColor}
                            />
                            <InputField
                              type={"color"}
                              name={"style.btnTextColor"}
                              label={"Color of the buttons text"}
                              onChange={(e) => handleChange(e, true)}
                              value={selectedRow.style.btnTextColor}
                            />
                            <InputField
                              type={"color"}
                              name={"style.textColor"}
                              label={"Color of the texts"}
                              onChange={(e) => handleChange(e, true)}
                              value={selectedRow.style.textColor}
                            />
                            <InputField
                              type={"color"}
                              name={"style.headerTextColor"}
                              label={"Color of text in the header"}
                              onChange={(e) => handleChange(e, true)}
                              value={selectedRow.style.headerTextColor}
                            />
                            <InputField
                              type={"color"}
                              name={"style.primaryColor"}
                              label={"Color of the layout"}
                              onChange={(e) => handleChange(e, true)}
                              value={selectedRow.style.primaryColor}
                            />
                          </div>
                          <div className="create-config-container">
                            <Radio
                              name={"posBranding"}
                              label="Selection of POS branding"
                              options={[
                                { value: "1", label: "Round Icons" },
                                { value: "2", label: "Logos" },
                              ]}
                              selectedOption={selectedRow.posBranding}
                              onChange={(e) => handleChange(e, true)}
                            />
                            <InputField
                              type={"text"}
                              name={"brand.logoUrl"}
                              label={"Brand logo URL"}
                              onChange={(e) => handleChange(e, true)}
                              value={selectedRow.brand.logoUrl}
                            />
                            <InputField
                              type={"number"}
                              name={"brand.logoFormat.width"}
                              label={"Width"}
                              onChange={(e) => handleChange(e, true)}
                              value={selectedRow.brand.logoFormat.width}
                            />
                            <InputField
                              type={"number"}
                              name={"brand.logoFormat.height"}
                              label={"Height"}
                              onChange={(e) => handleChange(e, true)}
                              value={selectedRow.brand.logoFormat.height}
                            />
                            <Radio
                              name={"brand.logoFormat.align"}
                              label="Alignment of the logo"
                              options={[
                                { value: "left", label: "left" },
                                { value: "right", label: "right" },
                                { value: "center", label: "center" },
                                { value: "justify", label: "justify" },
                                { value: "initial", label: "initial" },
                              ]}
                              selectedOption={
                                selectedRow.brand.logoFormat.align
                              }
                              onChange={(e) => handleChange(e, true)}
                            />
                          </div>

                          <div className="create-config-container">
                            <Radio
                              name={"layout"}
                              label="Selection of the layout"
                              options={[
                                { value: "1", label: "Inline" },
                                { value: "2", label: "Pop Up" },
                              ]}
                              selectedOption={selectedRow.layout}
                              onChange={(e) => handleChange(e, true)}
                            />
                            <Radio
                              name={"layoutOffline"}
                              label="Selection layout offline
            merchants"
                              options={[
                                { value: "1", label: "no separation" },
                                {
                                  value: "2",
                                  label: "tabed (online/offline)",
                                },
                              ]}
                              selectedOption={selectedRow.layoutOffline}
                              onChange={(e) => handleChange(e, true)}
                            />
                          </div>
                          <div className="create-config-container">
                            <Radio
                              name={"layoutMultiselect"}
                              label="Position of sku selector"
                              options={[
                                { value: "top", label: "top" },
                                { value: "inline", label: "inline" },
                              ]}
                              selectedOption={selectedRow.layoutMultiselect}
                              onChange={(e) => handleChange(e, true)}
                            />
                            <InputField
                              type={"text"}
                              name={"text"}
                              label={"Offer more information"}
                              onChange={(e) => handleChange(e, true)}
                              value={selectedRow.text}
                            />
                          </div>
                          <div className="create-config-container">
                            <Radio
                              name={"price"}
                              label="Show price"
                              options={[
                                { value: "true", label: "true" },
                                { value: "false", label: "false" },
                              ]}
                              selectedOption={selectedRow.price}
                              onChange={(e) => handleChange(e, true)}
                            />

                            <Radio
                              name={"stock"}
                              label="Show availability"
                              options={[
                                { value: "true", label: "true" },
                                { value: "false", label: "false" },
                              ]}
                              selectedOption={selectedRow.stock}
                              onChange={(e) => handleChange(e, true)}
                            />
                            <Radio
                              name={"ratings"}
                              label="Show ratings"
                              options={[
                                { value: "true", label: "true" },
                                { value: "false", label: "false" },
                              ]}
                              selectedOption={selectedRow.ratings}
                              onChange={(e) => handleChange(e, true)}
                            />
                          </div>
                          <div className="create-config-container">
                            <CheckboxGroup
                              name={"sorting"}
                              label="Sorting"
                              options={[
                                { value: 1, label: "Price ascending" },
                                { value: 3, label: "Ratings" },
                                { value: 4, label: "Ratings amount" },
                                { value: 5, label: "Random" },
                                {
                                  value: 6,
                                  label: "List of preferred merchants",
                                },
                              ]}
                              selectedValues={selectedRow.sorting}
                              onChange={handleSortingSelect}
                            />
                            <Radio
                              name={"sortingPrefered"}
                              label="Prefered sorting"
                              options={[
                                { value: "1", label: "Partner" },
                                {
                                  value: "2",
                                  label: "Preferred merchants",
                                },
                              ]}
                              selectedOption={selectedRow.sortingPrefered}
                              onChange={(e) => handleChange(e, true)}
                            />
                          </div>
                          <div className="create-config-container">
                            <Radio
                              name={"pagination"}
                              label="Pagination"
                              options={[
                                { value: "true", label: "true" },
                                { value: "false", label: "false" },
                              ]}
                              selectedOption={selectedRow.pagination}
                              onChange={(e) => handleChange(e, true)}
                            />
                          </div>
                          <div className="create-config-container">
                            <InputField
                              type={"text"}
                              name={"image"}
                              label={"Packshot of the product"}
                              onChange={(e) => handleChange(e, true)}
                              value={selectedRow.image}
                            />
                            <div>
                              <InputField
                                type={"text"}
                                name={"image"}
                                label={"Packshots per SKU Image URL"}
                                onChange={handleSkuChange}
                                value={skuData.image}
                              />
                              <InputField
                                type={"text"}
                                name={"sku"}
                                label={"Packshots per SKU data "}
                                onChange={handleSkuChange}
                                value={skuData.sku}
                              />
                              <button
                                className="btn add-btn"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setConfigState((prev) => ({
                                    ...prev,
                                    images: [...prev.images, skuData],
                                  }));
                                  setSkuData({ image: "", sku: "" });
                                }}
                              >
                                <i className="fa fa-plus" /> ADD packshot
                              </button>
                            </div>
                          </div>
                          <div>
                            <InputField
                              type={"number"}
                              name={"style.zIndex"}
                              label={"Layer priority"}
                              onChange={(e) => handleChange(e, true)}
                              value={selectedRow.style.zIndex}
                            />

                            <Radio
                              name={"label.grouping"}
                              label="Tab Label Offline/Online"
                              options={[
                                { value: "1", label: "Online/Offline" },
                                {
                                  value: "2",
                                  label: "Online-Apotheken/ Apothekenvor Ort",
                                },
                              ]}
                              selectedOption={selectedRow.label.grouping}
                              onChange={(e) => handleChange(e, true)}
                            />
                            <Radio
                              name={"label.header"}
                              label="Tab Label Visibility"
                              options={[
                                { value: "true", label: "true" },
                                { value: "false", label: "false" },
                              ]}
                              selectedOption={selectedRow.label.header}
                              onChange={(e) => handleChange(e, true)}
                            />
                            <Radio
                              name={"label.headerIcon"}
                              label="Tab Label Icon Visibility"
                              options={[
                                { value: "true", label: "true" },
                                { value: "false", label: "false" },
                              ]}
                              selectedOption={selectedRow.label.headerIcon}
                              onChange={(e) => handleChange(e, true)}
                            />
                          </div>
                        </div>
                        <div className="submit-section">
                          <button
                            className="btn btn-primary submit-btn"
                            onClick={(e) => {
                              e.preventDefault();
                              nextStep();
                            }}
                          >
                            Next step
                          </button>
                        </div>
                      </>
                    )}
                    {selectedRow && showEditModal && step === 2 && (
                      <div className="merchant-wrapper">
                        <Table
                          dataSource={merchantsList}
                          columns={merchantColumnsEdit}
                          rowKey="id"
                          pagination={false}
                          sticky={true}
                        />
                        <div className="submit-section">
                          <button
                            className="btn btn-primary submit-btn"
                            onClick={(e) => {
                              e.preventDefault();
                              prevStep();
                            }}
                          >
                            Prev step
                          </button>
                          <button
                            className="btn btn-primary submit-btn"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={(e) => {
                              e.preventDefault();
                              saveEdit();
                              setShowEditModal(false);
                              setStep(1);
                            }}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
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
