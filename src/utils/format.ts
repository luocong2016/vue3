import _ from 'lodash';
import { type CSSProperties } from 'vue';

const camelizeRE = /-(\w)/g;

export function addUnit(value?: string | number): string | undefined {
  if (!_.isNil(value)) {
    return _.isNumber(value) ? `${value}px` : String(value);
  }
  return undefined;
}

export function getSizeStyle(originSize?: string | number): CSSProperties | undefined {
  if (!_.isNil(originSize)) {
    const size = addUnit(originSize);
    return {
      width: size,
      height: size
    }
  }
}

export function getZIndexStyle(zIndex?: string | number) {
  const style: CSSProperties = {};
  if (zIndex !== undefined) {
    style.zIndex = +zIndex;
  }
  return style;
}

export const camelize = (str: string): string =>
  str.replace(camelizeRE, (_, c: string) => c.toUpperCase());

export const kebabCase = (str: string) =>
  str
    .replace(/(A-Z)/g, '-$1')
    .toLowerCase()
    .replace(/^-/, '');

function trimExtraChar(value: string, chart: string, regExp: RegExp) {
  const index = value.indexOf(chart);
  if (index == -1) {
    return value;
  }
  if (chart === '-' && index !== 0) {
    return value.slice(0, index);
  }
  return value.slice(0, index + 1) + value.slice(index).replace(regExp, '');
}

export function formatNumber(
  value: string,
  allowDot = true,
  allowMinus = true
) {
  if (allowDot) {
    value = trimExtraChar(value, '.', /\./g);
  } else {
    value = value.split('.')[0];
  }

  if (allowMinus) {
    value = trimExtraChar(value, '-', /-/g);
  } else {
    value = value.replace(/-/, '');
  }

  const regExp = allowDot ? /[^-0-9.]/g : /[^-0-9]/g;

  return value.replace(regExp, '');
}
