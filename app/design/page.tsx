import React from 'react';
import styles from './page.module.css'; 

const PageContainer: React.FC = () => {
  return (
    // המיכל הראשי
    <div className={styles.mainContentContainer}> 
      
      {/* ========================================
        *** 1. הלוגו ***
        ========================================
      */}
      <img 
        // הנתיב מתחיל בקו נטוי `/` כי הקובץ בתיקיית public
        src="/logo.png" 
        alt="iO Logo" 
        className={styles.logo} 
      />

      {/* ========================================
        *** 2. הכותרות ***
        ========================================
      */}
      <h1 className={styles.mainTitle}>תֵּיבַת אוֹצֵר</h1> 
      <h2 className={styles.subTitle}>ממשק פעולה דיגיטלי בין אוצרים, אמנים ומוזיאונים</h2>
      
        {/* ========================================
        *** הקו המפריד החדש! ***
        ========================================
      */}
      <div className={styles.headerDivider}></div> 
      
      {/* *** מקטע "רקע והצורך" יבוא כאן *** */}
      {/* (נשלים את הוספת המקטעים בהמשך) */}

    </div>
 );
};

export default PageContainer;