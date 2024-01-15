"use client";
import React from "react";
import Link from "next/link";
import styles from "./footer.module.css";

function Footer() {
  return (
    <footer className={styles.main_footer}>
        <div className={styles.footer_content}></div>
      <div className={styles.margin}></div>
    </footer>
  );
}

export default Footer;
