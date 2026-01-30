import { useOutletContext } from 'react-router-dom';
import { Lead, LeadStatus } from '@/types/lead';

interface LeadsContext {
  leads: Lead[];
  lostLeads: Lead[];
  onAddLead: (leadData: Omit<Lead, 'id' | 'createdAt'>) => void;
  onEditLead: (lead: Lead, leadData: Omit<Lead, 'id' | 'createdAt'>) => void;
  onDeleteLead: (id: string) => void;
  onStatusChange: (leadId: string, newStatus: LeadStatus) => void;
  onRestoreLead: (lead: Lead) => void;
}

export function useLeadsContext() {
  return useOutletContext<LeadsContext>();
}
