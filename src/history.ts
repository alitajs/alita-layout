/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-explicit-any */
// umi@3 packages/preset-built-in/src/plugins/generateFiles/core/history.ts
import { createHashHistory, LocationState, History, Location } from 'history';

const options = { basename: '/' };
if ((window as any).routerBase) {
  options.basename = (window as any).routerBase;
}

const router = createHashHistory(options);
export { router, LocationState, History, Location };
