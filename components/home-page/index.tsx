import cn from 'classnames'
import { useEffect, useState } from 'react'
import ss from './index.module.scss'
import Image from 'next/image'

import { check_webp_feature } from '../../lib/checkwebp'

const image1 = `${process.env.NEXT_PUBLIC_IMG_URL}assets/img_en.jpg`
const image2 = `${process.env.NEXT_PUBLIC_IMG_URL}assets/img_en.jpg`
const image3 = `${process.env.NEXT_PUBLIC_IMG_URL}assets/img_en.webp`

const lagTypes = ['cn', 'hk', 'mo', 'tw', 'ja', 'en', 'kr']
const imagesData: any = {
  cn: image1,
  hk: image1,
  mo: image1,
  tw: image2,
  ja: image3,
  en: image1,
  kr: image1,
}
const lagData: any = [
  {
    region: 'China',
    language: 'cn',
    imgUrl: image1,
  },
  {
    region: 'HK',
    language: 'hk',
    imgUrl: image1,
  },
  {
    region: 'Macau',
    language: 'mo',
    imgUrl: image1,
  },
  {
    region: 'Taiwan',
    language: 'tw',
    imgUrl: image2,
  },
  {
    region: 'Japan',
    language: 'ja',
    imgUrl: image3,
  },
  {
    region: 'Pacific',
    language: 'en',
    imgUrl: image1,
  },
  {
    region: 'SEA',
    language: 'en',
    imgUrl: image1,
  },
  {
    region: 'Korea',
    language: 'kr',
    imgUrl: image1,
  },
]

export default function HomePage() {
  const [hide, setHide] = useState<boolean>(true)
  const [lag, setLag] = useState<string>('')
  const [imgSrc, setImgSrc] = useState<string>('')
  const [active, setActive] = useState<number>(-1)
  const [isSptWebp, setIsSptWebp] = useState<boolean>(true)

  useEffect(() => {
    var language = (window.navigator.language || 'en').toLowerCase()
    check_webp_feature('lossy', function (feature, isSupported) {
      console.log(isSupported, 'issupported')
      setIsSptWebp(isSupported)
      judgeLag(language)
    })
  }, [])

  const judgeLag = (language: string): void => {
    console.log(language, lagTypes.includes(language))
    for (let i in lagTypes) {
      const item = lagTypes[i]
      console.log(i)
      if (language.includes(item)) {
        console.log(item, imagesData[item], language)
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

  const changeLag = (item: any) => {
    judgeLag(item.language)
  }
  return (
    <div className={ss.container}>
      <div className={ss.menu}>
        <div className={cn(!!hide && ss.overlay, !hide && ss.left)}></div>
        <div className={ss.btn} onClick={() => setHide(false)}>
          open
        </div>
        <div
          className={cn(ss['menu-body'], hide && ss.hidden)}
          onClick={() => setHide(true)}
        >
          <div className={ss['menu-box']}>
            {lagData.map((item: any, index: number) => (
              <div
                key={index}
                className={cn(ss['menu-item'], index === active && ss.active)}
                onClick={() => changeLag(item)}
              >
                <a className={ss['item-link']} href="#">
                  {item.region}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      <img src={imgSrc} style={{ width: '100%', height: 'auto' }} />
    </div>
  )
}
