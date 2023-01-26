import React from "react";
import PropTypes from 'prop-types';

const FooterTaskFilter = ({ label, onChangeFilter}) => {

   return (
      <li>
         <button onClick={onChangeFilter}>{label}</button>
      </li>
   )
}

FooterTaskFilter.defaultProps = {
   label: 'Filter',
   onChangeFilter: () => {}
}

FooterTaskFilter.propTypes = {
   label: PropTypes.string,
   onChangeFilter: PropTypes.func
}

export default FooterTaskFilter;