import Link from 'next/link';

export default function EmptyState({ icon: Icon, title, text, actionLabel, actionHref, onAction }) {
  return (
    <div className="empty-state">
      {Icon && (
        <div className="empty-state__icon">
          <Icon size={28} strokeWidth={1.4} />
        </div>
      )}
      <h3>{title}</h3>
      {text && <p>{text}</p>}
      {actionLabel && actionHref && <Link href={actionHref} className="btn btn--primary">{actionLabel}</Link>}
      {actionLabel && !actionHref && onAction && <button type="button" className="btn btn--primary" onClick={onAction}>{actionLabel}</button>}
    </div>
  );
}
