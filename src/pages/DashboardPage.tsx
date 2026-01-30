import { useLeadsContext } from '@/hooks/useLeadsContext';
import { Dashboard } from './Dashboard';

export default function DashboardPage() {
  const { leads, lostLeads, onRestoreLead } = useLeadsContext();

  return (
    <Dashboard
      leads={leads}
      lostLeads={lostLeads}
      onRestoreLead={onRestoreLead}
    />
  );
}
