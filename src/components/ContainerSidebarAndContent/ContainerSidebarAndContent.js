import React from 'react';
import './ContainerSidebarAndContent.scss';

const ContainerSidebarAndContent = ({children}) => (
  <div className= "global-layout-container">
      {children}
  </div>
);

ContainerSidebarAndContent.propTypes = {};

ContainerSidebarAndContent.defaultProps = {};

export default ContainerSidebarAndContent;
