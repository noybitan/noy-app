'use client';
import React, { ReactNode } from 'react';
import styles from './titleAndParagraph.module.css';

interface TitleAndParagraphProps {
  title: string;
  // הטקסט של הפסקה
  children: ReactNode; 
}

const TitleAndParagraph: React.FC<TitleAndParagraphProps> = ({ 
    title, 
    children 
}) => {
  return (
    <div className={styles.container}>
      
      {/* הכותרת */}
      <h4 className={styles.header}>{title}</h4>
      
      {/* הפסקה (children) */}
      <div className={styles.content}>
        {children}
      </div>
      
    </div>
  );
};

export default TitleAndParagraph;