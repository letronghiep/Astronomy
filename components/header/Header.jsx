"use client";
import React from "react";
import Link from "next/link";
import styles from "./Header.module.css";
function Header() {
  return (
    <header className={styles.bg_header}>
      <Link href="/">Astronomy</Link>
    </header>
  );
}

export default Header;
