import cn from 'classnames'
import { useEffect, useState } from 'react'
import ss from './index.module.scss'
import Image from 'next/image'

import { check_webp_feature } from '@lib/checkwebp'

interface menuType {
  id: number
  region: string
  language: string
  imgUrl: string
  tips: string
}
const initMenuList: menuType[] = [
  {
    id: 0,
    region: 'cn',
    language: 'SC',
    imgUrl: `${process.env.NEXT_PUBLIC_IMG_URL}assets/img_en.webp`,
    tips: '请在移动设备的纵向显示模式下浏览此页',
  },
  {
    id: 1,
    region: 'hk|mo',
    language: 'HK',
    imgUrl: `${process.env.NEXT_PUBLIC_IMG_URL}assets/img_en.webp`,
    tips: '請在移動設備的縱向顯示模式下瀏覽此頁',
  },
  {
    id: 2,
    region: 'tw',
    language: 'TW',
    imgUrl: `${process.env.NEXT_PUBLIC_IMG_URL}assets/img_en.webp`,
    tips: '請在移動設備的縱向顯示模式下瀏覽此頁',
  },
  {
    id: 3,
    region: 'jp',
    language: 'JP',
    imgUrl: `${process.env.NEXT_PUBLIC_IMG_URL}assets/img_en.webp`,
    tips: 'モバイルでポートレートモードで表示してください',
  },
  {
    id: 4,
    region: 'sea|pacific',
    language: 'EN',
    imgUrl: `${process.env.NEXT_PUBLIC_IMG_URL}assets/img_en.webp`,
    tips: 'Please view in portrait mode in mobile',
  },
  {
    id: 5,
    region: 'kr',
    language: 'KR',
    imgUrl: `${process.env.NEXT_PUBLIC_IMG_URL}assets/img_en.webp`,
    tips: '모바일에서는 세로모드로 봐주세요',
  },
  {
    id: 5,
    region: 'th',
    language: 'TH',
    imgUrl: `${process.env.NEXT_PUBLIC_IMG_URL}assets/img_en.webp`,
    tips: 'โปรดดูในโหมดแนวตั้งในมือถือ',
  },
]
// default language set 'en'
const defaultMenuInfo: menuType = initMenuList[4]

export default function HomePage() {
  const [isMobileView, setIsMobileView] = useState<boolean>(true)
  const [menuList, setMenuList] = useState<menuType[]>(initMenuList)
  const [activeMenuIdx, setActiveMenuIdx] = useState<number>(-1)
  const [currentImg, setCurrentImg] = useState<string>('')
  const [currentLag, setCurrentLag] = useState<string>('')
  const [isOpenMenu, setOpenMenu] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [isSupprotWebp, setIsSptWebp] = useState<boolean>(false)
  const [tips, setTips] = useState<string>('')

  useEffect(() => {
    // if open on browser, hide the whole page.
    const isMobile: boolean = !!window.navigator.userAgent.match(
      /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    )
    setIsMobileView(isMobile)
    // get region from link, set img_en as default img.
    const { pathname } = window.location
    const lagItem = pathname
      ? initMenuList.filter((item) => {
          const regions = item.region.split('|')
          return regions.find((lg) => pathname.includes(lg))
        })[0]
      : false
    if (!isMobile) {
      setTips(lagItem ? lagItem.tips : defaultMenuInfo.tips)
    } else {
      setCurrentImg(lagItem ? lagItem.imgUrl : defaultMenuInfo.imgUrl)
      setCurrentLag(lagItem ? lagItem.language : defaultMenuInfo.language)
      setActiveMenuIdx(lagItem ? lagItem.id : defaultMenuInfo.id)
      // get webp support, refresh img type
      check_webp_feature('lossy', function (feature, isSupported) {
        setIsSptWebp(isSupported)
        if (!isSupported) {
          initMenuList.map((item) => {
            item.imgUrl = item.imgUrl.replace('.webp', '.jpg')
            return item
          })
          setMenuList([...initMenuList])
          const img = (
            lagItem ? lagItem.imgUrl : defaultMenuInfo.imgUrl
          ).replace('.webp', '.jpg')
          setCurrentImg(img)
        }
      })
    }
  }, [])

  const changeLag = (item: any, index: number): void => {
    setActiveMenuIdx(index)
    setOpenMenu(!isOpenMenu)
    setCurrentImg(item.imgUrl)
    setCurrentLag(item.language)
  }

  const hideMask = (): void => {
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
        <div
          className={cn(ss.container, loading && ss.mask)}
          // style={
          //   loading
          //     ? {
          //         backgroundImage: `url(${process.env.NEXT_PUBLIC_IMG_URL}assets/mask.jpg)`,
          //       }
          //     : {}
          // }
        >
          <div className={ss.menuWrapper}>
            <div
              onClick={() => setOpenMenu(!isOpenMenu)}
              className={cn(ss['menu-item'], ss.currentMenuItem)}
            >
              {currentLag}
            </div>
            <div className={cn(ss.menuWrap, isOpenMenu && ss.showMenu)}>
              <div className={ss.menuInfo}>
                {menuList.map((item: any, index: number) => (
                  <div
                    key={index}
                    className={cn(
                      ss['menu-item'],
                      index === activeMenuIdx && ss.active
                    )}
                    onClick={() => changeLag(item, index)}
                  >
                    {item.language}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <img
            loading="lazy"
            src={currentImg}
            alt="clarins"
            className={ss.img}
          />
          {/* {currentImg &&(
            <Image
              alt="clarins img"
              src={currentImg}
              layout="responsive"
              width={96}
              height={1200}
              loading="eager"
              quality={60}
              onLoadingComplete={hideMask}
            />
          )} */}
        </div>
      )}
    </>
  )
}
