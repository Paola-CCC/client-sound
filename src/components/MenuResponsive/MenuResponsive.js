import React from 'react';
import PropTypes from 'prop-types';
import './MenuResponsive.scss';

const MenuResponsive = () => (
  <>
      <input id="toggle" type="checkbox"></input>
      <label for="toggle" class="hamburger">
        <span class="top-bun"></span>
        <span class="meat"></span>
        <span class="bottom-bun"></span>
      </label>
  </>
);

MenuResponsive.propTypes = {};

MenuResponsive.defaultProps = {};

export default MenuResponsive;
