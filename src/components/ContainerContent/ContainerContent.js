import React from 'react';
import './ContainerContent.scss';

const ContainerContent = ({children}) => (
    <div className="body-content">
      <div className="element-content" >
        {children}
      </div>
    </div>
);

ContainerContent.propTypes = {};

ContainerContent.defaultProps = {};

export default ContainerContent;
