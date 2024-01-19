"use client";
import React from "react";
import Link from "next/link";
import styles from './header-menu.module.css'

function HeaderMenu() {
  return (
    <div className = {styles.sidebar}>
        <Link href="/">Nhóm</Link>
        <Link href="/">Cộng đồng</Link>
        <Link href="/">Sự kiện</Link>
        <Link href="/">Lịch</Link>
        <Link href="/">Bộ sưu tập</Link>
    </div>
  );
}

export default HeaderMenu;
