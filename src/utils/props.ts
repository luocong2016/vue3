import type { PropType } from 'vue';

export const unknownProp = null as unknown as PropType<unknown>;

export const numericProp = [Number, String];

/* Boolean */
export const truthProp = {
  type: Boolean,
  default: true as const,
};

/* Array */
export const makeArrayProp = <T>() => ({
  type: Array as PropType<T[]>,
  default: () => [],
});

/* Number */
export const makeNumberProp = <T>(defaultVal: T) => ({
  type: Number,
  default: defaultVal,
});

/* String */
export const makeStringProp = <T>(defaultVal: T) => ({
  type: String as unknown as PropType<T>,
  default: defaultVal,
});

/* String | Number */
export const makeNumericProp = <T>(defaultVal: T) => ({
  type: numericProp,
  default: defaultVal,
});

/* require: true */
export const makeRequiredProp = <T>(type: T) => ({
  type,
  require: true as const,
});

export const makeRequeiredDefaultProp = <T>(type: T, defaultVal: T | Function) => ({
  type,
  require: true as const,
  default: defaultVal
});