import React from 'react';
import home from '../assets/home.png';
import home1 from '../assets/home1.png';
import mine from '../assets/mine.png';
import mine1 from '../assets/mine1.png';
import AlitaLayout, { TarBarProps } from '../../../src/index';

const BasicLayout: React.FC = props => {
  const { children } = props;

  const list = [
    {
      pagePath: '/',
      text: '首页',
      iconPath: home,
      iconSize: '',
      badge: '',
      selectedIconPath: home1,
    },
    {
      pagePath: '/home',
      text: '我的',
      iconPath: mine,
      iconSize: '',
      badge: '',
      selectedIconPath: mine1,
    },
  ];
  const tarBar: TarBarProps = {
    color: '#bfbfbf',
    selectedColor: '#F9DD4A',
    borderStyle: 'white',
    backgroungColor: 'white',
    position: 'bottom',
    list,
  };
  const layoutProps = {
    tarBar,
    children,
  };
  return <AlitaLayout {...layoutProps} />;
};

export default BasicLayout;
