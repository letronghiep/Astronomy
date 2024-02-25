import React from 'react'

import styles from './sidebar.module.css'

function ControlItem({onClick,...props}) {

  function changeTab() {
    onClick(props.slug);
  }

  return (
    <div onClick = {changeTab} className={`${styles.control_item} ${props.active ? styles.active_control : null}`}>
        <div className={styles.control_item_icon}>
            {props.icon}
        </div>
        <div className={styles.control_item_text}>
            <p>{props.title}</p>
        </div>
    </div>
  )
}

export default ControlItem