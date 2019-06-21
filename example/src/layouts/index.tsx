import React from 'react';
import { Icon } from 'antd-mobile';
import home from '../assets/home.png';
import home1 from '../assets/home1.png';
import mine from '../assets/mine.png';
import mine1 from '../assets/mine1.png';
import AlitaLayout, { TarBarProps, NavBarProps } from '../../../src/index';

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
      title: '首页',
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
  const titleList = [
    {
      pagePath: '/list',
      title: '列表页',
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
    documentTitle: 'alita demo',
    children,
    titleList,
    navBar: {
      mode: 'light',
      onLeftClick: () => console.log('onLeftClick'),
      rightContent: [
        <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
        <Icon key="1" type="ellipsis" />,
      ],
      navList: [
        {
          pagePath: '/home',
          navBar: {
            mode: 'dark',
            icon: <Icon type="left" />,
            onLeftClick: () => console.log('onLeftClick'),
          },
        },
        {
          pagePath: '/list',
          navBar: {
            hideNavBar: true,
          },
        },
      ],
    } as NavBarProps,
  };
  return <AlitaLayout {...layoutProps} />;
};

export default BasicLayout;
