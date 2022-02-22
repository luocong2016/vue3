<script lang="tsx">
import { defineComponent, ref } from 'vue';
import { Table } from 'ant-design-vue';

export default defineComponent({
  setup() {
    const dataSource = ref<DataSource[]>([
      {
        key: '1',
        name: '胡彦斌',
        age: 32,
        address: '西湖区湖底公园1号',
      },
      {
        key: '2',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号',
      },
    ]);
    const columns = ref([
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: '住址',
        dataIndex: 'address',
        key: 'address',
      },
    ]);

    return () => (
      <div>
        <Table dataSource={dataSource.value} columns={columns} />
      </div>
    );
  },
});
</script>
