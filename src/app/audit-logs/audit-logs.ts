// src/app/audit-logs/audit-logs.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  // needed for *ngFor, ngClass, etc.
import { Sidebar } from '../sidebar/sidebar'; // <-- import Sidebar

interface AuditLog {
  date: string;
  officer: string;
  action: string;
  studentId: string;
  studentName: string;
  comment: string;
}

@Component({
  selector: 'audit-logs',
  standalone: true,
  imports: [FormsModule, CommonModule,Sidebar],  // <-- Add CommonModule here!
  templateUrl: './audit-logs.html',
})
export class AuditLogs {
  auditData: AuditLog[] = [
    { date: 'Dec 11, 2025 - 2:35 PM', officer: 'Officer 1', action: 'Approved', studentId: '2021-67890', studentName: 'Maria Santos', comment: 'All fees paid in full' },
    { date: 'Dec 11, 2025 - 2:20 PM', officer: 'Officer 1', action: 'Follow-up', studentId: '2021-12345', studentName: 'John Doe', comment: 'Payment incomplete - ₱200 remaining' },
    { date: 'Dec 11, 2025 - 1:45 PM', officer: 'Officer 1', action: 'Rejected', studentId: '2021-99999', studentName: 'Peter Cruz', comment: 'Outstanding balance of ₱1,500' },
  ];

  filteredData: AuditLog[] = [...this.auditData];

  searchTerm: string = '';
  actionType: string = '';
  dateRange: string = '';

  filterAuditLogs() {
    this.filteredData = this.auditData.filter(item => {
      const matchesSearch = this.searchTerm
        ? item.studentId.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          item.studentName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          item.officer.toLowerCase().includes(this.searchTerm.toLowerCase())
        : true;

      const matchesAction = this.actionType ? item.action.toLowerCase() === this.actionType.toLowerCase() : true;
      const matchesDate = this.dateRange ? this.checkDateRange(item.date) : true;

      return matchesSearch && matchesAction && matchesDate;
    });
  }

  checkDateRange(dateStr: string): boolean {
    const logDate = new Date(dateStr);
    const now = new Date();

    switch (this.dateRange) {
      case 'today':
        return logDate.toDateString() === now.toDateString();
      case 'week': {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(now.getDate() - 7);
        return logDate >= oneWeekAgo && logDate <= now;
      }
      case 'month':
        return logDate.getMonth() === now.getMonth() && logDate.getFullYear() === now.getFullYear();
      default:
        return true;
    }
  }
}
