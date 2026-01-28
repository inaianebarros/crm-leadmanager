export type LeadStatus = 'new' | 'contact' | 'qualified' | 'closed';

export interface Lead {
  id: string;
  name: string;
  email: string;
  status: LeadStatus;
  estimatedValue: number;
  createdAt: Date;
}

export const statusLabels: Record<LeadStatus, string> = {
  new: 'Novo',
  contact: 'Em Contato',
  qualified: 'Qualificado',
  closed: 'Fechado',
};
