import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LeadStatus, statusLabels } from '@/types/lead';
import { Search } from 'lucide-react';

interface SearchFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: LeadStatus | 'all';
  onStatusFilterChange: (value: LeadStatus | 'all') => void;
}

export function SearchFilter({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
}: SearchFilterProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por nome..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
      <Select
        value={statusFilter}
        onValueChange={(value) => onStatusFilterChange(value as LeadStatus | 'all')}
      >
        <SelectTrigger className="w-full sm:w-[200px]">
          <SelectValue placeholder="Filtrar por status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos os Status</SelectItem>
          {(Object.entries(statusLabels) as [LeadStatus, string][]).map(
            ([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            )
          )}
        </SelectContent>
      </Select>
    </div>
  );
}
