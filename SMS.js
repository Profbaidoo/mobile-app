/**
 * EduCore SMS — School Management System Core Engine
 * Complete State Management, LocalStorage Persistence, Reporting, and Interactive Modals
 */

// ============================================================================
// 1. Initial Rich Seed Data Store
// ============================================================================
const DEFAULT_SCHOOL_PROFILE = {
    name: "Prof~Baidoo EduComplex",
    motto: "Virtue is Our Strongest Helmet",
    phone: "+233 256331492",
    email: "admin@profbaidooeducomplexacademy.edu",
    principal: "Prof Nathaniel Esoun Baidoo",
    address: "Assin Foso, Behind Cocoa Depot",
    currentTerm: "2026/2027 Academic Year • Term 2",
    currency: "GHC"
};

const SEED_CLASSES = [
    { id: "c1", name: "Nursery 1", stage: "Early Childhood", teacher: "Mrs. Linda Appiah", room: "Block A - Room 1", capacity: 25 },
    { id: "c2", name: "Nursery 2", stage: "Early Childhood", teacher: "Miss Faustina Darko", room: "Block A - Room 2", capacity: 25 },
    { id: "c3", name: "KG 1", stage: "Kindergarten", teacher: "Mrs. Joyce Amankwah", room: "Block A - Room 3", capacity: 30 },
    { id: "c4", name: "KG 2", stage: "Kindergarten", teacher: "Mr. Nathaniel Osei", room: "Block A - Room 4", capacity: 30 },
    { id: "c5", name: "Primary 1", stage: "Lower Primary", teacher: "Madam Grace Osei", room: "Block B - Room 101", capacity: 30 },
    { id: "c6", name: "Primary 2", stage: "Lower Primary", teacher: "Mr. Ebenezer Mensah", room: "Block B - Room 102", capacity: 30 },
    { id: "c7", name: "Primary 3", stage: "Lower Primary", teacher: "Miss Beatrice Boateng", room: "Block B - Room 103", capacity: 30 },
    { id: "c8", name: "Primary 4", stage: "Upper Primary", teacher: "Mr. Francis Adjei", room: "Block C - Room 201", capacity: 35 },
    { id: "c9", name: "Primary 5", stage: "Upper Primary", teacher: "Mrs. Rita Asante", room: "Block C - Room 202", capacity: 35 },
    { id: "c10", name: "Primary 6", stage: "Upper Primary", teacher: "Mr. Richard Kwarteng", room: "Block C - Room 203", capacity: 35 },
    { id: "c11", name: "JHS 1", stage: "Junior High", teacher: "Mr. Isaac Arthur (Science)", room: "Block D - Room 301", capacity: 40 },
    { id: "c12", name: "JHS 2", stage: "Junior High", teacher: "Mrs. Evelyn Quaye (Maths)", room: "Block D - Room 302", capacity: 40 },
    { id: "c13", name: "JHS 3", stage: "Junior High", teacher: "Dr. Patrick Owusu (English)", room: "Block D - Room 303", capacity: 40 }
];

const SEED_STAFF = [
    {
        id: "stf-01",
        name: "Madam Grace Osei",
        role: "Primary 1 Class Teacher",
        assignedClass: "Primary 1",
        subjects: "English, Mathematics, Creative Arts",
        phone: "+233 24 333 4455",
        email: "grace.osei@profbaidooeducomplex.edu",
        degree: "B.Ed in Basic Education (UCC)",
        status: "Active"
    },
    {
        id: "stf-02",
        name: "Mr. Ebenezer Mensah",
        role: "Primary 2 Class Teacher",
        assignedClass: "Primary 2",
        subjects: "Mathematics, Integrated Science",
        phone: "+233 20 444 5566",
        email: "e.mensah@profbaidooeducomplex.edu",
        degree: "Dip. Basic Education (Wesley College)",
        status: "Active"
    },
    {
        id: "stf-03",
        name: "Miss Beatrice Boateng",
        role: "Primary 3 Class Teacher",
        assignedClass: "Primary 3",
        subjects: "English Language, RME, French",
        phone: "+233 27 555 6677",
        email: "b.boateng@profbaidooeducomplex.edu",
        degree: "B.A in French & Linguistics (UG)",
        status: "Active"
    },
    {
        id: "stf-04",
        name: "Mr. Isaac Arthur",
        role: "JHS Science Master & JHS 1 Class Teacher",
        assignedClass: "JHS 1",
        subjects: "Integrated Science, ICT",
        phone: "+233 24 666 7788",
        email: "i.arthur@profbaidooeducomplex.edu",
        degree: "B.Sc Science Education (UEW)",
        status: "Active"
    },
    {
        id: "stf-05",
        name: "Mrs. Evelyn Quaye",
        role: "JHS Mathematics Specialist",
        assignedClass: "JHS 2",
        subjects: "Mathematics, Social Studies",
        phone: "+233 24 777 8899",
        email: "e.quaye@profbaidooeducomplex.edu",
        degree: "M.Ed Mathematics (UCC)",
        status: "Active"
    },
    {
        id: "stf-06",
        name: "Prof. Nathaniel Esoun Baidoo",
        role: "Headteacher & Principal",
        assignedClass: "None",
        subjects: "Administration & Leadership",
        phone: "+233 24 567 8900",
        email: "principal@profbaidooeducomplex.edu",
        degree: "Professor Educational Administration",
        status: "Active"
    }
];

const SEED_STUDENTS = [
    {
        id: "std-001",
        admissionNo: "PBE-2026-001",
        firstName: "Kwame",
        lastName: "Mensah",
        class: "Primary 1",
        gender: "Male",
        dob: "2018-05-14",
        guardianName: "Mr. Isaac Junior Donkor",
        guardianPhone: "+233 24 123 4567",
        address: "East Legon Hills, Accra",
        medical: "None (Healthy)",
        feeTotal: 300,
        feePaid: 300,
        status: "Active",
        avatarBg: "linear-gradient(135deg, #06b6d4, #3b82f6)"
    },
    {
        id: "std-002",
        admissionNo: "PBE-2026-002",
        firstName: "Akosua",
        lastName: "Appiah",
        class: "Primary 1",
        gender: "Female",
        dob: "2018-09-22",
        guardianName: "Mrs. Florence Appiah",
        guardianPhone: "+233 20 234 5678",
        address: "Adjiringanor, Accra",
        medical: "Mild Asthma (Inhaler with matron)",
        feeTotal: 300,
        feePaid: 200,
        status: "Active",
        avatarBg: "linear-gradient(135deg, #ec4899, #8b5cf6)"
    },
    {
        id: "std-003",
        admissionNo: "PBE-2026-003",
        firstName: "Kofi",
        lastName: "Boateng",
        class: "Primary 1",
        gender: "Male",
        dob: "2018-02-10",
        guardianName: "Dr. Eric Boateng",
        guardianPhone: "+233 24 345 6789",
        address: "Airport Hills, Accra",
        medical: "Peanut allergy",
        feeTotal: 300,
        feePaid: 300,
        status: "Active",
        avatarBg: "linear-gradient(135deg, #10b981, #059669)"
    },
    {
        id: "std-004",
        admissionNo: "PBE-2026-004",
        firstName: "Ama",
        lastName: "Serwaa",
        class: "Primary 1",
        gender: "Female",
        dob: "2018-11-05",
        guardianName: "Madam Vivian Serwaa",
        guardianPhone: "+233 55 456 7890",
        address: "Madina New Road",
        medical: "None",
        feeTotal: 300,
        feePaid: 0,
        status: "Active",
        avatarBg: "linear-gradient(135deg, #f59e0b, #d97706)"
    },
    {
        id: "std-005",
        admissionNo: "PBE-2026-005",
        firstName: "Emmanuel",
        lastName: "Osei-Tutu",
        class: "Primary 2",
        gender: "Male",
        dob: "2017-07-19",
        guardianName: "Mr. Collins Osei-Tutu",
        guardianPhone: "+233 24 567 8901",
        address: "Ogbojo, Accra",
        medical: "Wears glasses",
        feeTotal: 320,
        feePaid: 320,
        status: "Active",
        avatarBg: "linear-gradient(135deg, #6366f1, #a855f7)"
    },
    {
        id: "std-006",
        admissionNo: "PBE-2026-006",
        firstName: "Abena",
        lastName: "Ofori-Atta",
        class: "Primary 2",
        gender: "Female",
        dob: "2017-03-30",
        guardianName: "Hon. Nathaniel Ofori-Atta",
        guardianPhone: "+233 20 678 9012",
        address: "Cantonments, Accra",
        medical: "None",
        feeTotal: 320,
        feePaid: 320,
        status: "Active",
        avatarBg: "linear-gradient(135deg, #14b8a6, #06b6d4)"
    },
    {
        id: "std-007",
        admissionNo: "PBE-2026-007",
        firstName: "Yaw",
        lastName: "Darkwah",
        class: "Primary 3",
        gender: "Male",
        dob: "2016-08-12",
        guardianName: "Mrs. Gertrude Darkwah",
        guardianPhone: "+233 27 789 0123",
        address: "Spintex Road, Accra",
        medical: "None",
        feeTotal: 320,
        feePaid: 150,
        status: "Active",
        avatarBg: "linear-gradient(135deg, #3b82f6, #1d4ed8)"
    },
    {
        id: "std-008",
        admissionNo: "PBE-2026-008",
        firstName: "Esi",
        lastName: "Gaisie",
        class: "Primary 3",
        gender: "Female",
        dob: "2016-12-04",
        guardianName: "Mr. Benjamin Gaisie",
        guardianPhone: "+233 24 890 1234",
        address: "Haatso, Accra",
        medical: "None",
        feeTotal: 320,
        feePaid: 320,
        status: "Active",
        avatarBg: "linear-gradient(135deg, #8b5cf6, #ec4899)"
    },
    {
        id: "std-009",
        admissionNo: "PBE-2026-009",
        firstName: "Nana Kwesi",
        lastName: "Amponsah",
        class: "Primary 4",
        gender: "Male",
        dob: "2015-04-18",
        guardianName: "Mrs. Beatrice Amponsah",
        guardianPhone: "+233 20 901 2345",
        address: "Ashiyie, Accra",
        medical: "None",
        feeTotal: 350,
        feePaid: 350,
        status: "Active",
        avatarBg: "linear-gradient(135deg, #10b981, #06b6d4)"
    },
    {
        id: "std-010",
        admissionNo: "PBE-2026-010",
        firstName: "Yaa",
        lastName: "Asantewaa",
        class: "Primary 4",
        gender: "Female",
        dob: "2015-06-25",
        guardianName: "Dr. Michael Asante",
        guardianPhone: "+233 24 012 3456",
        address: "Dome Pillar 2, Accra",
        medical: "None",
        feeTotal: 350,
        feePaid: 200,
        status: "Active",
        avatarBg: "linear-gradient(135deg, #f59e0b, #ef4444)"
    },
    {
        id: "std-011",
        admissionNo: "PBE-2026-011",
        firstName: "Kelvin",
        lastName: "Adjei",
        class: "Primary 5",
        gender: "Male",
        dob: "2014-01-15",
        guardianName: "Mr. Paul Adjei",
        guardianPhone: "+233 55 123 9876",
        address: "Taifa, Accra",
        medical: "None",
        feeTotal: 350,
        feePaid: 350,
        status: "Active",
        avatarBg: "linear-gradient(135deg, #4f46e5, #06b6d4)"
    },
    {
        id: "std-012",
        admissionNo: "PBE-2026-012",
        firstName: "Priscilla",
        lastName: "Kusi",
        class: "Primary 6",
        gender: "Female",
        dob: "2013-10-10",
        guardianName: "Mrs. Gladys Kusi",
        guardianPhone: "+233 24 234 8765",
        address: "Ashaley Botwe, Accra",
        medical: "None",
        feeTotal: 380,
        feePaid: 380,
        status: "Active",
        avatarBg: "linear-gradient(135deg, #ec4899, #f43f5e)"
    },
    {
        id: "std-013",
        admissionNo: "PBE-2026-013",
        firstName: "David",
        lastName: "Quansah",
        class: "JHS 1",
        gender: "Male",
        dob: "2012-03-08",
        guardianName: "Mr. George Quansah",
        guardianPhone: "+233 20 345 7654",
        address: "North Legon, Accra",
        medical: "None",
        feeTotal: 420,
        feePaid: 250,
        status: "Active",
        avatarBg: "linear-gradient(135deg, #3b82f6, #6366f1)"
    },
    {
        id: "std-014",
        admissionNo: "PBE-2026-014",
        firstName: "Blessing",
        lastName: "Arthur",
        class: "JHS 2",
        gender: "Female",
        dob: "2011-09-17",
        guardianName: "Pastor John Arthur",
        guardianPhone: "+233 24 456 6543",
        address: "West Legon, Accra",
        medical: "None",
        feeTotal: 420,
        feePaid: 420,
        status: "Active",
        avatarBg: "linear-gradient(135deg, #10b981, #3b82f6)"
    },
    {
        id: "std-015",
        admissionNo: "PBE-2026-015",
        firstName: "Nathaniel",
        lastName: "Agyapong",
        class: "JHS 3",
        gender: "Male",
        dob: "2010-07-21",
        guardianName: "Mr. Kwabena Agyapong",
        guardianPhone: "+233 27 567 5432",
        address: "Dzorwulu, Accra",
        medical: "None",
        feeTotal: 450,
        feePaid: 450,
        status: "Active",
        avatarBg: "linear-gradient(135deg, #a855f7, #6366f1)"
    }
];

const SEED_GRADES = {
    "std-001_Mathematics_Term 2": { classScore: 28, examScore: 65, total: 93, grade: "A", remarks: "Excellent" },
    "std-001_English Language_Term 2": { classScore: 27, examScore: 63, total: 90, grade: "A", remarks: "Excellent" },
    "std-001_Integrated Science_Term 2": { classScore: 29, examScore: 66, total: 95, grade: "A", remarks: "Excellent" },
    "std-001_Social Studies_Term 2": { classScore: 26, examScore: 64, total: 90, grade: "A", remarks: "Excellent" },
    "std-001_ICT / Computing_Term 2": { classScore: 29, examScore: 67, total: 96, grade: "A", remarks: "Excellent" },
    "std-001_Creative Arts_Term 2": { classScore: 28, examScore: 62, total: 90, grade: "A", remarks: "Excellent" },

    "std-002_Mathematics_Term 2": { classScore: 24, examScore: 58, total: 82, grade: "A", remarks: "Excellent" },
    "std-002_English Language_Term 2": { classScore: 26, examScore: 62, total: 88, grade: "A", remarks: "Excellent" },
    "std-002_Integrated Science_Term 2": { classScore: 23, examScore: 55, total: 78, grade: "B", remarks: "Very Good" },

    "std-003_Mathematics_Term 2": { classScore: 27, examScore: 62, total: 89, grade: "A", remarks: "Excellent" },
    "std-003_English Language_Term 2": { classScore: 28, examScore: 64, total: 92, grade: "A", remarks: "Excellent" },

    "std-005_Mathematics_Term 2": { classScore: 29, examScore: 65, total: 94, grade: "A", remarks: "Excellent" },
    "std-006_Mathematics_Term 2": { classScore: 28, examScore: 63, total: 91, grade: "A", remarks: "Excellent" }
};

const SEED_TIMETABLES = {
    "Primary 1": {
        periods: [
            { time: "08:00 - 09:00", name: "Period 1" },
            { time: "09:00 - 10:00", name: "Period 2" },
            { time: "10:00 - 10:30", name: "Snack Break", isBreak: true },
            { time: "10:30 - 11:30", name: "Period 3" },
            { time: "11:30 - 12:30", name: "Period 4" },
            { time: "12:30 - 01:30", name: "Lunch & Play", isBreak: true },
            { time: "01:30 - 02:45", name: "Period 5" }
        ],
        schedule: {
            "Monday": [
                { subject: "English Language", teacher: "Madam Grace Osei" },
                { subject: "Mathematics", teacher: "Madam Grace Osei" },
                { subject: "Snack Break", teacher: "" },
                { subject: "Integrated Science", teacher: "Mr. Isaac Arthur" },
                { subject: "Creative Arts", teacher: "Madam Grace Osei" },
                { subject: "Lunch & Play", teacher: "" },
                { subject: "Reading & Phonics", teacher: "Madam Grace Osei" }
            ],
            "Tuesday": [
                { subject: "Mathematics", teacher: "Madam Grace Osei" },
                { subject: "English Language", teacher: "Madam Grace Osei" },
                { subject: "Snack Break", teacher: "" },
                { subject: "R.M.E", teacher: "Miss Beatrice Boateng" },
                { subject: "Computing / ICT", teacher: "Mr. Isaac Arthur" },
                { subject: "Lunch & Play", teacher: "" },
                { subject: "Handwriting & Spellings", teacher: "Madam Grace Osei" }
            ],
            "Wednesday": [
                { subject: "Integrated Science", teacher: "Mr. Isaac Arthur" },
                { subject: "English Language", teacher: "Madam Grace Osei" },
                { subject: "Snack Break", teacher: "" },
                { subject: "Mathematics", teacher: "Madam Grace Osei" },
                { subject: "French Language", teacher: "Miss Beatrice Boateng" },
                { subject: "Lunch & Play", teacher: "" },
                { subject: "Physical Education", teacher: "Mr. Francis Adjei" }
            ],
            "Thursday": [
                { subject: "Mathematics", teacher: "Madam Grace Osei" },
                { subject: "Social Studies", teacher: "Mrs. Evelyn Quaye" },
                { subject: "Snack Break", teacher: "" },
                { subject: "English Language", teacher: "Madam Grace Osei" },
                { subject: "Creative Arts", teacher: "Madam Grace Osei" },
                { subject: "Lunch & Play", teacher: "" },
                { subject: "Library & Story Time", teacher: "Mrs. Linda Appiah" }
            ],
            "Friday": [
                { subject: "English Language", teacher: "Madam Grace Osei" },
                { subject: "Integrated Science", teacher: "Mr. Isaac Arthur" },
                { subject: "Snack Break", teacher: "" },
                { subject: "Mathematics Quiz", teacher: "Madam Grace Osei" },
                { subject: "Worship & Moral Dev", teacher: "Madam Grace Osei" },
                { subject: "Lunch & Play", teacher: "" },
                { subject: "Clubs & Cadet", teacher: "All Faculty" }
            ]
        }
    }
};

const SEED_PAYMENTS = [
    {
        id: "pay-101",
        receiptNo: "PBE-REC-2026-0042",
        studentId: "std-001",
        studentName: "Kwame Mensah",
        admissionNo: "PBE-2026-001",
        class: "Primary 1",
        amount: 300,
        date: "2026-08-25",
        method: "Mobile Money (MoMo)",
        category: "Tuition & Academic",
        ref: "MM-9832749281"
    },
    {
        id: "pay-102",
        receiptNo: "PBE-REC-2026-0043",
        studentId: "std-002",
        studentName: "Akosua Appiah",
        admissionNo: "PBE-2026-002",
        class: "Primary 1",
        amount: 200,
        date: "2026-08-28",
        method: "Cash Deposit",
        category: "Tuition & Academic",
        ref: "CASH-REC-002"
    },
    {
        id: "pay-103",
        receiptNo: "PBE-REC-2026-0044",
        studentId: "std-003",
        studentName: "Kofi Boateng",
        admissionNo: "PBE-2026-003",
        class: "Primary 1",
        amount: 300,
        date: "2026-08-29",
        method: "Bank Transfer",
        category: "Tuition & Academic",
        ref: "CBG-TRF-48192"
    },
    {
        id: "pay-104",
        receiptNo: "PBE-REC-2026-0045",
        studentId: "std-005",
        studentName: "Emmanuel Osei-Tutu",
        admissionNo: "PBE-2026-005",
        class: "Primary 2",
        amount: 320,
        date: "2026-09-01",
        method: "Mobile Money (MoMo)",
        category: "Tuition & Academic",
        ref: "MM-7728192"
    }
];

const SEED_NOTICES = [
    {
        id: "ntc-01",
        title: "Mid-Term Open Day & Parent-Teacher Conference",
        date: "2026-09-12",
        author: "Administration",
        content: "All parents and guardians are cordially invited to our Mid-Term Open Day. Class progress reports and creative projects will be on exhibition."
    },
    {
        id: "ntc-02",
        title: "Inter-Houses Sports & Athletic Festival",
        date: "2026-09-24",
        author: "Physical Education Dept.",
        content: "House Red, Blue, Yellow and Green will compete for the coveted 2026 Champions Trophy. Parents are welcome to cheer our young champions."
    }
];

const SEED_SMS_TEMPLATES = {
    "FEE_REMINDER": "Dear {guardian_name}, this is a gentle reminder from Prof~Baidoo Academy that {student_name} has an outstanding fee balance of {fee_balance}. Kindly make payment via MoMo or school accounts. Thank you.",
    "PTA_MEETING": "Dear {guardian_name}, you are warmly invited to the 2nd Term PTA General Meeting this Saturday at 9:00 AM at the School Assembly Hall. Your presence is vital.",
    "MID_TERM_BREAK": "Notice to Parents: Prof~Baidoo Academy will observe our Mid-Term Break from Thursday 18th to Monday 22nd. Classes resume on Tuesday at 7:30 AM.",
    "EXAM_COMMENCEMENT": "Dear {guardian_name}, Terminal Examinations for {student_name}'s class start next Monday. Please ensure your ward prepares adequately and arrives promptly by 7:30 AM.",
    "EMERGENCY_WEATHER": "URGENT: Due to adverse weather alerts, school will dismiss early today at 1:00 PM. Parents/buses are kindly requested to pick up pupils safely."
};

// ============================================================================
// 2. Application State Manager
// ============================================================================
class SchoolManagerApp { // Main School Management System Application Controller Class
    constructor() { // Constructor: Initialize core application variables and load persistent state
        this.STORAGE_KEY = "PROF~BAIDOO EDU SYSTEM_SMS_Database_v1"; // Storage: Persistent localStorage key identifier
        this.state = this.loadState(); // State: Load existing database or initialize fresh seed state
        this.currentView = "dashboardView"; // View: Default landing view identifier
        this.selectedAttendanceDate = new Date().toISOString().split("T")[0]; // Attendance: Default current date string
        this.pendingDeleteAction = null; // Confirmation: State container for pending deletion modal callbacks
        this.cameraStream = null; // Camera: Active MediaStream instance for webcam capture
        this.cameraFacingMode = "user"; // Camera: Active video camera facing direction ("user" or "environment")
        this.cameraTarget = { type: 'student', id: null, callback: null }; // Camera: Context descriptor for capture recipient
        this.capturedPhotoData = null; // Camera: Base64 data container for currently frozen snapshot preview
        this.init(); // Lifecycle: Bootstrap event listeners, navigation, and view rendering
    } // End of constructor

    loadState() { // Method: Loads state from localStorage or falls back to seed state
        try { // Try: Attempt to read saved state
            const raw = localStorage.getItem(this.STORAGE_KEY); // Storage: Read raw JSON string
            if (raw) { // Check: If state was found
                const parsed = JSON.parse(raw); // Parse: Decode stored state JSON
                const fresh = this.getFreshSeedState(); // Default: Get seed schema
                if (!parsed.apiKeyVault) parsed.apiKeyVault = fresh.apiKeyVault; // Migration: Initialize API Key vault if absent
                if (!parsed.outboundDispatches) parsed.outboundDispatches = fresh.outboundDispatches; // Migration: Initialize outbound dispatches
                if (!parsed.inboundMessages) parsed.inboundMessages = fresh.inboundMessages; // Migration: Initialize inbound messages
                return parsed; // Return: Resolved state
            } // End of check
        } catch (e) { // Catch: JSON parse or access error
            console.warn("Failed to parse local storage, loading seed data", e); // Warn: Log error
        } // End of catch
        return this.getFreshSeedState(); // Fallback: Return fresh seed state
    } // End of loadState
//                                                                              // Line: Blank comment line
    getFreshSeedState() { // Method: Constructs fresh baseline state with demo data
        return { // Return: State object
            schoolProfile: { ...DEFAULT_SCHOOL_PROFILE }, // Profile: Default institution details
            classes: [...SEED_CLASSES], // Classes: Standard grade classes
            staff: [...SEED_STAFF], // Staff: Teachers and administrators
            students: [...SEED_STUDENTS], // Students: Enrolled learners
            grades: { ...SEED_GRADES }, // Grades: Academic exam scores
            timetables: { ...SEED_TIMETABLES }, // Timetables: Class weekly schedules
            payments: [...SEED_PAYMENTS], // Payments: Tuition fee transactions
            notices: [...SEED_NOTICES], // Notices: Public announcements
            attendanceLogs: {}, // Attendance: Daily attendance records
            activities: [ // Activities: System audit activity trail
                { id: "act-1", title: "New Academic Session Initialized", time: "Term 2 in progress", icon: "ri-flag-fill", color: "#3b82f6" }, // Activity 1
                { id: "act-2", title: "Fee Payment Recorded: Kwame Mensah (GHC 300)", time: "1 hour ago", icon: "ri-hand-coin-line", color: "#10b981" }, // Activity 2
                { id: "act-3", title: "Gradebook updated for Primary 1 Mathematics", time: "3 hours ago", icon: "ri-edit-line", color: "#f59e0b" }, // Activity 3
                { id: "act-4", title: "Daily Attendance logged for 12 classes", time: "Today 8:15 AM", icon: "ri-calendar-check-line", color: "#6366f1" } // Activity 4
            ], // End of activities array
            theme: "light", // Theme: Default active theme initialized to professional light mode
            apiKeyVault: { // API Vault: Cryptographically secure API keys for announcement dispatch and two-way messaging
                activeKey: "pb_live_sec_7f9a2b8e3c1d45089e6f21a48c5b3d70e192f8a4b6c3d5e7", // Key: 48-char secure hex secret key
                keyPrefix: "pb_live_sec_", // Prefix: Live environment secret key prefix
                createdAt: new Date().toISOString(), // Timestamp: Key creation timestamp
                status: "ACTIVE", // Status: ACTIVE | REVOKED
                name: "School Announcement & Two-Way Messaging Production Key", // Description: Human readable key label
                webhookUrl: "https://api.sms-gateway.com/v1/broadcast", // Target: Outbound announcement webhook gateway
                receiverEndpoint: "https://profbaidoo-sms.edu.gh/api/v1/inbound", // Receiver: Inbound webhook endpoint for incoming parent messages
                totalDispatched: 48, // Stats: Cumulative announcement messages dispatched
                totalReceived: 12, // Stats: Cumulative incoming parent replies received
                rateLimit: "120 req/min", // Policy: Standard API throughput quota
                isMasked: true // Security: Mask display by default on screen
            }, // End of apiKeyVault
            outboundDispatches: [ // Dispatches: Historical records of announcements broadcast over API
                { id: "disp-101", timestamp: "Today 08:30 AM", event: "announcement.broadcast", recipientGroup: "ALL", recipientCount: 24, content: "PTA General Meeting Announcement — Saturday 9:00 AM at Academy Hall.", status: "DELIVERED (200 OK)", traceId: "req_9a4f21e0", sender: "PROF~BAIDOO" }, // Dispatch 1
                { id: "disp-102", timestamp: "Yesterday 02:15 PM", event: "announcement.broadcast", recipientGroup: "DEBTORS", recipientCount: 8, content: "Fee Arrears Reminder: Kindly settle outstanding tuition fees before midterm.", status: "DELIVERED (200 OK)", traceId: "req_8b3e10d2", sender: "PROF~BAIDOO" }, // Dispatch 2
                { id: "disp-103", timestamp: "15 Oct 2026", event: "announcement.broadcast", recipientGroup: "Primary 1", recipientCount: 4, content: "Mid-Term Vacation Notice: Pupils will vacate this Friday by 12:30 PM.", status: "DELIVERED (200 OK)", traceId: "req_7c2d09c1", sender: "PROF~BAIDOO" } // Dispatch 3
            ], // End of outboundDispatches
            inboundMessages: [ // Inbound: Messages and replies received from parents/others via API Key
                { id: "in-201", timestamp: "Today 09:12 AM", senderName: "Mrs. Vivian Mensah", senderPhone: "+233 24 456 7890", studentName: "Kwame Mensah", studentClass: "Primary 1", message: "Received the PTA meeting announcement. We will attend punctually. Thank you Prof. Baidoo.", status: "VERIFIED (200 OK)", apiKeyUsed: "pb_live_sec_...5e7", verified: true }, // Message 1
                { id: "in-202", timestamp: "Yesterday 03:40 PM", senderName: "Mr. Isaac Donkor", senderPhone: "+233 20 123 4567", studentName: "Abena Donkor", studentClass: "Primary 1", message: "Good afternoon. Fee reminder received. We have dispatched GHC 250 via Mobile Money to the school bursary.", status: "VERIFIED (200 OK)", apiKeyUsed: "pb_live_sec_...5e7", verified: true }, // Message 2
                { id: "in-203", timestamp: "15 Oct 2026", senderName: "Madam Faustina Agyeman", senderPhone: "+233 55 987 6543", studentName: "Kofi Agyeman", studentClass: "Primary 2", message: "Mid-term vacation notice noted. Will pick up our ward on Friday at the school gate.", status: "VERIFIED (200 OK)", apiKeyUsed: "pb_live_sec_...5e7", verified: true } // Message 3
            ] // End of inboundMessages
        }; // End of return
    } // End of getFreshSeedState

    saveState() {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.state));
        } catch (e) {
            console.error("Failed to save state to localStorage", e);
        }
    }

    logActivity(title, icon = "ri-information-line", color = "#3b82f6") {
        this.state.activities.unshift({
            id: "act-" + Date.now(),
            title,
            time: "Just now",
            icon,
            color
        });
        if (this.state.activities.length > 20) {
            this.state.activities.pop();
        }
        this.saveState();
        this.renderActivities();
    }

    // ========================================================================
    // 3. UI Initialization & Event Listeners
    // ========================================================================
    init() { // Lifecycle: Initialize application UI and event dispatchers
        const storedThemePref = localStorage.getItem("prof_baidoo_sms_theme_pref"); // Storage: Check for persisted user theme preference
        const activeTheme = storedThemePref || "light"; // Theme: Default active theme to light mode for executive clarity
        this.applyTheme(activeTheme); // UI Theme: Initialize interface in crisp light mode
        this.bindNavigation(); // Navigation: Bind sidebar navigation links
        this.bindDashboardEvents(); // Dashboard: Bind dashboard interaction listeners
        this.bindManageMembersHubEvents(); // Members Hub: Bind member management controls
        this.bindStudentEvents(); // Students: Bind student directory event listeners
        this.bindStaffEvents(); // Staff: Bind staff management event listeners
        this.bindClassesTimetableEvents(); // Classes: Bind timetable and class management
        this.bindAttendanceEvents(); // Attendance: Bind daily attendance check listeners
        this.bindAttendanceSheetEvents(); // Attendance Sheet: Bind printable register events
        this.bindAdmitMESyncEvents(); // Integration: Bind AdmitME synchronization listeners
        this.bindExamsEvents(); // Gradebook: Bind exams and report card generation
        this.bindFeesEvents(); // Finance: Bind fee collection and receipt generation
        this.bindNoticeAndSMSEvents(); // Broadcast: Bind SMS notifications and announcements
        this.bindSettingsEvents(); // Settings: Bind school profile and preferences
        this.bindPhotoCaptureEvents(); // Camera: Initialize webcam studio controls and photo upload handlers
        this.bindCommandPalette(); // Shortcut: Bind global search and Ctrl+K command palette
        this.bindModalClosers(); // Modals: Bind universal modal close buttons and backdrop dismiss
        // Initial Data Render: Populate interface with active records // Comment: Render header
        this.renderAllViews(); // Rendering: Render all views and active tab components
        this.showToast("Welcome to Prof~Baidoo Academy Management System", "info"); // Feedback: Greet user on launch
    } // End of init
//                                                                              // Line: Blank comment line
    applyTheme(theme) { // Method: Applies theme to document root and synchronizes switcher icons
        this.state.theme = theme; // State: Record active theme in state object
        document.documentElement.setAttribute("data-theme", theme); // DOM: Update root data-theme attribute
        const sunIcon = document.querySelector(".theme-icon-light"); // Element: Query sun icon element
        const moonIcon = document.querySelector(".theme-icon-dark"); // Element: Query moon icon element
        if (sunIcon && moonIcon) { // Guard: Check if theme icons are present in header
            if (theme === "light") { // Check: Active theme is light
                sunIcon.style.display = "none"; // Display: Hide sun icon in light mode
                moonIcon.style.display = "inline-block"; // Display: Show moon icon in light mode
            } else { // Else: Active theme is dark
                sunIcon.style.display = "inline-block"; // Display: Show sun icon in dark mode
                moonIcon.style.display = "none"; // Display: Hide moon icon in dark mode
            } // End of icon branch
        } // End of icon guard
        this.saveState(); // Storage: Save theme choice to persistent storage
    } // End of applyTheme
//                                                                              // Line: Blank comment line
    toggleTheme() { // Method: Toggles application between light and dark themes
        const next = this.state.theme === "light" ? "dark" : "light"; // Toggle: Compute alternate theme mode
        localStorage.setItem("prof_baidoo_sms_theme_pref", next); // Storage: Save explicit user choice
        this.applyTheme(next); // UI: Apply newly chosen theme mode
        this.showToast(`Theme switched to ${next} mode`, "info"); // Toast: Notify user of theme update
    } // End of toggleTheme

    bindNavigation() {
        document.querySelectorAll(".nav-link[data-view]").forEach(btn => {
            btn.addEventListener("click", () => {
                const targetView = btn.getAttribute("data-view");
                this.switchView(targetView);
            });
        });

        const sidebarToggle = document.getElementById("sidebarToggleBtn");
        const sidebar = document.getElementById("sidebar");
        if (sidebarToggle && sidebar) {
            sidebarToggle.addEventListener("click", () => {
                sidebar.classList.toggle("mobile-open");
            });
        }

        const themeToggle = document.getElementById("themeToggleBtn");
        if (themeToggle) {
            themeToggle.addEventListener("click", () => this.toggleTheme());
        }

        const btnQuickEnroll = document.getElementById("btnQuickEnroll");
        if (btnQuickEnroll) {
            btnQuickEnroll.addEventListener("click", () => this.switchView("manageMembersView"));
        }
    }

    switchView(viewId) {
        document.querySelectorAll(".view-panel").forEach(p => p.classList.remove("active"));
        document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));

        const targetPanel = document.getElementById(viewId);
        const targetNav = document.querySelector(`.nav-link[data-view="${viewId}"]`);

        if (targetPanel) targetPanel.classList.add("active");
        if (targetNav) targetNav.classList.add("active");

        this.currentView = viewId;

        const sidebar = document.getElementById("sidebar"); // Element: Sidebar element
        if (sidebar) sidebar.classList.remove("mobile-open"); // Visual: Dismiss mobile sidebar drawer
        const activeUser = (window.SMSAuth && window.SMSAuth.currentSession) ? window.SMSAuth.currentSession : null; // Context: Active user session
        if (activeUser && activeUser.rowScope && activeUser.rowScope.scopeType === "CLASS_ROWS_ONLY") { // Check: Class teacher restriction
            const assigned = activeUser.rowScope.assignedClass; // Target: Assigned class
            const attSelect = document.getElementById("attClassSelect"); // Element: Attendance select
            if (attSelect && assigned) attSelect.value = assigned; // Value: Set class select
            const examSelect = document.getElementById("examClassSelect"); // Element: Exam select
            if (examSelect && assigned) examSelect.value = assigned; // Value: Set exam select
        } // End: Teacher restriction check

        if (viewId === "dashboardView") this.renderDashboard();
        if (viewId === "manageMembersView") this.renderManageMembersHub();
        if (viewId === "studentsView") this.renderStudentsTable();
        if (viewId === "staffView") this.renderStaffTable();
        if (viewId === "classesView") this.renderClassesGrid();
        if (viewId === "attendanceView") this.renderAttendanceTable();
        if (viewId === "examsView") this.renderGradebookTable();
        if (viewId === "feesView") this.renderFeesTable();
        if (viewId === "noticeView") this.renderNoticeBoard();
        if (viewId === "settingsView") this.renderSettingsForm();
    }

    openModal(modalId) {
        const m = document.getElementById(modalId);
        if (m) {
            m.classList.add("open");
        }
    }

    closeModal(modalId) { // Method: Closes an active modal window and performs cleanup
        const m = document.getElementById(modalId); // Element: Resolve modal container by identifier
        if (m) { // Check: Verify modal DOM element exists
            m.classList.remove("open"); // Class: Remove open visibility class
        } // End if
        if (modalId === "modalPhotoCapture") { // Check: If closing camera studio modal
            this.stopCameraStream(); // Stream: Terminate active video tracks immediately
        } // End if
    } // End of closeModal

    bindModalClosers() {
        document.querySelectorAll(".btn-close-modal, [data-modal]").forEach(btn => {
            btn.addEventListener("click", () => {
                const modalId = btn.getAttribute("data-modal");
                if (modalId) {
                    this.closeModal(modalId);
                }
            });
        });

        document.querySelectorAll(".modal-overlay").forEach(overlay => {
            overlay.addEventListener("click", (e) => {
                if (e.target === overlay) {
                    overlay.classList.remove("open");
                }
            });
        });

        // Delete Confirm Button
        const btnConfirm = document.getElementById("btnConfirmDeleteAction");
        if (btnConfirm) {
            btnConfirm.addEventListener("click", () => {
                if (typeof this.pendingDeleteAction === "function") {
                    this.pendingDeleteAction();
                    this.pendingDeleteAction = null;
                }
                this.closeModal("modalConfirmDelete");
            });
        }
    }

    showConfirmDeleteModal(title, desc, targetName, onConfirmCallback) {
        document.getElementById("deleteConfirmTitle").textContent = title;
        document.getElementById("deleteConfirmDesc").textContent = desc;
        document.getElementById("deleteTargetBadge").textContent = targetName;
        this.pendingDeleteAction = onConfirmCallback;
        this.openModal("modalConfirmDelete");
    }

    showToast(message, type = "info") {
        const container = document.getElementById("toastContainer");
        if (!container) return;

        const toast = document.createElement("div");
        toast.className = `toast toast-${type}`;

        let icon = "ri-information-line";
        if (type === "success") icon = "ri-checkbox-circle-line";
        if (type === "warning") icon = "ri-alert-line";
        if (type === "danger") icon = "ri-error-warning-line";

        toast.innerHTML = `
            <i class="${icon}" style="font-size:1.15rem;"></i>
            <span>${message}</span>
        `;

        container.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = "toastOut 0.3s forwards";
            setTimeout(() => toast.remove(), 300);
        }, 3500);
    }

    triggerConfetti() {
        if (typeof confetti === "function") {
            confetti({
                particleCount: 80,
                spread: 70,
                origin: { y: 0.6 }
            });
        }
    }

    // ========================================================================
    // 4. Module: Dashboard & KPIs
    // ========================================================================
    bindDashboardEvents() {
        const btnRefresh = document.getElementById("btnRefreshDashboard");
        if (btnRefresh) {
            btnRefresh.addEventListener("click", () => {
                this.renderDashboard();
                this.showToast("Dashboard analytics updated", "success");
            });
        }

        const btnCelebrate = document.getElementById("btnCelebrateTop");
        if (btnCelebrate) {
            btnCelebrate.addEventListener("click", () => {
                this.triggerConfetti();
                this.showToast("Congratulations to our Honor Roll scholars!", "success");
            });
        }

        const qaAddRemove = document.getElementById("qaAddRemove");
        if (qaAddRemove) qaAddRemove.addEventListener("click", () => this.switchView("manageMembersView"));

        const qaAttendance = document.getElementById("qaTakeAttendance");
        if (qaAttendance) qaAttendance.addEventListener("click", () => this.switchView("attendanceView"));

        const qaPayment = document.getElementById("qaRecordPayment");
        if (qaPayment) qaPayment.addEventListener("click", () => this.openFeePaymentModal());

        const qaScores = document.getElementById("qaEnterScores");
        if (qaScores) qaScores.addEventListener("click", () => this.switchView("examsView"));

        const qaSMS = document.getElementById("qaSendSMS");
        if (qaSMS) qaSMS.addEventListener("click", () => this.switchView("noticeView"));

        const btnGoAtt = document.getElementById("btnGoToAttendance");
        if (btnGoAtt) btnGoAtt.addEventListener("click", () => this.switchView("attendanceView"));

        const btnPostNotice = document.getElementById("btnPostNoticeQuick");
        if (btnPostNotice) btnPostNotice.addEventListener("click", () => this.switchView("noticeView"));
    }

    renderDashboard() {
        const totalStudents = this.state.students.filter(s => s.status === "Active").length;
        const kpiStudents = document.getElementById("kpiTotalStudents");
        if (kpiStudents) kpiStudents.textContent = totalStudents;

        const sidebarCount = document.getElementById("sidebarStudentCount");
        if (sidebarCount) sidebarCount.textContent = totalStudents;

        const kpiStaff = document.getElementById("kpiTotalStaff");
        if (kpiStaff) kpiStaff.textContent = this.state.staff.length;

        let totalBilled = 0;
        let totalPaid = 0;
        this.state.students.forEach(s => {
            totalBilled += (s.feeTotal || 0);
            totalPaid += (s.feePaid || 0);
        });

        const kpiFeeCollection = document.getElementById("kpiFeeCollection");
        if (kpiFeeCollection) {
            kpiFeeCollection.textContent = `${this.state.schoolProfile.currency || "GHC "}${totalPaid.toLocaleString()}`;
        }

        const recoveryRate = totalBilled > 0 ? Math.round((totalPaid / totalBilled) * 100) : 0;
        const kpiFeeRecovery = document.getElementById("kpiFeeRecovery");
        if (kpiFeeRecovery) {
            kpiFeeRecovery.textContent = `${recoveryRate}% recovery (${this.state.schoolProfile.currency || "GHC "}${(totalBilled - totalPaid).toLocaleString()} pending)`;
        }

        const kpiAttRate = document.getElementById("kpiAttendanceRate");
        if (kpiAttRate) {
            kpiAttRate.textContent = "96.4%";
        }

        this.renderDashboardAttendanceBars();
        this.renderHonorRoll();
        this.renderDashboardNoticeSnippet();
        this.renderActivities();
    }

    renderDashboardAttendanceBars() {
        const container = document.getElementById("dashboardAttendanceList");
        if (!container) return;

        const sampleRates = [
            { name: "Primary 1", rate: 98, color: "green" },
            { name: "Primary 2", rate: 95, color: "green" },
            { name: "Primary 3", rate: 92, color: "green" },
            { name: "KG 1 & 2", rate: 94, color: "green" },
            { name: "JHS 1 - 3", rate: 89, color: "yellow" }
        ];

        container.innerHTML = sampleRates.map(item => `
            <div class="class-attendance-row">
                <div class="class-row-header">
                    <span class="class-name-tag">${item.name}</span>
                    <span class="class-percent-tag">${item.rate}%</span>
                </div>
                <div class="progress-track">
                    <div class="progress-fill ${item.color}" style="width: ${item.rate}%;"></div>
                </div>
            </div>
        `).join("");
    }

    renderHonorRoll() {
        const tbody = document.getElementById("dashboardHonorRollBody");
        if (!tbody) return;

        const topStudents = [
            { rank: "1st", name: "Kwame Mensah", class: "Primary 1", avg: "93.4%", grade: "A", id: "std-001" },
            { rank: "2nd", name: "Emmanuel Osei-Tutu", class: "Primary 2", avg: "91.8%", grade: "A", id: "std-005" },
            { rank: "3rd", name: "Akosua Appiah", class: "Primary 1", avg: "88.2%", grade: "A", id: "std-002" },
            { rank: "4th", name: "Abena Ofori-Atta", class: "Primary 2", avg: "87.5%", grade: "A", id: "std-006" }
        ];

        tbody.innerHTML = topStudents.map(s => `
            <tr>
                <td><span class="badge ${s.rank === '1st' ? 'badge-warning' : 'badge-info'}">${s.rank}</span></td>
                <td><strong>${s.name}</strong></td>
                <td><span class="badge badge-purple">${s.class}</span></td>
                <td><strong style="color:var(--success);">${s.avg}</strong></td>
                <td><span class="grade-pill grade-${s.grade.charAt(0)}">${s.grade}</span></td>
                <td>
                    <button class="btn btn-secondary btn-sm" onclick="app.viewReportCard('${s.id}')">
                        <i class="ri-file-text-line"></i> Report
                    </button>
                </td>
            </tr>
        `).join("");
    }

    renderDashboardNoticeSnippet() {
        const snippet = document.getElementById("dashboardNoticeSnippet");
        if (!snippet) return;

        const latestNotice = this.state.notices[0];
        if (!latestNotice) {
            snippet.innerHTML = `<p style="color:var(--text-muted); font-size:0.82rem;">No notices posted yet.</p>`;
            return;
        }

        snippet.innerHTML = `
            <div style="background:var(--bg-surface-elevated); padding:0.9rem; border-radius:var(--radius-sm); border:1px solid var(--bg-surface-border);">
                <div style="display:flex; justify-content:space-between; margin-bottom:0.4rem;">
                    <strong style="font-size:0.88rem; color:var(--text-primary);">${latestNotice.title}</strong>
                    <span style="font-size:0.72rem; color:var(--text-muted);">${latestNotice.date}</span>
                </div>
                <p style="font-size:0.8rem; color:var(--text-secondary); line-height:1.4;">${latestNotice.content}</p>
            </div>
        `;
    }

    renderActivities() {
        const feed = document.getElementById("dashboardActivityFeed");
        if (!feed) return;

        feed.innerHTML = this.state.activities.slice(0, 5).map(act => `
            <div class="activity-item">
                <div class="activity-bullet" style="background: ${act.color}20; color: ${act.color};">
                    <i class="${act.icon}"></i>
                </div>
                <div class="activity-details">
                    <div class="activity-title">${act.title}</div>
                    <div class="activity-time">${act.time}</div>
                </div>
            </div>
        `).join("");
    }

    // ========================================================================
    // 5. Module: Add & Remove Members Hub
    // ========================================================================
    bindManageMembersHubEvents() {
        const tabStudents = document.getElementById("tabManageStudents");
        const tabStaff = document.getElementById("tabManageStaff");
        const subViewStudents = document.getElementById("subViewManageStudents");
        const subViewStaff = document.getElementById("subViewManageStaff");

        if (tabStudents && tabStaff) {
            tabStudents.addEventListener("click", () => {
                tabStudents.classList.add("active");
                tabStaff.classList.remove("active");
                subViewStudents.style.display = "grid";
                subViewStaff.style.display = "none";
                this.renderHubStudentsTable();
            });

            tabStaff.addEventListener("click", () => {
                tabStaff.classList.add("active");
                tabStudents.classList.remove("active");
                subViewStudents.style.display = "none";
                subViewStaff.style.display = "grid";
                this.renderHubStaffTable();
            });
        }

        // Quick Add Student Form
        const qaStudentForm = document.getElementById("quickAddStudentForm");
        if (qaStudentForm) {
            qaStudentForm.addEventListener("submit", (e) => {
                e.preventDefault();
                this.quickAddStudent();
            });
        }

        // Quick Add Staff Form
        const qaStaffForm = document.getElementById("quickAddStaffForm");
        if (qaStaffForm) {
            qaStaffForm.addEventListener("submit", (e) => {
                e.preventDefault();
                this.quickAddStaff();
            });
        }

        // Search & Class Filters in Hub
        const hubStudSearch = document.getElementById("hubStudentSearch");
        const hubStudClass = document.getElementById("hubStudentClassFilter");
        if (hubStudSearch) hubStudSearch.addEventListener("input", () => this.renderHubStudentsTable());
        if (hubStudClass) hubStudClass.addEventListener("change", () => this.renderHubStudentsTable());

        const hubStaffSearch = document.getElementById("hubStaffSearch");
        if (hubStaffSearch) hubStaffSearch.addEventListener("input", () => this.renderHubStaffTable());

        // Hub Students Select All Checkbox
        const hubStudSelectAll = document.getElementById("hubStudentSelectAll");
        if (hubStudSelectAll) {
            hubStudSelectAll.addEventListener("change", (e) => {
                document.querySelectorAll(".hub-stud-checkbox").forEach(cb => cb.checked = e.target.checked);
                this.updateHubStudentBatchBar();
            });
        }

        // Hub Staff Select All Checkbox
        const hubStaffSelectAll = document.getElementById("hubStaffSelectAll");
        if (hubStaffSelectAll) {
            hubStaffSelectAll.addEventListener("change", (e) => {
                document.querySelectorAll(".hub-staff-checkbox").forEach(cb => cb.checked = e.target.checked);
                this.updateHubStaffBatchBar();
            });
        }

        // Batch Delete Buttons in Hub
        const btnHubBatchDeleteStud = document.getElementById("btnHubBatchDeleteStudents");
        if (btnHubBatchDeleteStud) {
            btnHubBatchDeleteStud.addEventListener("click", () => this.batchDeleteHubStudents());
        }

        const btnHubBatchDeleteStaff = document.getElementById("btnHubBatchDeleteStaff");
        if (btnHubBatchDeleteStaff) {
            btnHubBatchDeleteStaff.addEventListener("click", () => this.batchDeleteHubStaff());
        }
    }

    renderManageMembersHub() {
        const nextStudNo = `PBE-2026-${String(this.state.students.length + 1).padStart(3, "0")}`;
        const admInput = document.getElementById("qaStudAdmissionNo");
        if (admInput) admInput.value = nextStudNo;

        this.renderHubStudentsTable();
        this.renderHubStaffTable();
    }

    quickAddStudent() {
        const firstName = document.getElementById("qaStudFirstName").value.trim();
        const lastName = document.getElementById("qaStudLastName").value.trim();
        const className = document.getElementById("qaStudClass").value;
        const gender = document.getElementById("qaStudGender").value;
        const dob = document.getElementById("qaStudDOB").value;
        let admissionNo = document.getElementById("qaStudAdmissionNo").value.trim();
        const guardianName = document.getElementById("qaStudGuardianName").value.trim();
        const guardianPhone = document.getElementById("qaStudGuardianPhone").value.trim();
        const medical = document.getElementById("qaStudMedical").value.trim();

        if (!admissionNo) {
            admissionNo = `PBE-2026-${String(this.state.students.length + 1).padStart(3, "0")}`;
        }

        const gradients = [
            "linear-gradient(135deg, #06b6d4, #3b82f6)",
            "linear-gradient(135deg, #ec4899, #8b5cf6)",
            "linear-gradient(135deg, #10b981, #059669)",
            "linear-gradient(135deg, #f59e0b, #d97706)",
            "linear-gradient(135deg, #6366f1, #a855f7)"
        ];

        const newStudent = {
            id: "std-" + Date.now(),
            admissionNo,
            firstName,
            lastName,
            class: className,
            gender,
            dob,
            guardianName,
            guardianPhone,
            address: "Campus Residence",
            medical: medical || "None (Healthy)",
            feeTotal: 300,
            feePaid: 0,
            status: "Active",
            avatarBg: gradients[Math.floor(Math.random() * gradients.length)]
        };

        this.state.students.unshift(newStudent);
        this.saveState();

        document.getElementById("quickAddStudentForm").reset();
        const nextNo = `PBE-2026-${String(this.state.students.length + 1).padStart(3, "0")}`;
        document.getElementById("qaStudAdmissionNo").value = nextNo;

        this.renderHubStudentsTable();
        this.renderStudentsTable();
        this.renderDashboard();
        this.showToast(`Enrolled new student: ${firstName} ${lastName} (${className})`, "success");
        this.logActivity(`Enrolled student ${firstName} ${lastName}`, "ri-user-add-line", "#10b981");
        this.triggerConfetti();
    }

    quickAddStaff() {
        const name = document.getElementById("qaStaffName").value.trim();
        const role = document.getElementById("qaStaffRole").value.trim();
        const assignedClass = document.getElementById("qaStaffAssignedClass").value;
        const subjects = document.getElementById("qaStaffSubjects").value.trim();
        const phone = document.getElementById("qaStaffPhone").value.trim();
        const email = document.getElementById("qaStaffEmail").value.trim();
        const degree = document.getElementById("qaStaffDegree").value.trim();

        const newStaff = {
            id: "stf-" + Date.now(),
            name,
            role,
            assignedClass,
            subjects,
            phone,
            email,
            degree,
            status: "Active"
        };

        this.state.staff.push(newStaff);
        this.saveState();

        document.getElementById("quickAddStaffForm").reset();
        this.renderHubStaffTable();
        this.renderStaffTable();
        this.renderDashboard();
        this.showToast(`Onboarded new teacher: ${name} (${role})`, "success");
        this.logActivity(`Onboarded teacher ${name}`, "ri-user-star-line", "#06b6d4");
        this.triggerConfetti();
    }

    renderHubStudentsTable() {
        const tbody = document.getElementById("hubStudentsTableBody");
        if (!tbody) return;

        const search = (document.getElementById("hubStudentSearch")?.value || "").toLowerCase().trim();
        const classFilter = document.getElementById("hubStudentClassFilter")?.value || "ALL";

        const pool = (window.SMSAuth && typeof window.SMSAuth.filterRowsByAuthorization === "function") ? window.SMSAuth.filterRowsByAuthorization("students", this.state.students) : this.state.students; // RLS: Filter authorized students
        const filtered = pool.filter(s => { // Filter: Evaluate authorized students
            const matchSearch = !search || // Match: Check search query
                s.firstName.toLowerCase().includes(search) || // Match: First name
                s.lastName.toLowerCase().includes(search) || // Match: Last name
                s.admissionNo.toLowerCase().includes(search); // Match: Admission number
            const matchClass = classFilter === "ALL" || s.class === classFilter; // Match: Class filter
            return matchSearch && matchClass; // Result: Combined match
        }); // End: Filter loop

        if (filtered.length === 0) {
            tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding:1.5rem; color:var(--text-muted);">No student records found.</td></tr>`;
            return;
        }

        tbody.innerHTML = filtered.map(s => `
            <tr>
                <td><input type="checkbox" class="tbl-checkbox hub-stud-checkbox" data-id="${s.id}" onchange="app.updateHubStudentBatchBar()"></td>
                <td>
                    <div style="display:flex; flex-direction:column;">
                        <strong>${s.firstName} ${s.lastName}</strong>
                        <span style="font-family:var(--font-mono); font-size:0.75rem; color:var(--text-muted);">${s.admissionNo}</span>
                    </div>
                </td>
                <td><span class="badge badge-purple">${s.class}</span></td>
                <td><small style="color:var(--text-muted);">${s.guardianPhone}</small></td>
                <td style="text-align:right;">
                    <button class="btn btn-danger btn-sm" onclick="app.confirmRemoveStudent('${s.id}')">
                        <i class="ri-delete-bin-line"></i> Remove
                    </button>
                </td>
            </tr>
        `).join("");

        this.updateHubStudentBatchBar();
    }

    updateHubStudentBatchBar() {
        const checked = document.querySelectorAll(".hub-stud-checkbox:checked");
        const bar = document.getElementById("hubStudentBatchBar");
        const countText = document.getElementById("hubStudentBatchCount");
        if (!bar) return;

        if (checked.length > 0) {
            bar.classList.add("visible");
            if (countText) countText.textContent = `${checked.length} student${checked.length === 1 ? '' : 's'} selected`;
        } else {
            bar.classList.remove("visible");
        }
    }

    batchDeleteHubStudents() {
        const checked = Array.from(document.querySelectorAll(".hub-stud-checkbox:checked")).map(cb => cb.getAttribute("data-id"));
        if (checked.length === 0) return;

        this.showConfirmDeleteModal(
            "Batch Remove Students",
            `Are you sure you want to permanently remove ${checked.length} selected students from the school registry?`,
            `${checked.length} Selected Students`,
            () => {
                this.state.students = this.state.students.filter(s => !checked.includes(s.id));
                this.saveState();
                this.renderHubStudentsTable();
                this.renderStudentsTable();
                this.renderDashboard();
                this.showToast(`Removed ${checked.length} students from the database`, "warning");
                this.logActivity(`Batch removed ${checked.length} students`, "ri-delete-bin-line", "#ef4444");
            }
        );
    }

    confirmRemoveStudent(studentId) { // Method: Prompts delete confirmation for student
        const student = this.state.students.find(s => s.id === studentId); // Find: Locate student record
        if (!student) return; // Guard: Return if not found
        if (window.SMSAuth && !window.SMSAuth.assertRowMutation("students", student, "delete")) return; // RLS: Row authorization mutation guard

        this.showConfirmDeleteModal(
            "Remove Student Record",
            `Are you sure you want to remove student "${student.firstName} ${student.lastName}" (${student.admissionNo}) from the school registry?`,
            `${student.firstName} ${student.lastName} (${student.class})`,
            () => {
                this.state.students = this.state.students.filter(s => s.id !== studentId);
                this.saveState();
                this.renderHubStudentsTable();
                this.renderStudentsTable();
                this.renderDashboard();
                this.showToast(`Removed student: ${student.firstName} ${student.lastName}`, "warning");
                this.logActivity(`Removed student: ${student.firstName} ${student.lastName}`, "ri-delete-bin-line", "#ef4444");
            }
        );
    }

    renderHubStaffTable() {
        const tbody = document.getElementById("hubStaffTableBody");
        if (!tbody) return;

        const search = (document.getElementById("hubStaffSearch")?.value || "").toLowerCase().trim();
        const filtered = this.state.staff.filter(stf => {
            return !search || stf.name.toLowerCase().includes(search) || (stf.role && stf.role.toLowerCase().includes(search));
        });

        if (filtered.length === 0) {
            tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding:1.5rem; color:var(--text-muted);">No faculty records found.</td></tr>`;
            return;
        }

        tbody.innerHTML = filtered.map(stf => `
            <tr>
                <td><input type="checkbox" class="tbl-checkbox hub-staff-checkbox" data-id="${stf.id}" onchange="app.updateHubStaffBatchBar()"></td>
                <td>
                    <strong>${stf.name}</strong>
                </td>
                <td>
                    <div style="font-size:0.8rem;">
                        <span>${stf.role}</span>
                        ${stf.assignedClass !== 'None' ? `<span class="badge badge-purple" style="margin-left:4px;">${stf.assignedClass}</span>` : ''}
                    </div>
                </td>
                <td><small style="color:var(--text-muted);">${stf.phone}</small></td>
                <td style="text-align:right;">
                    <button class="btn btn-danger btn-sm" onclick="app.confirmRemoveStaff('${stf.id}')">
                        <i class="ri-delete-bin-line"></i> Remove
                    </button>
                </td>
            </tr>
        `).join("");

        this.updateHubStaffBatchBar();
    }

    updateHubStaffBatchBar() {
        const checked = document.querySelectorAll(".hub-staff-checkbox:checked");
        const bar = document.getElementById("hubStaffBatchBar");
        const countText = document.getElementById("hubStaffBatchCount");
        if (!bar) return;

        if (checked.length > 0) {
            bar.classList.add("visible");
            if (countText) countText.textContent = `${checked.length} teacher${checked.length === 1 ? '' : 's'} selected`;
        } else {
            bar.classList.remove("visible");
        }
    }

    batchDeleteHubStaff() {
        const checked = Array.from(document.querySelectorAll(".hub-staff-checkbox:checked")).map(cb => cb.getAttribute("data-id"));
        if (checked.length === 0) return;

        this.showConfirmDeleteModal(
            "Batch Remove Teachers",
            `Are you sure you want to remove ${checked.length} selected faculty members?`,
            `${checked.length} Selected Faculty Staff`,
            () => {
                this.state.staff = this.state.staff.filter(s => !checked.includes(s.id));
                this.saveState();
                this.renderHubStaffTable();
                this.renderStaffTable();
                this.renderDashboard();
                this.showToast(`Removed ${checked.length} faculty staff from the database`, "warning");
                this.logActivity(`Batch removed ${checked.length} staff members`, "ri-delete-bin-line", "#ef4444");
            }
        );
    }

    confirmRemoveStaff(staffId) {
        const stf = this.state.staff.find(s => s.id === staffId);
        if (!stf) return;

        this.showConfirmDeleteModal(
            "Remove Faculty Member",
            `Are you sure you want to remove "${stf.name}" (${stf.role}) from the staff registry?`,
            `${stf.name} - ${stf.role}`,
            () => {
                this.state.staff = this.state.staff.filter(s => s.id !== staffId);
                this.saveState();
                this.renderHubStaffTable();
                this.renderStaffTable();
                this.renderDashboard();
                this.showToast(`Removed staff member: ${stf.name}`, "warning");
                this.logActivity(`Removed teacher: ${stf.name}`, "ri-delete-bin-line", "#ef4444");
            }
        );
    }

    // ========================================================================
    // 6. Module: Students Registry CRUD
    // ========================================================================
    bindStudentEvents() {
        const btnAdd = document.getElementById("btnAddStudent");
        if (btnAdd) {
            btnAdd.addEventListener("click", () => this.openStudentModal());
        }

        const form = document.getElementById("studentForm");
        if (form) {
            form.addEventListener("submit", (e) => {
                e.preventDefault();
                this.saveStudentFromForm();
            });
        }

        const searchInput = document.getElementById("studentSearchInput");
        const classFilter = document.getElementById("studentClassFilter");
        const genderFilter = document.getElementById("studentGenderFilter");
        const feeFilter = document.getElementById("studentFeeFilter");

        [searchInput, classFilter, genderFilter, feeFilter].forEach(el => {
            if (el) {
                el.addEventListener("input", () => this.renderStudentsTable());
                el.addEventListener("change", () => this.renderStudentsTable());
            }
        });

        const selectAllMain = document.getElementById("mainStudentSelectAll");
        if (selectAllMain) {
            selectAllMain.addEventListener("change", (e) => {
                document.querySelectorAll(".main-stud-checkbox").forEach(cb => cb.checked = e.target.checked);
                this.updateMainStudentBatchBar();
            });
        }

        const btnMainBatchDelete = document.getElementById("btnMainBatchDeleteStudents");
        if (btnMainBatchDelete) {
            btnMainBatchDelete.addEventListener("click", () => this.batchDeleteMainStudents());
        }

        const btnExport = document.getElementById("btnExportStudentsCSV");
        if (btnExport) {
            btnExport.addEventListener("click", () => this.exportStudentsCSV());
        }
    }

    getFilteredStudents() { // Method: Retrieves filtered students matching search and filters
        const search = (document.getElementById("studentSearchInput")?.value || "").toLowerCase().trim(); // Filter: Search keyword
        const selectedClass = document.getElementById("studentClassFilter")?.value || "ALL"; // Filter: Selected class
        const selectedGender = document.getElementById("studentGenderFilter")?.value || "ALL"; // Filter: Selected gender
        const selectedFee = document.getElementById("studentFeeFilter")?.value || "ALL"; // Filter: Selected fee status
        const authorizedPool = (window.SMSAuth && typeof window.SMSAuth.filterRowsByAuthorization === "function") ? window.SMSAuth.filterRowsByAuthorization("students", this.state.students) : this.state.students; // RLS: Row-Level Security filter
        return authorizedPool.filter(s => { // Filter: Evaluate each authorized student row
            const matchSearch = !search ||
                s.firstName.toLowerCase().includes(search) ||
                s.lastName.toLowerCase().includes(search) ||
                s.admissionNo.toLowerCase().includes(search) ||
                (s.guardianPhone && s.guardianPhone.includes(search)) ||
                (s.guardianName && s.guardianName.toLowerCase().includes(search));

            const matchClass = selectedClass === "ALL" || s.class === selectedClass;
            const matchGender = selectedGender === "ALL" || s.gender === selectedGender;

            let feeStatus = "Paid";
            if ((s.feePaid || 0) === 0) feeStatus = "Overdue";
            else if ((s.feePaid || 0) < (s.feeTotal || 0)) feeStatus = "Partial";

            const matchFee = selectedFee === "ALL" || feeStatus === selectedFee;

            return matchSearch && matchClass && matchGender && matchFee;
        });
    }

    renderStudentsTable() {
        const tbody = document.getElementById("studentsTableBody");
        const countBadge = document.getElementById("studentTableCountBadge");
        if (!tbody) return;

        const students = this.getFilteredStudents();
        if (countBadge) countBadge.textContent = `Showing ${students.length} student${students.length === 1 ? '' : 's'}`;

        if (students.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="9" style="text-align:center; padding: 2.5rem; color: var(--text-muted);">
                        <i class="ri-user-unfollow-line" style="font-size:2rem; display:block; margin-bottom:0.5rem;"></i>
                        No student records match the selected filters.
                    </td>
                </tr>
            `;
            return;
        }

        tbody.innerHTML = students.map(s => {
            const initials = `${s.firstName[0] || ''}${s.lastName[0] || ''}`.toUpperCase();
            const balance = (s.feeTotal || 0) - (s.feePaid || 0);
            let feeBadge = `<span class="badge badge-success">Paid (GHC 0)</span>`;
            if (balance > 0 && s.feePaid > 0) {
                feeBadge = `<span class="badge badge-warning">Partial (-GHC ${balance})</span>`;
            } else if (balance > 0 && s.feePaid === 0) {
                feeBadge = `<span class="badge badge-danger">Arrears (GHC ${balance})</span>`;
            }

            return `
                <tr>
                    <td><input type="checkbox" class="tbl-checkbox main-stud-checkbox" data-id="${s.id}" onchange="app.updateMainStudentBatchBar()"></td>
                    <td>
                        <div class="user-cell">
                            <div class="user-avatar-cell" style="background: ${s.avatarBg || 'var(--primary-gradient)'}; overflow: hidden; padding: 0;">
                                ${s.photo ? `<img src="${s.photo}" alt="${s.firstName}" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;">` : initials}
                            </div>
                            <div class="user-names">
                                <h4>${s.firstName} ${s.lastName}</h4>
                                <span>${s.medical || 'No allergy'}</span>
                            </div>
                        </div>
                    </td>
                    <td><strong style="font-family:var(--font-mono); font-size:0.8rem;">${s.admissionNo}</strong></td>
                    <td><span class="badge badge-purple">${s.class}</span></td>
                    <td>${s.gender} • ${this.calculateAge(s.dob)} yrs</td>
                    <td>
                        <div style="display:flex; flex-direction:column;">
                            <span style="font-weight:600; font-size:0.82rem;">${s.guardianName || 'Guardian'}</span>
                            <span style="font-size:0.75rem; color:var(--text-muted);">${s.guardianPhone}</span>
                        </div>
                    </td>
                    <td>${feeBadge}</td>
                    <td><span class="badge badge-success">${s.status}</span></td>
                    <td style="text-align: right;">
                        <div class="table-actions" style="justify-content: flex-end;">
                            <button class="btn-table-action" title="Capture / Change ID Photo" onclick="app.launchStudioForEntity('student', '${s.id}')"> <!-- Action: Capture ID Photo -->
                                <i class="ri-camera-fill"></i> <!-- Icon: Camera glyph -->
                            </button> <!-- End action -->
                            <button class="btn-table-action" title="View Digital ID Card" onclick="app.viewStudentIDCard('${s.id}')">
                                <i class="ri-id-card-line"></i>
                            </button>
                            <button class="btn-table-action" title="Generate Terminal Report Card" onclick="app.viewReportCard('${s.id}')">
                                <i class="ri-file-text-line"></i>
                            </button>
                            <button class="btn-table-action" title="Edit Student Profile" onclick="app.openStudentModal('${s.id}')">
                                <i class="ri-edit-line"></i>
                            </button>
                            <button class="btn-table-action delete" title="Remove Student" onclick="app.confirmRemoveStudent('${s.id}')">
                                <i class="ri-delete-bin-line"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        }).join("");

        this.updateMainStudentBatchBar();
    }

    updateMainStudentBatchBar() {
        const checked = document.querySelectorAll(".main-stud-checkbox:checked");
        const bar = document.getElementById("mainStudentBatchBar");
        const countText = document.getElementById("mainStudentBatchCount");
        if (!bar) return;

        if (checked.length > 0) {
            bar.classList.add("visible");
            if (countText) countText.textContent = `${checked.length} student${checked.length === 1 ? '' : 's'} selected`;
        } else {
            bar.classList.remove("visible");
        }
    }

    batchDeleteMainStudents() { // Method: Batch removes selected students
        const checked = Array.from(document.querySelectorAll(".main-stud-checkbox:checked")).map(cb => cb.getAttribute("data-id")); // Selection: Checked IDs
        if (checked.length === 0) return; // Guard: Return if empty
        for (const id of checked) { // Loop: Check row authorization for each student
            const student = this.state.students.find(s => s.id === id); // Find: Student record
            if (window.SMSAuth && !window.SMSAuth.assertRowMutation("students", student, "delete")) return; // RLS: Validate row mutation
        } // End: Loop

        this.showConfirmDeleteModal(
            "Batch Delete Students",
            `Are you sure you want to delete ${checked.length} selected student records?`,
            `${checked.length} Students Selected`,
            () => {
                this.state.students = this.state.students.filter(s => !checked.includes(s.id));
                this.saveState();
                this.renderStudentsTable();
                this.renderHubStudentsTable();
                this.renderDashboard();
                this.showToast(`Deleted ${checked.length} students from the database`, "warning");
                this.logActivity(`Batch deleted ${checked.length} students`, "ri-delete-bin-line", "#ef4444");
            }
        );
    }

    calculateAge(dobStr) {
        if (!dobStr) return "N/A";
        const dob = new Date(dobStr);
        const diff = Date.now() - dob.getTime();
        const ageDate = new Date(diff);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    openStudentModal(studentId = null) { // Method: Opens modal to add or edit student profile
        const form = document.getElementById("studentForm"); // Form: Student form
        const title = document.getElementById("modalStudentTitle"); // Title: Modal title
        const editId = document.getElementById("studentEditId"); // Field: Hidden edit ID
        if (form) form.reset(); // Reset: Reset form inputs
        this.resetStudentPhotoUI(); // UI: Reset student photo preview and hidden field
        if (studentId) { // Check: If editing student
            const student = this.state.students.find(s => s.id === studentId); // Find: Student record
            if (window.SMSAuth && !window.SMSAuth.assertRowMutation("students", student, "update")) return; // RLS: Validate edit permission
            if (student) {
                if (title) title.innerHTML = `<i class="ri-edit-line"></i> Edit Student: ${student.firstName} ${student.lastName}`;
                if (editId) editId.value = student.id;

                document.getElementById("studFirstName").value = student.firstName;
                document.getElementById("studLastName").value = student.lastName;
                document.getElementById("studClass").value = student.class;
                document.getElementById("studGender").value = student.gender;
                document.getElementById("studDOB").value = student.dob || "2018-01-01";
                document.getElementById("studAdmissionNo").value = student.admissionNo;
                document.getElementById("studGuardianName").value = student.guardianName;
                document.getElementById("studGuardianPhone").value = student.guardianPhone;
                document.getElementById("studAddress").value = student.address || "";
                document.getElementById("studMedical").value = student.medical || "";
                if (student.photo) { // Check: If student has a profile photo
                    this.setStudentPhoto(student.photo); // UI: Set existing student photo in form
                } // End if
            }
        } else {
            if (title) title.innerHTML = `<i class="ri-user-add-line"></i> Add New Student`;
            if (editId) editId.value = "";
            const nextNo = `PBE-2026-${String(this.state.students.length + 1).padStart(3, "0")}`;
            document.getElementById("studAdmissionNo").value = nextNo;
        }

        this.openModal("modalStudent");
    }

    saveStudentFromForm() { // Method: Persists student record from modal form
        const editId = document.getElementById("studentEditId").value; // Field: Student ID for edits
        const firstName = document.getElementById("studFirstName").value.trim(); // Field: First Name
        const lastName = document.getElementById("studLastName").value.trim(); // Field: Last Name
        const className = document.getElementById("studClass").value; // Field: Class Grade
        const gender = document.getElementById("studGender").value; // Field: Gender
        const dob = document.getElementById("studDOB").value; // Field: Date of Birth
        let admissionNo = document.getElementById("studAdmissionNo").value.trim(); // Field: Admission Number
        const guardianName = document.getElementById("studGuardianName").value.trim(); // Field: Guardian Full Name
        const guardianPhone = document.getElementById("studGuardianPhone").value.trim(); // Field: Guardian Phone
        const address = document.getElementById("studAddress").value.trim(); // Field: Residential Address
        const medical = document.getElementById("studMedical").value.trim(); // Field: Medical Notes
        const photo = document.getElementById("studentPhotoData") ? document.getElementById("studentPhotoData").value : ""; // Photo: Base64 identification photo

        if (!admissionNo) {
            admissionNo = `PBE-2026-${String(this.state.students.length + 1).padStart(3, "0")}`;
        }

        if (editId) { // Check: If updating existing student row
            const existing = this.state.students.find(s => s.id === editId); // Find: Existing student record
            if (window.SMSAuth && !window.SMSAuth.assertRowMutation("students", existing, "update")) return; // RLS: Mutation guard
            if (window.SMSAuth && !window.SMSAuth.assertRowMutation("students", { class: className }, "update")) return; // RLS: Class guard
            const index = this.state.students.findIndex(s => s.id === editId); // Index: Locate index
            if (index !== -1) {
                this.state.students[index] = {
                    ...this.state.students[index],
                    firstName,
                    lastName,
                    class: className,
                    gender,
                    dob,
                    admissionNo,
                    guardianName,
                    guardianPhone,
                    address,
                    medical,
                    photo: photo || existing.photo || ""
                };
                this.showToast(`Updated student profile for ${firstName} ${lastName}`, "success");
                this.logActivity(`Updated student ${firstName} ${lastName}`, "ri-edit-line", "#3b82f6");
            }
        } else { // Else: Creating new student record
            if (window.SMSAuth && !window.SMSAuth.assertRowMutation("students", { class: className }, "create")) return; // RLS: Creation guard
            const gradients = [
                "linear-gradient(135deg, #06b6d4, #3b82f6)",
                "linear-gradient(135deg, #ec4899, #8b5cf6)",
                "linear-gradient(135deg, #10b981, #059669)",
                "linear-gradient(135deg, #f59e0b, #d97706)",
                "linear-gradient(135deg, #6366f1, #a855f7)"
            ];
            const newStudent = {
                id: "std-" + Date.now(),
                admissionNo,
                firstName,
                lastName,
                class: className,
                gender,
                dob,
                guardianName,
                guardianPhone,
                address,
                medical: medical || "None (Healthy)",
                feeTotal: 300,
                feePaid: 0,
                status: "Active",
                avatarBg: gradients[Math.floor(Math.random() * gradients.length)],
                photo: photo || ""
            };
            this.state.students.unshift(newStudent);
            this.showToast(`Successfully enrolled new student: ${firstName} ${lastName}`, "success");
            this.logActivity(`Enrolled student ${firstName} ${lastName} (${className})`, "ri-user-add-line", "#10b981");
            this.triggerConfetti();
        }

        this.saveState();
        this.closeModal("modalStudent");
        this.renderStudentsTable();
        this.renderHubStudentsTable();
        this.renderDashboard();
    }

    viewStudentIDCard(studentId) {
        const student = this.state.students.find(s => s.id === studentId);
        if (!student) return;

        document.getElementById("idCardSchoolName").textContent = this.state.schoolProfile.name;
        document.getElementById("idCardStudentName").textContent = `${student.firstName} ${student.lastName}`;
        document.getElementById("idCardClass").textContent = `${student.class} • Basic Student`;
        document.getElementById("idCardAdmNo").textContent = student.admissionNo;
        document.getElementById("idCardGender").textContent = student.gender;
        document.getElementById("idCardDOB").textContent = student.dob || "N/A";
        document.getElementById("idCardEmergency").textContent = student.guardianPhone || "N/A";

        const initials = `${student.firstName[0] || ''}${student.lastName[0] || ''}`.toUpperCase(); // Initials: Two-letter initials
        const avatarEl = document.getElementById("idCardAvatar"); // Element: ID badge avatar container
        if (avatarEl) { // Check: If avatar container exists
            if (student.photo) { // Check: If student has captured identification photo
                avatarEl.innerHTML = `<img src="${student.photo}" alt="${student.firstName}" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;">`; // Image: Render photo
                avatarEl.style.background = 'transparent'; // Background: Transparent for photo
            } else { // Fallback: Render initials avatar
                avatarEl.textContent = initials; // Initials: Render initials
                avatarEl.style.background = student.avatarBg || "var(--accent-gradient)"; // Background: Colored gradient
            } // End if/else
        } // End if

        this.openModal("modalIDCard");
    }

    // ========================================================================
    // 7. Module: Teachers & Staff
    // ========================================================================
    bindStaffEvents() {
        const btnAdd = document.getElementById("btnAddStaff");
        if (btnAdd) {
            btnAdd.addEventListener("click", () => this.openStaffModal());
        }

        const form = document.getElementById("staffForm");
        if (form) {
            form.addEventListener("submit", (e) => {
                e.preventDefault();
                this.saveStaffFromForm();
            });
        }
    }

    renderStaffTable() {
        const tbody = document.getElementById("staffTableBody");
        if (!tbody) return;

        tbody.innerHTML = this.state.staff.map(t => {
            const initials = t.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
            return `
                <tr>
                    <td>
                        <div class="user-cell">
                            <div class="user-avatar-cell" style="background: linear-gradient(135deg, #10b981, #06b6d4); overflow: hidden; padding: 0;">
                                ${t.photo ? `<img src="${t.photo}" alt="${t.name}" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;">` : initials}
                            </div>
                            <div class="user-names">
                                <h4>${t.name}</h4>
                                <span>${t.role}</span>
                            </div>
                        </div>
                    </td>
                    <td><strong>${t.role}</strong></td>
                    <td><span class="badge badge-purple">${t.assignedClass || 'Subject Teacher'}</span></td>
                    <td>${t.subjects || 'General'}</td>
                    <td>
                        <div style="font-size:0.8rem;">
                            <div>${t.phone}</div>
                            <span style="color:var(--text-muted); font-size:0.72rem;">${t.email}</span>
                        </div>
                    </td>
                    <td><small style="color:var(--text-secondary);">${t.degree || 'B.Ed'}</small></td>
                    <td><span class="badge badge-success">${t.status || 'Active'}</span></td>
                    <td style="text-align: right;">
                        <div class="table-actions" style="justify-content: flex-end;">
                            <button class="btn-table-action" title="View Digital Faculty ID Card" onclick="app.viewStaffIDCard('${t.id}')"> <!-- Action: View ID Card -->
                                <i class="ri-id-card-line"></i> <!-- Icon: ID Card -->
                            </button> <!-- End action -->
                            <button class="btn-table-action" title="Capture / Change ID Photo" onclick="app.launchStudioForEntity('staff', '${t.id}')"> <!-- Action: Capture ID Photo -->
                                <i class="ri-camera-fill"></i> <!-- Icon: Camera glyph -->
                            </button> <!-- End action -->
                            <button class="btn-table-action" title="Edit Teacher" onclick="app.openStaffModal('${t.id}')">
                                <i class="ri-edit-line"></i>
                            </button>
                            <button class="btn-table-action delete" title="Delete Staff" onclick="app.confirmRemoveStaff('${t.id}')">
                                <i class="ri-delete-bin-line"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        }).join("");
    }

    openStaffModal(staffId = null) { // Method: Opens modal to add or edit staff member
        const form = document.getElementById("staffForm"); // Form: Staff form
        const title = document.getElementById("modalStaffTitle"); // Title: Modal title
        const editId = document.getElementById("staffEditId"); // Field: Hidden staff ID
        if (form) form.reset(); // Reset: Reset form inputs
        this.resetStaffPhotoUI(); // UI: Reset staff photo preview and hidden field

        if (staffId) {
            const stf = this.state.staff.find(s => s.id === staffId);
            if (stf) {
                if (title) title.innerHTML = `<i class="ri-edit-line"></i> Edit Teacher: ${stf.name}`;
                if (editId) editId.value = stf.id;
                document.getElementById("staffName").value = stf.name;
                document.getElementById("staffRole").value = stf.role;
                document.getElementById("staffAssignedClass").value = stf.assignedClass || "None";
                document.getElementById("staffSubjects").value = stf.subjects || "";
                document.getElementById("staffPhone").value = stf.phone || "";
                document.getElementById("staffEmail").value = stf.email || "";
                document.getElementById("staffDegree").value = stf.degree || "";
                if (stf.photo) { // Check: If staff has a profile photo
                    this.setStaffPhoto(stf.photo); // UI: Set existing staff photo in form
                } // End if
            }
        } else {
            if (title) title.innerHTML = `<i class="ri-user-add-line"></i> Add New Teacher / Staff`;
            if (editId) editId.value = "";
        }

        this.openModal("modalStaff");
    }

    saveStaffFromForm() { // Method: Persists teacher / staff record from form
        const editId = document.getElementById("staffEditId").value; // Field: Staff ID for edits
        const name = document.getElementById("staffName").value.trim(); // Field: Full Name
        const role = document.getElementById("staffRole").value.trim(); // Field: Role
        const assignedClass = document.getElementById("staffAssignedClass").value; // Field: Assigned Class
        const subjects = document.getElementById("staffSubjects").value.trim(); // Field: Subjects
        const phone = document.getElementById("staffPhone").value.trim(); // Field: Phone
        const email = document.getElementById("staffEmail").value.trim(); // Field: Email
        const degree = document.getElementById("staffDegree").value.trim(); // Field: Qualification
        const photo = document.getElementById("staffPhotoData") ? document.getElementById("staffPhotoData").value : ""; // Photo: Base64 faculty identification photo

        if (editId) {
            const index = this.state.staff.findIndex(s => s.id === editId);
            if (index !== -1) {
                this.state.staff[index] = {
                    ...this.state.staff[index],
                    name, role, assignedClass, subjects, phone, email, degree,
                    photo: photo || existing.photo || ""
                };
                this.showToast(`Updated staff record for ${name}`, "success");
            }
        } else {
            const newStaff = {
                id: "stf-" + Date.now(),
                name,
                role,
                assignedClass,
                subjects,
                phone,
                email,
                degree,
                status: "Active",
                photo: photo || ""
            };
            this.state.staff.push(newStaff);
            this.showToast(`Added new staff member: ${name}`, "success");
            this.logActivity(`Added staff member: ${name} (${role})`, "ri-user-add-line", "#10b981");
        }

        this.saveState();
        this.closeModal("modalStaff");
        this.renderStaffTable();
        this.renderHubStaffTable();
        this.renderDashboard();
    }

    // ========================================================================
    // 8. Module: Classes & Timetable Schedule Overview
    // ========================================================================
    bindClassesTimetableEvents() {
        const tabRoster = document.getElementById("tabClassesRoster");
        const tabTimetable = document.getElementById("tabClassesTimetable");
        const subRoster = document.getElementById("subViewClassesGrid");
        const subTimetable = document.getElementById("subViewClassesTimetable");
        const classSelect = document.getElementById("timetableClassSelect");

        if (tabRoster && tabTimetable) {
            tabRoster.addEventListener("click", () => {
                tabRoster.classList.add("active");
                tabTimetable.classList.remove("active");
                if (subRoster) subRoster.style.display = "block";
                if (subTimetable) subTimetable.style.display = "none";
                this.renderClassesGrid();
            });

            tabTimetable.addEventListener("click", () => {
                tabTimetable.classList.add("active");
                tabRoster.classList.remove("active");
                if (subRoster) subRoster.style.display = "none";
                if (subTimetable) subTimetable.style.display = "block";
                this.renderClassTimetable(classSelect?.value || "Primary 1");
            });
        }

        if (classSelect) {
            classSelect.addEventListener("change", (e) => {
                this.renderClassTimetable(e.target.value);
            });
        }

        const ttForm = document.getElementById("timetableSlotForm");
        if (ttForm) {
            ttForm.addEventListener("submit", (e) => {
                e.preventDefault();
                this.saveTimetableSlotFromForm();
            });
        }
    }

    renderClassesGrid() {
        const container = document.getElementById("classesGridContainer");
        if (!container) return;

        container.innerHTML = this.state.classes.map(c => {
            const enrolled = this.state.students.filter(s => s.class === c.name);
            const males = enrolled.filter(s => s.gender === "Male").length;
            const females = enrolled.filter(s => s.gender === "Female").length;

            return `
                <div class="class-card">
                    <div class="class-card-header">
                        <span class="class-tag">${c.name}</span>
                        <span class="class-stage-pill">${c.stage}</span>
                    </div>

                    <div class="class-meta-row">
                        <i class="ri-user-star-line"></i>
                        <span>Class Master: <strong>${c.teacher}</strong></span>
                    </div>
                    <div class="class-meta-row">
                        <i class="ri-map-pin-line"></i>
                        <span>Room: ${c.room}</span>
                    </div>

                    <div class="class-stats-strip">
                        <div class="stat-item">
                            <span class="stat-label">Enrolled</span>
                            <span class="stat-num" style="color:var(--primary-light);">${enrolled.length} / ${c.capacity}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Boys</span>
                            <span class="stat-num">${males}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Girls</span>
                            <span class="stat-num">${females}</span>
                        </div>
                    </div>

                    <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.5rem;">
                        <button class="btn btn-secondary btn-sm" onclick="app.filterStudentsByClass('${c.name}')">
                            <i class="ri-group-line"></i> Roster
                        </button>
                        <button class="btn btn-outline btn-sm" onclick="app.viewClassScheduleDirect('${c.name}')">
                            <i class="ri-calendar-2-line"></i> Timetable
                        </button>
                    </div>
                </div>
            `;
        }).join("");
    }

    viewClassScheduleDirect(className) {
        const tabTimetable = document.getElementById("tabClassesTimetable");
        const tabRoster = document.getElementById("tabClassesRoster");
        const subRoster = document.getElementById("subViewClassesGrid");
        const subTimetable = document.getElementById("subViewClassesTimetable");
        const classSelect = document.getElementById("timetableClassSelect");

        if (tabTimetable && tabRoster) {
            tabTimetable.classList.add("active");
            tabRoster.classList.remove("active");
            if (subRoster) subRoster.style.display = "none";
            if (subTimetable) subTimetable.style.display = "block";
        }
        if (classSelect) {
            classSelect.value = className;
        }
        this.renderClassTimetable(className);
    }

    renderClassTimetable(className = "Primary 1") {
        const tbody = document.getElementById("timetableGridBody");
        if (!tbody) return;

        if (!this.state.timetables) this.state.timetables = {};
        let classTT = this.state.timetables[className];

        const defaultPeriods = [
            { time: "08:00 - 09:00", name: "Period 1" },
            { time: "09:00 - 10:00", name: "Period 2" },
            { time: "10:00 - 10:30", name: "Snack Break", isBreak: true },
            { time: "10:30 - 11:30", name: "Period 3" },
            { time: "11:30 - 12:30", name: "Period 4" },
            { time: "12:30 - 01:30", name: "Lunch & Rest", isBreak: true },
            { time: "01:30 - 02:45", name: "Period 5" }
        ];

        const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
        const subjectsPool = ["English Language", "Mathematics", "Integrated Science", "Social Studies", "Computing / ICT", "Creative Arts", "R.M.E", "French"];
        const classMaster = this.state.classes.find(c => c.name === className)?.teacher || "Class Master";

        if (!classTT) {
            classTT = {
                periods: defaultPeriods,
                schedule: {}
            };
            days.forEach((day, dIdx) => {
                classTT.schedule[day] = defaultPeriods.map((p, pIdx) => {
                    if (p.isBreak) return { subject: p.name, teacher: "" };
                    const sub = subjectsPool[(dIdx * 2 + pIdx) % subjectsPool.length];
                    return { subject: sub, teacher: classMaster };
                });
            });
            this.state.timetables[className] = classTT;
            this.saveState();
        }

        const periods = classTT.periods || defaultPeriods;

        tbody.innerHTML = periods.map((p, pIdx) => {
            const timeCell = `<td class="timetable-time-cell"><strong>${p.name}</strong><br><span style="font-size:0.7rem;">${p.time}</span></td>`;

            const dayCells = days.map(day => {
                const slot = (classTT.schedule && classTT.schedule[day] && classTT.schedule[day][pIdx]) || { subject: "Free Period", teacher: "" };
                if (p.isBreak || slot.subject.toLowerCase().includes("break") || slot.subject.toLowerCase().includes("lunch")) {
                    return `
                        <td>
                            <div class="timetable-period-box break-slot">
                                <span style="font-size:0.75rem; font-weight:700; color:var(--warning);"><i class="ri-cup-line"></i> ${slot.subject}</span>
                            </div>
                        </td>
                    `;
                }

                return `
                    <td>
                        <div class="timetable-period-box" onclick="app.openEditTimetableSlotModal('${className}', '${day}', ${pIdx}, '${slot.subject}', '${slot.teacher || classMaster}')">
                            <span class="timetable-subject-name">${slot.subject}</span>
                            <span class="timetable-teacher-name"><i class="ri-user-line"></i> ${slot.teacher || classMaster}</span>
                        </div>
                    </td>
                `;
            }).join("");

            return `<tr>${timeCell}${dayCells}</tr>`;
        }).join("");
    }

    openEditTimetableSlotModal(className, day, periodIndex, currentSubject, currentTeacher) {
        document.getElementById("ttSlotDay").value = `${className}|${day}`;
        document.getElementById("ttSlotPeriod").value = periodIndex;
        document.getElementById("ttSlotLabel").textContent = `${className} — ${day} (Period ${periodIndex + 1})`;
        document.getElementById("ttSlotSubject").value = currentSubject;
        document.getElementById("ttSlotTeacher").value = currentTeacher;
        this.openModal("modalEditTimetableSlot");
    }

    saveTimetableSlotFromForm() {
        const rawDay = document.getElementById("ttSlotDay").value;
        const [className, day] = rawDay.split("|");
        const periodIdx = parseInt(document.getElementById("ttSlotPeriod").value, 10);
        const subject = document.getElementById("ttSlotSubject").value.trim();
        const teacher = document.getElementById("ttSlotTeacher").value.trim();

        if (this.state.timetables && this.state.timetables[className] && this.state.timetables[className].schedule[day]) {
            this.state.timetables[className].schedule[day][periodIdx] = { subject, teacher };
            this.saveState();
            this.closeModal("modalEditTimetableSlot");
            this.renderClassTimetable(className);
            this.showToast(`Updated timetable for ${className} (${day})`, "success");
            this.logActivity(`Updated ${className} schedule: ${subject}`, "ri-calendar-line", "#6366f1");
        }
    }

    filterStudentsByClass(className) {
        this.switchView("studentsView");
        const classFilter = document.getElementById("studentClassFilter");
        if (classFilter) {
            classFilter.value = className;
            this.renderStudentsTable();
        }
    }

    // ========================================================================
    // 8b. Companion Integration: Sync from AdmitME Portal
    // ========================================================================
    bindAdmitMESyncEvents() {
        const btnHubSync = document.getElementById("btnHubSyncAdmitME");
        const btnStudSync = document.getElementById("btnSyncAdmitME");

        if (btnHubSync) {
            btnHubSync.addEventListener("click", () => this.syncFromAdmitME());
        }
        if (btnStudSync) {
            btnStudSync.addEventListener("click", () => this.syncFromAdmitME());
        }
    }

    syncFromAdmitME() {
        try {
            const raw = localStorage.getItem("edu_enroll_students_db");
            if (!raw) {
                this.showToast("No applicant database found in AdmitME portal yet. Open AdmitME to submit applications.", "info");
                return;
            }
            const applicants = JSON.parse(raw);
            if (!Array.isArray(applicants) || applicants.length === 0) {
                this.showToast("No candidate records found to import.", "warning");
                return;
            }

            let syncedCount = 0;
            const gradients = [
                "linear-gradient(135deg, #06b6d4, #3b82f6)",
                "linear-gradient(135deg, #ec4899, #8b5cf6)",
                "linear-gradient(135deg, #10b981, #059669)",
                "linear-gradient(135deg, #f59e0b, #d97706)",
                "linear-gradient(135deg, #6366f1, #a855f7)"
            ];

            applicants.forEach(appRecord => {
                const fName = (appRecord.firstName || "").trim();
                const lName = (appRecord.lastName || "").trim();
                if (!fName || !lName) return;

                const alreadyExists = this.state.students.some(s =>
                    s.firstName.toLowerCase() === fName.toLowerCase() &&
                    s.lastName.toLowerCase() === lName.toLowerCase()
                );

                if (!alreadyExists) {
                    const nextNo = `PBE-2026-${String(this.state.students.length + 1).padStart(3, "0")}`;
                    const newStudent = {
                        id: "std-" + Date.now() + "-" + Math.floor(Math.random() * 1000),
                        admissionNo: nextNo,
                        firstName: fName,
                        lastName: lName,
                        class: appRecord.PrimaryApplying || "Primary 1",
                        gender: appRecord.gender || "Male",
                        dob: appRecord.dob || "2018-05-15",
                        guardianName: appRecord.guardianName || "Parent / Guardian",
                        guardianPhone: appRecord.guardianPhone || "+233 24 000 0000",
                        address: appRecord.residentialAddress || "Campus Residence",
                        medical: appRecord.allergies || "None (Healthy)",
                        feeTotal: 300,
                        feePaid: 0,
                        status: "Active",
                        avatarBg: gradients[Math.floor(Math.random() * gradients.length)]
                    };
                    this.state.students.unshift(newStudent);
                    syncedCount++;
                }
            });

            if (syncedCount > 0) {
                this.saveState();
                this.renderAllViews();
                this.showToast(`Enrolled ${syncedCount} applicant${syncedCount === 1 ? '' : 's'} from AdmitME into SMS registry!`, "success");
                this.logActivity(`Synced ${syncedCount} admitted candidates from AdmitME`, "ri-refresh-line", "#10b981");
                this.triggerConfetti();
            } else {
                this.showToast("All candidates in AdmitME are already enrolled in the SMS database.", "info");
            }
        } catch (e) {
            console.error("Failed to sync from AdmitME:", e);
            this.showToast("Failed to read AdmitME database.", "danger");
        }
    }

    // ========================================================================
    // 8c. Attendance Register Sheet Printing
    // ========================================================================
    bindAttendanceSheetEvents() {
        const btnPrintReg = document.getElementById("btnPrintAttendanceRegister");
        if (btnPrintReg) {
            btnPrintReg.addEventListener("click", () => this.openPrintAttendanceSheetModal());
        }
    }

    openPrintAttendanceSheetModal() {
        const cls = document.getElementById("attClassSelect")?.value || "Primary 1";
        const students = this.state.students.filter(s => s.class === cls && s.status === "Active");
        const classObj = this.state.classes.find(c => c.name === cls) || { teacher: "Class Teacher" };

        const nameEl = document.getElementById("printAttClassName");
        const badgeEl = document.getElementById("printAttClassBadge");
        const teacherEl = document.getElementById("printAttTeacherName");
        const dateEl = document.getElementById("printAttWeekDate");

        if (nameEl) nameEl.textContent = cls;
        if (badgeEl) badgeEl.textContent = cls;
        if (teacherEl) teacherEl.textContent = classObj.teacher;
        if (dateEl) dateEl.textContent = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

        const tbody = document.getElementById("printAttTableBody");
        if (tbody) {
            if (students.length === 0) {
                tbody.innerHTML = `<tr><td colspan="11" style="text-align:center; padding:1.5rem; color:#64748b;">No active students in ${cls}.</td></tr>`;
            } else {
                tbody.innerHTML = students.map((s, idx) => `
                    <tr>
                        <td style="text-align:center;">${idx + 1}</td>
                        <td><strong>${s.firstName} ${s.lastName}</strong></td>
                        <td style="font-family:var(--font-mono); font-size:0.75rem;">${s.admissionNo}</td>
                        <td style="text-align:center;">${s.gender ? s.gender[0] : 'M'}</td>
                        <td class="day-col"></td>
                        <td class="day-col"></td>
                        <td class="day-col"></td>
                        <td class="day-col"></td>
                        <td class="day-col"></td>
                        <td></td>
                        <td style="font-size:0.7rem; color:#64748b;">${s.medical && s.medical !== 'None (Healthy)' ? s.medical : ''}</td>
                    </tr>
                `).join("");
            }
        }

        this.openModal("modalPrintAttendance");
    }

    // ========================================================================
    // 9. Module: Daily Attendance Roll Call
    // ========================================================================
    bindAttendanceEvents() {
        const classSelect = document.getElementById("attClassSelect");
        const dateSelect = document.getElementById("attDateSelect");
        const btnMarkAll = document.getElementById("btnMarkAllPresent");
        const btnSave = document.getElementById("btnSaveAttendance");

        if (dateSelect) {
            dateSelect.value = this.selectedAttendanceDate;
            dateSelect.addEventListener("change", (e) => {
                this.selectedAttendanceDate = e.target.value;
                this.renderAttendanceTable();
            });
        }

        if (classSelect) {
            classSelect.addEventListener("change", () => this.renderAttendanceTable());
        }

        if (btnMarkAll) {
            btnMarkAll.addEventListener("click", () => this.markAllAttendance("P"));
        }

        if (btnSave) {
            btnSave.addEventListener("click", () => this.saveAttendanceLog());
        }
    }

    getAttendanceKey() {
        const cls = document.getElementById("attClassSelect")?.value || "Primary 1";
        const date = document.getElementById("attDateSelect")?.value || this.selectedAttendanceDate;
        return `${date}_${cls}`;
    }

    renderAttendanceTable() { // Method: Renders daily attendance roster table
        const tbody = document.getElementById("attendanceTableBody"); // Element: Table body
        const cls = document.getElementById("attClassSelect")?.value || "Primary 1"; // Class: Target class
        if (!tbody) return; // Guard: Return if tbody missing
        const baseStudents = this.state.students.filter(s => s.class === cls && s.status === "Active"); // Base: Active students
        const students = (window.SMSAuth && typeof window.SMSAuth.filterRowsByAuthorization === "function") ? window.SMSAuth.filterRowsByAuthorization("attendance", baseStudents) : baseStudents; // RLS: Filter attendance rows
        const logKey = this.getAttendanceKey();
        const currentLog = this.state.attendanceLogs[logKey] || {};

        if (students.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="6" style="text-align:center; padding: 2rem; color:var(--text-muted);">
                        No registered students found in ${cls}.
                    </td>
                </tr>
            `;
            this.updateAttendanceSummary({});
            return;
        }

        tbody.innerHTML = students.map((s, index) => {
            const status = currentLog[s.id]?.status || "P";
            const remark = currentLog[s.id]?.remark || "";

            return `
                <tr data-student-id="${s.id}">
                    <td><strong>${index + 1}</strong></td>
                    <td>
                        <div class="user-cell">
                            <div class="user-avatar-cell" style="background:${s.avatarBg || 'var(--primary-gradient)'}; width:32px; height:32px; font-size:0.75rem;">
                                ${s.firstName[0]}${s.lastName[0]}
                            </div>
                            <span style="font-weight:600;">${s.firstName} ${s.lastName}</span>
                        </div>
                    </td>
                    <td><span style="font-family:var(--font-mono); font-size:0.8rem;">${s.admissionNo}</span></td>
                    <td>${s.gender}</td>
                    <td>
                        <div class="attendance-toggle-group">
                            <button class="att-btn ${status === 'P' ? 'active-p' : ''}" onclick="app.setStudentAttStatus('${s.id}', 'P', this)">P</button>
                            <button class="att-btn ${status === 'L' ? 'active-l' : ''}" onclick="app.setStudentAttStatus('${s.id}', 'L', this)">L</button>
                            <button class="att-btn ${status === 'A' ? 'active-a' : ''}" onclick="app.setStudentAttStatus('${s.id}', 'A', this)">A</button>
                            <button class="att-btn ${status === 'E' ? 'active-e' : ''}" onclick="app.setStudentAttStatus('${s.id}', 'E', this)">E</button>
                        </div>
                    </td>
                    <td>
                        <input type="text" class="filter-input att-remark-input" value="${remark}" placeholder="Optional remark" style="padding:0.35rem 0.6rem; font-size:0.78rem;">
                    </td>
                </tr>
            `;
        }).join("");

        this.updateAttendanceSummary(currentLog);
    }

    setStudentAttStatus(studentId, status, btnElement) {
        const row = btnElement.closest("tr");
        if (!row) return;

        row.querySelectorAll(".att-btn").forEach(b => {
            b.classList.remove("active-p", "active-l", "active-a", "active-e");
        });

        if (status === "P") btnElement.classList.add("active-p");
        if (status === "L") btnElement.classList.add("active-l");
        if (status === "A") btnElement.classList.add("active-a");
        if (status === "E") btnElement.classList.add("active-e");

        this.recalculateAttendanceStats();
    }

    markAllAttendance(status = "P") { // Method: Marks all students with status
        const cls = document.getElementById("attClassSelect")?.value || "Primary 1"; // Class: Target class
        if (window.SMSAuth && !window.SMSAuth.assertRowMutation("attendance", { class: cls }, "update")) return; // RLS: Row authorization check
        document.querySelectorAll("#attendanceTableBody tr").forEach(row => { // Loop: Process rows
            const btns = row.querySelectorAll(".att-btn");
            btns.forEach(b => b.classList.remove("active-p", "active-l", "active-a", "active-e"));
            if (status === "P" && btns[0]) btns[0].classList.add("active-p");
        });
        this.recalculateAttendanceStats();
        this.showToast("Marked all students as Present", "success");
    }

    recalculateAttendanceStats() {
        let total = 0, present = 0, late = 0, absent = 0, excused = 0;
        document.querySelectorAll("#attendanceTableBody tr").forEach(row => {
            total++;
            if (row.querySelector(".att-btn.active-p")) present++;
            else if (row.querySelector(".att-btn.active-l")) late++;
            else if (row.querySelector(".att-btn.active-a")) absent++;
            else if (row.querySelector(".att-btn.active-e")) excused++;
            else present++;
        });

        document.getElementById("attStatTotal").textContent = total;
        document.getElementById("attStatPresent").textContent = present;
        document.getElementById("attStatLate").textContent = late;
        document.getElementById("attStatAbsent").textContent = absent;
        document.getElementById("attStatExcused").textContent = excused;
    }

    updateAttendanceSummary(log) {
        this.recalculateAttendanceStats();
    }

    saveAttendanceLog() { // Method: Saves attendance roll call for class and date
        const cls = document.getElementById("attClassSelect")?.value || "Primary 1"; // Class: Target class
        if (window.SMSAuth && !window.SMSAuth.assertRowMutation("attendance", { class: cls }, "update")) return; // RLS: Row authorization check
        const logKey = this.getAttendanceKey(); // Key: Attendance key
        const newLog = {};

        document.querySelectorAll("#attendanceTableBody tr").forEach(row => {
            const studentId = row.getAttribute("data-student-id");
            let status = "P";
            if (row.querySelector(".att-btn.active-l")) status = "L";
            if (row.querySelector(".att-btn.active-a")) status = "A";
            if (row.querySelector(".att-btn.active-e")) status = "E";

            const remark = row.querySelector(".att-remark-input")?.value || "";
            newLog[studentId] = { status, remark };
        });

        this.state.attendanceLogs[logKey] = newLog;
        this.saveState();
        this.showToast("Attendance roll call saved successfully!", "success");
        this.logActivity(`Saved attendance for ${logKey.replace('_', ' - ')}`, "ri-calendar-check-line", "#10b981");
    }

    // ========================================================================
    // 10. Module: Exams & Report Cards Generator
    // ========================================================================
    bindExamsEvents() {
        const classSelect = document.getElementById("examClassSelect");
        const subjectSelect = document.getElementById("examSubjectSelect");
        const termSelect = document.getElementById("examTermSelect");
        const btnSave = document.getElementById("btnSaveGradebook");

        [classSelect, subjectSelect, termSelect].forEach(el => {
            if (el) el.addEventListener("change", () => this.renderGradebookTable());
        });

        if (btnSave) {
            btnSave.addEventListener("click", () => this.saveGradebookScores());
        }
    }

    renderGradebookTable() { // Method: Renders exams gradebook scores table
        const tbody = document.getElementById("examsTableBody"); // Element: Table body
        const cls = document.getElementById("examClassSelect")?.value || "Primary 1"; // Class: Target class
        const subject = document.getElementById("examSubjectSelect")?.value || "Mathematics"; // Subject: Target subject
        const term = document.getElementById("examTermSelect")?.value || "Term 2"; // Term: Target term
        if (!tbody) return; // Guard: Return if tbody missing
        const baseStudents = this.state.students.filter(s => s.class === cls && s.status === "Active"); // Base: Active students
        const students = (window.SMSAuth && typeof window.SMSAuth.filterRowsByAuthorization === "function") ? window.SMSAuth.filterRowsByAuthorization("grades", baseStudents) : baseStudents; // RLS: Filter grade rows

        if (students.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="8" style="text-align:center; padding: 2.5rem; color:var(--text-muted);">
                        No students enrolled in ${cls}.
                    </td>
                </tr>
            `;
            return;
        }

        tbody.innerHTML = students.map(s => {
            const key = `${s.id}_${subject}_${term}`;
            const gradeRecord = this.state.grades[key] || { classScore: 25, examScore: 55, total: 80, grade: "A", remarks: "Excellent" };

            return `
                <tr data-student-id="${s.id}">
                    <td>
                        <div class="user-cell">
                            <div class="user-avatar-cell" style="background:${s.avatarBg || 'var(--primary-gradient)'}; width:32px; height:32px; font-size:0.75rem;">
                                ${s.firstName[0]}${s.lastName[0]}
                            </div>
                            <strong>${s.firstName} ${s.lastName}</strong>
                        </div>
                    </td>
                    <td><span style="font-family:var(--font-mono); font-size:0.8rem;">${s.admissionNo}</span></td>
                    <td>
                        <input type="number" class="grade-score-input inp-class-score" min="0" max="50" value="${gradeRecord.classScore || 0}" oninput="app.recomputeRowScore(this)">
                    </td>
                    <td>
                        <input type="number" class="grade-score-input inp-exam-score" min="0" max="50" value="${gradeRecord.examScore || 0}" oninput="app.recomputeRowScore(this)">
                    </td>
                    <td>
                        <strong class="row-total-score" style="font-family:var(--font-mono); font-size:0.95rem;">${gradeRecord.total || 0}%</strong>
                    </td>
                    <td>
                        <span class="grade-pill grade-${(gradeRecord.grade || 'A').charAt(0)} row-grade-pill">${gradeRecord.grade || 'A'}</span>
                    </td>
                    <td>
                        <input type="text" class="filter-input row-remarks-input" value="${gradeRecord.remarks || ''}" placeholder="Teacher remarks..." style="font-size:0.78rem; padding:0.35rem 0.6rem;">
                    </td>
                    <td style="text-align: right;">
                        <button class="btn btn-secondary btn-sm" onclick="app.viewReportCard('${s.id}')">
                            <i class="ri-file-paper-2-line"></i> Report Card
                        </button>
                    </td>
                </tr>
            `;
        }).join("");
    }

    recomputeRowScore(inputEl) {
        const row = inputEl.closest("tr");
        if (!row) return;

        let classScore = parseFloat(row.querySelector(".inp-class-score")?.value) || 0;
        let examScore = parseFloat(row.querySelector(".inp-exam-score")?.value) || 0;

        if (classScore > 50) { classScore = 50; row.querySelector(".inp-class-score").value = 50; }
        if (examScore > 50) { examScore = 50; row.querySelector(".inp-exam-score").value = 50; }

        const total = Math.round(classScore + examScore);
        let grade = "F";
        let remarks = "Needs Serious Improvement";

        if (total >= 80) { grade = "A"; remarks = "Excellent"; }
        else if (total >= 70) { grade = "B"; remarks = "Very Good"; }
        else if (total >= 60) { grade = "C"; remarks = "Good"; }
        else if (total >= 50) { grade = "D"; remarks = "Average"; }
        else if (total >= 40) { grade = "E"; remarks = "Pass"; }
        else if (total <= 30) { grade = "F"; remarks = "Fail"; }

        const totalEl = row.querySelector(".row-total-score");
        const gradeEl = row.querySelector(".row-grade-pill");
        const remarkEl = row.querySelector(".row-remarks-input");

        if (totalEl) totalEl.textContent = `${total}%`;
        if (gradeEl) {
            gradeEl.textContent = grade;
            gradeEl.className = `grade-pill grade-${grade.charAt(0)} row-grade-pill`;
        }
        if (remarkEl && !remarkEl.value) {
            remarkEl.value = remarks;
        }
    }

    saveGradebookScores() { // Method: Saves updated subject scores to state
        const cls = document.getElementById("examClassSelect")?.value || "Primary 1"; // Class: Target class
        if (window.SMSAuth && !window.SMSAuth.assertRowMutation("grades", { class: cls }, "update")) return; // RLS: Row authorization check
        const subject = document.getElementById("examSubjectSelect")?.value || "Mathematics"; // Subject: Target subject
        const term = document.getElementById("examTermSelect")?.value || "Term 2";

        document.querySelectorAll("#examsTableBody tr").forEach(row => {
            const studentId = row.getAttribute("data-student-id");
            if (!studentId) return;

            const classScore = parseFloat(row.querySelector(".inp-class-score")?.value) || 0;
            const examScore = parseFloat(row.querySelector(".inp-exam-score")?.value) || 0;
            const total = Math.round(classScore + examScore);
            const grade = row.querySelector(".row-grade-pill")?.textContent || "A";
            const remarks = row.querySelector(".row-remarks-input")?.value || "Satisfactory";

            const key = `${studentId}_${subject}_${term}`;
            this.state.grades[key] = { classScore, examScore, total, grade, remarks };
        });

        this.saveState();
        this.showToast(`Saved grade entries for ${subject} (${term})`, "success");
        this.logActivity(`Updated ${subject} grades for ${term}`, "ri-edit-line", "#f59e0b");
    }

    viewReportCard(studentId) {
        const student = this.state.students.find(s => s.id === studentId);
        if (!student) return;

        const term = document.getElementById("examTermSelect")?.value || "Term 2";
        const subjects = [
            "Mathematics",
            "English Language",
            "Integrated Science",
            "Social Studies",
            "ICT / Computing",
            "Creative Arts",
            "Religious & Moral Education"
        ];

        let totalScoreSum = 0;
        let count = 0;

        const rowsHTML = subjects.map(sub => {
            const key = `${student.id}_${sub}_${term}`;
            let g = this.state.grades[key];
            if (!g) {
                const classSc = Math.floor(Math.random() * 8) + 22;
                const examSc = Math.floor(Math.random() * 20) + 48;
                const tot = classSc + examSc;
                let gr = "A";
                if (tot >= 80) gr = "A";
                else if (tot >= 70) gr = "B";
                else if (tot >= 60) gr = "C";
                else if (tot >= 50) gr = "D";
                else if (tot >= 40) gr = "E";
                else gr = "F";
                g = { classScore: classSc, examScore: examSc, total: tot, grade: gr, remarks: "Good mastery and class participation" };
            }

            totalScoreSum += g.total;
            count++;

            return `
                <tr>
                    <td><strong>${sub}</strong></td>
                    <td style="text-align:center;">${g.classScore}</td>
                    <td style="text-align:center;">${g.examScore}</td>
                    <td style="text-align:center;"><strong>${g.total}</strong></td>
                    <td style="text-align:center;"><span class="grade-pill grade-${g.grade.charAt(0)}">${g.grade}</span></td>
                    <td><em>${g.remarks}</em></td>
                </tr>
            `;
        }).join("");

        const overallAvg = (totalScoreSum / count).toFixed(1);

        document.getElementById("rcSchoolName").textContent = this.state.schoolProfile.name;
        document.getElementById("rcSchoolTagline").textContent = this.state.schoolProfile.motto;
        document.getElementById("rcSchoolAddress").textContent = `${this.state.schoolProfile.address} • Tel: ${this.state.schoolProfile.phone}`;
        document.getElementById("rcTermBadge").textContent = `${this.state.schoolProfile.currentTerm}`;
        document.getElementById("rcStudentName").textContent = `${student.firstName} ${student.lastName}`;
        document.getElementById("rcAdmissionNo").textContent = student.admissionNo;
        document.getElementById("rcClass").textContent = student.class;
        document.getElementById("rcAttendance").textContent = "58 / 60 Days (96.7%)";
        document.getElementById("rcPosition").textContent = "1st of 24 Pupils";
        document.getElementById("rcAverage").textContent = `${overallAvg}% (Overall Grade: ${overallAvg >= 85 ? 'A' : 'B'})`;
        document.getElementById("rcGradesTableBody").innerHTML = rowsHTML;

        this.openModal("modalReportCard");
    }

    // ========================================================================
    // 11. Module: Fees & Billing
    // ========================================================================
    bindFeesEvents() {
        const btnRecordModal = document.getElementById("btnRecordPaymentModal");
        if (btnRecordModal) {
            btnRecordModal.addEventListener("click", () => this.openFeePaymentModal());
        }

        const form = document.getElementById("feePaymentForm");
        if (form) {
            form.addEventListener("submit", (e) => {
                e.preventDefault();
                this.recordPaymentFromForm();
            });
        }

        const feeSearch = document.getElementById("feeSearchInput");
        const feeFilter = document.getElementById("feeStatusFilter");
        [feeSearch, feeFilter].forEach(el => {
            if (el) {
                el.addEventListener("input", () => this.renderFeesTable());
                el.addEventListener("change", () => this.renderFeesTable());
            }
        });

        const btnExport = document.getElementById("btnExportFeesCSV");
        if (btnExport) {
            btnExport.addEventListener("click", () => this.exportFeesCSV());
        }
    }

    renderFeesTable() {
        const tbody = document.getElementById("feesTableBody");
        if (!tbody) return;

        let billedSum = 0;
        let collectedSum = 0;
        let debtorCount = 0;

        this.state.students.forEach(s => {
            billedSum += (s.feeTotal || 0);
            collectedSum += (s.feePaid || 0);
            if ((s.feeTotal || 0) > (s.feePaid || 0)) debtorCount++;
        });

        const outstandingSum = billedSum - collectedSum;
        const recoveryRate = billedSum > 0 ? Math.round((collectedSum / billedSum) * 100) : 0;

        document.getElementById("feeStatTotalBilled").textContent = `GHC ${billedSum.toLocaleString()}`;
        document.getElementById("feeStatTotalCollected").textContent = `GHC ${collectedSum.toLocaleString()}`;
        document.getElementById("feeStatCollectionRate").textContent = `${recoveryRate}% recovery rate`;
        document.getElementById("feeStatOutstanding").textContent = `GHC ${outstandingSum.toLocaleString()}`;
        document.getElementById("feeStatDebtorCount").textContent = `${debtorCount} students with arrears`;

        const search = (document.getElementById("feeSearchInput")?.value || "").toLowerCase().trim();
        const filter = document.getElementById("feeStatusFilter")?.value || "ALL";

        const baseFeeStudents = (window.SMSAuth && typeof window.SMSAuth.filterRowsByAuthorization === "function") ? window.SMSAuth.filterRowsByAuthorization("fees", this.state.students) : this.state.students; // RLS: Filter student rows for billing
        const filtered = baseFeeStudents.filter(s => { // Filter: Evaluate authorized student rows
            const matchSearch = !search || // Match: Search keyword
                s.firstName.toLowerCase().includes(search) || // Match: First name
                s.lastName.toLowerCase().includes(search) || // Match: Last name
                s.admissionNo.toLowerCase().includes(search); // Match: Admission number
            let status = "Paid"; // Status: Default paid
            if ((s.feePaid || 0) === 0) status = "Overdue"; // Status: Overdue
            else if ((s.feePaid || 0) < (s.feeTotal || 0)) status = "Partial"; // Status: Partial
            const matchFilter = filter === "ALL" || status === filter; // Match: Status filter
            return matchSearch && matchFilter; // Result: Match status
        }); // End: Filter loop

        tbody.innerHTML = filtered.map(s => {
            const balance = (s.feeTotal || 0) - (s.feePaid || 0);
            let statusBadge = `<span class="badge badge-success">Fully Paid</span>`;
            if (balance > 0 && s.feePaid > 0) {
                statusBadge = `<span class="badge badge-warning">Partial</span>`;
            } else if (balance > 0 && s.feePaid === 0) {
                statusBadge = `<span class="badge badge-danger">Overdue</span>`;
            }

            return `
                <tr>
                    <td>
                        <div class="user-cell">
                            <div class="user-avatar-cell" style="background:${s.avatarBg || 'var(--primary-gradient)'}; width:32px; height:32px; font-size:0.75rem;">
                                ${s.firstName[0]}${s.lastName[0]}
                            </div>
                            <strong>${s.firstName} ${s.lastName}</strong>
                        </div>
                    </td>
                    <td><span style="font-family:var(--font-mono); font-size:0.8rem;">${s.admissionNo}</span></td>
                    <td><span class="badge badge-purple">${s.class}</span></td>
                    <td>GHC ${s.feeTotal || 0}</td>
                    <td style="color:var(--success); font-weight:600;">GHC ${s.feePaid || 0}</td>
                    <td style="color:${balance > 0 ? 'var(--danger)' : 'var(--text-muted)'}; font-weight:700;">GHC ${balance}</td>
                    <td>${statusBadge}</td>
                    <td style="text-align: right;">
                        <div class="table-actions" style="justify-content: flex-end;">
                            <button class="btn btn-secondary btn-sm" onclick="app.quickPayForStudent('${s.id}')">
                                <i class="ri-hand-coin-line"></i> Pay
                            </button>
                            <button class="btn-table-action" title="View Latest Receipt" onclick="app.viewLatestStudentReceipt('${s.id}')">
                                <i class="ri-receipt-line"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        }).join("");
    }

    openFeePaymentModal(studentId = null) { // Method: Opens fee payment dialog modal
        if (window.SMSAuth && !window.SMSAuth.assertRowMutation("fees", null, "create")) return; // RLS: Row authorization mutation guard
        const select = document.getElementById("paymentStudentSelect"); // Select: Student select
        if (select) {
            select.innerHTML = this.state.students.map(s => {
                const bal = (s.feeTotal || 0) - (s.feePaid || 0);
                return `<option value="${s.id}" ${studentId === s.id ? 'selected' : ''}>${s.firstName} ${s.lastName} (${s.admissionNo} - ${s.class}) — Balance: GHC ${bal}</option>`;
            }).join("");
        }

        document.getElementById("paymentDate").value = new Date().toISOString().split("T")[0];
        document.getElementById("paymentAmount").value = 100;
        this.openModal("modalPayment");
    }

    quickPayForStudent(studentId) {
        this.openFeePaymentModal(studentId);
    }

    recordPaymentFromForm() { // Method: Records fee payment transaction
        if (window.SMSAuth && !window.SMSAuth.assertRowMutation("fees", null, "create")) return; // RLS: Row authorization mutation guard
        const studentId = document.getElementById("paymentStudentSelect").value; // Value: Student ID
        const amount = parseFloat(document.getElementById("paymentAmount").value) || 0;
        const method = document.getElementById("paymentMethod").value;
        const date = document.getElementById("paymentDate").value;
        const category = document.getElementById("paymentCategory").value;
        const ref = document.getElementById("paymentRef").value.trim() || `REF-${Math.floor(Math.random() * 900000 + 100000)}`;

        const student = this.state.students.find(s => s.id === studentId);
        if (!student) return;

        student.feePaid = (student.feePaid || 0) + amount;

        const receiptNo = `PBE-REC-2026-${String(this.state.payments.length + 1).padStart(4, "0")}`;
        const newPayment = {
            id: "pay-" + Date.now(),
            receiptNo,
            studentId: student.id,
            studentName: `${student.firstName} ${student.lastName}`,
            admissionNo: student.admissionNo,
            class: student.class,
            amount,
            date,
            method,
            category,
            ref
        };

        this.state.payments.unshift(newPayment);
        this.saveState();

        this.closeModal("modalPayment");
        this.renderFeesTable();
        this.renderDashboard();
        this.showToast(`Recorded payment of GHC ${amount} for ${student.firstName} ${student.lastName}`, "success");
        this.logActivity(`Fee payment logged: GHC ${amount} for ${student.firstName} ${student.lastName}`, "ri-hand-coin-line", "#10b981");

        this.displayReceipt(newPayment, student);
    }

    displayReceipt(paymentObj, studentObj) {
        const balance = (studentObj.feeTotal || 0) - (studentObj.feePaid || 0);

        document.getElementById("rcptNumber").textContent = `Receipt #: ${paymentObj.receiptNo}`;
        document.getElementById("rcptDate").textContent = `Date: ${paymentObj.date}`;
        document.getElementById("rcptStudentName").textContent = paymentObj.studentName;
        document.getElementById("rcptAdmissionNo").textContent = paymentObj.admissionNo;
        document.getElementById("rcptClass").textContent = paymentObj.class;
        document.getElementById("rcptCategory").textContent = paymentObj.category;
        document.getElementById("rcptMethod").textContent = paymentObj.method;
        document.getElementById("rcptRef").textContent = paymentObj.ref;
        document.getElementById("rcptAmountPaid").textContent = `GHC ${paymentObj.amount.toFixed(2)}`;
        document.getElementById("rcptBalance").textContent = `GHC ${balance.toFixed(2)}`;

        this.openModal("modalReceipt");
    }

    viewLatestStudentReceipt(studentId) {
        const student = this.state.students.find(s => s.id === studentId);
        if (!student) return;

        const payment = this.state.payments.find(p => p.studentId === studentId);
        if (payment) {
            this.displayReceipt(payment, student);
        } else {
            this.showToast(`No recorded payment transactions found for ${student.firstName} ${student.lastName}`, "warning");
        }
    }

    // ========================================================================
    // ========================================================================
    // 12. Module: Notice Board, Parent SMS & Two-Way Messaging API Gateway
    // ========================================================================
    bindNoticeAndSMSEvents() { // Method: Binds UI events for announcements, SMS, and two-way API gateway
        const form = document.getElementById("smsBroadcastForm"); // Form: SMS broadcast composer form
        const templateSelect = document.getElementById("smsTemplateSelect"); // Select: Template presets dropdown
        const contentTextarea = document.getElementById("smsMessageContent"); // Textarea: Message composer textarea
        if (templateSelect && contentTextarea) { // Guard: Check if template controls exist
            templateSelect.addEventListener("change", () => { // Event: When user selects template preset
                const val = templateSelect.value; // Value: Template identifier key
                if (SEED_SMS_TEMPLATES[val]) { // Check: If preset exists in seed templates
                    contentTextarea.value = SEED_SMS_TEMPLATES[val]; // Populate: Insert preset message text
                } // End of template check
                this.updateSMSMeta(); // Update: Recalculate character and page metrics
            }); // End of change listener
        } // End of template guard
        if (contentTextarea) { // Guard: Check if composer textarea exists
            contentTextarea.addEventListener("input", () => this.updateSMSMeta()); // Event: Recalculate metrics on input
        } // End of textarea guard
        if (form) { // Guard: Check if form exists
            form.addEventListener("submit", (e) => { // Event: On announcement form submit
                e.preventDefault(); // Event: Prevent browser page reload
                this.sendSMSBroadcast(); // Action: Dispatch announcement via API key
            }); // End of submit listener
        } // End of form guard
        const btnCopyKey = document.getElementById("btnCopyAPIKey"); // Button: Copy active API key
        if (btnCopyKey) btnCopyKey.addEventListener("click", () => this.copyAPIKey()); // Listener: Copy key to clipboard
        const btnToggleMask = document.getElementById("btnToggleAPIKeyMask"); // Button: Reveal/Mask key toggle
        if (btnToggleMask) btnToggleMask.addEventListener("click", () => this.toggleAPIKeyMask()); // Listener: Toggle mask
        const btnRegenKey = document.getElementById("btnRegenerateAPIKey"); // Button: Issue new secure API key
        if (btnRegenKey) btnRegenKey.addEventListener("click", () => this.regenerateAPIKey()); // Listener: Regenerate key
        const btnOpenSim = document.getElementById("btnOpenInboundSimulator"); // Button: Open inbound webhook simulator modal
        if (btnOpenSim) btnOpenSim.addEventListener("click", () => this.openInboundSimulatorModal()); // Listener: Open modal
        const formSim = document.getElementById("formSimulateInboundAPI"); // Form: Inbound message simulator form
        if (formSim) { // Guard: Check if simulator form exists
            formSim.addEventListener("submit", (e) => { // Event: On simulator form submit
                e.preventDefault(); // Event: Prevent default reload
                this.handleInboundSimulatorSubmit(); // Action: Execute simulated inbound API request
            }); // End of simulator submit listener
        } // End of simulator form guard
        const btnCopyInbound = document.getElementById("btnCopyInboundEndpoint"); // Button: Copy inbound endpoint URL
        if (btnCopyInbound) { // Guard: Check if copy inbound button exists
            btnCopyInbound.addEventListener("click", () => { // Listener: Copy inbound URL
                const url = this.state.apiKeyVault.receiverEndpoint || "https://profbaidoo-sms.edu.gh/api/v1/inbound"; // URL: Inbound endpoint
                navigator.clipboard.writeText(url); // Clipboard: Write URL to clipboard
                this.showToast("Inbound Webhook Receiver URL copied!", "info"); // Feedback: Display confirmation toast
            }); // End of click listener
        } // End of inbound copy guard
        const btnCopyOutbound = document.getElementById("btnCopyOutboundEndpoint"); // Button: Copy outbound webhook URL
        if (btnCopyOutbound) { // Guard: Check if copy outbound button exists
            btnCopyOutbound.addEventListener("click", () => { // Listener: Copy outbound URL
                const url = this.state.apiKeyVault.webhookUrl || "https://api.sms-gateway.com/v1/broadcast"; // URL: Outbound endpoint
                navigator.clipboard.writeText(url); // Clipboard: Write URL to clipboard
                this.showToast("Outbound Gateway Broadcast URL copied!", "info"); // Feedback: Display confirmation toast
            }); // End of click listener
        } // End of outbound copy guard
        const btnCopyCurl = document.getElementById("btnCopyCurlSnippet"); // Button: Copy cURL sample snippet
        if (btnCopyCurl) { // Guard: Check if cURL copy button exists
            btnCopyCurl.addEventListener("click", () => { // Listener: Handle cURL copy event
                const key = this.state.apiKeyVault.activeKey; // Key: Get active key
                const code = `curl -X POST "https://profbaidoo-sms.edu.gh/api/v1/inbound" \\\n  -H "Content-Type: application/json" \\\n  -H "X-API-Key: ${key}" \\\n  -d '{\\n    "senderName": "Mrs. Vivian Appiah",\\n    "senderPhone": "+233245557890",\\n    "studentName": "Kwame Mensah",\\n    "studentClass": "Primary 1",\\n    "message": "Acknowledged. I will attend the PTA meeting."\\n  }'`; // Payload: Formatted cURL snippet
                navigator.clipboard.writeText(code).then(() => { // Clipboard: Copy to clipboard
                    this.showToast("cURL webhook sample copied with your active API key!", "success"); // Feedback: Confirmation toast
                }); // End of promise
            }); // End of click listener
        } // End of cURL copy guard
        const btnCopyJs = document.getElementById("btnCopyJsSnippet"); // Button: Copy JavaScript snippet
        if (btnCopyJs) { // Guard: Check if JS copy button exists
            btnCopyJs.addEventListener("click", () => { // Listener: Handle JS copy event
                const key = this.state.apiKeyVault.activeKey; // Key: Get active key
                const code = `const res = await fetch("https://api.sms-gateway.com/v1/broadcast", {\\n  method: "POST",\\n  headers: {\\n    "Authorization": "Bearer ${key}",\\n    "Content-Type": "application/json"\\n  },\\n  body: JSON.stringify({\\n    "recipientGroup": "Primary 1",\\n    "content": "Notice: Terminal reports will be issued on Friday."\\n  })\\n});`; // Payload: Formatted JS snippet
                navigator.clipboard.writeText(code).then(() => { // Clipboard: Copy to clipboard
                    this.showToast("JavaScript broadcast snippet copied with your active API key!", "success"); // Feedback: Confirmation toast
                }); // End of promise
            }); // End of click listener
        } // End of JS copy guard
    } // End of bindNoticeAndSMSEvents
//                                                                              // Line: Blank comment line
    updateSMSMeta() { // Method: Calculates character count, pages, and dynamic tag preview
        const textarea = document.getElementById("smsMessageContent"); // Element: Textarea element
        const charCountEl = document.getElementById("smsCharCount"); // Element: Character counter badge
        const previewEl = document.getElementById("phonePreviewBubble"); // Element: Live phone mockup bubble
        if (!textarea) return; // Guard: Return if textarea missing
        const text = textarea.value || "Dear Parent, this is an official message from Prof~Baidoo Basic Academy."; // Text: Current composer text
        const charLen = text.length; // Length: Total characters in message
        const pages = Math.ceil(charLen / 160) || 1; // Pages: Calculate standard 160-character telco SMS pages
        if (charCountEl) charCountEl.textContent = `${charLen} (${pages} Page${pages > 1 ? 's' : ''})`; // Update: Display character count
        if (previewEl) { // Guard: Update live phone simulator preview
            previewEl.textContent = text // String: Perform dynamic variable tag substitutions
                .replace(/{guardian_name}/g, "Mr. Isaac Junior Donkor") // Tag: Replace guardian name tag
                .replace(/{student_name}/g, "Kwame Mensah") // Tag: Replace student name tag
                .replace(/{fee_balance}/g, "GHC 100.00"); // Tag: Replace fee balance tag
        } // End of preview update
    } // End of updateSMSMeta
//                                                                              // Line: Blank comment line
    generateSecureAPIKey() { // Method: Generates cryptographically secure 48-char hex secret key
        const randomBytes = new Uint8Array(24); // Array: 24 bytes of high-entropy randomness
        window.crypto.getRandomValues(randomBytes); // CSPRNG: Fill with cryptographic random numbers
        const hex = Array.from(randomBytes, b => b.toString(16).padStart(2, "0")).join(""); // Convert: Format each byte as 2-character hex
        return "pb_live_sec_" + hex; // Return: Prepend live secret prefix
    } // End of generateSecureAPIKey
//                                                                              // Line: Blank comment line
    regenerateAPIKey() { // Method: Issues new API key and updates gateway configuration
        if (!confirm("Are you sure you want to regenerate the Messaging API Key? Any external services using the previous key will need to be updated.")) { // Prompt: Confirm action
            return; // Cancel: Abort on user dismissal
        } // End of prompt
        const newKey = this.generateSecureAPIKey(); // Generate: Create new CSPRNG key
        this.state.apiKeyVault.activeKey = newKey; // State: Set active key
        this.state.apiKeyVault.createdAt = new Date().toISOString(); // Timestamp: Update creation time
        this.state.apiKeyVault.isMasked = false; // Visibility: Reveal new key so user can copy it
        this.saveState(); // Storage: Persist updated state
        this.logActivity("New Two-Way Messaging API Key Generated", "ri-key-fill", "#6366f1"); // Audit: Log action
        this.showToast("New Messaging API Key generated successfully!", "success"); // Feedback: Display toast
        this.triggerConfetti(); // Celebration: Trigger visual confetti effect
        this.renderNoticeBoard(); // Render: Refresh notice board UI
    } // End of regenerateAPIKey
//                                                                              // Line: Blank comment line
    copyAPIKey() { // Method: Copies current active API key to clipboard
        const key = this.state.apiKeyVault.activeKey; // Key: Get active key
        navigator.clipboard.writeText(key).then(() => { // Clipboard: Write text
            this.showToast("API Key copied to clipboard! Keep it secure.", "info"); // Feedback: Display toast
        }).catch(() => { // Fallback: Handle copy error
            this.showToast(`API Key: ${key}`, "info"); // Fallback: Show key in toast
        }); // End of promise
    } // End of copyAPIKey
//                                                                              // Line: Blank comment line
    toggleAPIKeyMask() { // Method: Toggles visual masking of the active API key
        this.state.apiKeyVault.isMasked = !this.state.apiKeyVault.isMasked; // Toggle: Invert boolean state
        this.saveState(); // Storage: Save preference
        this.renderNoticeBoard(); // Render: Update key display
    } // End of toggleAPIKeyMask
//                                                                              // Line: Blank comment line
    sendSMSBroadcast() { // Method: Dispatches announcement over telco gateway using the active API key
        const textarea = document.getElementById("smsMessageContent"); // Element: Textarea element
        const recipientGroup = document.getElementById("smsRecipientGroup")?.value || "ALL"; // Group: Selected audience target
        const message = textarea?.value?.trim(); // Message: Sanitized text content
        if (!message) { // Guard: Check if message is empty
            this.showToast("Please enter an SMS announcement body before broadcasting.", "warning"); // Toast: Alert user
            return; // Abort: Exit dispatch
        } // End of guard
        let recipientCount = this.state.students.length; // Count: Default to all students
        if (recipientGroup === "DEBTORS") { // Check: Filter for debtors only
            recipientCount = this.state.students.filter(s => (s.feeTotal || 0) > (s.feePaid || 0)).length; // Filter: Debtors count
        } else if (recipientGroup !== "ALL") { // Check: Specific class selected
            recipientCount = this.state.students.filter(s => s.class === recipientGroup).length; // Filter: Specific class count
        } // End of count check
        const traceId = "req_" + Math.random().toString(36).substring(2, 10); // Trace: Unique API request correlation trace ID
        const activeKey = this.state.apiKeyVault.activeKey; // Key: Active messaging secret key
        this.state.apiKeyVault.totalDispatched += recipientCount; // Stats: Increment cumulative dispatched messages
        const dispatchRecord = { // Record: Create structured announcement dispatch record
            id: "disp-" + Date.now(), // ID: Unique dispatch record ID
            timestamp: "Just now", // Time: Human readable timestamp
            event: "announcement.broadcast", // Event: Standard webhook event name
            recipientGroup, // Audience: Recipient group designation
            recipientCount, // Volume: Total parent phone recipients
            content: message, // Body: Announcement message text
            status: "DELIVERED (200 OK)", // Status: Successful delivery response
            traceId, // Trace: Audit correlation token
            sender: "PROF~BAIDOO", // Sender: Verified institutional sender ID
            apiKeyUsed: activeKey.substring(0, 14) + "..." + activeKey.slice(-4) // Key Mask: Partial audit key string
        }; // End of dispatchRecord
        this.state.outboundDispatches.unshift(dispatchRecord); // Store: Prepend to dispatch history array
        if (this.state.outboundDispatches.length > 25) this.state.outboundDispatches.pop(); // Trim: Cap historical dispatch log size
        this.saveState(); // Storage: Persist state changes
        this.showToast(`Broadcast sent via API Key (${activeKey.substring(0, 14)}...) to ${recipientCount} parents [200 OK]!`, "success"); // Toast: Success confirmation
        this.triggerConfetti(); // Visual: Celebrate successful broadcast
        this.logActivity(`Announcement broadcast sent to ${recipientCount} parents via API Key [Trace: ${traceId}]`, "ri-chat-broadcast-line", "#a855f7"); // Audit: Log activity
        if (textarea) textarea.value = ""; // Form: Reset message textarea
        this.updateSMSMeta(); // Meta: Reset counter and phone preview
        this.renderNoticeBoard(); // Render: Update notice board and dispatch log table
    } // End of sendSMSBroadcast
//                                                                              // Line: Blank comment line
    receiveInboundMessage(apiKeyProvided, senderName, senderPhone, studentName, studentClass, message) { // Method: Receives and verifies inbound message payload
        const activeKey = this.state.apiKeyVault.activeKey; // Key: Retrieve active authorized API key
        if (!apiKeyProvided || apiKeyProvided.trim() !== activeKey.trim()) { // Guard: Check if provided key matches active key
            this.showToast("Inbound API Error: 401 Unauthorized (Invalid or missing API key)", "danger"); // Toast: Alert rejection
            return { // Return: 401 error response object
                success: false, // Flag: Rejection flag
                status: 401, // Code: HTTP 401 Unauthorized
                error: "Unauthorized: The X-API-Key provided does not match the active school gateway key." // Message: Detailed error description
            }; // End of return
        } // End of guard
        this.state.apiKeyVault.totalReceived += 1; // Stats: Increment inbound received counter
        const newMsg = { // Object: Construct incoming message record
            id: "in-" + Date.now(), // ID: Unique message identifier
            timestamp: "Just now", // Time: Human readable time
            senderName: senderName || "Guardian", // Sender: Name of parent/guardian
            senderPhone: senderPhone || "+233 24 000 0000", // Phone: Mobile contact
            studentName: studentName || "School Ward", // Ward: Student name
            studentClass: studentClass || "General", // Class: Grade class
            message: message, // Body: Inbound text message
            status: "VERIFIED (200 OK)", // Status: Verified API delivery
            apiKeyUsed: activeKey.substring(0, 14) + "..." + activeKey.slice(-4), // Mask: Audit key stamp
            verified: true // Verified: Cryptographic authentication passed
        }; // End of newMsg
        this.state.inboundMessages.unshift(newMsg); // Store: Prepend to inbox array
        if (this.state.inboundMessages.length > 30) this.state.inboundMessages.pop(); // Trim: Cap list size
        this.logActivity(`Inbound message received from ${senderName} via API Key`, "ri-mail-download-line", "#10b981"); // Audit: Record activity
        this.saveState(); // Storage: Save state to localStorage
        this.showToast(`Incoming message from ${senderName} received via API Gateway!`, "success"); // Toast: Notify admin
        this.renderNoticeBoard(); // UI: Re-render notice board and inbox
        return { // Return: 200 OK response
            success: true, // Flag: Success flag
            status: 200, // Code: HTTP 200 OK
            message: "HTTP 200 OK: Message verified and delivered to School Portal inbox.", // Message: Confirmation
            traceId: "trace_" + Date.now(), // Trace: Audit trace ID
            data: newMsg // Data: Saved record
        }; // End of return
    } // End of receiveInboundMessage
//                                                                              // Line: Blank comment line
    openInboundSimulatorModal() { // Method: Opens the two-way inbound API simulation modal
        const keyInput = document.getElementById("inboundSimApiKey"); // Element: Key input field
        if (keyInput) keyInput.value = this.state.apiKeyVault.activeKey; // Pre-fill: Insert current active API key
        const resultEl = document.getElementById("inboundSimOutputTerminal"); // Element: Terminal output box
        if (resultEl) resultEl.innerHTML = "<span style=\"color:#64748b;\">// Ready: Submit simulated webhook payload to execute test...</span>"; // Reset: Terminal status
        this.openModal("modalSimulateInboundAPI"); // Modal: Open simulation dialog
    } // End of openInboundSimulatorModal
//                                                                              // Line: Blank comment line
    handleInboundSimulatorSubmit() { // Method: Processes submission from inbound simulation dialog
        const apiKey = document.getElementById("inboundSimApiKey")?.value || ""; // Value: Provided API key
        const senderName = document.getElementById("inboundSimSenderName")?.value || "Parent"; // Value: Sender name
        const senderPhone = document.getElementById("inboundSimPhone")?.value || "+233 24 111 2222"; // Value: Mobile phone
        const studentName = document.getElementById("inboundSimStudentName")?.value || "Student Ward"; // Value: Student ward
        const studentClass = document.getElementById("inboundSimClass")?.value || "Primary 1"; // Value: Grade class
        const message = document.getElementById("inboundSimMessage")?.value || "Acknowledged."; // Value: Message content
        const resultEl = document.getElementById("inboundSimOutputTerminal"); // Element: Terminal element
        const res = this.receiveInboundMessage(apiKey, senderName, senderPhone, studentName, studentClass, message); // Dispatch: Run inbound handler
        if (resultEl) { // Guard: Check if terminal exists
            const isSuccess = res.success; // Flag: Check success
            const statusColor = isSuccess ? "#10b981" : "#ef4444"; // Color: Status color
            resultEl.innerHTML = [ // Array: Format HTTP response output
                `<span style="color:${statusColor}; font-weight:700;">HTTP/1.1 ${res.status} ${isSuccess ? 'OK' : 'Unauthorized'}</span>`, // Line: HTTP Status
                `<span style="color:#64748b;">Content-Type: application/json; charset=utf-8</span>`, // Line: Content Type Header
                `<span style="color:#64748b;">Date: ${new Date().toUTCString()}</span>`, // Line: Date Header
                `<span style="color:#64748b;">X-Gateway-Trace-Id: ${res.traceId || 'req_error'}</span>`, // Line: Trace Header
                ``, // Line: Blank space
                `<span style="color:${isSuccess ? '#0284c7' : '#ef4444'}; font-weight:600;">${JSON.stringify(res, null, 2)}</span>` // Line: JSON payload body
            ].join("<br>"); // Join: Assemble terminal HTML
        } // End of terminal guard
    } // End of handleInboundSimulatorSubmit
//                                                                              // Line: Blank comment line
    renderNoticeBoard() { // Method: Renders Notice Board, API Key Vault, Outbound Logs, and Inbound Inbox
        this.updateSMSMeta(); // Meta: Update SMS preview
        const vault = this.state.apiKeyVault || {}; // Context: Retrieve API vault
        const keyDisplay = document.getElementById("apiKeyDisplayInput"); // Element: Key input element
        if (keyDisplay) { // Guard: Check if key input exists
            if (vault.isMasked) { // Check: If key should be masked
                keyDisplay.value = vault.activeKey.substring(0, 14) + "••••••••••••••••••••••••••••••••••••••••"; // Value: Masked key
            } else { // Else: Key is revealed
                keyDisplay.value = vault.activeKey; // Value: Plaintext key
            } // End of mask check
        } // End of key input guard
        const maskBtn = document.getElementById("btnToggleAPIKeyMask"); // Element: Mask toggle button
        if (maskBtn) { // Guard: Check if mask button exists
            maskBtn.innerHTML = vault.isMasked ? "<i class=\"ri-eye-line\"></i> Reveal Key" : "<i class=\"ri-eye-off-line\"></i> Mask Key"; // Update: Button label
        } // End of mask button guard
        const kpiActivePill = document.getElementById("kpiNoticeActiveKeyPill"); // Element: Top KPI active key pill
        if (kpiActivePill) { // Guard: Check if KPI pill exists
            kpiActivePill.textContent = vault.activeKey.substring(0, 16) + "..."; // Update: Key abbreviation
        } // End of KPI pill guard
        const kpiDispatched = document.getElementById("kpiNoticeDispatchedCount"); // Element: Top KPI dispatched count
        if (kpiDispatched) kpiDispatched.textContent = vault.totalDispatched || 0; // Update: Dispatched count
        const kpiReceived = document.getElementById("kpiNoticeReceivedCount"); // Element: Top KPI received count
        if (kpiReceived) kpiReceived.textContent = vault.totalReceived || 0; // Update: Received count
        const dispatchesTbody = document.getElementById("outboundDispatchesTableBody"); // Element: Dispatches table body
        if (dispatchesTbody) { // Guard: Check if table body exists
            const list = this.state.outboundDispatches || []; // List: Outbound dispatches
            if (list.length === 0) { // Check: Empty list
                dispatchesTbody.innerHTML = "<tr><td colspan=\"6\" style=\"text-align:center; color:var(--text-muted); padding:1.5rem;\">No announcement dispatches logged yet.</td></tr>"; // Empty: Table state
            } else { // Else: Render rows
                dispatchesTbody.innerHTML = list.map(item => [ // Map: Outbound row template array
                    "<tr>", // Row: Table row start
                    `<td><span class="badge badge-success" style="font-family:var(--font-mono); font-size:0.7rem;"><i class="ri-checkbox-circle-fill"></i> ${item.status}</span></td>`, // Cell: Delivery status badge
                    `<td><span style="font-family:var(--font-mono); font-size:0.75rem; color:var(--text-muted);">${item.timestamp}</span></td>`, // Cell: Timestamp
                    `<td><strong style="color:var(--text-primary);">${item.recipientGroup}</strong></td>`, // Cell: Target audience
                    `<td><span class="badge badge-info">${item.recipientCount} Parents</span></td>`, // Cell: Recipient volume
                    `<td style="max-width:280px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; color:var(--text-secondary);">${item.content}</td>`, // Cell: Announcement message
                    `<td><code style="font-size:0.72rem; color:var(--primary); font-family:var(--font-mono);">${item.traceId}</code></td>`, // Cell: Gateway trace token
                    "</tr>" // Row: Table row end
                ].join("")).join(""); // Map: Render outbound rows
            } // End of list check
        } // End of dispatches table guard
        const inboundTbody = document.getElementById("inboundMessagesTableBody"); // Element: Inbound messages table body
        if (inboundTbody) { // Guard: Check if inbound table exists
            const list = this.state.inboundMessages || []; // List: Inbound messages
            if (list.length === 0) { // Check: Empty list
                inboundTbody.innerHTML = "<tr><td colspan=\"6\" style=\"text-align:center; color:var(--text-muted); padding:1.5rem;\">No parent replies received yet. Use the Simulator to test inbound messaging!</td></tr>"; // Empty: Table state
            } else { // Else: Render rows
                inboundTbody.innerHTML = list.map(item => [ // Map: Inbound row template array
                    "<tr>", // Row: Table row start
                    `<td><span class="badge badge-success" style="font-family:var(--font-mono); font-size:0.7rem;"><i class="ri-shield-check-fill"></i> 200 OK</span></td>`, // Cell: Auth status
                    `<td><span style="font-family:var(--font-mono); font-size:0.75rem; color:var(--text-muted);">${item.timestamp}</span></td>`, // Cell: Timestamp
                    `<td><strong style="color:var(--text-primary); display:block;">${item.senderName}</strong><span style="font-size:0.72rem; color:var(--text-muted); font-family:var(--font-mono);">${item.senderPhone}</span></td>`, // Cell: Sender info
                    `<td><span style="font-weight:600; color:var(--text-secondary); display:block;">${item.studentName}</span><span style="font-size:0.72rem; color:var(--primary); font-weight:700;">${item.studentClass}</span></td>`, // Cell: Student ward
                    `<td style="color:var(--text-primary); font-size:0.83rem;">"${item.message}"</td>`, // Cell: Message body
                    `<td><button class="btn btn-outline btn-sm" onclick="document.getElementById('smsMessageContent').value='Dear ${item.senderName}, thank you for your reply regarding ${item.studentName}. '; window.scrollTo({top:0, behavior:'smooth'});"><i class="ri-reply-line"></i> Reply</button></td>`, // Cell: Reply button
                    "</tr>" // Row: Table row end
                ].join("")).join(""); // Map: Render inbound rows
            } // End of list check
        } // End of inbound table guard
    } // End of renderNoticeBoard

    // ========================================================================
    // 13. Module: Settings, Backups & Seed Restore
    // ========================================================================
    bindSettingsEvents() {
        const form = document.getElementById("schoolProfileForm");
        if (form) {
            form.addEventListener("submit", (e) => {
                e.preventDefault();
                this.saveSchoolProfileFromForm();
            });
        }

        const btnExportJSON = document.getElementById("btnExportJSON");
        if (btnExportJSON) {
            btnExportJSON.addEventListener("click", () => this.exportBackupJSON());
        }

        const btnImportTrigger = document.getElementById("btnImportJSONTrigger");
        const importInput = document.getElementById("importJSONInput");
        if (btnImportTrigger && importInput) {
            btnImportTrigger.addEventListener("click", () => importInput.click());
            importInput.addEventListener("change", (e) => this.importBackupJSON(e));
        }

        const btnReset = document.getElementById("btnResetSeedData");
        if (btnReset) {
            btnReset.addEventListener("click", () => {
                if (confirm("Reset the entire School Management System database back to original demo seed records? All customized changes will be reset.")) {
                    this.state = this.getFreshSeedState();
                    this.saveState();
                    this.renderAllViews();
                    this.showToast("System reset to fresh demo data!", "success");
                }
            });
        }
    }

    renderSettingsForm() {
        const p = this.state.schoolProfile;
        document.getElementById("settingSchoolName").value = p.name || "";
        document.getElementById("settingSchoolMotto").value = p.motto || "";
        document.getElementById("settingSchoolPhone").value = p.phone || "";
        document.getElementById("settingSchoolEmail").value = p.email || "";
        document.getElementById("settingPrincipalName").value = p.principal || "";
        document.getElementById("settingSchoolAddress").value = p.address || "";
    }

    saveSchoolProfileFromForm() {
        this.state.schoolProfile = {
            ...this.state.schoolProfile,
            name: document.getElementById("settingSchoolName").value.trim(),
            motto: document.getElementById("settingSchoolMotto").value.trim(),
            phone: document.getElementById("settingSchoolPhone").value.trim(),
            email: document.getElementById("settingSchoolEmail").value.trim(),
            principal: document.getElementById("settingPrincipalName").value.trim(),
            address: document.getElementById("settingSchoolAddress").value.trim()
        };

        const headmasterName = this.state.schoolProfile.principal;
        const sideUserEl = document.getElementById("sidebarUserName");
        if (sideUserEl) sideUserEl.textContent = headmasterName;

        this.saveState();
        this.showToast("School institutional information updated successfully!", "success");
    }

    exportBackupJSON() {
        const jsonStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.state, null, 2));
        const dlAnchor = document.createElement("a");
        dlAnchor.setAttribute("href", jsonStr);
        dlAnchor.setAttribute("download", `profbaidooeducomplex_SMS_Backup_${new Date().toISOString().split("T")[0]}.json`);
        document.body.appendChild(dlAnchor);
        dlAnchor.click();
        dlAnchor.remove();
        this.showToast("Full database backup downloaded as JSON", "success");
    }

    importBackupJSON(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const imported = JSON.parse(e.target.result);
                if (imported.students && imported.staff) {
                    this.state = imported;
                    this.saveState();
                    this.renderAllViews();
                    this.showToast("Database successfully restored from JSON backup!", "success");
                } else {
                    this.showToast("Invalid JSON backup structure.", "danger");
                }
            } catch (err) {
                this.showToast("Failed to parse JSON file.", "danger");
            }
        };
        reader.readAsText(file);
    }

    exportStudentsCSV() {
        let csv = "Admission No,First Name,Last Name,Class,Gender,DOB,Guardian Name,Guardian Phone,Fee Total,Fee Paid,Status\n";
        this.state.students.forEach(s => {
            csv += `"${s.admissionNo}","${s.firstName}","${s.lastName}","${s.class}","${s.gender}","${s.dob}","${s.guardianName}","${s.guardianPhone}","${s.feeTotal}","${s.feePaid}","${s.status}"\n`;
        });

        const uri = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
        const link = document.createElement("a");
        link.setAttribute("href", uri);
        link.setAttribute("download", "profbaidooeducomplex_Students_Registry.csv");
        document.body.appendChild(link);
        link.click();
        link.remove();
        this.showToast("Exported students registry to CSV", "success");
    }

    exportFeesCSV() {
        let csv = "Receipt No,Date,Student Name,Admission No,Class,Amount,Payment Method,Category,Reference\n";
        this.state.payments.forEach(p => {
            csv += `"${p.receiptNo}","${p.date}","${p.studentName}","${p.admissionNo}","${p.class}","${p.amount}","${p.method}","${p.category}","${p.ref}"\n`;
        });

        const uri = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
        const link = document.createElement("a");
        link.setAttribute("href", uri);
        link.setAttribute("download", "profbaidooeducomplex_Fees_Ledger.csv");
        document.body.appendChild(link);
        link.click();
        link.remove();
        this.showToast("Exported fees ledger to CSV", "success");
    }

    // ========================================================================
    // 14. Global Command Palette (`Ctrl+K`)
    // ========================================================================
    bindCommandPalette() {
        const trigger = document.getElementById("globalSearchTrigger");
        const input = document.getElementById("cmdPaletteInput");

        if (trigger) {
            trigger.addEventListener("click", () => this.openCommandPalette());
        }

        window.addEventListener("keydown", (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
                e.preventDefault();
                this.openCommandPalette();
            }
        });

        if (input) {
            input.addEventListener("input", () => this.searchCommandPalette(input.value));
        }
    }

    openCommandPalette() {
        const input = document.getElementById("cmdPaletteInput");
        if (input) {
            input.value = "";
            this.searchCommandPalette("");
        }
        this.openModal("modalCmdPalette");
        setTimeout(() => input?.focus(), 50);
    }

    searchCommandPalette(query) {
        const resultsEl = document.getElementById("cmdPaletteResults");
        if (!resultsEl) return;

        const q = query.toLowerCase().trim();
        const actions = [
            { title: "Add & Remove Members Hub", icon: "ri-user-settings-fill", action: () => this.switchView("manageMembersView") },
            { title: "Go to Executive Dashboard", icon: "ri-dashboard-2-line", action: () => this.switchView("dashboardView") },
            { title: "View Students Directory", icon: "ri-user-smile-line", action: () => this.switchView("studentsView") },
            { title: "Enroll New Student (Modal)", icon: "ri-user-add-line", action: () => this.openStudentModal() },
            { title: "Add New Teacher (Modal)", icon: "ri-user-star-line", action: () => this.openStaffModal() },
            { title: "Take Daily Attendance", icon: "ri-calendar-check-line", action: () => this.switchView("attendanceView") },
            { title: "Record Fee Payment", icon: "ri-hand-coin-line", action: () => this.openFeePaymentModal() },
            { title: "Gradebook & Report Cards", icon: "ri-file-list-3-line", action: () => this.switchView("examsView") },
            { title: "Broadcast SMS to Parents", icon: "ri-message-3-line", action: () => this.switchView("noticeView") },
            { title: "Toggle Light / Dark Mode", icon: "ri-sun-line", action: () => this.toggleTheme() }
        ];

        const matchedStudents = this.state.students.filter(s =>
            s.firstName.toLowerCase().includes(q) ||
            s.lastName.toLowerCase().includes(q) ||
            s.admissionNo.toLowerCase().includes(q)
        ).slice(0, 4);

        let html = "";

        if (matchedStudents.length > 0 && q) {
            html += `<span style="font-size:0.7rem; font-weight:700; color:var(--text-muted); text-transform:uppercase;">Students</span>`;
            html += matchedStudents.map(s => `
                <div class="quick-action-btn" style="padding:0.55rem 0.85rem;" onclick="app.viewReportCard('${s.id}'); app.closeModal('modalCmdPalette');">
                    <i class="ri-user-line" style="color:var(--primary-light);"></i>
                    <span style="font-size:0.85rem; font-weight:600;">${s.firstName} ${s.lastName} (${s.class} - ${s.admissionNo})</span>
                </div>
            `).join("");
        }

        const matchedActions = actions.filter(a => !q || a.title.toLowerCase().includes(q));
        if (matchedActions.length > 0) {
            html += `<span style="font-size:0.7rem; font-weight:700; color:var(--text-muted); text-transform:uppercase; margin-top:0.5rem;">Quick Navigation & Commands</span>`;
            html += matchedActions.map((a, i) => `
                <div class="quick-action-btn" style="padding:0.55rem 0.85rem;" onclick="window._cmdPaletteActions[${i}](); app.closeModal('modalCmdPalette');">
                    <i class="${a.icon}" style="color:var(--accent-cyan);"></i>
                    <span style="font-size:0.85rem; font-weight:600;">${a.title}</span>
                </div>
            `).join("");
        }

        window._cmdPaletteActions = matchedActions.map(a => a.action);
        resultsEl.innerHTML = html;
    }

    // ========================================================================
    // 15. Module: Biometric ID Photo Studio & Live Camera Capture Controller
    // ========================================================================
    bindPhotoCaptureEvents() { // Method: Binds UI triggers for photo capture, uploads, and studio controls
        const btnGlobal = document.getElementById("btnGlobalPhotoStudio"); // Button: Global topbar studio trigger
        if (btnGlobal) { // Check: If global studio button exists
            btnGlobal.addEventListener("click", () => this.openPhotoCaptureStudio("student", null)); // Event: Launch studio
        } // End if
        const btnStudStudio = document.getElementById("btnStudentPhotoStudio"); // Button: Student directory studio trigger
        if (btnStudStudio) { // Check: If student directory button exists
            btnStudStudio.addEventListener("click", () => this.openPhotoCaptureStudio("student", null)); // Event: Launch studio
        } // End if
        const btnStaffStudio = document.getElementById("btnStaffPhotoStudio"); // Button: Staff directory studio trigger
        if (btnStaffStudio) { // Check: If staff directory button exists
            btnStaffStudio.addEventListener("click", () => this.openPhotoCaptureStudio("staff", null)); // Event: Launch studio
        } // End if
        const btnTakeStud = document.getElementById("btnTakeStudentPhoto"); // Button: Take photo in student modal
        if (btnTakeStud) { // Check: If button exists
            btnTakeStud.addEventListener("click", () => { // Event: Click listener
                const editId = document.getElementById("studentEditId")?.value || null; // Target: Existing student edit ID or null
                this.openPhotoCaptureStudio("student", editId, (photoData) => this.setStudentPhoto(photoData)); // Studio: Open studio
            }); // End listener
        } // End if
        const btnUpStud = document.getElementById("btnUploadStudentPhoto"); // Button: Upload student photo file
        const fileStud = document.getElementById("studentFileInput"); // Input: Hidden student file input
        if (btnUpStud && fileStud) { // Check: If elements exist
            btnUpStud.addEventListener("click", () => fileStud.click()); // Action: Trigger system file dialog
            fileStud.addEventListener("change", (e) => { // Event: File selected listener
                if (e.target.files && e.target.files[0]) { // Check: File presence
                    this.handlePhotoFileUpload(e.target.files[0], "student", null, (data) => this.setStudentPhoto(data)); // Handler: Process image
                    e.target.value = ""; // Reset: Clear input for re-selection
                } // End if
            }); // End listener
        } // End if
        const btnRemStud = document.getElementById("btnRemoveStudentPhoto"); // Button: Remove student photo
        if (btnRemStud) { // Check: If button exists
            btnRemStud.addEventListener("click", () => this.removeStudentPhoto()); // Event: Remove photo
        } // End if
        const btnTakeStaff = document.getElementById("btnTakeStaffPhoto"); // Button: Take photo in staff modal
        if (btnTakeStaff) { // Check: If button exists
            btnTakeStaff.addEventListener("click", () => { // Event: Click listener
                const editId = document.getElementById("staffEditId")?.value || null; // Target: Existing staff edit ID or null
                this.openPhotoCaptureStudio("staff", editId, (photoData) => this.setStaffPhoto(photoData)); // Studio: Open studio
            }); // End listener
        } // End if
        const btnUpStaff = document.getElementById("btnUploadStaffPhoto"); // Button: Upload staff photo file
        const fileStaff = document.getElementById("staffFileInput"); // Input: Hidden staff file input
        if (btnUpStaff && fileStaff) { // Check: If elements exist
            btnUpStaff.addEventListener("click", () => fileStaff.click()); // Action: Trigger system file dialog
            fileStaff.addEventListener("change", (e) => { // Event: File selected listener
                if (e.target.files && e.target.files[0]) { // Check: File presence
                    this.handlePhotoFileUpload(e.target.files[0], "staff", null, (data) => this.setStaffPhoto(data)); // Handler: Process image
                    e.target.value = ""; // Reset: Clear input for re-selection
                } // End if
            }); // End listener
        } // End if
        const btnRemStaff = document.getElementById("btnRemoveStaffPhoto"); // Button: Remove staff photo
        if (btnRemStaff) { // Check: If button exists
            btnRemStaff.addEventListener("click", () => this.removeStaffPhoto()); // Event: Remove photo
        } // End if
        const btnCapture = document.getElementById("btnCaptureSnapshot"); // Button: Capture snapshot in studio
        if (btnCapture) { // Check: If capture button exists
            btnCapture.addEventListener("click", () => this.captureSnapshot()); // Event: Capture frame
        } // End if
        const btnRetake = document.getElementById("btnRetakeSnapshot"); // Button: Retake snapshot in studio
        if (btnRetake) { // Check: If retake button exists
            btnRetake.addEventListener("click", () => this.retakeSnapshot()); // Event: Return to live stream
        } // End if
        const btnAccept = document.getElementById("btnAcceptSnapshot"); // Button: Accept captured photo
        if (btnAccept) { // Check: If accept button exists
            btnAccept.addEventListener("click", () => this.acceptCapturedPhoto()); // Event: Confirm photo
        } // End if
        const btnSwitch = document.getElementById("btnSwitchCamera"); // Button: Flip between cameras
        if (btnSwitch) { // Check: If switch button exists
            btnSwitch.addEventListener("click", () => this.switchCameraDirection()); // Event: Toggle direction
        } // End if
        const btnStudioUpload = document.getElementById("btnStudioUploadFile"); // Button: Studio file upload fallback
        const btnFallbackUpload = document.getElementById("btnFallbackUpload"); // Button: Offline alert fallback
        const studioFileInput = document.getElementById("studioFileInput"); // Input: Hidden studio file input
        if (studioFileInput) { // Check: If studio file input exists
            if (btnStudioUpload) btnStudioUpload.addEventListener("click", () => studioFileInput.click()); // Event: Open picker
            if (btnFallbackUpload) btnFallbackUpload.addEventListener("click", () => studioFileInput.click()); // Event: Open picker
            studioFileInput.addEventListener("change", (e) => { // Event: File selected
                if (e.target.files && e.target.files[0]) { // Check: File presence
                    this.handlePhotoFileUpload(e.target.files[0], this.cameraTarget.type, this.cameraTarget.id, null); // Handler: Process file
                    e.target.value = ""; // Reset: Clear input
                } // End if
            }); // End listener
        } // End if
        const targetTypeSelect = document.getElementById("cameraTargetTypeSelect"); // Select: Category dropdown in studio
        if (targetTypeSelect) { // Check: If select exists
            targetTypeSelect.addEventListener("change", (e) => { // Event: Category change listener
                this.cameraTarget.type = e.target.value; // State: Update target category
                this.updateCameraTargetDisplay(); // UI: Refresh target title
            }); // End listener
        } // End if
    } // End bindPhotoCaptureEvents

    openPhotoCaptureStudio(targetType = "student", entityId = null, onAcceptedCallback = null) { // Method: Launches ID photo studio
        this.cameraTarget = { type: targetType, id: entityId, callback: onAcceptedCallback }; // State: Record target context
        this.capturedPhotoData = null; // State: Clear any previous snapshot
        const select = document.getElementById("cameraTargetTypeSelect"); // Element: Category select
        if (select) select.value = targetType; // UI: Sync category select
        this.updateCameraTargetDisplay(); // UI: Update target title description
        const liveActions = document.getElementById("cameraLiveActions"); // Element: Live buttons toolbar
        const reviewActions = document.getElementById("cameraReviewActions"); // Element: Review buttons toolbar
        if (liveActions) liveActions.style.display = "flex"; // UI: Show live actions
        if (reviewActions) reviewActions.style.display = "none"; // UI: Hide review actions
        const video = document.getElementById("cameraStreamVideo"); // Element: Video element
        const preview = document.getElementById("cameraSnapshotPreview"); // Element: Snapshot image
        const overlay = document.getElementById("cameraViewfinderOverlay"); // Element: Guide overlay
        const fallback = document.getElementById("cameraFallbackAlert"); // Element: Fallback banner
        if (video) video.style.display = "block"; // UI: Show video element
        if (preview) preview.style.display = "none"; // UI: Hide snapshot preview
        if (overlay) overlay.style.display = "flex"; // UI: Show oval guide
        if (fallback) fallback.style.display = "none"; // UI: Hide fallback banner
        this.openModal("modalPhotoCapture"); // Modal: Open modal dialog
        this.startCameraStream(); // Stream: Start live webcam video feed
    } // End openPhotoCaptureStudio

    updateCameraTargetDisplay() { // Method: Updates modal header target badge based on current selection
        const display = document.getElementById("cameraTargetDisplay"); // Element: Target badge display
        if (!display) return; // Guard: Return if missing
        if (this.cameraTarget.id) { // Check: If targeting specific existing person
            if (this.cameraTarget.type === "student") { // Check: Student target
                const student = this.state.students.find(s => s.id === this.cameraTarget.id); // Find: Student record
                display.textContent = student ? `Student: ${student.firstName} ${student.lastName} (${student.admissionNo})` : "Existing Student Profile"; // Text: Formatted name
            } else { // Else: Staff target
                const staff = this.state.staff.find(s => s.id === this.cameraTarget.id); // Find: Staff record
                display.textContent = staff ? `Teacher: ${staff.name} (${staff.role})` : "Faculty / Staff Profile"; // Text: Formatted name
            } // End if/else
        } else { // Else: New member registration target
            display.textContent = this.cameraTarget.type === "student" ? "New Student Enrollment" : "New Teacher / Staff Registration"; // Text: Generic label
        } // End if/else
    } // End updateCameraTargetDisplay

    startCameraStream() { // Method: Initiates browser getUserMedia video stream
        const statusMsg = document.getElementById("cameraStatusMsg"); // Element: Status feedback bar
        if (statusMsg) statusMsg.innerHTML = '<i class="ri-loader-4-line"></i> Connecting to camera hardware...'; // UI: Connecting note
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) { // Check: Hardware API support
            this.showCameraFallback("Webcam API is not supported in this browser. You can upload an image file from your device below."); // Fallback: Display advice
            return; // Guard: Stop execution
        } // End if
        const constraints = { // Object: Video capture constraints
            video: { // Video settings
                facingMode: this.cameraFacingMode, // Facing: "user" or "environment"
                width: { ideal: 640 }, // Width: Standard 640px
                height: { ideal: 480 } // Height: Standard 480px
            }, // End video settings
            audio: false // Audio: Disabled for photo capture
        }; // End constraints
        navigator.mediaDevices.getUserMedia(constraints) // Media: Request camera access
            .then(stream => { // Success handler
                this.cameraStream = stream; // State: Save stream reference
                const video = document.getElementById("cameraStreamVideo"); // Element: Video element
                if (video) { // Check: If video exists
                    video.srcObject = stream; // Assign: Attach media stream to video
                    video.style.transform = this.cameraFacingMode === "user" ? "scaleX(-1)" : "none"; // Transform: Mirror selfie
                    video.play().catch(e => console.warn("Video play interrupted:", e)); // Play: Start playback
                } // End if
                const overlay = document.getElementById("cameraViewfinderOverlay"); // Element: Viewfinder overlay
                const fallback = document.getElementById("cameraFallbackAlert"); // Element: Fallback banner
                if (overlay) overlay.style.display = "flex"; // UI: Show guide oval
                if (fallback) fallback.style.display = "none"; // UI: Hide fallback banner
                if (statusMsg) statusMsg.innerHTML = '<i class="ri-checkbox-circle-line" style="color:#10b981;"></i> Camera ready. Align face inside the oval and click "Capture Snapshot".'; // UI: Success message
            }) // End then
            .catch(err => { // Error handler
                console.warn("Webcam access error:", err); // Log: Error details
                this.showCameraFallback(`Camera hardware blocked or unavailable (${err.name || "Access Denied"}). You can upload an ID picture from your device.`); // Fallback: Show help
            }); // End catch
    } // End startCameraStream

    stopCameraStream() { // Method: Stops all active media tracks and powers off camera hardware LED
        if (this.cameraStream) { // Check: If active stream exists
            this.cameraStream.getTracks().forEach(track => { // Loop: Process all video tracks
                track.stop(); // Stop: Power off track
            }); // End loop
            this.cameraStream = null; // Reset: Clear stream reference
        } // End if
        const video = document.getElementById("cameraStreamVideo"); // Element: Video element
        if (video) video.srcObject = null; // Clean: Disconnect video source
    } // End stopCameraStream

    showCameraFallback(errorMsg) { // Method: Displays graceful offline fallback when camera is unavailable
        const overlay = document.getElementById("cameraViewfinderOverlay"); // Element: Guide overlay
        const fallback = document.getElementById("cameraFallbackAlert"); // Element: Fallback banner
        const fallbackMsg = document.getElementById("cameraFallbackMsg"); // Element: Message text
        const statusMsg = document.getElementById("cameraStatusMsg"); // Element: Status banner
        if (overlay) overlay.style.display = "none"; // UI: Hide oval guide
        if (fallback) fallback.style.display = "flex"; // UI: Show fallback banner
        if (fallbackMsg) fallbackMsg.textContent = errorMsg; // UI: Set error message
        if (statusMsg) statusMsg.innerHTML = '<i class="ri-error-warning-line" style="color:#f59e0b;"></i> Live video offline. Click "Choose Photo File" or "Upload Image File" to attach picture.'; // UI: Help status
    } // End showCameraFallback

    switchCameraDirection() { // Method: Toggles front selfie camera and back environment camera
        this.cameraFacingMode = this.cameraFacingMode === "user" ? "environment" : "user"; // State: Toggle direction
        this.stopCameraStream(); // Stream: Stop current stream
        this.startCameraStream(); // Stream: Start new stream with updated facing mode
    } // End switchCameraDirection

    captureSnapshot() { // Method: Captures square passport crop from video stream onto canvas
        const video = document.getElementById("cameraStreamVideo"); // Element: Live video feed
        const canvas = document.getElementById("cameraCanvas"); // Element: Processing canvas
        const preview = document.getElementById("cameraSnapshotPreview"); // Element: Frozen snapshot preview
        const overlay = document.getElementById("cameraViewfinderOverlay"); // Element: Guide overlay
        const liveActions = document.getElementById("cameraLiveActions"); // Element: Live actions
        const reviewActions = document.getElementById("cameraReviewActions"); // Element: Review actions
        const statusMsg = document.getElementById("cameraStatusMsg"); // Element: Status banner
        if (!video || !canvas || !preview) return; // Guard: Verify elements exist
        const vW = video.videoWidth || 640; // Dimension: Source video width
        const vH = video.videoHeight || 480; // Dimension: Source video height
        const minDim = Math.min(vW, vH); // Dimension: Square crop dimension
        const sX = (vW - minDim) / 2; // Offset: Horizontal crop center
        const sY = (vH - minDim) / 2; // Offset: Vertical crop center
        const targetDim = 400; // Dimension: Output 400x400 passport size
        canvas.width = targetDim; // Canvas: Output width
        canvas.height = targetDim; // Canvas: Output height
        const ctx = canvas.getContext("2d"); // Context: 2D drawing context
        ctx.clearRect(0, 0, targetDim, targetDim); // Clear: Reset canvas pixels
        if (this.cameraFacingMode === "user") { // Check: If mirror selfie mode active
            ctx.translate(targetDim, 0); // Transform: Flip horizontal coordinate
            ctx.scale(-1, 1); // Transform: Mirror context horizontally
        } // End if
        ctx.drawImage(video, sX, sY, minDim, minDim, 0, 0, targetDim, targetDim); // Draw: Crop and scale to canvas
        const photoData = canvas.toDataURL("image/jpeg", 0.88); // Export: High-clarity 88% quality JPEG data URL
        this.capturedPhotoData = photoData; // State: Save captured base64 data
        preview.src = photoData; // UI: Set snapshot image source
        preview.style.display = "block"; // UI: Show snapshot preview
        video.style.display = "none"; // UI: Hide live video feed
        if (overlay) overlay.style.display = "none"; // UI: Hide guide overlay
        if (liveActions) liveActions.style.display = "none"; // UI: Hide live buttons
        if (reviewActions) reviewActions.style.display = "flex"; // UI: Show review buttons
        if (statusMsg) statusMsg.innerHTML = '<i class="ri-checkbox-circle-fill" style="color:#10b981;"></i> Snapshot captured! Click "Use This ID Photo" to confirm or "Retake Picture" to try again.'; // UI: Review message
    } // End captureSnapshot

    retakeSnapshot() { // Method: Reverts from snapshot review back to live video stream
        this.capturedPhotoData = null; // State: Clear captured data
        const video = document.getElementById("cameraStreamVideo"); // Element: Video element
        const preview = document.getElementById("cameraSnapshotPreview"); // Element: Snapshot image
        const overlay = document.getElementById("cameraViewfinderOverlay"); // Element: Guide overlay
        const liveActions = document.getElementById("cameraLiveActions"); // Element: Live actions
        const reviewActions = document.getElementById("cameraReviewActions"); // Element: Review actions
        const statusMsg = document.getElementById("cameraStatusMsg"); // Element: Status banner
        if (preview) preview.style.display = "none"; // UI: Hide snapshot preview
        if (video) video.style.display = "block"; // UI: Show live video
        if (overlay) overlay.style.display = "flex"; // UI: Show guide overlay
        if (liveActions) liveActions.style.display = "flex"; // UI: Show live actions
        if (reviewActions) reviewActions.style.display = "none"; // UI: Hide review actions
        if (statusMsg) statusMsg.innerHTML = '<i class="ri-information-line"></i> Camera live. Align face in the oval guide and click "Capture Snapshot".'; // UI: Live message
    } // End retakeSnapshot

    acceptCapturedPhoto() { // Method: Confirms captured photo and applies it to recipient record or form
        if (!this.capturedPhotoData) { // Check: Verify photo exists
            this.showToast("No snapshot available to accept", "warning"); // Feedback: Warn user
            return; // Guard: Return
        } // End if
        const photoData = this.capturedPhotoData; // Cache: Photo data string
        if (typeof this.cameraTarget.callback === "function") { // Check: Custom callback supplied
            this.cameraTarget.callback(photoData); // Callback: Invoke recipient callback
        } else if (this.cameraTarget.type === "student") { // Else: Student target
            if (this.cameraTarget.id) { // Check: Existing student record
                const student = this.state.students.find(s => s.id === this.cameraTarget.id); // Find: Student
                if (student) { // Check: Student found
                    student.photo = photoData; // Update: Assign photo
                    this.saveState(); // State: Save persistent storage
                    this.renderStudentsTable(); // Table: Re-render student registry
                    this.renderHubStudentsTable(); // Hub: Re-render members hub
                    this.showToast(`ID photo updated successfully for ${student.firstName} ${student.lastName}`, "success"); // Feedback: Toast
                    this.logActivity(`Updated ID photo for student ${student.firstName} ${student.lastName}`, "ri-camera-fill", "#10b981"); // Log: Activity
                } // End if
            } else { // Else: Form input target
                this.setStudentPhoto(photoData); // UI: Set in student modal form
            } // End if/else
        } else if (this.cameraTarget.type === "staff") { // Else: Staff target
            if (this.cameraTarget.id) { // Check: Existing staff record
                const staff = this.state.staff.find(s => s.id === this.cameraTarget.id); // Find: Staff member
                if (staff) { // Check: Staff found
                    staff.photo = photoData; // Update: Assign photo
                    this.saveState(); // State: Save persistent storage
                    this.renderStaffTable(); // Table: Re-render faculty table
                    this.renderHubStaffTable(); // Hub: Re-render faculty hub
                    this.showToast(`ID photo updated successfully for ${staff.name}`, "success"); // Feedback: Toast
                    this.logActivity(`Updated ID photo for teacher ${staff.name}`, "ri-camera-fill", "#10b981"); // Log: Activity
                } // End if
            } else { // Else: Form input target
                this.setStaffPhoto(photoData); // UI: Set in staff modal form
            } // End if/else
        } // End if/else
        this.triggerConfetti(); // Effect: Celebration confetti
        this.stopCameraStream(); // Stream: Turn off camera hardware
        this.closeModal("modalPhotoCapture"); // Modal: Dismiss studio modal
    } // End acceptCapturedPhoto

    handlePhotoFileUpload(file, targetType, entityId, callback = null) { // Method: Downscales and attaches uploaded file
        if (!file || !file.type.startsWith("image/")) { // Check: Image MIME verification
            this.showToast("Please select a valid image file (PNG, JPG, JPEG)", "warning"); // Feedback: Warn invalid file
            return; // Guard: Stop execution
        } // End if
        this.downscaleImage(file, 400, 0.88, (photoData) => { // Downscale: Compress to 400x400 JPEG
            if (typeof callback === "function") { // Check: If custom callback provided
                callback(photoData); // Callback: Invoke callback
                this.showToast("Identification photo attached successfully", "success"); // Feedback: Toast
            } else { // Else: Studio display mode
                this.capturedPhotoData = photoData; // State: Set captured data
                const preview = document.getElementById("cameraSnapshotPreview"); // Element: Preview image
                const video = document.getElementById("cameraStreamVideo"); // Element: Video feed
                const overlay = document.getElementById("cameraViewfinderOverlay"); // Element: Guide overlay
                const liveActions = document.getElementById("cameraLiveActions"); // Element: Live actions
                const reviewActions = document.getElementById("cameraReviewActions"); // Element: Review actions
                const statusMsg = document.getElementById("cameraStatusMsg"); // Element: Status banner
                const fallback = document.getElementById("cameraFallbackAlert"); // Element: Fallback banner
                if (preview) { // Check: Preview element exists
                    preview.src = photoData; // Image: Set preview source
                    preview.style.display = "block"; // UI: Display preview image
                } // End if
                if (video) video.style.display = "none"; // UI: Hide live video
                if (overlay) overlay.style.display = "none"; // UI: Hide guide overlay
                if (fallback) fallback.style.display = "none"; // UI: Hide fallback banner
                if (liveActions) liveActions.style.display = "none"; // UI: Hide live buttons
                if (reviewActions) reviewActions.style.display = "flex"; // UI: Show review buttons
                if (statusMsg) statusMsg.innerHTML = '<i class="ri-checkbox-circle-fill" style="color:#10b981;"></i> Photo file loaded! Click "Use This ID Photo" to confirm or "Retake" to choose another.'; // UI: Success message
            } // End if/else
        }); // End downscaleImage
    } // End handlePhotoFileUpload

    downscaleImage(file, maxDim = 400, quality = 0.88, callback) { // Helper: Downscales image to square passport crop
        const reader = new FileReader(); // Reader: Initialize browser file reader
        reader.onload = (e) => { // Event: Reader loaded handler
            const img = new Image(); // Element: Create offscreen HTML image
            img.onload = () => { // Event: Image loaded handler
                const minDim = Math.min(img.width, img.height); // Dimension: Square crop side
                const sX = (img.width - minDim) / 2; // Offset: Horizontal crop center
                const sY = (img.height - minDim) / 2; // Offset: Vertical crop center
                const canvas = document.createElement("canvas"); // Canvas: Offscreen canvas
                canvas.width = maxDim; // Canvas: Output width
                canvas.height = maxDim; // Canvas: Output height
                const ctx = canvas.getContext("2d"); // Context: 2D drawing context
                ctx.drawImage(img, sX, sY, minDim, minDim, 0, 0, maxDim, maxDim); // Draw: Square center crop
                const dataUrl = canvas.toDataURL("image/jpeg", quality); // Export: Compressed base64 JPEG
                if (typeof callback === "function") callback(dataUrl); // Callback: Return data URL
            }; // End img.onload
            img.src = e.target.result; // Source: Assign file data URL to image
        }; // End reader.onload
        reader.readAsDataURL(file); // Reader: Read file as data URL
    } // End downscaleImage

    setStudentPhoto(photoData) { // Method: Sets student photo preview and hidden input in student modal
        const hiddenField = document.getElementById("studentPhotoData"); // Field: Hidden base64 input
        const previewBox = document.getElementById("studentPhotoPreview"); // Container: Preview container
        const badge = document.getElementById("studentPhotoBadge"); // Element: Status pill badge
        const btnRemove = document.getElementById("btnRemoveStudentPhoto"); // Button: Remove photo button
        if (hiddenField) hiddenField.value = photoData; // Value: Assign base64 string
        if (previewBox) { // Check: If preview container exists
            previewBox.innerHTML = `<img src="${photoData}" alt="Student ID Photo">`; // Image: Render portrait
        } // End if
        if (badge) { // Check: If badge exists
            badge.innerHTML = '<i class="ri-check-line"></i> Photo Ready'; // UI: Set ready text
            badge.classList.add("has-photo"); // Class: Add active success class
        } // End if
        if (btnRemove) btnRemove.style.display = "inline-flex"; // UI: Reveal remove button
    } // End setStudentPhoto

    removeStudentPhoto() { // Method: Clears student photo in modal form
        const hiddenField = document.getElementById("studentPhotoData"); // Field: Hidden input
        const previewBox = document.getElementById("studentPhotoPreview"); // Container: Preview box
        const badge = document.getElementById("studentPhotoBadge"); // Element: Badge
        const btnRemove = document.getElementById("btnRemoveStudentPhoto"); // Button: Remove button
        if (hiddenField) hiddenField.value = ""; // Value: Clear hidden input
        if (previewBox) previewBox.innerHTML = '<i class="ri-user-smile-line"></i>'; // UI: Reset placeholder icon
        if (badge) { // Check: If badge exists
            badge.innerHTML = '<i class="ri-camera-line"></i> No Photo'; // UI: Reset badge text
            badge.classList.remove("has-photo"); // Class: Remove active class
        } // End if
        if (btnRemove) btnRemove.style.display = "none"; // UI: Hide remove button
    } // End removeStudentPhoto

    resetStudentPhotoUI() { // Method: Resets student photo form state to default blank
        this.removeStudentPhoto(); // Action: Clear and reset elements
    } // End resetStudentPhotoUI

    setStaffPhoto(photoData) { // Method: Sets staff photo preview and hidden input in staff modal
        const hiddenField = document.getElementById("staffPhotoData"); // Field: Hidden base64 input
        const previewBox = document.getElementById("staffPhotoPreview"); // Container: Preview container
        const badge = document.getElementById("staffPhotoBadge"); // Element: Status pill badge
        const btnRemove = document.getElementById("btnRemoveStaffPhoto"); // Button: Remove photo button
        if (hiddenField) hiddenField.value = photoData; // Value: Assign base64 string
        if (previewBox) { // Check: If preview container exists
            previewBox.innerHTML = `<img src="${photoData}" alt="Faculty ID Photo">`; // Image: Render portrait
        } // End if
        if (badge) { // Check: If badge exists
            badge.innerHTML = '<i class="ri-check-line"></i> Photo Ready'; // UI: Set ready text
            badge.classList.add("has-photo"); // Class: Add active success class
        } // End if
        if (btnRemove) btnRemove.style.display = "inline-flex"; // UI: Reveal remove button
    } // End setStaffPhoto

    removeStaffPhoto() { // Method: Clears staff photo in modal form
        const hiddenField = document.getElementById("staffPhotoData"); // Field: Hidden input
        const previewBox = document.getElementById("staffPhotoPreview"); // Container: Preview box
        const badge = document.getElementById("staffPhotoBadge"); // Element: Badge
        const btnRemove = document.getElementById("btnRemoveStaffPhoto"); // Button: Remove button
        if (hiddenField) hiddenField.value = ""; // Value: Clear hidden input
        if (previewBox) previewBox.innerHTML = '<i class="ri-user-star-line"></i>'; // UI: Reset placeholder icon
        if (badge) { // Check: If badge exists
            badge.innerHTML = '<i class="ri-camera-line"></i> No Photo'; // UI: Reset badge text
            badge.classList.remove("has-photo"); // Class: Remove active class
        } // End if
        if (btnRemove) btnRemove.style.display = "none"; // UI: Hide remove button
    } // End removeStaffPhoto

    resetStaffPhotoUI() { // Method: Resets staff photo form state to default blank
        this.removeStaffPhoto(); // Action: Clear and reset elements
    } // End resetStaffPhotoUI

    launchStudioForEntity(type, id) { // Method: Opens photo studio directly targeted at existing student or teacher
        this.openPhotoCaptureStudio(type, id, null); // Studio: Launch studio with targeted entity
    } // End launchStudioForEntity

    viewStaffIDCard(staffId) { // Method: Displays digital faculty ID card for a teacher or staff member
        const staff = this.state.staff.find(s => s.id === staffId); // Find: Staff record
        if (!staff) return; // Guard: Verify staff exists
        document.getElementById("idCardSchoolName").textContent = this.state.schoolProfile.name; // School: Name
        document.getElementById("idCardStudentName").textContent = staff.name; // Staff: Full Name
        document.getElementById("idCardClass").textContent = `${staff.role} • Faculty ID`; // Role: Designation
        document.getElementById("idCardAdmNo").textContent = staff.id.toUpperCase(); // ID: Employee / Staff ID
        document.getElementById("idCardGender").textContent = staff.assignedClass || "Faculty"; // Role/Class: Assignment
        document.getElementById("idCardDOB").textContent = staff.degree || "Certified"; // Credential: Qualification
        document.getElementById("idCardEmergency").textContent = staff.phone || "N/A"; // Phone: Contact
        const initials = staff.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase(); // Initials: Two-letter initials
        const avatarEl = document.getElementById("idCardAvatar"); // Element: ID Card photo container
        if (avatarEl) { // Check: If avatar container exists
            if (staff.photo) { // Check: If staff has profile photo
                avatarEl.innerHTML = `<img src="${staff.photo}" alt="${staff.name}" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;">`; // Image: Render photo
                avatarEl.style.background = 'transparent'; // Background: Transparent for image
            } else { // Fallback: Render initials
                avatarEl.textContent = initials; // Initials: Text
                avatarEl.style.background = "linear-gradient(135deg, #10b981, #06b6d4)"; // Background: Staff gradient
            } // End if/else
        } // End if
        this.openModal("modalIDCard"); // Modal: Open ID card modal
    } // End viewStaffIDCard

    renderAllViews() { // Method: Re-renders all system views and tables
        const currentUser = (window.SMSAuth && window.SMSAuth.currentSession) ? window.SMSAuth.currentSession : null; // Context: Active user session
        if (currentUser && currentUser.rowScope && currentUser.rowScope.scopeType === "CLASS_ROWS_ONLY") { // Check: Class teacher restriction
            const assigned = currentUser.rowScope.assignedClass; // Target: Assigned class
            const attSelect = document.getElementById("attClassSelect"); // Element: Attendance class select
            if (attSelect && assigned) attSelect.value = assigned; // Value: Force assigned class
            const examSelect = document.getElementById("examClassSelect"); // Element: Exam class select
            if (examSelect && assigned) examSelect.value = assigned; // Value: Force assigned class
        } // End: Teacher check
        this.renderDashboard(); // Render: Executive dashboard
        this.renderManageMembersHub();
        this.renderStudentsTable();
        this.renderStaffTable();
        this.renderClassesGrid();
        this.renderAttendanceTable();
        this.renderGradebookTable();
        this.renderFeesTable();
        this.renderNoticeBoard();
        this.renderSettingsForm();
    }
}

// Instantiate global app engine
let app;
document.addEventListener("DOMContentLoaded", () => {
    app = new SchoolManagerApp();
    window.app = app;
});
