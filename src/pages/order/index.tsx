import { View, ScrollView} from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useEffect, useRef, useState } from 'react'
import './index.less'

const foodList = [
  { id: 0, name: '人气Top10', foods: [{ name: '商品1' }, { name: '商品2' }] },
  { id: 1, name: '无肉不欢', foods: [{ name: '商品3' }, { name: '商品4' }] },
  { id: 2, name: '甜品饮料', foods: [{ name: '商品5' }, { name: '商品6' }] },
  // ...更多分类
]
const Order = () => {
 // 状态管理
 const [leftActive, setLeftActive] = useState<number>(0) // 左侧当前激活项的索引
 const [rightId, setRightId] = useState<string>('right0') // 控制右侧滚动到的目标元素ID
 const heightArrRef = useRef<number[]>([0]) // 存储右侧各个分类区块的累计高度

 // 1. 初始化：获取右侧所有分类区块的高度并计算累计高度
 useEffect(() => {
   Taro.nextTick(() => { // 等待 DOM 渲染完成
     const query = Taro.createSelectorQuery()
     query.selectAll('.right-category').boundingClientRect() // 获取所有分类区块的尺寸和位置
     query.exec((res) => {
       if (res[0]) {
         const rects = res[0]
         const newHeights = [0] // 起始高度为0
         rects.forEach((item: { height: number }, index: string | number) => {
           // 计算每个区块底部的累计滚动高度
           newHeights.push(item.height + newHeights[index])
         })
         heightArrRef.current = newHeights // 存储到 ref 中
       }
     })
   })
 }, [])

 // 2. 左侧菜单点击处理函数
 const handleLeftClick = (index: number) => {
   setLeftActive(index)
   setRightId(`right${index}`) // 触发右侧 ScrollView 滚动到对应 id 的元素
 }

 // 3. 右侧滚动处理函数
 const handleRightScroll = (e: { detail: { scrollTop: any } }) => {
   const scrollTop = e.detail.scrollTop // 当前滚动条位置
   const heightArr = heightArrRef.current

   // 遍历高度数组，判断当前滚动位置落在哪个区间
   for (let i = 0; i < heightArr.length - 1; i++) {
     if (scrollTop >= heightArr[i] && scrollTop < heightArr[i + 1] - 5) { // -5 是微小偏移，避免临界点抖动
       if (leftActive !== i) {
         setLeftActive(i) // 更新左侧激活状态
       }
       break // 找到后退出循环
     }
   }
 }

 return (
   <View className='menu-container'>
     {/* 左侧菜单 */}
     <ScrollView scrollY className='left-menu'>
       {foodList.map((item, index) => (
         <View
           key={item.id}
           className={`left-item ${leftActive === index ? 'active' : ''}`}
           onClick={() => handleLeftClick(index)}
         >
           {item.name}
         </View>
       ))}
     </ScrollView>

     {/* 右侧内容 */}
     <ScrollView
       scrollY
       className='right-content'
       scrollIntoView={rightId} // 滚动到指定id的元素
       scrollWithAnimation // 滚动动画
       onScroll={handleRightScroll} // 滚动监听
     >
       {foodList.map((category, index) => (
         <View key={category.id} id={`right${index}`} className='right-category'>
           <View className='category-title'>{category.name}</View>
           {/* 渲染商品列表 */}
           {category.foods.map((food, idx) => (
             <View key={idx} className='food-item'>
               {/* 商品信息展示 */}
               {food.name}
             </View>
           ))}
         </View>
       ))}
     </ScrollView>
   </View>
 )
}
export default Order;