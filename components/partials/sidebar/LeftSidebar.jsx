import React, { useState } from "react";
import Link from "next/link";

import styles from './sidebar.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

import Menu from './Menu'

function LeftSidebar() {
  const [isExtend, setIsExtend] = useState(false);

  const handleExtendSidebar = () => {
    setIsExtend(!isExtend);
  };

  return (
    <div className={`${styles.sidebar} ${styles.leftsidebar} ${isExtend ? styles.extend : ''}`}>
      <button className={styles.extendBtn} onClick={handleExtendSidebar}>
        {isExtend ? <FontAwesomeIcon icon={faChevronLeft}/> : <FontAwesomeIcon icon={faChevronRight}/>}
      </button>
      <Menu isExtend = {isExtend}/>
    </div>
  );
}

export default LeftSidebar;