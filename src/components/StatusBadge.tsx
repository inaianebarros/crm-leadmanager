import { LeadStatus, statusLabels } from '@/types/lead';

interface StatusBadgeProps {
  status: LeadStatus;
}

const statusClasses: Record<LeadStatus, string> = {
  new: 'status-new',
  contact: 'status-contact',
  qualified: 'status-qualified',
  closed: 'status-closed',
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`status-badge ${statusClasses[status]}`}>
      {statusLabels[status]}
    </span>
  );
}
