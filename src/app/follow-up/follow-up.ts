// src/app/follow-up/follow-up.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Sidebar } from '../sidebar/sidebar';  // Import your sidebar component

// Interface for a follow-up entry
interface FollowUpEntry {
  studentId: string;
  name: string;
  reason: string;
  dateRequested: string;
  status: 'pending' | 'contacted' | 'resolved';
}

@Component({
  selector: 'follow-up',
  standalone: true,
  imports: [FormsModule, CommonModule, Sidebar], // Include Sidebar
  templateUrl: './follow-up.html',
})
export class FollowUp {
  // Sample data for follow-ups
  followups: FollowUpEntry[] = [
    { studentId: '2021-12345', name: 'John Doe', reason: 'Outstanding balance: ₱200', dateRequested: 'Dec 10, 2025', status: 'pending' },
    { studentId: '2021-67890', name: 'Maria Santos', reason: 'Missing form submission', dateRequested: 'Dec 11, 2025', status: 'contacted' },
    { studentId: '2021-54321', name: 'Carol Egonio', reason: 'Payment incomplete', dateRequested: 'Dec 12, 2025', status: 'pending' },
  ];

  // Filtered list used for display
  filteredFollowups: FollowUpEntry[] = [...this.followups];

  // Form inputs / filters
  searchTerm: string = '';
  statusFilter: string = '';

  // Filter follow-ups based on search and status
  filterFollowups() {
    this.filteredFollowups = this.followups.filter(f => {
      const matchesSearch = this.searchTerm
        ? f.name.toLowerCase().includes(this.searchTerm.toLowerCase()) || f.studentId.includes(this.searchTerm)
        : true;
      const matchesStatus = this.statusFilter ? f.status === this.statusFilter : true;
      return matchesSearch && matchesStatus;
    });
  }

  // Reset filters
  resetFilters() {
    this.searchTerm = '';
    this.statusFilter = '';
    this.filteredFollowups = [...this.followups];
  }

  // Mark a follow-up as resolved
  resolveFollowup(studentId: string) {
    const f = this.followups.find(f => f.studentId === studentId);
    if (f) f.status = 'resolved';
    this.filterFollowups();
  }

  // Placeholder for adding comments
  addComment(studentId: string) {
    alert(`Add comment for ${studentId}`);
  }
}
