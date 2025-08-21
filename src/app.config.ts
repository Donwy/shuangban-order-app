export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/order/index',
    'pages/orders/index',
    'pages/profile/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页'
      },
      {
        pagePath: 'pages/order/index',
        text: '点餐'
      },
      {
        pagePath: 'pages/orders/index',
        text: '订单'
      },
      {
        pagePath: 'pages/profile/index',
        text: '我的'
      }
    ],
    color: '#999',
    selectedColor: '#d81e06',
    backgroundColor: '#fff',
    borderStyle: 'black'
  }
})
