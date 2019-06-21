import React, { FC } from 'react';
import { TabBar, NavBar, Icon } from 'antd-mobile';
import router from 'umi/router';
import withRouter from 'umi/withRouter';
import * as H from 'history';
import DocumentTitle from 'react-document-title';

export interface NavBarProps extends React.HTMLProps<HTMLDivElement> {
  prefixCls?: string;
  className?: string;
  mode?: 'dark' | 'light';
  icon?: React.ReactNode;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  onLeftClick?: React.MouseEventHandler<HTMLDivElement>;
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
  hideNavBar?: boolean;
  titleList: TitleListItem[];
  navBar?: NavBarProps;
}
const headerRender = ({
  hideNavBar,
  navBar,
  hasTabsBar,
  realTitle,
}: {
  hideNavBar: boolean;
  hasTabsBar: boolean;
  navBar: NavBarProps;
  realTitle: string;
}): React.ReactNode => {
  if (hideNavBar === true) {
    return null;
  }

  const defaultIcon = hasTabsBar ? null : <Icon type="left" />;
  const { mode = 'light', icon, onLeftClick, rightContent } = navBar;
  const defaultEvent = onLeftClick || (!hasTabsBar ? router.goBack : () => {});
  return (
    <NavBar
      mode={mode}
      icon={icon || defaultIcon}
      onLeftClick={defaultEvent}
      rightContent={rightContent}
    >
      {realTitle}
    </NavBar>
  );
};
const AlitaLayout: FC<AlitaLayoutProps> = ({
  children,
  location: { pathname },
  tarBar = {},
  documentTitle,
  hideNavBar = false,
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
  const checkTabsList = (
    pagePath: string,
    lists: TabBarListItem[] | TitleListItem[] | any[],
  ): { hasTabsBar: boolean; pageTitle?: string } => {
    const page = lists.filter(
      (item: { pagePath: string }) => item.pagePath === pagePath,
    );
    return {
      hasTabsBar: page && page.length > 0,
      pageTitle: page[0] ? page[0].title || page[0].text : '',
    };
  };
  const { hasTabsBar, pageTitle } = checkTabsList(pathname, list);
  const titleListItem = checkTabsList(pathname, titleList);
  const realTitle = titleListItem.pageTitle || pageTitle || documentTitle || '';

  return (
    <DocumentTitle title={realTitle}>
      <div style={{ height: '100%' }}>
        {!hasTabsBar && (
          <>
            {headerRender({
              hideNavBar,
              hasTabsBar,
              navBar,
              realTitle,
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
                    hideNavBar,
                    hasTabsBar,
                    navBar,
                    realTitle,
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
