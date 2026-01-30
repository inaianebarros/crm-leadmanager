import { useLeadsContext } from '@/hooks/useLeadsContext';
import { Leads } from './Leads';

export default function LeadsPage() {
  const { leads, onAddLead, onEditLead, onDeleteLead, onStatusChange } = useLeadsContext();

  return (
    <Leads
      leads={leads}
      onAddLead={onAddLead}
      onEditLead={onEditLead}
      onDeleteLead={onDeleteLead}
      onStatusChange={onStatusChange}
    />
  );
}
