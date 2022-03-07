# onMountedOrActivated
生命周期`mouted`和`activated`触发方法

## Usage
### 基础用法
```ts
import { ref } from 'vue';
import { onMountedOrActivated } from '@/use';

export defualt {
  setup() {
    // `vue-router`切换至当前可见激活
    onMountedOrActivated(
      () => {
        console.log('activated');
      }
    );
  }
};
```

## API
### Types
```ts
function onMountedOrActivated(hook: () => any): void;
```
