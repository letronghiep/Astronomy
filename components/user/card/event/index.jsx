import React from 'react'

import styles from './event.module.css'

function EventCard({title}) {

  return (
    <div className = {styles.event}>
      {title}
    </div>
  )
}

export default EventCard