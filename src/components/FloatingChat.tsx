import { MessageCircle } from 'lucide-react';
import { useT } from '../i18n/LocaleContext';
import './FloatingChat.css';

interface FloatingChatProps {
  badgeCount?: number;
  onClick?: () => void;
}

export default function FloatingChat({ badgeCount = 1, onClick }: FloatingChatProps) {
  const t = useT();

  return (
    <button type="button" className="fab-chat" aria-label={t('fab.label')} onClick={onClick}>
      <MessageCircle size={24} color="#000" fill="#000" />
      {badgeCount > 0 && (
        <span className="fab-badge">{badgeCount}</span>
      )}
    </button>
  );
}
