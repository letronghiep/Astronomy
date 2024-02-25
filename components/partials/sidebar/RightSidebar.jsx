"use client";
import React from "react";
import Link from "next/link";
import { useState } from "react";


import styles from './sidebar.module.css'


import Control from './Control'

function RightSidebar() {
  const [tabActive, setTabActive] = useState('setting');

  function changeTab(newTab) {
    console.log(newTab)
    setTabActive(newTab);
  }

  return (
    <div className = {`${styles.sidebar} ${styles.rightsidebar}`}>
        <Control tabActive = {tabActive} onClick = {changeTab} />
    </div>
  );
}

export default RightSidebar;
