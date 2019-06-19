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

### tarBar 参数说明

| 属性 | 类型 | 必填 | 默认值 | 描述 |
| --- | --- | --- | --- | --- |
| color | HexColor | 是 | | tab 上的文字默认颜色，仅支持十六进制颜色 |
| selectedColor | HexColor | 是 | | tab 上的文字选中时的颜色，仅支持十六进制颜色 |
| backgroundColor | HexColor | 是 | | tab 的背景色，仅支持十六进制颜色 |
| list | Array  | 是 | | tab 的列表，详见 list 属性说明，最少 2 个、最多 5 个 tab |
| position | string | 否 | bottom | tabBar 的位置，仅支持 bottom / top |

### list 参数说明

|属性 |类型 |必填 |说明|
| --- | --- | --- | --- |
|pagePath |string |是 |页面路径，必须在 pages 中先定义|
|text |string |是 |tab 上按钮文字|
|iconPath |string |否 |图片路径，当 position 为 top 时，不显示 icon。|
|selectedIconPath |string |否 |选中时的图片路径，当 position 为 top 时，不显示 icon。|
