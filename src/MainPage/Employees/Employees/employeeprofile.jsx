/**
 * TermsCondition Page
 */
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { Avatar_02 } from "../../../Entryfile/imagepath";

const EmployeeProfile = ({ selectedRow }) => {
  const { loginvalue } = useSelector((state) => state.user);

  const UserName = loginvalue?.email?.split("@")[0];
  const ProfileName = UserName?.charAt(0).toUpperCase() + UserName?.slice(1);

  useEffect(() => {
    if ($(".select").length > 0) {
      $(".select").select2({
        minimumResultsForSearch: -1,
        width: "100%",
      });
    }
  });
  return (
    <>
      <div className="page-wrapper" style={{ padding: 0 }}>
        <Helmet>
          <meta name="description" content="Reactify Blank Page" />
        </Helmet>
        {/* Page Content */}
        <div
          className="content container-fluid"
          style={{ padding: "0px 30px 30px 30px " }}
        >
          <div className="tab-content" style={{ paddingTop: 0 }}>
            {/* Profile Info Tab */}

            {selectedRow && (
              <div
                id="emp_profile"
                className="pro-overview tab-pane fade show active"
              >
                <div className="row">
                  <div className="col-md-6 d-flex">
                    <div className="card profile-box flex-fill">
                      <div className="card-body">
                        <h3 className="card-title">Colors</h3>
                        <ul className="personal-info">
                          <li>
                            <div className="title">Color of the buttons</div>
                            <div
                              className="text"
                              style={{ color: selectedRow.style.btnColor }}
                            >
                              {selectedRow.style.btnColor}
                            </div>
                          </li>
                          <li>
                            <div className="title">
                              Color of the buttons text
                            </div>
                            <div
                              className="text"
                              style={{ color: selectedRow.style.btnTextColor }}
                            >
                              {selectedRow.style.btnTextColor}
                            </div>
                          </li>
                          <li>
                            <div className="title">Color of the texts</div>
                            <div
                              className="text"
                              style={{ color: selectedRow.style.textColor }}
                            >
                              {selectedRow.style.textColor}
                            </div>
                          </li>
                          <li>
                            <div className="title">
                              Color of text in the header
                            </div>
                            <div
                              className="text"
                              style={{
                                color: selectedRow.style.headerTextColor,
                              }}
                            >
                              {selectedRow.style.headerTextColor}
                            </div>
                          </li>
                          <li>
                            <div className="title">Color of the layout</div>
                            <div
                              className="text"
                              style={{
                                color: selectedRow.style.primaryColor,
                              }}
                            >
                              {selectedRow.style.primaryColor}
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 d-flex">
                    <div className="card profile-box flex-fill">
                      <div className="card-body">
                        <h3 className="card-title">Brand Information</h3>
                        <ul className="personal-info">
                          <li>
                            <div className="title">Brand Logo URL</div>
                            <div className="text">
                              <img
                                src={selectedRow.brand.logoUrl}
                                alt="Brand Logo"
                                style={{ width: "75px", height: "75px" }}
                              />
                            </div>
                          </li>
                          <li>
                            <div className="title">Logo Width</div>
                            <div className="text">
                              {selectedRow.brand.logoFormat.width}
                            </div>
                          </li>
                          <li>
                            <div className="title">Logo Height</div>
                            <div className="text">
                              {selectedRow.brand.logoFormat.height}
                            </div>
                          </li>
                          <li>
                            <div className="title">Logo Alignment</div>
                            <div className="text">
                              {selectedRow.brand.logoFormat.align}
                            </div>
                          </li>
                          <li>
                            <div className="title">
                              Selection of POS branding
                            </div>
                            <div className="text">
                              {selectedRow.posBranding === 1
                                ? "Round Icons "
                                : "Logos"}
                            </div>
                          </li>
                          <li>
                            <div className="title">Selection of the layout</div>
                            <div className="text">
                              {selectedRow.layout === 1 ? "Inline" : "Pop Up"}
                            </div>
                          </li>
                          <li>
                            <div className="title">
                              Selection layout offline merchants
                            </div>
                            <div className="text">
                              {selectedRow.layoutOffline === 1
                                ? " no separation "
                                : "tabed (online/offline)"}
                            </div>
                          </li>
                          <li>
                            <div className="title">
                              Position of sku selector
                            </div>
                            <div className="text">
                              {selectedRow.layoutMultiselect}
                            </div>
                          </li>
                          <li>
                            <div className="title">Offer more information</div>
                            <div className="text">{selectedRow.text}</div>
                          </li>
                          <li>
                            <div className="title">Show price</div>
                            <div className="text">
                              {selectedRow.price ? "Yes" : "No"}
                            </div>
                          </li>
                          <li>
                            <div className="title">Show ratings</div>
                            <div className="text">
                              {selectedRow.ratings ? "Yes" : "No"}
                            </div>
                          </li>
                          <li>
                            <div className="title">Show availability</div>
                            <div className="text">
                              {selectedRow.stock ? "Yes" : "No"}
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12 d-flex">
                    <div className="card profile-box flex-fill">
                      <div className="card-body">
                        <h3 className="card-title">Merchant Preferences</h3>
                        <div className="text">
                          Limit to specific merchants:{" "}
                          {selectedRow.merchants
                            .filter((item) => Number(item) > 0)
                            .join(", ")}
                        </div>
                        <div className="text">
                          Exclude merchants:{" "}
                          {selectedRow.merchants
                            .filter((item) => Number(item) < 0)
                            .join(", ")}
                        </div>
                        <div className="text">
                          Highlight merchants:{" "}
                          {selectedRow.merchantsSponsored.join(", ")}
                        </div>
                        <div className="text">
                          Pefered merchants:{" "}
                          {selectedRow.merchantsPrefered.join(", ")}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 d-flex">
                    <div className="card profile-box flex-fill">
                      <div className="card-body">
                        <h3 className="card-title">Configuration Details</h3>
                        <ul className="personal-info">
                          <li>
                            <div className="title">Sorting</div>
                            <div className="text">
                              {selectedRow.sorting.join(", ")}
                            </div>
                          </li>
                          <li>
                            <div className="title">Prefered sorting</div>
                            <div className="text">
                              {selectedRow.sortingPrefered === 1
                                ? "Partner"
                                : "Preferred merchants"}
                            </div>
                          </li>
                          <li>
                            <div className="title">Pagination</div>
                            <div className="text">
                              {selectedRow.pagination ? "Yes" : "No"}
                            </div>
                          </li>

                          <li>
                            <div className="title">Layer priority</div>
                            <div className="text">
                              {selectedRow.style.zIndex}
                            </div>
                          </li>
                          <li>
                            <div className="title">
                              Tab Label Offline/Online
                            </div>
                            <div className="text">
                              {selectedRow.label.grouping === 1
                                ? " Online/Offline"
                                : "Online-Apotheken/ Apotheken"}
                            </div>
                          </li>
                          <li>
                            <div className="title">Tab Label Visibility</div>
                            <div className="text">
                              {String(selectedRow.label.header)}
                            </div>
                          </li>

                          <li>
                            <div className="title">
                              Tab Label Icon Visibility
                            </div>
                            <div className="text">
                              {String(selectedRow.label.headerIcon)}
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12 d-flex">
                    <div className="card profile-box flex-fill">
                      <div className="card-body">
                        <h3 className="card-title">Packshots per SKU</h3>
                        <ul
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                          }}
                        >
                          {selectedRow.images.length > 0 ? (
                            selectedRow.images.map((img, index) => (
                              <li key={index}>
                                <img
                                  src={img.image}
                                  alt={`Image ${index + 1}`}
                                  style={{ width: "75px", height: "75px" }}
                                />
                                {img.imageFormat ? (
                                  <>
                                    <span style={{ paddingLeft: "10px" }}>
                                      Format: {img.imageFormat.width}x
                                      {img.imageFormat.height}
                                    </span>
                                    <span style={{ paddingLeft: "10px" }}>
                                      SKU: {img.sku ?? "none"}x
                                      {img.imageFormat.height}
                                    </span>
                                  </>
                                ) : (
                                  <span style={{ paddingLeft: "10px" }}>
                                    Format: none
                                  </span>
                                )}
                              </li>
                            ))
                          ) : (
                            <span>Packshots per SKU: none</span>
                          )}
                        </ul>
                        <div className="text">
                          <img src={selectedRow.image} width={80} height={80} />
                          <span style={{ paddingLeft: "10px" }}>
                            {" "}
                            Packshot of the product
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* /Profile Info Tab */}
          </div>
        </div>
        {/* /Page Content */}

        {selectedRow && (
          <div
            style={{
              margin: "20px",
              backgroundColor: "#f0f0f0",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <h3>Selected Configuration JSON</h3>
            <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
              {JSON.stringify(selectedRow, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </>
  );
};
export default EmployeeProfile;
