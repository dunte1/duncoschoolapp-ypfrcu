
export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  remarks?: string;
}

export interface Exam {
  id: string;
  title: string;
  subject: string;
  date: string;
  duration: string;
  totalMarks: number;
  obtainedMarks?: number;
  grade?: string;
  status: 'upcoming' | 'completed' | 'graded';
}

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  available: boolean;
  dueDate?: string;
}

export interface Invoice {
  id: string;
  title: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  description: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'info' | 'warning' | 'success' | 'error';
}

export interface Message {
  id: string;
  sender: string;
  subject: string;
  preview: string;
  date: string;
  read: boolean;
  avatar?: string;
}
