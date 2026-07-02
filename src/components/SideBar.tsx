import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import type { CSSProperties } from 'react';
import { useT } from '../i18n/LocaleContext';
import { useLocalizedData } from '../i18n/useLocalizedData';
import './SideBar.css';

interface SideBarProps {
  open: boolean;
  onClose: () => void;
}

export default function SideBar({ open, onClose }: SideBarProps) {
  const t = useT();
  const { categories } = useLocalizedData();

  return (
    <>
      <div
        className={`sidebar-overlay ${open ? 'visible' : ''}`}
        onClick={onClose}
        aria-hidden={!open}
      />
      <aside
        className={`sidebar ${open ? 'open' : ''}`}
        aria-hidden={!open}
        aria-label={t('sidebar.label')}
      >
        <div className="sidebar-header">
          <span className="sidebar-logo">momo</span>
          <button
            type="button"
            className="sidebar-close"
            onClick={onClose}
            aria-label={t('common.close')}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {categories.map((cat, index) => (
            <Link
              key={cat.id}
              to={`/games/${cat.id}`}
              className="sidebar-item"
              style={{ '--item-index': index } as CSSProperties}
              onClick={onClose}
            >
              <span className="sidebar-item-icon">{cat.icon}</span>
              <div className="sidebar-item-text">
                <span className="sidebar-item-title">{cat.title}</span>
                <span className="sidebar-item-desc">{cat.desc}</span>
              </div>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
