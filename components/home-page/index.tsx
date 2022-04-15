import cn from 'classnames'
import { useEffect, useLayoutEffect, useState } from 'react'
import ss from './index.module.scss'
import Image from 'next/image'

import { check_webp_feature } from '@lib/checkwebp'

const image1 = `${process.env.NEXT_PUBLIC_IMG_URL}assets/img_en.jpg`
const image2 = `${process.env.NEXT_PUBLIC_IMG_URL}assets/img_en.jpg`
const image3 = `${process.env.NEXT_PUBLIC_IMG_URL}assets/img_en.webp`

const lagTypes = ['cn', 'hk', 'mo', 'tw', 'ja', 'en', 'kr']
const imagesData: any = {
  cn: image3,
  hk: image1,
  mo: image1,
  tw: image2,
  ja: image3,
  en: image1,
  kr: image1,
}

export default function HomePage() {
  const [hide, setHide] = useState<boolean>(true)
  const [lag, setLag] = useState<string>('')
  const [imgSrc, setImgSrc] = useState<string>('')
  const [active, setActive] = useState<number>(-1)
  const [isSptWebp, setIsSptWebp] = useState<boolean>(true)

  useEffect(() => {
    var language = (window.navigator.language || 'en').toLowerCase()
    check_webp_feature('lossy', function (feature, isSupported) {
      console.log(isSupported, 'supported webp')
      setIsSptWebp(isSupported)
      judgeLag(language)
    })
  }, [])

  const judgeLag = (language: string): void => {
    console.log(language, lagTypes.includes(language))
    for (let i in lagTypes) {
      const item = lagTypes[i]
      if (language.includes(item)) {
        setImgSrc(imagesData[item])
        setActive(Number(i))
        setLag(language)
        return
      }
    }
    setImgSrc(imagesData['en'])
    setActive(-1)
    setLag('en')
  }

  return (
    <div className={ss.container}>
      <div className={ss.menu}></div>
      <img src={imgSrc} alt="" style={{ width: '100vw', height: 'auto' }} />
    </div>
  )
}
