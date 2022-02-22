<script lang="tsx">
import { defineComponent } from 'vue';
import { ConfigProvider } from 'ant-design-vue';

export default defineComponent({
  setup() {
    const popContainer = () => {
      return document.getElementById('popContainer') as HTMLElement;
    };

    return () => (
      <ConfigProvider getPopupContainer={popContainer}>
        <router-view />
      </ConfigProvider>
    );
  },
});
</script>
