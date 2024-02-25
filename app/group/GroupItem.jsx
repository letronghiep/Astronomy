import React from 'react'

import styles from './group.module.css'
import Button from '~/components/partials/button'

function GroupItem() {
  return (
    <div className = {styles.group_item}>
        <div className={styles.group_img}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Crab_Nebula.jpg/250px-Crab_Nebula.jpg" alt="a" />
        </div>
        <div className={styles.item_info}>
          <p className={styles.name}>Thiên Văn Học - Khoa Học - Suy Luận</p>
          <p className={styles.analysis}><span>Công khai - 10K thành viên - 100 posts</span></p>
          <p className={styles.description}>Đây là nơi mà các bạn có thể tận hưởng niềm đam mê Thiên Văn Học và giúp cho các bạn tìm hiểu thêm về lĩnh vực này. Cảm ơn vì bạn đã tham gia group này!</p>
        </div>
        <div className={styles.control}>
          <Button rounded small primary>
            Tham gia
          </Button>
        </div>
    </div>
  )
}

export default GroupItem