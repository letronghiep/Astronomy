import React from 'react'
import styles from './knowledge.module.css'

function CategoryItem({value}) {
  return (
    <div className = {styles.cate_item}>
        <div className = {styles.cate_image}>
            <img src = {value.thumbnail} alt="ayz"/>
        </div>
        <div className = {styles.info}>
            <h4 className = {styles.cate_name}>{value.title}</h4>
            <p>{value.description}</p>
        </div>
    </div>
  )
}

export default CategoryItem