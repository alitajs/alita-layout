# alita-layout

[![Alita](https://img.shields.io/badge/alitajs-react%20component-blue.svg)](https://github.com/alitajs/alita-layout)
[![NPM version](https://img.shields.io/npm/v/alita-layout.svg?style=flat)](https://npmjs.org/package/alita-layout)
[![NPM downloads](http://img.shields.io/npm/dm/alita-layout.svg?style=flat)](https://npmjs.org/package/alita-layout)
[![Build Status](https://travis-ci.com/alitajs/alita-layout.svg?branch=master)](https://travis-ci.com/alitajs/alita-layout)
[![Coverage Status](https://coveralls.io/repos/github/alitajs/alita-layout/badge.svg?branch=master)](https://coveralls.io/github/alitajs/alita-layout?branch=master)
[![License](https://img.shields.io/npm/l/alita-layout.svg)](https://npmjs.org/package/alita-layout)

<h1 align="center">Alita Layout</h1>

<div align="center">

The generic h5 layout in umi uses antd-mobile.
</div>

> umi@2 和 alita@1 请使用1.x版本
> 2.x版本只支持umi@3和alita@2

## 使用

```bash
npm i @alitajs/alita-layout --save
// or
yarn add @alitajs/alita-layout
```

```jsx
import BasicLayout from '@alitajs/alita-layout';

render(<BasicLayout />, document.getElementById('root'));
```

## API

### 所有参数说明

| 属性 | 类型 | 必填 | 默认值 | 描述 |
| --- | --- | --- | --- | --- |
| tarBar | TarBarProps | 否 | 无 | 定义页面切换页信息，api参考微信小程序 |
| documentTitle | string | 否 | 无 | 定义项目的默认title |
| titleList | TitleListItem[] | 否 | 无 | 定义所有页面的title |
| navBar | NavBarProps | 否 | 无 | 定义头部导航信息 |

### tarBar 参数说明

| 属性 | 类型 | 必填 | 默认值 | 描述 |
| --- | --- | --- | --- | --- |
| color | HexColor | 是 | | tab 上的文字默认颜色，仅支持十六进制颜色 |
| selectedColor | HexColor | 是 | | tab 上的文字选中时的颜色，仅支持十六进制颜色 |
| backgroundColor | HexColor | 是 | | tab 的背景色，仅支持十六进制颜色 |
| list | Array  | 是 | | tab 的列表，详见 list 属性说明，最少 2 个、最多 5 个 tab |
| position | string | 否 | bottom | tabBar 的位置，仅支持 bottom / top |

### list 参数说明

| 属性 | 类型 | 必填 | 说明|
| --- | --- | --- | --- |
| pagePath | string | 是 | 页面路径，必须在 pages 中先定义|
| text | string | 是 | tab 上按钮文字|
| iconPath | string | 是 |图片路径，当 position 为 top 时，不显示 icon。|
| selectedIconPath | string | 是 |选中时的图片路径，当 position 为 top 时，不显示 icon。|
| iconSize | string | 否 |0.44rem|
| badge | string | 否 | badge |
| onPress | function | 否 | 点击事件 |
| title | string | 否 | 定义页面标题 |

> 关于页面标题，声明权重如下：
> titleList > list.title > list.text > documentTitle > ''

### navBar 参数说明

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| mode | 模式 | string | 'dark' enum{'dark', 'light'} |
| icon | 出现在最左边的图标占位符 | ReactNode | 不在tabsBar的页面，会有默认左侧回退图标 |
| leftContent | 导航左边内容 | any | 无 |
| rightContent | 导航右边内容 | any | 无 |
| onLeftClick | 导航左边点击回调 | (e: Object): void |有左侧回退图标的默认事件是返回上一页 |
| navList | 单独设置某些页面的navbar | NarBarListItem | 无 |
| hideNavBar | 隐藏NavBar，默认有NarBar | boolean | false |
| fixed | NavBar固定在页面头部 | boolean | false |
| pageBackground | 页面的背景颜色 | string | '#FFF' |
| pageTitle | 页面标题 | string | 无，优先级最高 |

### navList 参数说明

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| pathName | 路由名称 | string | 无 |
| navBar | 当前路由的navBar | NavBarProps | 无 |
