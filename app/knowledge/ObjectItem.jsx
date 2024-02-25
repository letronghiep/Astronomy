import React from 'react'

import styles from './knowledge.module.css'

function ObjectItem({value, onClick}) {

    function click() {
        onClick(value._id);
    }

  return (
    <div onClick = {click} className = {styles.object_item}>
        <div className = {styles.image}>
            <img src = {value.thumbnail}/>
        </div>
        <div className = {styles.info}>
            <h3>{value.title}</h3>
            <p>{value.description}</p>
            {value.parentName && 
            <div className = {`${styles.parents_name}`}>
                <div className = {`${styles.tag}`}>{value.parentName}</div>
            </div>}
            <div className = {styles.suggest_list}>
                <div className = {`${styles.suggest_item} ${styles.tag}`}>Sao thổ</div>
                <div className = {`${styles.suggest_item} ${styles.tag}`}>Sao thủy</div>
                <div className = {`${styles.suggest_item} ${styles.tag}`}>Trái đất</div>
                <div className = {`${styles.suggest_item} ${styles.tag}`}>Sao mộc</div>
            </div>
        </div>
    </div>
  )
}

export default ObjectItem