// src/app/dashboard/dashboard.ts
import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Sidebar } from '../sidebar/sidebar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, Sidebar],
  templateUrl: './dashboard.html',
})
export class Dashboard implements AfterViewInit {
  constructor(private router: Router) {}

  ngAfterViewInit() {
    this.activateSidebar();
  }

  activateSidebar() {
    const navItems = document.querySelectorAll('.nav-item');

    function removeActive() {
      navItems.forEach(item => item.classList.remove('active'));
    }

    // Highlight the dashboard tab by default
    navItems.forEach(item => {
      const page = item.querySelector('span:not(.icon)')?.textContent?.trim().toLowerCase();
      if (page === 'dashboard') {
        item.classList.add('active');
      }

      item.addEventListener('click', () => {
        removeActive();
        item.classList.add('active');
      });
    });
  }

  // Navigate to a different page
  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
