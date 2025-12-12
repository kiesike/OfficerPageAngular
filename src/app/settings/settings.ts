// src/app/settings/settings.ts
import { Component } from '@angular/core';
import { Sidebar } from '../sidebar/sidebar'; // Standalone Sidebar component
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [Sidebar, FormsModule],
  templateUrl: './settings.html',
})
export class Settings {
  // Preview images
  profilePreview: string = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><rect width="100%" height="100%" fill="%23e9ecef"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23777" font-size="12">No Image</text></svg>';
  signaturePreview: string = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="180" height="80"><rect width="100%" height="100%" fill="%23f8f9fa"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23999" font-size="12">No Signature</text></svg>';

  constructor() {
    this.setActiveTab();
  }

  setActiveTab() {
    // Highlight Settings tab in sidebar
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));

    const settingsTab = Array.from(navItems).find(item => item.textContent?.trim() === 'Settings');
    if (settingsTab) settingsTab.classList.add('active');
  }

  onProfilePictureChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = e => {
        this.profilePreview = e.target?.result as string;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  onSignatureChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = e => {
        this.signaturePreview = e.target?.result as string;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  updateProfile(event: Event) {
    event.preventDefault();
    alert('Profile updated successfully!');
    // You can add actual saving logic here
  }

  saveNotifications(event: Event) {
    event.preventDefault();
    alert('Notification preferences saved!');
    // You can add actual saving logic here
  }
}
