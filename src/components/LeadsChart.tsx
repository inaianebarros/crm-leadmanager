import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lead, statusLabels, LeadStatus } from '@/types/lead';

interface LeadsChartProps {
  leads: Lead[];
}

const statusColors: Record<LeadStatus, string> = {
  new: 'hsl(142, 76%, 36%)',
  contact: 'hsl(38, 92%, 50%)',
  qualified: 'hsl(217, 91%, 60%)',
  closed: 'hsl(215, 16%, 47%)',
};

export function LeadsChart({ leads }: LeadsChartProps) {
  const data = (['new', 'contact', 'qualified', 'closed'] as LeadStatus[]).map((status) => ({
    name: statusLabels[status],
    value: leads.filter((lead) => lead.status === status).length,
    status,
  }));

  return (
    <Card className="card-elevated">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Leads por Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis
                dataKey="name"
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
              />
              <YAxis
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
                allowDecimals={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  boxShadow: 'var(--shadow-lg)',
                }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]} animationDuration={500}>
                {data.map((entry) => (
                  <Cell key={entry.status} fill={statusColors[entry.status]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
