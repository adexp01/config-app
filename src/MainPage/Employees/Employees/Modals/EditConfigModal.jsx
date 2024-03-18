import React from "react";
import InputField from "../../../../_components/inputField/inputField";
import Radio from "../../../../_components/radio/radio";
import { Table, Checkbox } from "antd";
import CheckboxGroup from "../../../../_components/checkbox/checkbox";
import { merchantsList } from "../../../../Entryfile/features/static/merchantsList";
const EditConfigModal = ({
  open,
  step,
  close,
  selectedRow,
  handleChange,
  handleSortingSelect,
  handleSkuChange,
  skuData,
  editPackshot,
  prevStep,
  nextStep,
  setStep,
  removePackshot,
  selectMerchantEdit,
  highlightMerchantEdit,
  preferedMerchantEdit,
  saveEdit = { saveEdit },
}) => {
  const merchantColumnsEdit = [
    {
      title: "Apotheke",
      dataIndex: "apotheke",
      key: "apotheke",
    },
    {
      title: "Restrict",
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
  return (
    <div id="edit_department" className="modal custom-modal fade" role="dialog">
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
                close();
              }}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              {selectedRow && open && step === 1 && (
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
                        selectedOption={selectedRow.brand.logoFormat.align}
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
                        onChange={(e) => {
                          handleSortingSelect(e, true);
                        }}
                      />
                      <Radio
                        name={"sortingPreferred"}
                        label="Prefered sorting"
                        options={[
                          { value: "2", label: "Partner" },
                          { value: "1", label: "None" },

                          { value: "3", label: "Preferred merchants" },
                        ]}
                        selectedOption={selectedRow.sortingPreferred}
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

                        <InputField
                          type={"number"}
                          name={"width"}
                          label={"Packshots per SKU width"}
                          onChange={handleSkuChange}
                          value={skuData.width}
                        />
                        <InputField
                          type={"number"}
                          name={"height"}
                          label={"Packshots per SKU height"}
                          onChange={handleSkuChange}
                          value={skuData.height}
                        />

                        <button
                          className="btn add-btn"
                          onClick={(e) => {
                            e.preventDefault();
                            editPackshot();
                          }}
                        >
                          <i className="fa fa-plus" /> ADD packshot
                        </button>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          {selectedRow.images.map((image, index) => (
                            <div
                              key={image.image + index}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                              }}
                            >
                              <div>
                                <div style={{ color: "black" }}>
                                  Packshot sku: {image.sku}
                                </div>
                                <div style={{ color: "black" }}>
                                  Packshot image: {image.image}
                                </div>
                              </div>

                              <span
                                color="red"
                                style={{ cursor: "pointer" }}
                                onClick={() => removePackshot(index, true)}
                              >
                                ×
                              </span>
                            </div>
                          ))}
                        </div>
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
                            label: "Online-Apotheken/Apotheken vor Ort",
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
              {selectedRow && open && step === 2 && (
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
                        close();
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
  );
};

export default EditConfigModal;
