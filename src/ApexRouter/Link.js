import React from "react";
import propTypes from "prop-types";
import { history } from "./Router";

const Link = ({ to, replace, className, style, children }) => {
  const handleClick = (e) => {
    e.preventDefault();
    if (history.location.pathname === to) return;
    replace ? history.replace(to) : history.push(to);
  };
  return (
    <a href={to} onClick={handleClick} className={className} style={style}>
      {children}
    </a>
  );
};

Link.propTypes = {
  to: propTypes.string.isRequired,
  replace: propTypes.bool,
  className: propTypes.string || propTypes.arrayOf(propTypes.string),
  style: propTypes.object,
};

export default Link;
