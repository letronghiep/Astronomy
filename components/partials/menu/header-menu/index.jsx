"use client";
import React from "react";
import Link from "next/link";
import styles from './header-menu.module.css'

function HeaderMenu() {
  return (
    <div className = {styles.menu}>
        <Link className = {styles.link} href="/knowledge">Khám phá</Link>
        <Link className = {styles.link} href="/group">Nhóm</Link>
        <Link className = {styles.link} href="/community">Cộng đồng</Link>
        <Link className = {styles.link} href="/event">Sự kiện</Link>
        <Link className = {styles.link} href="/schedule">Lịch</Link>
        <Link className = {styles.link} href="/collection">Bộ sưu tập</Link>
    </div>
  );
}

export default HeaderMenu;
