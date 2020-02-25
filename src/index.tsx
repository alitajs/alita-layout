import React, { FC } from 'react';
import { TabBar, NavBar, Icon } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import { router, LocationState, History, Location } from './history';

const ONE_REM =
  parseInt(document.documentElement.style.fontSize || '100', 10) || 100;
const SCALE = ONE_REM / 100;
/**
 * 像素转换
 * @param {Number} px - 750视觉稿像素
 * @return {Number} 屏幕上实际像素
 */
const px2hd = (px: number): number => Number((px * SCALE).toFixed(1));

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
  background?: string;
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
  S = LocationState
> {
  history: History;
  location: Location<S>;
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
  realNavBar,
  hasTabsBar,
  realTitle,
}: {
  hasTabsBar: boolean;
  realNavBar: NavBarProps;
  realTitle: string;
}): React.ReactNode => {
  const defaultIcon = hasTabsBar ? null : <Icon type="left" />;
  const { fixed } = realNavBar;
  const {
    mode,
    icon,
    onLeftClick,
    rightContent,
    leftContent,
    hideNavBar,
    className,
  } = realNavBar;
  const defaultEvent = onLeftClick || (!hasTabsBar ? router.goBack : () => {});
  if (hideNavBar === true) {
    return null;
  }
  return (
    <>
      <div
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
  const { navList } = navBar;
  let pageNavBar = null;
  if (navList) {
    pageNavBar = checkNavBarList(pathname, navList);
  }
  const realNavBar = {
    ...navBar,
    ...pageNavBar,
  };
  const { background } = realNavBar;
  const { hasTabsBar, pageTitle } = checkTabsList(pathname, list);
  const isTabsApp = list.length > 0;
  const titleListItem = checkTitleList(pathname, titleList);
  const realTitle = titleListItem || pageTitle || documentTitle || '';

  return (
    <DocumentTitle title={realTitle}>
      <div style={{ height: '100vh', background: background || '#FFF' }}>
        {!hasTabsBar && (
          <>
            {headerRender({
              hasTabsBar,
              realNavBar,
              realTitle,
            })}
            {children}
          </>
        )}
        {isTabsApp && hasTabsBar && (
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
                  <div
                    style={{
                      height:
                        document.documentElement.clientHeight - px2hd(100),
                      maxHeight:
                        document.documentElement.clientHeight - px2hd(100),
                      overflow: 'auto',
                    }}
                  >
                    {headerRender({
                      hasTabsBar,
                      realNavBar,
                      realTitle,
                    })}
                    {children}
                  </div>
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
