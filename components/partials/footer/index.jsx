"use client";
import React from "react";
import Link from "next/link";
import styles from "./footer.module.css";

import Logo from "~/components/partials/logo"

function Footer() {
  return (
    <footer className={styles.main_footer}>
      <div className={styles.footer_content}>
        <div className = {styles.intro}>
          <div className = {styles.logo}><Logo/></div>
          <p>
            Khám phá vũ trụ mỗi ngày - Trải nghiệm tuyệt vời thông qua trang web tra cứu thiên văn của chúng tôi!
          </p>
        </div>
        <div>
          <h3>THÀNH VIÊN</h3>
        </div>
        <div>
          <h3>NGHIÊN CỨU</h3>
        </div>
      </div>
      <div className={styles.margin}></div>
    </footer>
  );
}

export default Footer;
