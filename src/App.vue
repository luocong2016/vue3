<script lang="tsx">
import { defineComponent } from "vue";
import { RouterView } from "vue-router";
import { ConfigProvider } from "ant-design-vue";

export default defineComponent({
  setup() {
    const popContainer = (triggerNode: HTMLElement): HTMLElement => {
      // if (dialogContext) {
      //   return dialogContext.getDialogWrap()
      // }
      console.log("getPopupContainer", triggerNode);
      return document.body;
    };

    return () => (
      <ConfigProvider getPopupContainer={popContainer}>
        <RouterView />
      </ConfigProvider>
    );
  },
});
</script>
