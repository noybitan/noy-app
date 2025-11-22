import React from 'react';
import styles from './page.module.css';
import { ArtObject } from '../../lib/types'; // הנתיב לשורש הפרויקט

interface ArtCardProps {
    art: ArtObject;
}

const ArtCard: React.FC<ArtCardProps> = ({ art }) => {
    // השדות הנוספים שנדרשו במטלה: medium, objectDate, culture
    
    return (
        <div className={styles.card}>
            <div className={styles.imageWrapper}>
                {/* התמונה - ודא שיש primaryImageSmall */}
                {art.primaryImageSmall && (
                    <img 
                        src={art.primaryImageSmall} 
                        alt={art.title} 
                        className={styles.artImage}
                    />
                )}
            </div>
            
            <div className={styles.content}>
                <h2 className={styles.title}>{art.title}</h2>
                <p className={styles.artist}>
                    {/* *** תיקון "אמן" *** */}
                    <strong>Artist:</strong> {art.artistDisplayName || 'Unknown Artist'}
                </p>
                
                {/* מאפיינים נוספים כנדרש במטלה */}
                <ul className={styles.detailsList}>
                    {/* *** תיקון "תאריך יצירה" ו-"מדיום" *** */}
                    <li><strong>Date:</strong> {art.objectDate || 'Not Found'}</li>
                    <li><strong>Medium:</strong> {art.medium}</li>
                    {/* *** תיקון "תרבות" וה-"לא צויין" *** */}
                    <li><strong>Culture:</strong> {art.culture || 'Not Specified'}</li>
                </ul>
                
                <p className={styles.explanation}>
                    {/* ניתן להוסיף הסבר קצר אם קיים שדה explanation ב-API */}
                </p>
            </div>
        </div>
    );
};

export default ArtCard;