/* 3.1 TypeScript 断言 */
// 尖括号语法
const someValue: any = `this is a string`;
const strLength: number = (<string>someValue).length;

// as语法
const strLen: number = (someValue as string).length;

console.log(someValue, strLength, strLen);

// 类型守卫
// in
interface Admin { name: string; privileges: string[]; }
interface Employee { name: string; startDate: Date; }

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
  console.log(`Name: ${emp.name}`);
  console.log('privileges' in emp ? `privileges: ${emp.privileges}` : `startDate: ${emp.startDate}`);
}
console.log('[in]');
printEmployeeInformation({ name: 'lutz', startDate: new Date() });

// typeof
function padLeft(value: string, padding: string | number) {
  if (typeof padding === 'number') {
    return Array(padding + 1).join(' ') + value;
  }
  if (typeof padding === 'string') {
    return padding + value;
  }
  throw new Error(`Expected string or number, got ${padding}.`);
}
console.log('[typeof]');
console.log(padLeft('lutz', 1));
console.log(padLeft('lutz', 'L'));

// instanceof
interface Padder {
  getPaddingString(): string;
}
class SpaceRepeatingPadder implements Padder {
  constructor(private numSpaces: number) { }
  getPaddingString(): string {
    return Array(this.numSpaces + 1).join(' ');
  }
}
class StringPadder implements Padder {
  constructor(private value: string) { }
  getPaddingString() {
    return this.value;
  }
}

const padder: Padder = new SpaceRepeatingPadder(6);
if (padder instanceof SpaceRepeatingPadder) {
  console.log(padder);
}
const strpadder: Padder = new StringPadder('lutz');
if (strpadder instanceof StringPadder) {
  console.log(strpadder);
}

// 自定义类型保护的类型谓词
const isNumber = (x: unknown): x is number => typeof x === 'number';
console.log('[is]');
console.log(isNumber(1));

const isString = (x: unknown): x is string => typeof x === 'string';
console.log(isString('1'));


