import { LucideIcon } from 'lucide-react';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface AuditResult {
  score: number;
  summary: string;
  recommendations: string[];
}

export enum Section {
  HERO = 'hero',
  SERVICES = 'services',
  AUDIT = 'audit',
  CONTACT = 'contact',
}