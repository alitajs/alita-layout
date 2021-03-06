import React, { FC } from 'react';
import { TabBar, NavBar, Icon } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import { LocationState, History, Location } from 'history';

/**
 * 像素转换
 * @param {Number} px - 750视觉稿像素
 * @return {Number} 屏幕上实际像素
 */
const px2hd = (px: number): number => {
  const ONE_REM =
    parseInt(document.documentElement.style.fontSize || '100', 10) || 100;
  const SCALE = ONE_REM / 100;
  return Number((px * SCALE).toFixed(1));
};

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
  onLeftClick?: React.MouseEventHandler<HTMLDivElement>;
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
  text: string;
  iconSize?: string;
  badge?: string;
  iconPath: string;
  selectedIconPath: string;
  onPress?: () => void;
  title?: string;
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
export interface AlitaLayoutProps<
  Params extends { [K in keyof Params]?: string } = {},
  S = LocationState
> {
  history: History;
  location: Location<S>;
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
  console.log(lists);
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
  history,
}: {
  hasTabsBar: boolean;
  realNavBar: NavBarProps;
  realTitle: string;
  history: History;
}): React.ReactNode => {
  const defaultIcon = hasTabsBar ? null : <Icon type="left" />;
  const {
    fixed,
    mode,
    icon,
    onLeftClick,
    rightContent,
    leftContent,
    hideNavBar,
    className,
    pageTitle,
  } = realNavBar;
  const defaultEvent = onLeftClick || (!hasTabsBar ? history.goBack : () => {});
  if (hideNavBar === true) {
    return null;
  }
  return (
    <>
      <div
        className="alita-layout-head"
        style={
          fixed ? { position: 'fixed', top: 0, width: '100%', zIndex: 99 } : {}
        }
      >
        <NavBar
          mode={mode}
          icon={icon || defaultIcon}
          onLeftClick={defaultEvent}
          rightContent={rightContent}
          leftContent={leftContent}
          className={className}
        >
          {pageTitle || realTitle}
        </NavBar>
      </div>
      {fixed && (
        <div style={{ height: '0.9rem' }} className="alita-layout-fixed"></div>
      )}
    </>
  );
};
const styleInject = (): void => {
  const css = '.am-tab-bar {\n  height: auto !important;\n}';
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
  location: { pathname },
  tabBar = {},
  documentTitle,
  titleList = [],
  history,
  navBar = {},
  hideNavBar = false,
}) => {
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

  return (
    <DocumentTitle title={realTitle}>
      <div style={{ minHeight: '100vh', background: pageBackground || '#FFF' }}>
        {!hideNavBar &&
          headerRender({
            hasTabsBar,
            realNavBar,
            realTitle,
            history,
          })}
        {children}
        {hasTabsBar && (
          <div
            style={{
              height: px2hd(100),
            }}
          ></div>
        )}
        {isTabsApp && hasTabsBar && (
          <div
            style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
            }}
          >
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
                      <div
                        style={{
                          width: `${item.iconSize || '0.44rem'}`,
                          height: `${item.iconSize || '0.44rem'}`,
                          background: `url(${
                            item.iconPath
                          }) center center /  ${item.iconSize ||
                            '0.44rem'} ${item.iconSize || '0.44rem'} no-repeat`,
                        }}
                      />
                    }
                    selectedIcon={
                      <div
                        style={{
                          width: `${item.iconSize || '0.44rem'}`,
                          height: `${item.iconSize || '0.44rem'}`,
                          background: `url(${
                            item.selectedIconPath
                          }) center center /  ${item.iconSize ||
                            '0.44rem'} ${item.iconSize || '0.44rem'} no-repeat`,
                        }}
                      />
                    }
                    selected={pathname === item.pagePath}
                    badge={item.badge}
                    onPress={() => {
                      if (pathname === item.pagePath) return;
                      if (item.onPress) {
                        item.onPress();
                      } else {
                        history.push(item.pagePath);
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
    </DocumentTitle>
  );
};

export default withRouter(AlitaLayout);
