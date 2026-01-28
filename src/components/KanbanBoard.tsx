import { useState } from 'react';
import { Lead, LeadStatus, statusLabels } from '@/types/lead';
import { LeadCard } from './LeadCard';
import { cn } from '@/lib/utils';

interface KanbanBoardProps {
  leads: Lead[];
  onStatusChange: (leadId: string, newStatus: LeadStatus) => void;
}

const columns: LeadStatus[] = ['new', 'contact', 'qualified', 'closed'];

const columnColors: Record<LeadStatus, string> = {
  new: 'border-t-blue-500',
  contact: 'border-t-amber-500',
  qualified: 'border-t-emerald-500',
  closed: 'border-t-slate-500',
};

const columnBgColors: Record<LeadStatus, string> = {
  new: 'bg-blue-500/10',
  contact: 'bg-amber-500/10',
  qualified: 'bg-emerald-500/10',
  closed: 'bg-slate-500/10',
};

export function KanbanBoard({ leads, onStatusChange }: KanbanBoardProps) {
  const [draggedLead, setDraggedLead] = useState<Lead | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<LeadStatus | null>(null);

  const handleDragStart = (e: React.DragEvent, lead: Lead) => {
    setDraggedLead(lead);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setDraggedLead(null);
    setDragOverColumn(null);
  };

  const handleDragOver = (e: React.DragEvent, status: LeadStatus) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverColumn(status);
  };

  const handleDragLeave = () => {
    setDragOverColumn(null);
  };

  const handleDrop = (e: React.DragEvent, newStatus: LeadStatus) => {
    e.preventDefault();
    if (draggedLead && draggedLead.status !== newStatus) {
      onStatusChange(draggedLead.id, newStatus);
    }
    setDraggedLead(null);
    setDragOverColumn(null);
  };

  const getLeadsByStatus = (status: LeadStatus) => {
    return leads.filter((lead) => lead.status === status);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {columns.map((status) => {
        const columnLeads = getLeadsByStatus(status);
        const isOver = dragOverColumn === status;
        
        return (
          <div
            key={status}
            className={cn(
              'rounded-lg border-t-4 bg-muted/30 min-h-[400px] transition-all duration-200',
              columnColors[status],
              isOver && 'ring-2 ring-primary ring-offset-2'
            )}
            onDragOver={(e) => handleDragOver(e, status)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, status)}
          >
            <div className={cn('p-3 border-b', columnBgColors[status])}>
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground">
                  {statusLabels[status]}
                </h3>
                <span className="text-xs font-medium text-muted-foreground bg-background px-2 py-1 rounded-full">
                  {columnLeads.length}
                </span>
              </div>
            </div>
            
            <div className="p-3 space-y-3">
              {columnLeads.map((lead) => (
                <div
                  key={lead.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, lead)}
                  onDragEnd={handleDragEnd}
                  className="animate-fade-in"
                >
                  <LeadCard
                    lead={lead}
                    isDragging={draggedLead?.id === lead.id}
                  />
                </div>
              ))}
              
              {columnLeads.length === 0 && (
                <div className={cn(
                  'border-2 border-dashed rounded-lg p-6 text-center text-muted-foreground text-sm transition-colors',
                  isOver && 'border-primary bg-primary/5'
                )}>
                  {isOver ? 'Solte aqui' : 'Nenhum lead'}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
