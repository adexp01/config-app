import React from "react";
import { Table, Checkbox } from "antd";
import InputField from "../../../../_components/inputField/inputField";
import Radio from "../../../../_components/radio/radio";
import CheckboxGroup from "../../../../_components/checkbox/checkbox";
import { merchantsList } from "../../../../Entryfile/features/static/merchantsList";
const AddConfigModal = ({
  open,
  step,
  close,
  configState,
  addPackshot,
  removePackshot,
  handleChange,
  save,
  nextStep,
  prevStep,
  handleSkuChange,
  skuData,
  setStep,
  handleSortingSelect,
  selectMerchant,
  highlightMerchant,
  preferedMerchant,
}) => {
  const merchantColumns = [
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
  return (
    <div id="add_department" className="modal custom-modal fade" role="dialog">
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
                close();
              }}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              {open && step === 1 && (
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
                      name={"sortingPreferred"}
                      label="Prefered sorting"
                      options={[
                        { value: "2", label: "Partner" },
                        { value: "1", label: "None" },

                        { value: "3", label: "Preferred merchants" },
                      ]}
                      selectedOption={configState.sortingPreferred}
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
                          addPackshot();
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
                        {configState.images.map((image, index) => (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "12px",
                            }}
                            key={image.sku + image.image}
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
                              onClick={() => removePackshot(index)}
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
                          label: "Online-Apotheken/Apotheken vor Ort",
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

              {open && step === 2 && (
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
                        close();
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
  );
};

export default AddConfigModal;
