import React, { useState } from 'react'

import ControlItem from './ControlItem'

import styles from './sidebar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear, faImage, faStreetView, faVideo } from '@fortawesome/free-solid-svg-icons'
import { faGratipay } from '@fortawesome/free-brands-svg-icons'

function Control({onClick, tabActive}) {

  const tabs = [
    {
      name: "Cài đặt",
      icon: <FontAwesomeIcon icon = {faGear}/>,
      slug: "setting"
    },
    {
      name: "Hình ảnh",
      icon: <FontAwesomeIcon icon = {faImage}/>,
      slug: "image"
    },
    {
      name: "Video",
      icon: <FontAwesomeIcon icon = {faVideo}/>,
      slug: "video"
    },
    {
      name: "Mẹo",
      icon: <FontAwesomeIcon icon = {faGratipay}/>,
      slug: "guide"
    },
    {
      name: "Đề xuất",
      icon: <FontAwesomeIcon icon = {faGear}/>,
      slug: "recomendations"
    },
    {
      name: "Xem thêm",
      icon: <FontAwesomeIcon icon = {faGear}/>,
      slug: "more"
    }
  ];

  return (
    <div className = {styles.control} tabActive = {tabActive}>
        {tabs.map((tab, i) => {
          return <ControlItem slug = {tab.slug} onClick = {onClick} key = {i} active = {tab.slug === tabActive ? 1 : 0} title = {tab.name} icon = {tab.icon} />
        })}
    </div>
  )
}

export default Control