import React from 'react'

import styles from './article.module.css';

function Audio({slug}) {



  return (
    <div className={styles.audio}>
        <audio controls>
            <source src="https://file01.fpt.ai/text2speech-v5/short/2024-02-20/01b47d69cf721ce0860fe8484f195037.mp3" type="audio/mp3"/>
        </audio>
    </div>
  )
}

export default Audio