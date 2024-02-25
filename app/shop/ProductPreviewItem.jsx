import React from 'react'
import styles from './shop.module.css'

function ProductPreviewItem() {
  return (
    <div className = {styles.product_preview_item}>
        <div className = {styles.product_preview_item_image}>
            <div className = {styles.image_preview}>
                <img src="https://www.tinduc.vn/media/product/1863_2020_09_24_150353.png"/>
            </div>
            <div className = {styles.image_list}></div>
        </div>
        <div className = {styles.info}>
            <h3 className = {styles.name}>Kính viễn đi kèm với bộ gá chuyển đổi điện thoại thông minh</h3>
            <p>Mã sản phẩm: <span>RP-100SP</span></p>
            <p>Phóng đại: <span>lên đến 78x</span></p>
            <p>Thị kính: <span>K20mm và K9mm</span></p>
            <p>Đường kính vật kính:  <span>76mm (2,99”)</span></p>
            <p>Tiêu cự: <span>76mm (2,99”)</span></p>
            <p>Kính ngắm: <span>10x30mm (lắp dựng)</span></p>
            <p>Cân nặng: <span>7,2 lb/ 3.27 kg</span></p>
            <p>Kích thước: <span>33,8 inch x 33,8 inch x 61,8 inch/ 85.85 cm x 85.85 cm x 156.97 cm</span></p>
        </div>
    </div>
  )
}

export default ProductPreviewItem