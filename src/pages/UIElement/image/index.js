/*
 * @Author: dexiaojiang 289608944@qq.com
 * @Description: In User Settings Edit
 * @Date: 2019-08-30 13:36:04
 * @LastEditTime: 2019-08-30 14:24:48
 * @LastEditors: dexiaojiang 289608944@qq.com
 */
import React from 'react'
import styles from './index.less'

const images = [
  'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564247684273&di=680f7de673a5f30ddc2a34a6cad068d8&imgtype=0&src=http%3A%2F%2Fimg5.mtime.cn%2FCMS%2FNews%2F2018%2F12%2F09%2F104505.32121136_620X620.jpg',
  'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=476337331,2304948989&fm=26&gp=0.jpg',
  'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564247718066&di=acfbce47a390a103e07d8d4e20f3a768&imgtype=0&src=http%3A%2F%2Fn.sinaimg.cn%2Fsinacn23%2F76%2Fw676h1000%2F20180610%2F0934-hcufqif5386458.jpg',
  'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3648955221,727328923&fm=26&gp=0.jpg',
]
const loading = 'loading' in HTMLImageElement.prototype
export default class ImagePage extends React.Component {
  observer = new IntersectionObserver(changes => {
    changes.forEach((element, index) => {
      // 当这个值大于 0，说明满足我们的加载条件了，这个值可通过 rootMargin 手动设置
      if (element.intersectionRatio > 0) {
        // 放弃监听，防止性能浪费，并加载图片。
        this.observer.unobserve(element.target)
        element.target.src = element.target.dataset.src
        console.log(`load img by ${index}`)
      }
    })
  })

  componentDidMount() {
    if (loading) {
      // 没毛病
    } else {
      this.initObserver()
    }
  }

  initObserver = () => {
    const listItems = document.querySelectorAll('.list-item-img')
    console.log('listItems', listItems)
    listItems.forEach(item => {
      // 对每个 list 元素进行监听
      this.observer.observe(item)
    })
  }

  render() {
    return (
      <ul>
        {images.map(img => {
          return (
            <li className={styles.listItem}>
              <img
                className="list-item-img"
                alt="loading"
                loading="lazy"
                data-src={loading ? '' : img}
                src={loading ? img : ''}
              />
            </li>
          )
        })}
      </ul>
    )
  }
}
