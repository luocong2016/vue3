
import { defineComponent, ref, reactive, computed, watchEffect, onMounted } from 'vue';
import { useRouter, RouterView, RouterLink } from 'vue-router';
import { UserOutlined } from '@ant-design/icons-vue';
import { Avatar } from 'ant-design-vue';
import ProLayout, {
  PageContainer,
  WaterMark,
  clearMenuItem, getMenuData,
  type RouteContextProps, type Route
} from '@ant-design-vue/pro-layout';

import 'ant-design-vue/dist/antd.less';
import '@ant-design-vue/pro-layout/dist/style.css';

export default defineComponent({
  name: 'BasicLayout',
  setup(props, { slots }) {
    const router = useRouter();
    const loading = ref(false);
    const watermarkContent = ref('Pro layout');
    const { menuData } = getMenuData(clearMenuItem(router.getRoutes()));
    const baseState = reactive<Omit<RouteContextProps, 'menuData'>>({
      selectedKeys: [],
      openKeys: [],
      collapsed: false
    });
    const breadcrumb = computed(() =>
      router
        .currentRoute
        .value.matched
        .concat()
        .map((item) => ({ path: item.path, breadcrumbName: item.meta.title || '' }))
    );
    const handleCollapsed = () => baseState.collapsed = !baseState.collapsed;

    watchEffect(() => {
      if (router.currentRoute) {
        const matched = router.currentRoute.value.matched.concat()
        baseState.selectedKeys = matched.filter((r) => r.name !== 'index').map((r) => r.path)
        baseState.openKeys = matched.filter((r) => r.path !== router.currentRoute.value.path).map((r) => r.path)
      }
    });

    function handlePageLoadingClick() {
      loading.value = true
      setTimeout(() => {
        loading.value = false
      }, 2000)
    }

    onMounted(() => {
      setTimeout(() => {
        watermarkContent.value = 'New Mark'
      }, 2000)
    });

    return () => <ProLayout
      v-models={
        [
          [baseState.collapsed, 'collapsed'],
          [baseState.selectedKeys, 'selectedKeys'],
          [baseState.openKeys, 'openKeys']
        ]
      }
      loading={loading.value}
      breadcrumb={{ routes: breadcrumb.value as Route[] }}
      iconfont-url="//at.alicdn.com/t/font_2804900_nzigh7z84gc.js"
      menuData={menuData}
      navTheme='dark'
      layout="side"
      splitMenus={true}
      fixSiderbar={true}
      fixedHeader={true}
      v-slots={{
        default: () => <RouterView
          v-slots={{
            default: ({ Component }: any) => <WaterMark content={watermarkContent.value} >
              <PageContainer>
                <Component />
              </PageContainer>
            </WaterMark>
          }}
        />,
        menuHeaderRender: () => <a>
          <img src="https://procomponents.ant.design/favicon.ico" />
          <h1>Pro Layout</h1>
        </a>,
        // collapsedButtonRender: (collapsed: boolean) => collapsed ? <HeartOutlined /> : <SmileOutlined />,
        rightContentRender: () => <div style="margin-right: 12px">
          <Avatar
            shape="square"
            size="small"
            v-slots={{
              icon: () => <UserOutlined />
            }}
          />
        </div>,
        breadcrumbRender: ({ route, params, routes }: { route: Route, params: any, routes: Route[] }) => {
          return routes.indexOf(route) === routes.length - 1
            ?
            <span> {route.breadcrumbName}</span>
            :
            <RouterLink to={{ path: route.path, params }}>{route.breadcrumbName}</RouterLink>
        },

        // menuFooterRender: () => <a
        //   href="https://preview.pro.antdv.com/dashboard/analysis"
        //   target="_blank"
        //   rel="noreferrer"
        //   style={{
        //     lineHeight: '48rpx',
        //     display: 'flex',
        //     height: '48px',
        //     alignItems: 'center',
        //   }}
        // >
        //   <img
        //     alt="pro-logo"
        //     src="https://procomponents.ant.design/favicon.ico"
        //     style={{
        //       width: '16px',
        //       height: '16px',
        //       margin: '0 16px',
        //       marginRight: '10px',
        //     }}
        //   />
        //   {!baseState.collapsed ? <span>Preview Pro</span> : null}
        // </a>
      }}
    />
  }
});
