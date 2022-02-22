<script lang="tsx">
import { defineComponent, ref, reactive, toRaw } from 'vue';
import { Spin, Form, Input, Button } from 'ant-design-vue';
import { login, userInfo } from '@/api/user';
import UploadBase64 from '@/components/UploadBase64.vue';
import { phone, IDCard, zipCode } from '@/utils/validator';

const { useForm, Item: FormItem } = Form;

export default defineComponent({
  setup() {
    const labelCol = { span: 6 };
    const wrapperCol = { span: 8 };
    const spinning = ref(true);
    const modelRef = reactive({
      IDCard: '',
      account: '',
      address: '',
      avatar: '',
      id: '',
      mobile: '',
      name: '',
      zip: '',
    });
    const rulesRef = reactive({
      IDCard: [
        { required: true, message: '请输入身份证号码' },
        { pattern: IDCard, message: '请输入正确的身份证号码', trigger: 'blur' },
      ],
      account: [
        { required: true, message: '请输入帐号' },
        { min: 2, max: 16, message: '请输入正确帐号(2-16字节)', trigger: 'blur' },
      ],
      mobile: [
        { required: true, message: '请输入手机号码' },
        { pattern: phone, message: '请输入正确的手机号码', trigger: 'blur' },
      ],
      name: [
        { required: true, message: '请输入姓名' },
        { min: 2, max: 10, message: '请输入正确姓名(2-10字节)', trigger: 'blur' },
      ],
      zip: [
        { required: true, message: '请输入邮政编码' },
        { pattern: zipCode, message: '请输入正确邮政编码', trigger: 'blur' },
      ],
      avatar: [{ required: true, message: '请上传图片' }],
    });
    const { resetFields, validate, validateInfos } = useForm(modelRef, rulesRef);

    const onSubmit = (e: Event) => {
      e.preventDefault();

      spinning.value = true;

      validate()
        .then(() => {
          console.log(toRaw(modelRef));
        })
        .finally(() => {
          spinning.value = false;
        });
    };

    login({ account: 'admin', password: '888888' }).then(({ token }: any) => {
      userInfo({ token }).then((res: any) => {
        // Object.keys(toRaw(modelRef)).forEach((key) => {
        //   modelRef[key] = res[key];
        // });
        modelRef.account = res.account;
        modelRef.address = res.address;
        modelRef.avatar = res.avatar;
        modelRef.mobile = res.mobile;
        modelRef.IDCard = res.IDCard;
        modelRef.name = res.name;
        modelRef.zip = res.zip;
        modelRef.id = res.id;

        spinning.value = false;
      });
    });

    return () => (
      <Spin spinning={spinning.value}>
        <Form label-col={labelCol} wrapper-col={wrapperCol}>
          <FormItem label="IDCard" name="IDCard" {...validateInfos.IDCard}>
            <Input v-model={[modelRef.IDCard, 'value']} allowClear size="small" />
          </FormItem>
          <FormItem label="account" name="account" {...validateInfos.account}>
            <Input v-model={[modelRef.account, 'value']} allowClear size="small" />
          </FormItem>
          <FormItem label="name" name="name" {...validateInfos.name}>
            <Input v-model={[modelRef.name, 'value']} allowClear size="small" />
          </FormItem>
          <FormItem label="mobile" name="mobile" {...validateInfos.mobile}>
            <Input v-model={[modelRef.mobile, 'value']} allowClear size="small" />
          </FormItem>
          <FormItem label="zip" name="zip" {...validateInfos.zip}>
            <Input v-model={[modelRef.zip, 'value']} allowClear size="small" />
          </FormItem>
          <FormItem label="avatar" name="avatar" {...validateInfos.avatar}>
            <UploadBase64 v-model={[modelRef.avatar]} />
          </FormItem>
          <FormItem wrapper-col={{ span: 8, offset: 8 }}>
            <Button type="primary" onClick={onSubmit}>
              Create
            </Button>
            <Button style="margin-left: 15px;" onClick={resetFields}>
              Reset
            </Button>
          </FormItem>
        </Form>
      </Spin>
    );
  },
});
</script>
