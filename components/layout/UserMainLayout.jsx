// layouts/LayoutA.js
import React from 'react';
import Header from '~/components/partials/header/index.jsx';
import Footer from '~/components/partials/footer/index.jsx';
import LeftSidebar from '~/components/partials/sidebar/LeftSidebar';
import RightSidebar from '~/components/partials/sidebar/RightSidebar.jsx';

import styles from './layout.module.css';

const UserMainLayout = ({ children }) => {
  return (
    <div className = {styles.main}>
      <Header />
      <main className={styles.main_content}>
        <div className={styles.container}>
          <LeftSidebar />
          <div>
              {children}
          </div>
          <RightSidebar />
        </div>
      </main>
      <Footer/>
    </div>
  );
};

export default UserMainLayout;
