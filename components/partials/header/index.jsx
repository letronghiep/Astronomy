"use client";
import Link from "next/link";
import styles from "./header.module.css";
import React, { useEffect, useRef } from 'react';

import Logo from '~/components/partials/logo'

function Header() {
  const lastScrollTop = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      var currentScrollTop = window.scrollY || document.documentElement.scrollTop;

      if (currentScrollTop > lastScrollTop.current) {
        console.log('Cuộn xuống');
      } else {
        console.log('Cuộn lên');
      }

      lastScrollTop.current = currentScrollTop;
    };

    // Thêm sự kiện scroll khi component được tạo
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Hủy sự kiện khi component bị hủy
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Không cần lastScrollTop trong dependency

  return (
    <header className={styles.main_header}>
      <div className = {styles.margin}></div>
      <div className = {styles.headerNoti}>
        <div className={styles.container}>
          <div className={styles.weather}>
            <div className={styles.icon}>
            ☁
            </div>
            <div className={styles.info}>
              {/* <p>Nhiệt độ: 21<sup>o</sup>C</p> */}
              <p>Khả năng có mưa: 5%</p>
              {/* <p>Độ ẩm: 87%</p>
              <p>Gió: 5km/h</p> */}
            </div>
          </div>
          <div className={styles.datetime}>
            <p>Tu Hoàng, Phương Canh, Nam Từ Liêm, Hà Nội</p>
            {/* <p>Thứ Hai, 15 tháng 1, 2024</p> */}
          </div>
        </div>
      </div>
      <div className = {styles.headerMenu}>
        <div className={styles.container}>
          <Logo/>
          <div className={styles.user}>
            
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
