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
          <div className={styles.right_content}>
            <div className = {styles.top_right_content}>
                <div className = {styles.children}>
                  {children}
                </div>
                <RightSidebar/>
            </div>
            <Footer/>
            <div className={styles.margin}></div>
          </div>
        </div>
      </main>
      
    </div>
  );
};

export default UserMainLayout;
