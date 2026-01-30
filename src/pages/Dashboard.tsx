import { useMemo } from 'react';
import { Users, DollarSign, UserCheck, TrendingUp } from 'lucide-react';
import { Lead } from '@/types/lead';
import { MetricCard } from '@/components/MetricCard';
import { LeadsChart } from '@/components/LeadsChart';
import { LostLeadsTable } from '@/components/LostLeadsTable';

interface DashboardProps {
  leads: Lead[];
  lostLeads: Lead[];
  onRestoreLead: (lead: Lead) => void;
}

export function Dashboard({ leads, lostLeads, onRestoreLead }: DashboardProps) {
  const metrics = useMemo(() => {
    const totalLeads = leads.length;
    const qualifiedLeads = leads.filter((lead) => lead.status === 'qualified').length;
    const closedLeads = leads.filter((lead) => lead.status === 'closed').length;
    const totalValue = leads.reduce((sum, lead) => sum + lead.estimatedValue, 0);
    
    // Taxa de conversão: leads fechados / total de leads (exceto novos)
    const processedLeads = leads.filter((lead) => lead.status !== 'new').length;
    const conversionRate = processedLeads > 0 ? (closedLeads / processedLeads) * 100 : 0;

    return {
      totalLeads,
      qualifiedLeads,
      totalValue,
      conversionRate,
    };
  }, [leads]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Visão geral do seu pipeline de vendas</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total de Leads"
          value={metrics.totalLeads}
          icon={Users}
          variant="info"
        />
        <MetricCard
          title="Valor Total Estimado"
          value={formatCurrency(metrics.totalValue)}
          icon={DollarSign}
          variant="success"
        />
        <MetricCard
          title="Leads Qualificados"
          value={metrics.qualifiedLeads}
          icon={UserCheck}
          variant="warning"
        />
        <MetricCard
          title="Taxa de Conversão"
          value={`${metrics.conversionRate.toFixed(1)}%`}
          icon={TrendingUp}
          variant="default"
        />
      </div>

      {/* Chart */}
      <LeadsChart leads={leads} />

      {/* Lost Leads Table */}
      <LostLeadsTable leads={lostLeads} onRestore={onRestoreLead} />
    </div>
  );
}
