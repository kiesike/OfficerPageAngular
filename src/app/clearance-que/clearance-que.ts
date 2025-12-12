// src/app/clearance-que/clearance-que.ts
import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Sidebar } from '../sidebar/sidebar';

interface ClearanceItem {
  studentId: string;
  studentName: string;
  program: string;
  year: string;
  college: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

@Component({
  selector: 'app-clearance-que',
  standalone: true,
  imports: [CommonModule, FormsModule, Sidebar],
  templateUrl: './clearance-que.html',
})
export class ClearanceQue implements AfterViewInit {
  clearanceItems: ClearanceItem[] = [
    { studentId: '2021-67890', studentName: 'Maria Santos', program: 'BSCS', year: '2nd Year', college: 'CAS', status: 'Pending' },
    { studentId: '2021-12345', studentName: 'John Doe', program: 'BSIT', year: '3rd Year', college: 'CAS', status: 'Pending' },
    { studentId: '2021-54321', studentName: 'Carol Egonio', program: 'BSIT', year: '3rd Year', college: 'CAS', status: 'Pending' },
  ];

  searchTerm: string = '';
  programFilter: string = '';
  yearFilter: string = '';

  filteredItems: ClearanceItem[] = [...this.clearanceItems];

  ngAfterViewInit() {
    this.activateSidebar();
  }

  activateSidebar() {
    const navItems = document.querySelectorAll('.nav-item');

    function removeActive() {
      navItems.forEach(item => item.classList.remove('active'));
    }

    navItems.forEach(item => {
      const page = item.querySelector('span:not(.icon)')?.textContent?.trim().toLowerCase();
      if (page === 'clearance queue') item.classList.add('active');

      item.addEventListener('click', () => {
        removeActive();
        item.classList.add('active');
      });
    });
  }

  showPage(pageId: string) {
    const pages = document.querySelectorAll('.page-view');
    pages.forEach(page => page.classList.remove('active'));

    const target = document.getElementById(pageId);
    if (target) target.classList.add('active');
  }

  filterQueue() {
    this.filteredItems = this.clearanceItems.filter(item => {
      const matchesSearch = this.searchTerm
        ? item.studentId.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          item.studentName.toLowerCase().includes(this.searchTerm.toLowerCase())
        : true;

      const matchesProgram = this.programFilter ? item.program === this.programFilter : true;
      const matchesYear = this.yearFilter ? item.year === this.yearFilter : true;

      return matchesSearch && matchesProgram && matchesYear;
    });
  }

  resetFilters() {
    this.searchTerm = '';
    this.programFilter = '';
    this.yearFilter = '';
    this.filteredItems = [...this.clearanceItems];
  }

  approveStudent(id: string) {
    const student = this.clearanceItems.find(s => s.studentId === id);
    if (student) student.status = 'Approved';
    this.filterQueue();
  }

  rejectStudent(id: string) {
    const student = this.clearanceItems.find(s => s.studentId === id);
    if (student) student.status = 'Rejected';
    this.filterQueue();
  }

  addComment(id: string) {
    alert(`Add comment for student ${id}`); // placeholder, you can replace with a modal later
  }
}
