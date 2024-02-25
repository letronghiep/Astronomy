import React from 'react'

import styles from './knowledge.module.css'
import CategoryItem from './CategoryItem'

function Category({list = []}) {
  return (
    <div className = {styles.left}>
        {list.map((value, index) => <CategoryItem key = {index} value = {value}/>)}
    </div>
  )
}

export default Category