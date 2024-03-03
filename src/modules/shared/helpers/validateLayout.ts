import React from 'react';
import Content from '../layout/content/Content';
import Header from '../layout/header/Header';
import Sidebar from '../layout/sidebar/Sidebar';

const validateChildren = (children: React.ReactNode[]) => {
  if (children.length === 3) {
    return (
      React.isValidElement(children[0]) &&
      children[0].type === Header &&
      React.isValidElement(children[1]) &&
      children[1].type === Sidebar &&
      React.isValidElement(children[2]) &&
      children[2].type === Content
    );
  }
  if (children.length === 2) {
    return (
      React.isValidElement(children[0]) &&
      children[0].type === Sidebar &&
      React.isValidElement(children[1]) &&
      children[1].type === Content
    );
  }
  return React.isValidElement(children[0]) && children[0].type === Content;
};

export default validateChildren;
