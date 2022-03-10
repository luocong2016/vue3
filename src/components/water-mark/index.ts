import { withInstall } from '@/utils';
import _WaterMark from './WaterMark';

export const WaterMark = withInstall(_WaterMark);
export default WaterMark;
export type { WaterMarkProps, fontStyleType, fontWidthType } from './WaterMark';

declare module 'vue' {
  export interface GlobalComponents {
    WaterMark: typeof WaterMark;
  }
}

