import React from 'react'

import styles from './shop.module.css'

function ProductItem() {
  return (
    <div className = {styles.product_item}>
        <div className = {styles.image}>
            <img src="https://www.tinduc.vn/media/product/412_image.jpg"/>
        </div>
        <div className = {styles.info}>
            <h4 className={styles.name}>Kính viễn đi kèm với bộ gá chuyển đổi điện thoại thông minh</h4>
        </div>
    </div>
  )
}

export default ProductItem