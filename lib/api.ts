import { ArtObject, ObjectIDsResponse } from './types';

const API_KEY = process.env.NASA_API_KEY; // נאס"א משתמשת ב-NASA_API_KEY, אבל Met לא דורש מפתח אם קוראים לו בצורה מוגבלת, נשתמש בו לצורך תאימות למטלה.
const BASE_URL = 'https://collectionapi.metmuseum.org/public/collection/v1';

// פונקציה אסינכרונית שתמשוך את נתוני האמנות
export async function getArtData(departmentId: string, count: number): Promise<ArtObject[] | string> {
    if (!departmentId || !count) {
        return "Department ID and count are required.";
    }

    try {
        // === שלב 1: קבלת כל ה-Object IDs במחלקה ===
        const listUrl = `${BASE_URL}/objects?departmentIds=${departmentId}`;
        const listResponse = await fetch(listUrl);
        
        if (!listResponse.ok) {
            return `HTTP Error: Could not fetch object list for department ${departmentId}`;
        }
        
        const data: ObjectIDsResponse = await listResponse.json();
        const objectIDs = data.objectIDs;

        if (!objectIDs || objectIDs.length === 0) {
            return "No objects found in this department.";
        }

        // === בחירה אקראית של ID-ים ===
        const randomIDs = [];
        for (let i = 0; i < count; i++) {
            const randomIndex = Math.floor(Math.random() * objectIDs.length);
            randomIDs.push(objectIDs[randomIndex]);
        }
        
        // === שלב 2: שליפת הפרטים המלאים לכל ID (קריאות מרובות) ===
        const fetchPromises = randomIDs.map(id => 
            fetch(`${BASE_URL}/objects/${id}`)
                .then(res => {
                    if (!res.ok) throw new Error(`Failed to fetch details for object ${id}`);
                    return res.json();
                })
        );
        
        // המתן עד שכל הקריאות יסתיימו
        const artDetails: ArtObject[] = await Promise.all(fetchPromises);
        
        // סינון פריטים ללא תמונה ראשית (כדי למנוע תצוגה שבורה)
        const finalArt = artDetails.filter(art => art.primaryImageSmall);
        
        return finalArt;

    } catch (error) {
        // טיפול בשגיאות HTTP או שגיאות קוד
        console.error("API Fetch Error:", error);
        return "An unknown error occurred during API fetching.";
    }
}

// הוסף את השורה הבאה לייבוא

// מבנה תגובת המחלקות מה-API
interface DepartmentsResponse {
    departments: Department[];
}

interface Department {
    departmentId: number;
    displayName: string;
}

// פונקציה חדשה: שליפת שם המחלקה לפי ID
export async function getDepartmentName(departmentId: string): Promise<string> {    const departmentsUrl = `${BASE_URL}/departments`;
    
    try {
        const response = await fetch(departmentsUrl);
        if (!response.ok) {
            console.error("Failed to fetch departments list.");
            return `Department ID ${departmentId}`; // מחזיר את ה-ID אם נכשל
        }

        const data: DepartmentsResponse = await response.json();
        
        // חיפוש שם המחלקה לפי ה-ID
        const department = data.departments.find(dep => dep.departmentId.toString() === departmentId);

        if (department) {
            return department.displayName;
        } else {
            return `Department ID ${departmentId} (Not Found)`;
        }

    } catch (error) {
        console.error("Error fetching department name:", error);
        return `Error loading department name`;
    }
}