<script lang="tsx">
// 添加水印

import { defineComponent, ref } from 'vue';
import { Button, Upload } from 'ant-design-vue';
import { UploadOutlined } from '@ant-design/icons-vue';

export default defineComponent({
  setup() {
    const fileList = ref([]);

    const transformFile = (file: any): Promise<any> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const canvas = document.createElement('canvas');
          const img: HTMLImageElement = document.createElement('img');
          img.src = reader.result as string;
          img.onload = () => {
            const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!;
            ctx.drawImage(img, 0, 0);
            ctx.fillStyle = 'red';
            ctx.textBaseline = 'middle';
            ctx.fillText('Ant Design', 20, 20);
            canvas.toBlob(resolve);
          };
        };
      });
    };

    return () => (
      <div>
        <Upload
          v-model={[fileList.value, 'file-list']}
          action="/upload"
          transformFile={transformFile}>
          <Button>
            <UploadOutlined />
            Upload
          </Button>
        </Upload>
      </div>
    );
  },
});
</script>
