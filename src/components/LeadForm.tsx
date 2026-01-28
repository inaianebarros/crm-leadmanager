import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Lead, LeadStatus, statusLabels } from '@/types/lead';

interface LeadFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (lead: Omit<Lead, 'id' | 'createdAt'>) => void;
  editingLead?: Lead | null;
}

export function LeadForm({ isOpen, onClose, onSubmit, editingLead }: LeadFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<LeadStatus>('new');
  const [estimatedValue, setEstimatedValue] = useState('');

  useEffect(() => {
    if (editingLead) {
      setName(editingLead.name);
      setEmail(editingLead.email);
      setStatus(editingLead.status);
      setEstimatedValue(editingLead.estimatedValue.toString());
    } else {
      resetForm();
    }
  }, [editingLead, isOpen]);

  const resetForm = () => {
    setName('');
    setEmail('');
    setStatus('new');
    setEstimatedValue('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      email,
      status,
      estimatedValue: parseFloat(estimatedValue) || 0,
    });
    resetForm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] animate-slide-up">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {editingLead ? 'Editar Lead' : 'Adicionar Novo Lead'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Nome
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite o nome do lead"
              required
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@exemplo.com"
              required
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status" className="text-sm font-medium">
              Status do Lead
            </Label>
            <Select value={status} onValueChange={(value) => setStatus(value as LeadStatus)}>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                {(Object.keys(statusLabels) as LeadStatus[]).map((key) => (
                  <SelectItem key={key} value={key}>
                    {statusLabels[key]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="value" className="text-sm font-medium">
              Valor Estimado (R$)
            </Label>
            <Input
              id="value"
              type="number"
              value={estimatedValue}
              onChange={(e) => setEstimatedValue(e.target.value)}
              placeholder="0.00"
              min="0"
              step="0.01"
              required
              className="h-11"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 h-11">
              Cancelar
            </Button>
            <Button type="submit" className="flex-1 h-11">
              {editingLead ? 'Salvar Alterações' : 'Adicionar Lead'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
