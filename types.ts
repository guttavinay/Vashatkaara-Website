
import { ReactNode } from 'react';

// Define the interface for the services offered by NexusTech
export interface Service {
  id: string;
  title: string;
  description: string;
  // Use ReactNode instead of JSX.Element to avoid namespace issues in non-TSX files
  icon: ReactNode;
  features: string[];
}

export interface NavItem {
  label: string;
  href: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
