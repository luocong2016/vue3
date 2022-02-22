<script lang="tsx">
// 上传base64图片案例

import { defineComponent, ref } from 'vue';
import { Upload, message } from 'ant-design-vue';
import { PlusOutlined, LoadingOutlined, DeleteOutlined } from '@ant-design/icons-vue';

export default defineComponent({
  props: {
    modelValue: String,
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const loading = ref<boolean>(false);
    const getBase64 = (img: Blob, callbck: (base64Url: string) => void) => {
      const reader = new FileReader();
      reader.addEventListener('load', () => callbck(reader.result as string));
      reader.readAsDataURL(img);
    };
    const handleDelete = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      emit('update:modelValue', '');
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
        emit('update:modelValue', base64Url);
        loading.value = false;
      });
      return false;
    };

    return () => (
      <div>
        <Upload
          class="avatar-uploader"
          accept=".jpg,.jpeg,.png,.bmp"
          listType="picture-card"
          showUploadList={false}
          beforeUpload={beforeUpload}>
          {props.modelValue ? (
            <div class="avatar">
              <img src={props.modelValue} alt="avatar" />
              <div class="mask">
                <DeleteOutlined onClick={handleDelete} />
              </div>
            </div>
          ) : (
            <div class="trigger">
              {loading.value ? <LoadingOutlined /> : <PlusOutlined />}
              <div class="trigger--text">上传图片</div>
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
  .avatar {
    position: relative;
    width: 100%;
    height: 100%;

    &:hover {
      .mask {
        display: block;
      }
    }

    img {
      width: 100%;
      height: 100%;
    }

    .mask {
      position: absolute;
      top: 0;
      display: none;
      width: 100%;
      height: 100%;
      color: #fff;
      font-size: 24px;
      line-height: 104px;
      background: rgba(0, 0, 0, 0.65);
    }
  }

  .trigger {
    color: #999;
    font-size: 32px;

    &--text {
      font-size: 16px;
    }
  }

  ::v-deep {
    .ant-upload {
      width: 128px;
      height: 128px;
    }

    & > .ant-upload-select-picture-card .ant-upload-text {
      margin-top: 8px;
      color: #666;
    }
  }
}
</style>
