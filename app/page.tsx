'use client'; 

import Link from 'next/link';
import React from 'react';
// *** ייבוא קובץ CSS Modules חדש לדף הבית ***
import styles from './home.module.css';

const HomePage: React.FC = () => {
  return (
    <div className={styles.homeContainer}> {/* שימוש בקלאס במקום ב-Inline Style */}
      <h1>Jem Course</h1>
      <p className={styles.homeDescription}>
        כאן תמצאו קישורים לכל חלקי הפרויקט כפי שנדרש במטלה
      </p>

      <ul className={styles.linkList}>
        
        {/* קישור לחלק 1 */}
        <li className={styles.listItem}>
          <Link href="/tic-tac-toe" className={styles.linkButton}>
            Tic Tac Toe
          </Link>
        </li>

        {/* קישור לחלק 2 */}
        <li className={styles.listItem}>
          <Link href="/art" className={styles.linkButton}>
          Artworks from European Paintings
          </Link>
        </li>
        
        {/* קישור לחלק 3 (העבודה שלנו!) */}
        <li className={styles.listItem}>
          <Link href="/design" className={styles.linkButton}>
            From Figma to Code 
          </Link>
        </li>
        
      </ul>
      
    </div>
  );
};

export default HomePage;