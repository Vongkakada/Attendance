import { Employee, AttendanceHistoryEntry } from '../types';

export const mockEmployee: Employee = {
  id: 'EMP-007',
  name: 'Sokun David',
  avatarUrl: `https://i.pravatar.cc/150?u=EMP-007`,
  position: 'Frontend Developer',
  department: 'Technology',
};

export const mockAttendanceSummary = {
    totalPresent: 25,
    totalLeave: 2,
};

export const mockAttendanceHistory: AttendanceHistoryEntry[] = [
    { date: 'Mon, 22 Jul 2024', checkIn: '08:30 AM', checkOut: '05:30 PM', status: 'On Time', hours: '8h 0m' },
    { date: 'Sun, 21 Jul 2024', checkIn: '08:32 AM', checkOut: '05:30 PM', status: 'Late', hours: '7h 58m' },
    { date: 'Sat, 20 Jul 2024', checkIn: '08:25 AM', checkOut: '05:35 PM', status: 'On Time', hours: '8h 10m' },
    { date: 'Fri, 19 Jul 2024', checkIn: '08:30 AM', checkOut: '05:30 PM', status: 'On Time', hours: '8h 0m' },
    { date: 'Thu, 18 Jul 2024', checkIn: '08:45 AM', checkOut: '06:00 PM', status: 'Late', hours: '8h 15m' },
    { date: 'Wed, 17 Jul 2024', checkIn: '08:29 AM', checkOut: '05:30 PM', status: 'On Time', hours: '8h 1m' },
];
