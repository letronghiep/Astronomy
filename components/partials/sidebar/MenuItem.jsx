import Link from 'next/link'
import React from 'react'

import styles from './sidebar.module.css'

function MenuItem(props) {
  return (
    <div className = {styles.menu_item}>
        <div className={styles.icon}>
            {props.icon}
        </div>
        {props.isExtend ? <p className={styles.title}>{props.title}</p> : ''}
    </div>
  )
}

export default MenuItem