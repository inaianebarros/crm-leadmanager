import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { LeadForm } from '@/components/LeadForm';
import { LeadsTable } from '@/components/LeadsTable';
import { Lead } from '@/types/lead';
import { Plus, BarChart3 } from 'lucide-react';

const Index = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);

  const handleAddLead = (leadData: Omit<Lead, 'id' | 'createdAt'>) => {
    if (editingLead) {
      setLeads((prev) =>
        prev.map((lead) =>
          lead.id === editingLead.id
            ? { ...lead, ...leadData }
            : lead
        )
      );
      setEditingLead(null);
    } else {
      const newLead: Lead = {
        ...leadData,
        id: crypto.randomUUID(),
        createdAt: new Date(),
      };
      setLeads((prev) => [newLead, ...prev]);
    }
  };

  const handleEdit = (lead: Lead) => {
    setEditingLead(lead);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    setLeads((prev) => prev.filter((lead) => lead.id !== id));
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingLead(null);
  };

  const totalValue = leads.reduce((sum, lead) => sum + lead.estimatedValue, 0);
  const qualifiedLeads = leads.filter((lead) => lead.status === 'qualified').length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">CRM Lite</h1>
              <p className="text-sm text-muted-foreground">Gerenciamento de Leads</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-card rounded-lg border p-5 card-elevated">
            <p className="text-sm text-muted-foreground mb-1">Total de Leads</p>
            <p className="text-3xl font-bold text-foreground">{leads.length}</p>
          </div>
          <div className="bg-card rounded-lg border p-5 card-elevated">
            <p className="text-sm text-muted-foreground mb-1">Leads Qualificados</p>
            <p className="text-3xl font-bold text-foreground">{qualifiedLeads}</p>
          </div>
          <div className="bg-card rounded-lg border p-5 card-elevated">
            <p className="text-sm text-muted-foreground mb-1">Valor Total Estimado</p>
            <p className="text-3xl font-bold text-foreground">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                minimumFractionDigits: 0,
              }).format(totalValue)}
            </p>
          </div>
        </div>

        {/* Add Button */}
        <div className="flex justify-center mb-8">
          <Button
            size="lg"
            onClick={() => setIsFormOpen(true)}
            className="h-14 px-8 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 gap-2"
          >
            <Plus className="w-5 h-5" />
            Adicionar Novo Lead
          </Button>
        </div>

        {/* Leads Table */}
        <LeadsTable leads={leads} onEdit={handleEdit} onDelete={handleDelete} />

        {/* Lead Form Modal */}
        <LeadForm
          isOpen={isFormOpen}
          onClose={handleCloseForm}
          onSubmit={handleAddLead}
          editingLead={editingLead}
        />
      </main>
    </div>
  );
};

export default Index;
