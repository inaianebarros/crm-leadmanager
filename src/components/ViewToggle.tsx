import { Button } from '@/components/ui/button';
import { LayoutGrid, Table } from 'lucide-react';

type ViewMode = 'table' | 'kanban';

interface ViewToggleProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

export function ViewToggle({ viewMode, onViewModeChange }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-1 p-1 bg-muted rounded-lg">
      <Button
        variant={viewMode === 'table' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onViewModeChange('table')}
        className="gap-2"
      >
        <Table className="h-4 w-4" />
        <span className="hidden sm:inline">Tabela</span>
      </Button>
      <Button
        variant={viewMode === 'kanban' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onViewModeChange('kanban')}
        className="gap-2"
      >
        <LayoutGrid className="h-4 w-4" />
        <span className="hidden sm:inline">Kanban</span>
      </Button>
    </div>
  );
}
