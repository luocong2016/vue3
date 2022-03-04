module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    '@vue/babel-plugin-jsx',
    [
      'import',
      {
        libraryName: 'ant-design-vue',
        libraryDirectory: 'es',
        style: true,
      },
      'ant-design-vue'
    ],
    [
      'import',
      {
        libraryName: '@/components',
        libraryDirectory: '',
        style: (name) => `${name}/index.less`
      },
      '@/components'
    ]
  ],
};
