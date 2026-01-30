import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { Lead, LeadStatus } from '@/types/lead';

export function MainLayout() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [lostLeads, setLostLeads] = useState<Lead[]>([]);

  const handleAddLead = (leadData: Omit<Lead, 'id' | 'createdAt'>) => {
    const newLead: Lead = {
      ...leadData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };
    setLeads((prev) => [newLead, ...prev]);
  };

  const handleEditLead = (lead: Lead, leadData: Omit<Lead, 'id' | 'createdAt'>) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === lead.id ? { ...l, ...leadData } : l))
    );
  };

  const handleDeleteLead = (id: string) => {
    const leadToDelete = leads.find((lead) => lead.id === id);
    if (leadToDelete) {
      setLeads((prev) => prev.filter((lead) => lead.id !== id));
      setLostLeads((prev) => [leadToDelete, ...prev]);
    }
  };

  const handleStatusChange = (leadId: string, newStatus: LeadStatus) => {
    setLeads((prev) =>
      prev.map((lead) =>
        lead.id === leadId ? { ...lead, status: newStatus } : lead
      )
    );
  };

  const handleRestoreLead = (lead: Lead) => {
    setLostLeads((prev) => prev.filter((l) => l.id !== lead.id));
    setLeads((prev) => [lead, ...prev]);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <main className="flex-1 p-6 overflow-auto">
          <Outlet
            context={{
              leads,
              lostLeads,
              onAddLead: handleAddLead,
              onEditLead: handleEditLead,
              onDeleteLead: handleDeleteLead,
              onStatusChange: handleStatusChange,
              onRestoreLead: handleRestoreLead,
            }}
          />
        </main>
      </div>
    </SidebarProvider>
  );
}
