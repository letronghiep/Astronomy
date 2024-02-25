import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

import styles from './group.module.css'

function Search() {
  return (
    <div className = {styles.search}>
        <input placeholder = "Tìm kiếm..." type = "text"/>
        <FontAwesomeIcon className = {styles.search_icon} icon={faMagnifyingGlass} />
    </div>
  )
}

export default Search