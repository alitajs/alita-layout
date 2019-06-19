import React, { FC } from 'react';
import { TabBar } from 'antd-mobile';
import router from 'umi/router';
import withRouter from 'umi/withRouter';
import * as H from 'history';

export interface Match<Params extends { [K in keyof Params]?: string } = {}> {
  params: Params;
  isExact: boolean;
  path: string;
  url: string;
}

export interface TabBarListItem {
  pagePath: string;
  text: string;
  iconSize: string;
  badge?: string;
  iconPath: string;
  selectedIconPath: string;
  onPress?: () => {};
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
  tarBar: TarBarProps;
}
const AlitaLayout: FC<AlitaLayoutProps> = ({
  children,
  location: { pathname },
  tarBar = {},
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
    lists: TabBarListItem[],
  ): boolean => {
    const page = lists.filter(item => item.pagePath === pagePath);
    return page && page.length > 0;
  };
  const hasTabsBar = checkTabsList(pathname, list);
  return (
    <div style={{ height: '100%' }}>
      {!hasTabsBar && children}
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
                {children}
              </TabBar.Item>
            );
          })}
        </TabBar>
      )}
    </div>
  );
};

export default withRouter(AlitaLayout);
