'use client';

import React, { ReactNode } from 'react';
import styles from './sectionBlock.module.css'; 

// הגדרת המאפיינים (Props) שהרכיב יקבל
interface SectionBlockProps {
  title: string;
  // *** המאפיין החדש: הנתיב לתמונה (מחרוזת) ***
  imageSrc: string; 
  
  // מיקום הקו הצדדי המעוצב: 'right' (ברירת מחדל) או 'left'
  dividerPosition?: 'right' | 'left';
  // התוכן הראשי (פסקאות טקסט) יגיע כילדים (children) של הרכיב
  children: ReactNode; 
}

const SectionBlock: React.FC<SectionBlockProps> = ({ 
    title, 
    imageSrc, // *** יש לשלוף את המאפיין החדש ***
    dividerPosition = 'right', 
    children 
}) => {
    
  // נשאר אותו קלאס לצורך היישור ימין/שמאל
  const sectionClass = dividerPosition === 'left' 
    ? styles.sectionBlockLeft 
    : styles.sectionBlockRight;

    return (
        <div className={sectionClass}>
        
            <div className={styles.headerRow}>
                {/* *** השינוי הקריטי: משתמשים במשתנה imageSrc במקום בנתיב קבוע! *** */}
                <img 
                    src={imageSrc} 
                    alt="Decorative element" 
                    className={styles.redDesignLine} 
                /> 
                
                <h3 className={styles.sectionHeader}>{title}</h3>
            </div>
            <div className={styles.sectionBody}> 
                {children} 
            </div>
    </div>
  );
};
export default SectionBlock;