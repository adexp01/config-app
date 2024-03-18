/**
 * App Header
 */
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  headerlogo,
  lnEnglish,
  lnFrench,
  lnSpanish,
  lnGerman,
  Avatar_02,
  Avatar_03,
  Avatar_05,
  Avatar_06,
  Avatar_08,
  Avatar_09,
  Avatar_13,
  Avatar_17,
  Avatar_21,
} from "../../Entryfile/imagepath";
import notifications from "../../assets/json/notifications";
import message from "../../assets/json/message";

const Header = (props) => {
  const data = notifications.notifications;
  const datas = message.message;
  const [notification, setNotifications] = useState(false);

  const handlesidebar = () => {
    document.body.classList.toggle("mini-sidebar");
  };
  const onMenuClik = () => {
    props.onMenuClick();
  };

  let pathname = location.pathname;
  const { loginvalue } = useSelector((state) => state.user);
  const UserName = loginvalue?.email?.split("@")[0];
  const ProfileName = UserName?.charAt(0).toUpperCase() + UserName?.slice(1);

  return (
    <div className="header" style={{ right: "0px" }}>
      {/* Logo */}
      <div className="header-left">
        <Link to="/" className="logo">
          <img src={headerlogo} width={40} height={40} alt="" />
        </Link>
      </div>
      {/* /Logo */}
      <a
        id="toggle_btn"
        href="#"
        style={{
          display: pathname.includes("tasks")
            ? "none"
            : pathname.includes("compose")
            ? "none"
            : "",
        }}
        onClick={handlesidebar}
      >
        <span className="bar-icon">
          <span />
          <span />
          <span />
        </span>
      </a>
      {/* Header Title */}
      <div className="page-title-box">
        <h3></h3>
      </div>
      {/* /Header Title */}
      <a
        id="mobile_btn"
        className="mobile_btn"
        href="#"
        onClick={() => onMenuClik()}
      >
        <i className="fa fa-bars" />
      </a>
      {/* Header Menu */}
      <ul className="nav user-menu">
        {/* Flag */}
        <li className="nav-item dropdown has-arrow flag-nav">
          <a
            className="nav-link dropdown-toggle"
            data-bs-toggle="dropdown"
            href="#"
            role="button"
          >
            <img src={lnEnglish} alt="" height={20} /> <span>English</span>
          </a>
          <div className="dropdown-menu dropdown-menu-end dropdown-menu-right">
            <a href="" className="dropdown-item">
              <img src={lnEnglish} alt="" height={16} /> English
            </a>

            <a href="" className="dropdown-item">
              <img src={lnGerman} alt="" height={16} /> German
            </a>
          </div>
        </li>
        {/* /Flag */}

        <li className="nav-item dropdown has-arrow main-drop">
          <a
            href="#"
            className="dropdown-toggle nav-link"
            data-bs-toggle="dropdown"
          >
            <span className="user-img me-1">
              <img src={Avatar_21} alt="" />
              <span className="status online" />
            </span>
            <span>{ProfileName ? ` ${ProfileName}` : "Admin"}</span>
          </a>
          <div className="dropdown-menu dropdown-menu-end">
            <Link className="dropdown-item" to="/login">
              Logout
            </Link>
          </div>
        </li>
      </ul>
      {/* /Header Menu */}
      {/* Mobile Menu */}
      <div className="dropdown mobile-user-menu">
        <a
          href="#"
          className="nav-link dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="fa fa-ellipsis-v" />
        </a>
        <div className="dropdown-menu dropdown-menu-end dropdown-menu-right">
          <Link className="dropdown-item" to="/app/profile/employee-profile">
            My Profile
          </Link>
          <Link className="dropdown-item" to="/settings/companysetting">
            Settings
          </Link>
          <Link className="dropdown-item" to="/login">
            Logout
          </Link>
        </div>
      </div>
      {/* /Mobile Menu */}
    </div>
  );
};

export default withRouter(Header);
