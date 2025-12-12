// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { ClearanceQue } from './clearance-que/clearance-que';
import { FollowUp } from './follow-up/follow-up';
import { AuditLogs } from './audit-logs/audit-logs';
import { Settings } from './settings/settings';

export const routes: Routes = [
  // Default route redirects to Dashboard
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  // Main pages
  { path: 'dashboard', component: Dashboard },
  { path: 'queue', component: ClearanceQue },
  { path: 'follow-up', component: FollowUp },
  { path: 'audit-logs', component: AuditLogs },
  { path: 'settings', component: Settings },

  // Wildcard route (optional) - redirect unknown paths to Dashboard
  { path: '**', redirectTo: 'dashboard' }
];
