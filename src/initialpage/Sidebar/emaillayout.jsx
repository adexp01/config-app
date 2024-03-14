/**
 * App Routes
 */
import React, { useEffect, useState } from "react";
import { Route, withRouter } from "react-router-dom";

// router service

import Header from "./header";
import EmailSidebar from "./emailsidebar";

const Emaillayout = (props) => {
  const [menu, setMenu] = useState(false);

  const toggleMobileMenu = () => {
    setMenu(!menu);
  };

  const { match } = props;
  return (
    <>
      <div className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
        <Header onMenuClick={(value) => toggleMobileMenu()} />
        <div></div>
        <EmailSidebar />
      </div>
    </>
  );
};
export default withRouter(Emaillayout);
