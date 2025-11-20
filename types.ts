import { LucideIcon } from 'lucide-react';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export enum Section {
  HERO = 'hero',
  SERVICES = 'services',
  CONTACT = 'contact',
}