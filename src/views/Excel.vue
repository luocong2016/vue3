<script lang="tsx">
// 客户端解析`excel`案例

import { defineComponent } from 'vue';
import { Button, Upload, message } from 'ant-design-vue';
import { UploadOutlined } from '@ant-design/icons-vue';
// https://www.npmjs.com/package/xlsx
import XLSX from 'xlsx';

export default defineComponent({
  setup() {
    const beforeUpload = (file: any) => {
      const fileEnd = file.name.substring(file.name.lastIndexOf('.'));
      const isExcel =
        ['.xls', '.xlsx'].includes(fileEnd) ||
        [
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'application/vnd.ms-excel',
        ].includes(file.type);
      if (!isExcel) {
        message.error(`${file.name} file upload failed.`);
        return false;
      }
      // https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader
      const fileReader = new FileReader();
      fileReader.onload = (ev: any) => {
        try {
          const data = ev.target.result;
          const workbook = XLSX.read(data, { type: 'binary' });
          const exlname = workbook.SheetNames[0];
          const exl = XLSX.utils.sheet_to_json(workbook.Sheets[exlname]);
          const header = getHeader(workbook); // 获取表头
          const excelData = exl.map((item: any) => {
            const obj: any = {};
            header.forEach((k) => {
              obj[k] = item[k] || null;
            });
            return obj;
          });
          console.log(excelData);
        } catch (e) {
          message.error(`${file.name} file upload failed.`);
          return false;
        }
      };
      fileReader.readAsBinaryString(file);
      return false;
    };

    // 获取excel第一行的内容获取表头
    const getHeader = (wb: any) => {
      const wbData = wb.Sheets[wb.SheetNames[0]];
      const reg = /^[A-Z]1$/; // 匹配第一行数据
      const arr = [];
      for (let key in wbData) {
        if (wbData[key] && reg.test(key)) {
          arr.push(wbData[key].w);
        }
      }
      return arr;
    };

    return () => (
      <div>
        <Upload showUploadList={false} beforeUpload={beforeUpload}>
          <Button>
            <UploadOutlined />
            Click to Upload
          </Button>
        </Upload>
      </div>
    );
  },
});
</script>
