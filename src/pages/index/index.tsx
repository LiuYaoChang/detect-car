// import { Component, PropsWithChildren } from 'react'
import { View, Text, Button, Switch, CommonEventFunction, BaseEventOrig, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useEffect, useState } from 'react'
import './index.scss'

type ChooseMedia = Taro.chooseMedia.ChooseMedia;
type Option = Taro.chooseMedia.Option;
const Index: React.FC = () => {
  const [camera, setCamera] = useState<'back'|'front'>('back')
  const [checked, setChecked] = useState<boolean>(false)
  const [tempFilePath, setTempFilePath] = useState<string>('')
  const getImage = () => {
    const option: Option = {
      /** 最多可以选择的文件个数 */
      count: 1,
      /** 文件类型 */
      mediaType: ['image'],
      /** 图片和视频选择的来源 */
      sourceType: ['camera'],
      /** 仅对 mediaType 为 image 时有效，是否压缩所选文件 */
      // sizeType?: Array<'original' | 'compressed'>
      /** 仅在 sourceType 为 camera 时生效，使用前置或后置摄像头 */
      // 参数	说明back	使用后置摄像头front	使用前置摄像头
      camera: camera
    }
    Taro.chooseMedia(option).then((value: Taro.chooseMedia.SuccessCallbackResult) => {
      const tempFile: ChooseMedia = value.tempFiles[0];

      const tempPath = tempFile.tempFilePath;
      setTempFilePath(tempPath);
    })
  }

  useEffect(() => {
    setCamera(checked ? 'front' : 'back')
  }, [checked])
  const handleChange: CommonEventFunction = (event: BaseEventOrig) => {
    setChecked(event.detail.value)
  }
  return (
    <View className='index'>
      <Text>后置摄像头</Text>
      <Switch ariaLabel='前置摄像头' checked={checked} onChange={handleChange} controlled='true' />
      <Text>前置摄像头</Text>
      <Button className='btn-max-w' plain type='primary' onClick={getImage}>按钮</Button>
      <Text>Hello world!</Text>
      <Image
        mode='aspectFit'
        style='width: 300px; height: 300px;background: #fff;'
        src={tempFilePath}
      />
    </View>
  )
}

export default Index;
// export default class Index extends Component<PropsWithChildren> {

//   componentWillMount () { }

//   componentDidMount () { }

//   componentWillUnmount () { }

//   componentDidShow () { }

//   componentDidHide () { }

//   render () {
//     return (
//       <View className='index'>
//         <Text>Hello world!</Text>
//       </View>
//     )
//   }
// }
