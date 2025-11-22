'use client'; // נשתמש ב-Client Component כי נצטרך לנהל מצב (אם נוסיף אינטראקטיביות)
import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import { getArtData, getDepartmentName } from '../../lib/api';import { ArtObject } from '../../lib/types';
import ArtCard from './ArtCard';
// נתונים קבועים להפעלה
const DEPARTMENT_ID = '11'; // דוגמה: Department ID for European Paintings
const COUNT = 6; // מספר היצירות שנרצה להציג

const ArtPage: React.FC = () => {
    const [departmentName, setDepartmentName] = useState('Loading...');
    const [artData, setArtData] = useState<ArtObject[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchArt = async () => {
            try {
                setLoading(true);
                setError(null);
                
                // *** 1. שליפת שם המחלקה במקביל ***
                const namePromise = getDepartmentName(DEPARTMENT_ID);
                const artPromise = getArtData(DEPARTMENT_ID, COUNT);

                const [name, data] = await Promise.all([namePromise, artPromise]);
                
                setDepartmentName(name); // שמירת שם המחלקה
                // קורא לפונקציה שאותה נכתוב בהמשך
                
                // ודא שהנתונים הם מערך תקין
                if (Array.isArray(data)) {
                    setArtData(data);
                } else {
                    setError("Failed to fetch art data.");
                }
            } catch (err) {
                console.error(err);
                setError("An error occurred while loading art. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchArt();
    }, []);

    if (loading) {
        return <div className={styles.loading}>טוען יצירות אמנות...</div>;
    }

    if (error) {
        // הצגת הודעת שגיאה מועילה כנדרש במטלה
        return <div className={styles.error}>{error}</div>;
    }

    if (!artData || artData.length === 0) {
        return <div className={styles.noData}>לא נמצאו יצירות אמנות להצגה.</div>;
    }

    return (
        <div className={styles.container}>
            {/* זה יוחלף בכותרת המחלקה האמיתית שנקבל מה-API בהמשך */}
            <h1 className={styles.pageTitle}>Artworks from European Paintings</h1>
            <div className={styles.artGrid}>
                {artData.map((artItem) => (
                    // נציג רכיב עבור כל יצירה
                    <ArtCard key={artItem.objectID} art={artItem} /> 
                ))}
            </div>
        </div>
    );
};

export default ArtPage;