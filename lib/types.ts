// סוג הנתונים המלא של יצירת אמנות אחת מ-Met API
export interface ArtObject {
    objectID: number;
    title: string;
    artistDisplayName: string;
    primaryImageSmall: string; // ה-URL של התמונה
    objectDate: string;
    medium: string;
    culture: string;
    // ... יש עוד עשרות מאפיינים
    
    // זהו אובייקט שיחזור מהפונקציה שלנו
}

// המבנה של התשובה הראשונה מה-API (קבלת ID-ים)
export interface ObjectIDsResponse {
    total: number;
    objectIDs: number[]; // מערך של מזהים
}
// המבנה של פריט מחלקה בודד (להשלמת הקוד ב-api.ts)
export interface Department {
    departmentId: number;
    displayName: string;
}

// המבנה של התשובה מ-API המחלקות
export interface DepartmentsResponse {
    departments: Department[];
}