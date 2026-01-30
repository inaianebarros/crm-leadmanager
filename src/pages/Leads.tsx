import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { LeadForm } from '@/components/LeadForm';
import { LeadsTable } from '@/components/LeadsTable';
import { KanbanBoard } from '@/components/KanbanBoard';
import { SearchFilter } from '@/components/SearchFilter';
import { ViewToggle } from '@/components/ViewToggle';
import { Lead, LeadStatus } from '@/types/lead';
import { Plus } from 'lucide-react';

interface LeadsProps {
  leads: Lead[];
  onAddLead: (leadData: Omit<Lead, 'id' | 'createdAt'>) => void;
  onEditLead: (lead: Lead, leadData: Omit<Lead, 'id' | 'createdAt'>) => void;
  onDeleteLead: (id: string) => void;
  onStatusChange: (leadId: string, newStatus: LeadStatus) => void;
}

export function Leads({ leads, onAddLead, onEditLead, onDeleteLead, onStatusChange }: LeadsProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [viewMode, setViewMode] = useState<'table' | 'kanban'>('table');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<LeadStatus | 'all'>('all');

  const handleSubmit = (leadData: Omit<Lead, 'id' | 'createdAt'>) => {
    if (editingLead) {
      onEditLead(editingLead, leadData);
      setEditingLead(null);
    } else {
      onAddLead(leadData);
    }
  };

  const handleEdit = (lead: Lead) => {
    setEditingLead(lead);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingLead(null);
  };

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [leads, searchTerm, statusFilter]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Gerenciamento de Leads</h1>
          <p className="text-muted-foreground">Adicione, edite e acompanhe seus leads</p>
        </div>
        <Button
          size="lg"
          onClick={() => setIsFormOpen(true)}
          className="h-12 px-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200 gap-2"
        >
          <Plus className="w-5 h-5" />
          Adicionar Novo Lead
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <SearchFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
        />
        <ViewToggle viewMode={viewMode} onViewModeChange={setViewMode} />
      </div>

      {viewMode === 'table' ? (
        <LeadsTable leads={filteredLeads} onEdit={handleEdit} onDelete={onDeleteLead} />
      ) : (
        <KanbanBoard leads={filteredLeads} onStatusChange={onStatusChange} />
      )}

      <LeadForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleSubmit}
        editingLead={editingLead}
      />
    </div>
  );
}
