import React from 'react';
import { withRouter } from "react-router";

const Footer  = (props) => {
  return props.location.pathname != '/login'?(
      <footer className="main-footer">
          <strong>Copyright &copy; 2021.</strong> All rights
          reserved.
      </footer>
  ):null;
};

export default withRouter(Footer);