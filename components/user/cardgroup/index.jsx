import React from 'react'

import styles from './cardgroup.module.css';

function CardGroup({children,title , layout1, layout2, layout3, onClick, ...passProps}) {
    const wrapperStyles = [
        styles.wrapper,
        layout1 && styles.layout1,
        layout2 && styles.layout2,
        layout3 && styles.layout3
    ].filter(Boolean).join(' ');

    const props = { onClick, ...passProps };


  return (
    <div className = {styles.cardgroup}>
        <div className={styles.header}>
            <h2 className = {title ? styles.title: ''}>
                {title}
            </h2>
        </div>
        <div className={wrapperStyles} {...props}>
            {children}
        </div>
    </div>
  )
}

export default CardGroup