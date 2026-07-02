import {
  Home,
  Gift,
  Wallet,
  Headphones,
  User,
  type LucideIcon,
} from 'lucide-react';
import type { BottomNavItem, NavId } from '../types';
import { useLocalizedData } from '../i18n/useLocalizedData';
import './BottomNav.css';

const iconMap: Record<BottomNavItem['icon'], LucideIcon> = {
  Home,
  Gift,
  Wallet,
  Headphones,
  User,
};

interface BottomNavProps {
  active: NavId | null;
  onChange: (id: NavId) => void;
}

export default function BottomNav({ active, onChange }: BottomNavProps) {
  const { bottomNavItems } = useLocalizedData();

  return (
    <nav className="bottom-nav">
      {bottomNavItems.map((item) => {
        const Icon = iconMap[item.icon];
        const isActive = active === item.id;
        return (
          <button
            key={item.id}
            type="button"
            className={`nav-item${isActive ? ' active' : ''}${item.id === 'deposit' ? ' nav-item-deposit' : ''}`}
            onClick={() => onChange(item.id)}
          >
            {item.id === 'deposit' && (
              <span className="nav-deposit-badge">+20%</span>
            )}
            <span className="nav-icon-wrap">
              <span className="nav-tech-frame" aria-hidden="true" />
              <span className="nav-tech-scan" aria-hidden="true" />
              <Icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
            </span>
            <span className="nav-label">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
