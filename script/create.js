'use strict';
/*
生成自定义组件文件及代码脚本
> node script/create [component-name]
*/

console.log();

process.on('exit', () => {
  console.log();
});

if (!process.argv[2]) {
  console.error('Please enter new component name.');
  process.exit(1);
}

const fs = require('fs');
const path = require('path');
const fileSave = require('file-save');

// a-b-c => ABC
const camelize = (str) => {
  const name = str.replace(/-(\w)/g, (_, c) => c.toUpperCase());
  return name.slice(0, 1).toUpperCase() + name.slice(1)
};
const smallHump = (str) => str.replace(/-(\w)/g, (_, c) => c.toUpperCase());

const componentName = process.argv[2];
const smallHumpComponentName = smallHump(componentName);
const camelCaseName = camelize(componentName);
const componentsPath = path.join(__dirname, '../src/components', componentName);

// 判断文件夹是否存在
if (fs.existsSync(componentsPath)) {
  console.error('Component already exists.');
  process.exit(1);
}

// 创建目标文件
const Files = [
  {
    filename: `${camelCaseName}.tsx`,
    content: `import {
      defineComponent,
      type PropType,
      type ExtractPropTypes,
} from 'vue';

import { truthProp, numericProp, makeStringProp, createNamespace } from '@/utils';

const ${smallHumpComponentName}Props = {

};

const [name, bem] = createNamespace('${componentName}');

export type ${camelCaseName}Props = ExtractPropTypes<typeof ${smallHumpComponentName}Props>;

export default defineComponent({
  name,

  props: ${smallHumpComponentName}Props,

  setup(props, { slots }) {
    return {}
  }
});
    `
  },
  {
    filename: 'index.less',
    content: `@import '~@/style/var.less';

body {

}

.@{prefixe}-${componentName} {

}
    `
  },
  {
    filename: 'index.ts',
    content: `import { withInstall } from '@/utils';
import _${camelCaseName} from './${camelCaseName}';

export const ${camelCaseName} = withInstall(_${camelCaseName});
export default ${camelCaseName};
export type { ${camelCaseName}Props } from './${camelCaseName}';

declare module 'vue' {
  export interface GlobalComponents {
    ${camelCaseName}: typeof ${camelCaseName};
  }
}
    `
  },
  {
    filename: 'README.md',
    content: `# ${camelCaseName}
    
### Install
全局使用

\`\`\`js
import { createApp } from 'vue';
import { ${camelCaseName} } from '@/components';

const app = createApp();
app.use(${camelCaseName});
\`\`\`

组件内使用

\`\`\`js
import { defineComponent } from 'vue';
import { ${camelCaseName} } from '@/components';

export default defineComponent({
  components: { ${camelCaseName} }
});
\`\`\`

## Usage
### 基础用法

## API
### Props
| 参数 | 说明 | 类型 | 默认值 | 版本 |
|---|---|---|---|---|

### Events
| 事件名 | 说明 | 回调 | 版本 |
|---|---|---|---|

### Slots
| 名称 | 说明 | 版本 |
|---|---|---|

### Type
\`\`\`ts
import type { ${camelCaseName}Props } from '@/components/${componentName}';
\`\`\`

## Theming
### CSS Variables
| 名称 | 默认值 | 描述 |
|---|---|---|
    `
  },
];

Files.forEach(
  file => {
    fileSave(path.join(componentsPath, file.filename))
      .write(file.content, 'utf8')
      .end('\n');
  }
);

const install = process.argv[3];
if (install && install === 'install') {
  const componentsIndex = path.join(__dirname, '../src/components/index.ts');
  const insert = `export * as ${camelCaseName} from './${componentName}'`;
  fs.appendFileSync(componentsIndex, insert);
}

console.log('DONE!');
