import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { GameLaunchProvider } from './context/GameLaunchContext';
import { LocaleProvider } from './i18n/LocaleContext';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import GameCategoryPage from './pages/GameCategoryPage';
import PromoPage from './pages/PromoPage';
import PromoDetailPage from './pages/PromoDetailPage';
import DepositPage from './pages/DepositPage';
import ServicePage from './pages/ServicePage';
import MemberPage from './pages/MemberPage';
import MemberSectionPage from './pages/MemberSectionPage';
import './App.css';

export default function App() {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <AuthProvider>
          <GameLaunchProvider>
          <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="games/:categoryId" element={<GameCategoryPage />} />
            <Route path="promo" element={<PromoPage />} />
            <Route path="promo/:promoId" element={<PromoDetailPage />} />
            <Route path="deposit" element={<DepositPage />} />
            <Route path="service" element={<ServicePage />} />
            <Route path="member" element={<MemberPage />} />
            <Route path="member/:sectionId" element={<MemberSectionPage />} />
          </Route>
        </Routes>
          </BrowserRouter>
          </GameLaunchProvider>
        </AuthProvider>
      </LocaleProvider>
    </ThemeProvider>
  );
}
