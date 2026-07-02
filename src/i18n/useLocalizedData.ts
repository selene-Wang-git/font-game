import { useMemo } from 'react';
import type {
  Banner,
  BottomNavItem,
  CategoryId,
  FaqItem,
  GameCategory,
  MemberMenuItem,
  MemberSectionId,
  PaymentMethod,
  PromoCategory,
  PromoItem,
  ServiceChannel,
  GameProvider,
  SubGame,
  WinnerTab,
} from '../types';
import { useLocale } from './LocaleContext';
import {
  banners as bannerMeta,
  bottomNavStructure,
  categories as categoryMeta,
  categoryGames as categoryGamesMeta,
  categoryProviders as categoryProvidersMeta,
  navRoutes,
  paymentMethodsMeta,
  promoItemsMeta,
  quickAmounts,
  winnerTabKeys,
  winners,
} from '../data/mockData';

export { navRoutes, quickAmounts, winners };

export function useLocalizedData() {
  const { m, t } = useLocale();

  return useMemo(() => {
    const categories: GameCategory[] = categoryMeta.map((cat) => ({
      ...cat,
      title: m.categories[cat.id].title,
      desc: m.categories[cat.id].desc,
    }));

    const getCategoryById = (id: string) =>
      categories.find((c) => c.id === id);

    const pageTitles: Partial<Record<string, string>> = {
      '/promo': t('pages.promo'),
      '/deposit': t('pages.deposit'),
      '/service': t('pages.service'),
      '/member': t('pages.member'),
    };

    const bottomNavItems: BottomNavItem[] = bottomNavStructure.map((item) => ({
      ...item,
      label: m.nav[item.id],
    }));

    const winnerTabs: WinnerTab[] = winnerTabKeys.map((tab) => ({
      key: tab.key,
      label: m.winners.tabs[tab.key as keyof typeof m.winners.tabs],
    }));

    const banners: Banner[] = bannerMeta.map((b) => {
      const loc = m.banners[b.id as keyof typeof m.banners];
      return {
        ...b,
        title: loc.title,
        subtitle: loc.subtitle,
        tag: loc.tag,
      };
    });

    const categoryProviders = categoryProvidersMeta as Record<CategoryId, GameProvider[]>;

    const categoryGames = Object.fromEntries(
      (Object.keys(categoryGamesMeta) as CategoryId[]).map((catId) => {
        const providers = categoryProviders[catId];
        const providerMap = Object.fromEntries(providers.map((p) => [p.id, p.name]));
        return [
          catId,
          categoryGamesMeta[catId].map(
            (g): SubGame => ({
              ...g,
              provider: providerMap[g.providerId] ?? g.providerId,
              name:
                (m.games[catId] as Record<number, string | undefined>)?.[g.id] ??
                g.name ??
                '',
            }),
          ),
        ];
      }),
    ) as Record<CategoryId, SubGame[]>;

    const promoTabs: { key: PromoCategory; label: string }[] = (
      ['all', 'newbie', 'deposit', 'rebate'] as PromoCategory[]
    ).map((key) => ({ key, label: m.promo.tabs[key] }));

    const promoItems: PromoItem[] = promoItemsMeta.map((p) => {
      const loc = m.promo.items[p.id as 1 | 2 | 3 | 4 | 5 | 6];
      return { ...p, ...loc };
    });

    const getPromoById = (id: string) =>
      promoItems.find((p) => p.id === Number(id));

    const paymentMethods: PaymentMethod[] = paymentMethodsMeta.map((p) => ({
      ...p,
      name: m.deposit.methods[p.id as keyof typeof m.deposit.methods],
    }));

    const serviceChannels: ServiceChannel[] = (
      ['live', 'telegram', 'whatsapp', 'email'] as const
    ).map((id) => ({
      id,
      icon: { live: '💬', telegram: '✈️', whatsapp: '📞', email: '📧' }[id],
      available: true,
      name: m.service.channels[id].name,
      desc: m.service.channels[id].desc,
    }));

    const faqItems: FaqItem[] = ([1, 2, 3, 4] as const).map((id) => ({
      id,
      question: m.service.faqs[id].q,
      answer: m.service.faqs[id].a,
    }));

    const memberMenuItems: MemberMenuItem[] = (
      ['wallet', 'records', 'deposit-records', 'promo', 'vip', 'security', 'settings', 'help'] as const
    ).map((id) => ({
      id,
      label: m.member.menu[id],
      icon: { wallet: '💰', records: '📋', 'deposit-records': '📊', promo: '🎁', vip: '👑', security: '🔒', settings: '⚙️', help: '❓' }[id],
    }));

    const getMemberSectionTitle = (sectionId: MemberSectionId) =>
      m.member.menu[sectionId];

    const memberSectionData = m.member.sections;

    return {
      categories,
      getCategoryById,
      pageTitles,
      bottomNavItems,
      winnerTabs,
      banners,
      categoryGames,
      categoryProviders,
      promoTabs,
      promoItems,
      getPromoById,
      paymentMethods,
      serviceChannels,
      faqItems,
      memberMenuItems,
      getMemberSectionTitle,
      memberSectionData,
    };
  }, [m, t]);
}
