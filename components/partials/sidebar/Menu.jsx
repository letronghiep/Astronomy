import React from 'react'

import styles from './sidebar.module.css'

import MenuItem from './MenuItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faHouse, faImage, faMagnifyingGlass, faShop, faVideo } from '@fortawesome/free-solid-svg-icons'

function Menu(props) {
  return (
    <div>
        <MenuItem isExtend = {props.isExtend} icon = {<FontAwesomeIcon icon = {faHouse}/>} title = "Trang chủ"/>
        <MenuItem isExtend = {props.isExtend} icon = {<FontAwesomeIcon icon = {faMagnifyingGlass}/>} title = "Tìm kiếm"/>
        
        <MenuItem isExtend = {props.isExtend} icon = {<FontAwesomeIcon icon = {faImage}/>} title = "Hình ảnh"/>
        <MenuItem isExtend = {props.isExtend} icon = {<FontAwesomeIcon icon = {faVideo}/>} title = "Video"/>
        <MenuItem isExtend = {props.isExtend} icon = {<FontAwesomeIcon icon = {faHeart}/>} title = "Yêu thích"/>
        <MenuItem isExtend = {props.isExtend} icon = {<FontAwesomeIcon icon = {faShop}/>} title = "Shop"/>
    </div>
  )
}

export default Menu