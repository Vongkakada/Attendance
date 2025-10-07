export enum AppView {
  DASHBOARD = 'DASHBOARD',
  HISTORY = 'HISTORY',
  LEAVE = 'LEAVE',
  OVERTIME = 'OVERTIME',
}

export enum ScannerState {
  IDLE,
  SCANNING,
  SUCCESS,
  ERROR,
}

export type ScanType = 'Check In' | 'Check Out';

export interface Employee {
  id: string;
  name: string;
  avatarUrl: string;
  position: string;
  department: string;
}

export interface AttendanceLog {
  employee: Employee;
  date: string;
  time: string;
}

export interface DailyAttendance {
  checkIn: AttendanceLog;
  checkOut: AttendanceLog | null;
}

export interface AttendanceHistoryEntry {
  date: string;
  checkIn: string;
  checkOut: string | null;
  status: 'On Time' | 'Late';
  hours: string;
}