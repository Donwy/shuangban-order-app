import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'

import "taro-ui/dist/style/components/button.scss" // 按需引入
import './index.less'

export default class Index extends Component<PropsWithChildren> {
  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className="p-4">
        <Text className="text-lg font-bold">欢迎来到点餐页</Text>
      </View>
    )
  }
}
