"use client";
import React from "react";
import Link from "next/link";
import styles from './header-control.module.css'

import Button from '~/components/partials/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faBell, faMessage } from "@fortawesome/free-solid-svg-icons";
import { faBuromobelexperte } from "@fortawesome/free-brands-svg-icons";

function HeaderControl() {
  return (
    <div className = {styles.sidebar}>
        <Button title = "Tin nhắn" className = {styles.btn_customize} rounded centerIcon={<FontAwesomeIcon icon={faMessage} />}></Button>
        <Button title = "Thông báo" className = {styles.btn_customize} rounded centerIcon={<FontAwesomeIcon icon={faBell} />}></Button>
        <Button title = "Menu" className = {styles.btn_customize} rounded centerIcon={<FontAwesomeIcon icon={faBuromobelexperte} />}></Button>
    </div>
  );
}

export default HeaderControl;
