import React, { FC, useEffect } from 'react';
// import { TabBar, NavBar, Icon } from 'antd-mobile';
import TabBar from 'antd-mobile-v2/es/tab-bar';
import NavBar from 'antd-mobile-v2/es/nav-bar';
import Icon from 'antd-mobile-v2/es/icon';
import { TabIcon } from 'antd-mobile-v2/es/tab-bar/PropsType';
import {
  useLocation,
  useNavigate
} from "react-router-dom";
import 'antd-mobile-v2/es/tab-bar/style';
import 'antd-mobile-v2/es/nav-bar/style';
import 'antd-mobile-v2/es/icon/style';

export interface NavBarListItem {
  pagePath: string;
  navBar: NavBarProps;
}

export interface NavBarProps extends React.HTMLProps<HTMLDivElement> {
  prefixCls?: string;
  className?: string;
  mode?: 'dark' | 'light';
  icon?: React.ReactNode;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  onLeftClick?: (navigate) => void;
  navList?: NavBarListItem[];
  hideNavBar?: boolean;
  fixed?: boolean;
  pageTitle?: string;
  pageBackground?: string;
}
export interface Match<Params extends { [K in keyof Params]?: string } = {}> {
  params: Params;
  isExact: boolean;
  path: string;
  url: string;
}

export interface TabBarListItem {
  pagePath: string;
  text?: string;
  iconSize?: string;
  badge?: string;
  iconPath?: string;
  selectedIconPath?: string;
  onPress?: () => void;
  title?: string;
  icon?: TabIcon;
  selectedIcon?: TabIcon;
}
export interface TitleListItem {
  pagePath: string;
  title: string;
}
export interface TabBarProps {
  list: TabBarListItem[];
  color?: string;
  selectedColor?: string;
  backgroungColor?: string;
  position?: 'bottom' | 'top';
  borderStyle?: string;
  tabsGroup?: string[][];
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function useDocumentTitle(title: string) {
  useEffect(() => {
    const originalTitle = document.title;
    document.title = title;

    return () => {
      document.title = originalTitle;
    };
  }, [title]);
}
export interface AlitaLayoutProps<
  Params extends { [K in keyof Params]?: string } = {},
  > {
  match: Match<Params>;
  tabBar?: TabBarProps;
  documentTitle?: string;
  titleList?: TitleListItem[];
  navBar?: NavBarProps;
  hideNavBar?: boolean;
}
const checkNavBarList = (
  pagePath: string,
  lists: NavBarListItem[],
): NavBarProps | null => {
  const page = lists.filter(
    item => item.pagePath === pagePath && !!item.navBar,
  );
  if (page && page.length > 0) {
    return page[0].navBar;
  }
  return null;
};
const checkTabsList = (
  pagePath: string,
  lists: TabBarListItem[],
  tabsGrouping?: string[][],
): { hasTabsBar: boolean; pageTitle?: string; realList: TabBarListItem[] } => {
  let realList = lists;
  let realGroup;
  const page = lists.filter(
    (item: { pagePath: string }) => item.pagePath === pagePath,
  );

  if (tabsGrouping && tabsGrouping.length > 0) {
    tabsGrouping.forEach(tabsGroup => {
      if (page[0] && tabsGroup.includes(page[0].pagePath)) {
        realGroup = tabsGroup;
      }
    });
  }

  if (realGroup) {
    realList = lists.filter((item: { pagePath: string }) =>
      realGroup.includes(item.pagePath),
    );
  }

  return {
    hasTabsBar: page && page.length > 0,
    pageTitle: page[0] ? page[0].title || page[0].text : '',
    realList,
  };
};

const checkTitleList = (pagePath: string, lists: TitleListItem[]): string => {
  const page = lists.filter(
    (item: { pagePath: string }) => item.pagePath === pagePath,
  );
  return page[0] ? page[0].title : '';
};

const headerRender = ({
  realNavBar,
  hasTabsBar,
  realTitle,
  navigate,
}: {
  hasTabsBar: boolean;
  realNavBar: NavBarProps;
  realTitle: string;
  navigate: any;
}): React.ReactNode => {
  const defaultIcon = hasTabsBar ? null : <Icon type="left" />;
  const {
    mode,
    icon,
    onLeftClick,
    rightContent,
    leftContent,
    hideNavBar,
    className,
    pageTitle,
  } = realNavBar;
  const defaultEvent = onLeftClick || (!hasTabsBar ? navigate.goBack : () => { });
  if (hideNavBar === true) {
    return null;
  }
  return (
    <>
      <div
        className="alita-layout-head am-navbar am-navbar-dark"
        style={{
          height: 'auto',
          flexShrink: 0,
          paddingTop: 'var(--alita-safe-area-top)',
        }}
      >
        <NavBar
          mode={mode}
          style={{ width: '100%' }}
          icon={icon || defaultIcon}
          onLeftClick={() => defaultEvent(navigate)}
          rightContent={rightContent}
          leftContent={leftContent}
          className={className}
        >
          {pageTitle || realTitle}
        </NavBar>
      </div>
    </>
  );
};
const styleInject = (): void => {
  const css =
    '.am-tab-bar {\n  padding-bottom:var(--alita-safe-area-bottom);\n} html{--alita-safe-area-top: env(safe-area-inset-top);--alita-safe-area-bottom: env(safe-area-inset-bottom);--alita-safe-area-left: env(safe-area-inset-left);--alita-safe-area-right: env(safe-area-inset-right);}';
  if (typeof document === 'undefined') {
    return;
  }

  const head = document.head || document.getElementsByTagName('head')[0];
  const style = document.createElement('style') as any;
  style.type = 'text/css';
  head.appendChild(style);
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
};
styleInject();
const AlitaLayout: FC<AlitaLayoutProps> = ({
  children,
  tabBar = {},
  documentTitle,
  titleList = [],
  navBar = {},
  hideNavBar = false,
}) => {
  const { pathname } = useLocation();
  const navigate= useNavigate();
  const {
    list = [],
    color,
    selectedColor,
    backgroungColor = '#FFF',
    position,
    tabsGroup = [],
  } = tabBar as TabBarProps;
  const { navList } = navBar;
  let pageNavBar = null;
  if (navList) {
    pageNavBar = checkNavBarList(pathname, navList);
  }
  const realNavBar = {
    ...navBar,
    ...pageNavBar,
  };
  const { pageBackground } = realNavBar;
  const { hasTabsBar, pageTitle, realList } = checkTabsList(
    pathname,
    list,
    tabsGroup,
  );
  const isTabsApp = list.length > 0;
  const titleListItem = checkTitleList(pathname, titleList);
  const realTitle = titleListItem || pageTitle || documentTitle || '';

  // 头部永久固定，部分页面需要跟随页面流滚动，可以选择隐藏 NavBar，在页面中手动添加
  const headFixed = realNavBar.fixed;
  if (headFixed) {
    console.warn(
      'navbar fixed 设置已被移除，请通过在页面中手动添加的方式实现。有疑问请联系微信yu_xiaohu',
    );
  }
  useDocumentTitle(realTitle);
  //
  return (
    // <DocumentTitle title={realTitle}>
    <div
      className="alita-page"
      style={{ background: pageBackground || '#FFF' }}
    >
      {!hideNavBar &&
        headerRender({
          hasTabsBar,
          realNavBar,
          realTitle,
          navigate,
        })}
      <div
        className="alita-layout-content"
        style={{
          flex: '1 1 0%',
          overflowX: 'hidden',
          overflowY: 'auto',
          position: 'relative',
        }}
      >
        {children}
      </div>
      {isTabsApp && hasTabsBar && (
        <div className="alita-layout-footer" style={{ flexShrink: 0 }}>
          <TabBar
            tabBarPosition={position}
            unselectedTintColor={color}
            tintColor={selectedColor}
            barTintColor={backgroungColor}
            noRenderContent
          >
            {realList.map(item => {
              return (
                <TabBar.Item
                  title={item.text}
                  icon={
                    item?.icon || (
                      <div
                        style={{
                          display: item?.iconPath ? 'block' : 'none',
                          width: `${item.iconSize || '0.38rem'}`,
                          height: `${item.iconSize || '0.38rem'}`,
                          background: `url(${item.iconPath
                            }) center center /  ${item.iconSize ||
                            '0.38rem'} ${item.iconSize || '0.38rem'} no-repeat`,
                        }}
                      />
                    )
                  }
                  selectedIcon={
                    item?.selectedIcon || (
                      <div
                        style={{
                          display: item?.selectedIconPath ? 'block' : 'none',
                          width: `${item.iconSize || '0.38rem'}`,
                          height: `${item.iconSize || '0.38rem'}`,
                          background: `url(${item.selectedIconPath
                            }) center center /  ${item.iconSize ||
                            '0.38rem'} ${item.iconSize || '0.38rem'} no-repeat`,
                        }}
                      />
                    )
                  }
                  selected={pathname === item.pagePath}
                  badge={item.badge}
                  onPress={() => {
                    if (pathname === item.pagePath) return;
                    if (item.onPress) {
                      item.onPress();
                    } else {
                      navigate(item.pagePath);
                    }
                  }}
                  key={item.pagePath}
                ></TabBar.Item>
              );
            })}
          </TabBar>
        </div>
      )}
    </div>
    // </DocumentTitle>
  );
};

export default AlitaLayout;
