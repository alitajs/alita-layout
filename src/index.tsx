import React, { FC } from 'react';
import { TabBar, NavBar, Icon } from 'antd-mobile';
import router from 'umi/router';
import withRouter from 'umi/withRouter';
import * as H from 'history';
import DocumentTitle from 'react-document-title';

export interface NarBarListItem {
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
  navList?: NarBarListItem[];
  hideNavBar?: boolean;
  fixed?: boolean;
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
  onPress?: () => {};
  title?: string;
}
export interface TitleListItem {
  pagePath: string;
  title: string;
}
export interface TarBarProps {
  list: TabBarListItem[];
  color?: string;
  selectedColor?: string;
  backgroungColor?: string;
  position?: 'bottom' | 'top';
  borderStyle?: string;
}
interface AlitaLayoutProps<
  Params extends { [K in keyof Params]?: string } = {},
  S = H.LocationState
> {
  history: H.History;
  location: H.Location<S>;
  match: Match<Params>;
  tarBar?: TarBarProps;
  documentTitle?: string;
  titleList?: TitleListItem[];
  navBar?: NavBarProps;
}
const checkNavBarList = (
  pagePath: string,
  lists: NarBarListItem[],
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
): { hasTabsBar: boolean; pageTitle?: string } => {
  const page = lists.filter(
    (item: { pagePath: string }) => item.pagePath === pagePath,
  );
  return {
    hasTabsBar: page && page.length > 0,
    pageTitle: page[0] ? page[0].title || page[0].text : '',
  };
};
const checkTitleList = (pagePath: string, lists: TitleListItem[]): string => {
  const page = lists.filter(
    (item: { pagePath: string }) => item.pagePath === pagePath,
  );
  return page[0] ? page[0].title : '';
};

const headerRender = ({
  navBar,
  hasTabsBar,
  realTitle,
  pathname,
}: {
  hasTabsBar: boolean;
  navBar: NavBarProps;
  realTitle: string;
  pathname: string;
}): React.ReactNode => {
  const defaultIcon = hasTabsBar ? null : <Icon type="left" />;
  const { navList, fixed } = navBar;
  let pageNavBar = null;
  if (navList) {
    pageNavBar = checkNavBarList(pathname, navList);
  }
  const realNavBar = pageNavBar || navBar;
  const { mode, icon, onLeftClick, rightContent, hideNavBar } = realNavBar;
  const defaultEvent = onLeftClick || (!hasTabsBar ? router.goBack : () => {});
  if (hideNavBar === true) {
    return null;
  }
  return (
    <>
      <div style={fixed ? { position: 'absolute', top: 0, width: '100%' } : {}}>
        <NavBar
          mode={mode}
          icon={icon || defaultIcon}
          onLeftClick={defaultEvent}
          rightContent={rightContent}
        >
          {realTitle}
        </NavBar>
      </div>
      {fixed && <div style={{ height: '0.9rem' }}></div>}
    </>
  );
};
const AlitaLayout: FC<AlitaLayoutProps> = ({
  children,
  location: { pathname },
  tarBar = {},
  documentTitle,
  titleList = [],
  navBar = {},
}) => {
  const {
    list = [],
    color,
    selectedColor,
    backgroungColor = '#FFF',
    position,
  } = tarBar as TarBarProps;

  const { hasTabsBar, pageTitle } = checkTabsList(pathname, list);
  const titleListItem = checkTitleList(pathname, titleList);
  const realTitle = titleListItem || pageTitle || documentTitle || '';

  return (
    <DocumentTitle title={realTitle}>
      <div style={{ height: '100%' }}>
        {!hasTabsBar && (
          <>
            {headerRender({
              hasTabsBar,
              navBar,
              realTitle,
              pathname,
            })}
            {children}
          </>
        )}
        {hasTabsBar && (
          <TabBar
            tabBarPosition={position}
            unselectedTintColor={color}
            tintColor={selectedColor}
            barTintColor={backgroungColor}
          >
            {list.map(item => {
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
                      router.push(item.pagePath);
                    }
                  }}
                  key={item.pagePath}
                >
                  {headerRender({
                    hasTabsBar,
                    navBar,
                    realTitle,
                    pathname,
                  })}
                  {children}
                </TabBar.Item>
              );
            })}
          </TabBar>
        )}
      </div>
    </DocumentTitle>
  );
};

export default withRouter(AlitaLayout);
