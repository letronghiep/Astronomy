import React from 'react'

import styles from './knowledge.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

function Search() {
  return (
    <div className = {styles.search}>
        <div className = {styles.search_input}>
            <input type="text" />
            <FontAwesomeIcon className = {styles.search_icon} icon = {faMagnifyingGlass}/>
        </div>
        <div className = {styles.search_status}>Nhập từ khóa và tìm kiếm...</div>
    </div>
  )
}

export default Search