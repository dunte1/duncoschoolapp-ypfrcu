
import { AttendanceRecord, Exam, Book, Invoice, Notification, Message } from '@/types/data';

export const mockAttendance: AttendanceRecord[] = [
  {
    id: '1',
    studentId: 'S001',
    studentName: 'John Doe',
    date: '2024-01-15',
    status: 'present',
  },
  {
    id: '2',
    studentId: 'S002',
    studentName: 'Jane Smith',
    date: '2024-01-15',
    status: 'absent',
    remarks: 'Sick leave',
  },
  {
    id: '3',
    studentId: 'S003',
    studentName: 'Mike Johnson',
    date: '2024-01-15',
    status: 'late',
    remarks: 'Traffic',
  },
];

export const mockExams: Exam[] = [
  {
    id: '1',
    title: 'Mathematics Final Exam',
    subject: 'Mathematics',
    date: '2024-02-20',
    duration: '2 hours',
    totalMarks: 100,
    obtainedMarks: 85,
    grade: 'A',
    status: 'graded',
  },
  {
    id: '2',
    title: 'Science Mid-term',
    subject: 'Science',
    date: '2024-02-25',
    duration: '1.5 hours',
    totalMarks: 50,
    status: 'upcoming',
  },
  {
    id: '3',
    title: 'English Literature',
    subject: 'English',
    date: '2024-02-18',
    duration: '2 hours',
    totalMarks: 100,
    obtainedMarks: 78,
    grade: 'B+',
    status: 'graded',
  },
];

export const mockBooks: Book[] = [
  {
    id: '1',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    isbn: '978-0-06-112008-4',
    category: 'Fiction',
    available: true,
  },
  {
    id: '2',
    title: 'Introduction to Algorithms',
    author: 'Thomas H. Cormen',
    isbn: '978-0-262-03384-8',
    category: 'Computer Science',
    available: false,
    dueDate: '2024-02-10',
  },
  {
    id: '3',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    isbn: '978-0-7432-7356-5',
    category: 'Fiction',
    available: true,
  },
];

export const mockInvoices: Invoice[] = [
  {
    id: '1',
    title: 'Tuition Fee - Term 1',
    amount: 15000,
    dueDate: '2024-02-01',
    status: 'paid',
    description: 'First term tuition payment',
  },
  {
    id: '2',
    title: 'Library Fee',
    amount: 500,
    dueDate: '2024-02-15',
    status: 'pending',
    description: 'Annual library membership',
  },
  {
    id: '3',
    title: 'Sports Fee',
    amount: 1000,
    dueDate: '2024-01-30',
    status: 'overdue',
    description: 'Sports activities fee',
  },
];

export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Exam Schedule Released',
    message: 'The final exam schedule has been published. Check your dashboard for details.',
    date: '2024-01-15T10:30:00',
    read: false,
    type: 'info',
  },
  {
    id: '2',
    title: 'Fee Payment Reminder',
    message: 'Your library fee payment is due in 3 days.',
    date: '2024-01-14T14:20:00',
    read: false,
    type: 'warning',
  },
  {
    id: '3',
    title: 'Holiday Notice',
    message: 'School will be closed on January 20th for a public holiday.',
    date: '2024-01-13T09:00:00',
    read: true,
    type: 'info',
  },
];

export const mockMessages: Message[] = [
  {
    id: '1',
    sender: 'Mr. Anderson',
    subject: 'Assignment Submission',
    preview: 'Please submit your mathematics assignment by Friday...',
    date: '2024-01-15T11:30:00',
    read: false,
  },
  {
    id: '2',
    sender: 'Principal Office',
    subject: 'Parent-Teacher Meeting',
    preview: 'We are organizing a parent-teacher meeting next week...',
    date: '2024-01-14T16:45:00',
    read: false,
  },
  {
    id: '3',
    sender: 'Library Department',
    subject: 'Book Return Reminder',
    preview: 'Your borrowed book is due for return on January 18th...',
    date: '2024-01-13T10:15:00',
    read: true,
  },
];
