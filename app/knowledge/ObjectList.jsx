import React, { useEffect } from 'react'

import styles from './knowledge.module.css'
import ObjectItem from './ObjectItem'



function ObjectList({showtype, list, root, onClick}) {
    
    if(showtype === 3 && root) return <div>
            <h1>Show tree {root}</h1>
    </div>;
    else 
        return (
            <div className={`${styles.object} ${showtype === 1 ? styles.list : styles.grid}`}>
                {list.map((item, index) => <ObjectItem onClick = {onClick} key={index} value={item} />)}
            </div>
        )
}

export default ObjectList