import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useT } from '../i18n/LocaleContext';
import { useLocalizedData, quickAmounts } from '../i18n/useLocalizedData';
import { formatBalance } from '../utils/formatBalance';
import DepositSuccessModal from '../components/DepositSuccessModal';
import './DepositPage.css';

const BALANCE_HIDDEN_KEY = 'momo_balance_hidden';

export default function DepositPage() {
  const t = useT();
  const { balance, deposit } = useAuth();
  const { paymentMethods } = useLocalizedData();
  const [amount, setAmount] = useState('100');
  const [selectedMethod, setSelectedMethod] = useState(paymentMethods[0].id);
  const [successAmount, setSuccessAmount] = useState<number | null>(null);
  const [balanceHidden, setBalanceHidden] = useState(
    () => localStorage.getItem(BALANCE_HIDDEN_KEY) === '1',
  );

  const toggleBalanceHidden = () => {
    setBalanceHidden((prev) => {
      const next = !prev;
      localStorage.setItem(BALANCE_HIDDEN_KEY, next ? '1' : '0');
      return next;
    });
  };

  const method = paymentMethods.find((m) => m.id === selectedMethod)!;
  const numAmount = Number(amount) || 0;
  const isValid =
    numAmount >= method.minAmount && numAmount <= method.maxAmount;

  const handleDeposit = () => {
    if (!isValid) return;
    deposit(numAmount);
    setSuccessAmount(numAmount);
  };

  return (
    <div className="deposit-page">
      <div className="deposit-balance">
        <span className="balance-label">{t('deposit.balance')}</span>
        <span className="balance-amount">
          RM {balanceHidden ? '****' : formatBalance(balance)}
        </span>
        <button
          type="button"
          className="balance-toggle"
          onClick={toggleBalanceHidden}
          aria-label={balanceHidden ? t('deposit.showBalance') : t('deposit.hideBalance')}
        >
          {balanceHidden ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
        <button type="button" className="balance-refresh">
          {t('common.refresh')}
        </button>
      </div>

      {successAmount !== null && (
        <DepositSuccessModal
          amount={successAmount}
          onClose={() => setSuccessAmount(null)}
        />
      )}

      <section className="deposit-section">
        <h2 className="deposit-section-title">{t('deposit.amount')}</h2>
        <div className="amount-input-wrap">
          <span className="amount-prefix">RM</span>
          <input
            type="number"
            className="amount-input"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder={t('deposit.amountPlaceholder')}
          />
        </div>
        <div className="quick-amounts">
          {quickAmounts.map((val) => (
            <button
              key={val}
              type="button"
              className={`quick-amount ${amount === String(val) ? 'active' : ''}`}
              onClick={() => setAmount(String(val))}
            >
              {val}
            </button>
          ))}
        </div>
      </section>

      <section className="deposit-section">
        <h2 className="deposit-section-title">{t('deposit.payment')}</h2>
        <div className="payment-grid">
          {paymentMethods.map((m) => (
            <button
              key={m.id}
              type="button"
              className={`payment-card ${selectedMethod === m.id ? 'active' : ''}`}
              onClick={() => setSelectedMethod(m.id)}
            >
              <span className="payment-icon">{m.icon}</span>
              <span className="payment-name">{m.name}</span>
            </button>
          ))}
        </div>
        <p className="payment-hint">
          {t('common.limit', {
            min: method.minAmount,
            max: method.maxAmount.toLocaleString(),
          })}
        </p>
      </section>

      <button
        type="button"
        className="deposit-submit"
        disabled={!isValid}
        onClick={handleDeposit}
      >
        {t('deposit.submit', { amount: numAmount || 0 })}
      </button>
    </div>
  );
}
