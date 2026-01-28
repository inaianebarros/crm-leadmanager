import { Lead } from '@/types/lead';
import { Card } from '@/components/ui/card';
import { GripVertical, Mail } from 'lucide-react';

interface LeadCardProps {
  lead: Lead;
  isDragging?: boolean;
}

export function LeadCard({ lead, isDragging }: LeadCardProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Card
      className={`p-3 cursor-grab active:cursor-grabbing transition-all duration-200 ${
        isDragging 
          ? 'opacity-50 scale-105 shadow-lg rotate-2' 
          : 'hover:shadow-md hover:-translate-y-0.5'
      }`}
    >
      <div className="flex items-start gap-2">
        <GripVertical className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-foreground truncate">{lead.name}</h4>
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
            <Mail className="w-3 h-3" />
            <span className="truncate">{lead.email}</span>
          </div>
          <p className="text-sm font-semibold text-primary mt-2">
            {formatCurrency(lead.estimatedValue)}
          </p>
        </div>
      </div>
    </Card>
  );
}
