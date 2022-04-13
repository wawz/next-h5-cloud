import cn from 'classnames'
import { useEffect, useState } from 'react'
import ss from './index.module.scss'
import Image from 'next/image'

const image2 =
  'https://bm-h5-cp.oss-cn-shanghai.aliyuncs.com/assets/game-card/card3.jpg'
const image3 =
  'https://bm-h5-cp.oss-cn-shanghai.aliyuncs.com/assets/game-card/card2.jpg'
const image1 =
  'https://qq-proj.oss-cn-beijing.aliyuncs.com/fn/h5_nex_test/1dc2cf24efd19d60d12972dac146960d.jpeg'
export default function HomePage() {
  const [lag, setLag] = useState<string>('')
  useEffect(() => {
    var language = window.navigator.language.toLowerCase()
    setLag(language)
  }, [])
  return (
    <div className={ss.container}>
      HomePage
      <div className={ss.lag}> language:{lag}</div>
      <Image
        src={image1}
        layout="responsive"
        width={3024}
        height={4032}
        priority
      />
      <img src={image1} style={{ width: '100%', height: 'auto' }} />
    </div>
  )
}
