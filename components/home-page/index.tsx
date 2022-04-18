import cn from 'classnames'
import { useEffect, useLayoutEffect, useState, useRef } from 'react'
import ss from './index.module.scss'
import Image from 'next/image'

import { check_webp_feature } from '@lib/checkwebp'

interface menuType {
  region: string
  language: string
  imgUrl: string
  tips: string
}
const defaultImg: string = `${process.env.NEXT_PUBLIC_IMG_URL}assets/img_en.webp`
const defaultTips: string = 'Please view in portrait mode in mobile'
const initMenuList: menuType[] = [
  {
    region: 'China',
    language: 'cn',
    imgUrl: `${process.env.NEXT_PUBLIC_IMG_URL}assets/img_en.webp`,
    tips: '请在移动设备的纵向显示模式下浏览此页',
  },
  {
    region: 'HK',
    language: 'hk',
    imgUrl: `${process.env.NEXT_PUBLIC_IMG_URL}assets/img_en.webp`,
    tips: '請在移動設備的縱向顯示模式下瀏覽此頁',
  },
  {
    region: 'Macau',
    language: 'hk',
    imgUrl: `${process.env.NEXT_PUBLIC_IMG_URL}assets/img_en.jpg`,
    tips: '請在移動設備的縱向顯示模式下瀏覽此頁',
  },
  {
    region: 'Taiwan',
    language: 'tw',
    imgUrl: `${process.env.NEXT_PUBLIC_IMG_URL}assets/img_en.jpg`,
    tips: '請在移動設備的縱向顯示模式下瀏覽此頁',
  },
  {
    region: 'Japan',
    language: 'jp',
    imgUrl: `${process.env.NEXT_PUBLIC_IMG_URL}assets/img_en.jpg`,
    tips: 'モバイルでポートレートモードで表示してください',
  },
  {
    region: 'Pacific',
    language: 'en',
    imgUrl: `${process.env.NEXT_PUBLIC_IMG_URL}assets/img_en.jpg`,
    tips: 'Please view in portrait mode in mobile',
  },
  {
    region: 'SEA',
    language: 'en',
    imgUrl: `${process.env.NEXT_PUBLIC_IMG_URL}assets/img_en.jpg`,
    tips: 'Please view in portrait mode in mobile',
  },
  {
    region: 'Korea',
    language: 'kr',
    imgUrl: `${process.env.NEXT_PUBLIC_IMG_URL}assets/img_en.jpg`,
    tips: '모바일에서는 세로모드로 봐주세요',
  },
]

export default function HomePage() {
  const [isMobileView, setIsMobileView] = useState<boolean>(true)
  const [hideMenuMask, setHideMenuMask] = useState<boolean>(true)
  const [menuList, setMenuList] = useState<menuType[]>(initMenuList)
  const [isSptWebp, setIsSptWebp] = useState<boolean>(true)
  const [currentImg, setCurrentImg] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)
  const [active, setActive] = useState<number>(-1)
  const [tips, setTips] = useState<string>('')

  useEffect(() => {
    // if open on browser, hide the whole page.
    const isMobile: boolean = !!window.navigator.userAgent.match(
      /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    )
    setIsMobileView(isMobile)
    // get region from link, set img_en as default img.
    const { pathname } = window.location
    const lagItem = initMenuList.filter((item) =>
      pathname.includes(item.language)
    )[0]
    if (!isMobile) {
      setTips(lagItem ? lagItem.tips : defaultTips)
    } else {
      setCurrentImg(lagItem ? lagItem.imgUrl : defaultImg)
      // get webp support, refresh img type
      check_webp_feature('lossy', function (feature, isSupported) {
        setIsSptWebp(isSupported)
        if (!isSupported) {
          initMenuList.map((item) => {
            item.imgUrl = item.imgUrl.replace('.webp', '.jpg')
            return item
          })
          setMenuList([...initMenuList])
          const img = (lagItem ? lagItem.imgUrl : defaultImg).replace(
            '.webp',
            '.jpg'
          )
          setCurrentImg(img)
        }
      })
    }
  }, [])

  const changeLag = (item: any): void => {
    setCurrentImg(item.imgUrl)
  }

  const hideMask = () => {
    if (!loading) return
    setLoading(false)
  }

  return (
    <>
      {!isMobileView ? (
        <div className={ss.container}>
          <p className={ss.tips}>{tips}</p>
        </div>
      ) : (
        <div className={cn(ss.container, loading && ss.mask)}>
          <div className={ss.menu}>
            <div
              className={cn(
                !!hideMenuMask && ss.overlay,
                !hideMenuMask && ss.left
              )}
              onClick={() => setHideMenuMask(true)}
            ></div>
            <div className={ss.btn} onClick={() => setHideMenuMask(false)}>
              open
            </div>
            <div
              className={cn(ss['menu-body'], hideMenuMask && ss.hidden)}
              onClick={() => setHideMenuMask(true)}
            >
              <div className={ss['menu-box']}>
                {menuList.map((item: any, index: number) => (
                  <div
                    key={index}
                    className={cn(
                      ss['menu-item'],
                      index === active && ss.active
                    )}
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
          {isSptWebp ? (
            currentImg && (
              <Image
                alt="clarins img"
                src={currentImg}
                layout="responsive"
                width={96}
                height={1200}
                loading="eager"
                onLoadingComplete={hideMask}
              />
            )
          ) : (
            <img
              loading="lazy"
              src={currentImg}
              alt="clarins"
              className={ss.img}
            />
          )}
        </div>
      )}
    </>
  )
}
