<script lang="tsx">
// 上传base64图片案例

import { defineComponent, ref } from 'vue';
import { Upload, message } from 'ant-design-vue';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';

export default defineComponent({
  setup() {
    const loading = ref<boolean>(false);
    const imageUrl = ref<string>('');

    const getBase64 = (img: Blob, callbck: (base64Url: string) => void) => {
      const reader = new FileReader();
      reader.addEventListener('load', () => callbck(reader.result as string));
      reader.readAsDataURL(img);
    };

    const beforeUpload = (file: any) => {
      loading.value = true;
      const isJpgOrPng = ['image/jpeg', 'image/png'].includes(file.type);
      if (!isJpgOrPng) {
        message.error('You can only upload JPG file!');
        loading.value = false;
        return false;
      }
      const isLt2M = file.size / 1024 / 1024 < 2; // 文件大小小于2M
      if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
        loading.value = false;
        return false;
      }
      getBase64(file, (base64Url: string) => {
        imageUrl.value = base64Url;
        loading.value = false;
      });
      return false;
    };

    return () => (
      <div>
        <Upload
          class="avatar-uploader"
          listType="picture-card"
          showUploadList={false}
          beforeUpload={beforeUpload}>
          {imageUrl.value ? (
            <img src={imageUrl.value} alt="avatar" />
          ) : (
            <div>
              {loading.value ? <LoadingOutlined /> : <PlusOutlined />}
              <div class="ant-upload-text">Upload</div>
            </div>
          )}
        </Upload>
      </div>
    );
  },
});
</script>

<style lang="less" scoped>
.avatar-uploader {
  img {
    width: 128px;
    height: 128px;
  }

  ::v-deep {
    .ant-upload {
      width: 128px;
      height: 128px;
    }

    .ant-upload-select-picture-card i {
      font-size: 32px;
      color: #999;
    }

    & > .ant-upload-select-picture-card .ant-upload-text {
      margin-top: 8px;
      color: #666;
    }
  }
}
</style>
