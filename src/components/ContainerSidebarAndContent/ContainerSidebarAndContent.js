import React from 'react';
import './ContainerSidebarAndContent.scss';

const ContainerSidebarAndContent = ({children}) => (
  <div className="global-layout-container">
    <div className="container-sidebar-content">
      {children}
    </div>
  </div>
);

ContainerSidebarAndContent.propTypes = {};

ContainerSidebarAndContent.defaultProps = {};

export default ContainerSidebarAndContent;
