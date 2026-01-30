import { Lead } from '@/types/lead';
import { StatusBadge } from './StatusBadge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Undo2, UserX } from 'lucide-react';

interface LostLeadsTableProps {
  leads: Lead[];
  onRestore: (lead: Lead) => void;
}

export function LostLeadsTable({ leads, onRestore }: LostLeadsTableProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  if (leads.length === 0) {
    return null;
  }

  return (
    <Card className="card-elevated border-destructive/20 bg-destructive/5">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-destructive/10">
            <UserX className="h-5 w-5 text-destructive" />
          </div>
          <div>
            <CardTitle className="text-lg font-semibold text-foreground">Leads Perdidos</CardTitle>
            <p className="text-sm text-muted-foreground">{leads.length} lead(s) marcado(s) como perdido(s)</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30 hover:bg-muted/30">
              <TableHead className="font-semibold">Nome</TableHead>
              <TableHead className="font-semibold">Email</TableHead>
              <TableHead className="font-semibold">Último Status</TableHead>
              <TableHead className="font-semibold text-right">Valor Perdido</TableHead>
              <TableHead className="font-semibold text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.map((lead) => (
              <TableRow key={lead.id} className="animate-fade-in group opacity-70 hover:opacity-100">
                <TableCell className="font-medium line-through">{lead.name}</TableCell>
                <TableCell className="text-muted-foreground">{lead.email}</TableCell>
                <TableCell>
                  <StatusBadge status={lead.status} />
                </TableCell>
                <TableCell className="text-right font-medium text-destructive">
                  {formatCurrency(lead.estimatedValue)}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRestore(lead)}
                    className="h-8 gap-2 hover:bg-primary/10 hover:text-primary"
                  >
                    <Undo2 className="h-4 w-4" />
                    Restaurar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
