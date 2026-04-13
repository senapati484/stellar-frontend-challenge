/**
 * PaymentForm Component
 * Claude Code Light Theme
 */

'use client';

import { useState } from 'react';
import { stellar } from '@/lib/stellar-helper';
import { FaPaperPlane, FaCheckCircle, FaExclamationTriangle, FaCopy, FaCheck } from 'react-icons/fa';
import { Card, Input, Button, Alert, LoadingSpinner } from './example-components';

interface PaymentFormProps {
  publicKey: string;
  onSuccess?: () => void;
}

export default function PaymentForm({ publicKey, onSuccess }: PaymentFormProps) {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [memo, setMemo] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ recipient?: string; amount?: string }>({});
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [txHash, setTxHash] = useState('');
  const [copiedHash, setCopiedHash] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: { recipient?: string; amount?: string } = {};

    // Validate recipient address
    if (!recipient.trim()) {
      newErrors.recipient = 'Recipient address is required';
    } else if (recipient.length !== 56 || !recipient.startsWith('G')) {
      newErrors.recipient = 'Invalid Stellar address (must start with G and be 56 characters)';
    }

    // Validate amount
    if (!amount.trim()) {
      newErrors.amount = 'Amount is required';
    } else {
      const numAmount = parseFloat(amount);
      if (isNaN(numAmount) || numAmount <= 0) {
        newErrors.amount = 'Amount must be a positive number';
      } else if (numAmount < 0.0000001) {
        newErrors.amount = 'Amount is too small (minimum: 0.0000001 XLM)';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCopyHash = async () => {
    if (txHash) {
      await navigator.clipboard.writeText(txHash);
      setCopiedHash(true);
      setTimeout(() => setCopiedHash(false), 2000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      setAlert(null);
      setTxHash('');

      const result = await stellar.sendPayment({
        from: publicKey,
        to: recipient,
        amount: amount,
        memo: memo || undefined,
      });

      if (result.success) {
        setTxHash(result.hash);
        setAlert({
          type: 'success',
          message: `Payment sent successfully! 🎉`,
        });
        
        // Clear form
        setRecipient('');
        setAmount('');
        setMemo('');
        setErrors({});

        // Call success callback
        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (error: any) {
      console.error('Payment error:', error);
      let errorMessage = 'Failed to send payment. ';
      
      if (error.message.includes('insufficient')) {
        errorMessage += 'Insufficient balance.';
      } else if (error.message.includes('destination')) {
        errorMessage += 'Invalid destination account.';
      } else {
        errorMessage += error.message || 'Please try again.';
      }

      setAlert({
        type: 'error',
        message: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background rounded-xl p-6 sm:p-8 border border-borderInner shadow-sm">
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-surface border border-borderInner rounded-lg flex items-center justify-center shadow-sm">
            <FaPaperPlane className="text-textMain text-sm" />
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-medium text-textMain tracking-tight">Send Payment</h2>
        </div>
      </div>

      {alert && (
        <div className="mb-4 sm:mb-6 animate-slide-up">
          {alert.type === 'success' ? (
            <div className="bg-[#F2F8F4] border border-[#E2F0E7] rounded-lg p-4 sm:p-5 shadow-sm">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white border border-[#E2F0E7] rounded-md flex items-center justify-center flex-shrink-0">
                  <FaCheckCircle className="text-[#2F593F] text-lg sm:text-xl" />
                </div>
                <div className="flex-1 mt-0.5">
                  <p className="text-[#2F593F] font-semibold text-sm sm:text-base mb-1 tracking-tight">Transaction Confirmed!</p>
                  <p className="text-[#2F593F]/80 text-xs sm:text-sm leading-relaxed">{alert.message}</p>
                </div>
                <button
                  onClick={() => setAlert(null)}
                  className="text-[#2F593F]/50 hover:text-[#2F593F] transition-colors p-1.5 hover:bg-black/5 rounded-md"
                >
                  <FaCheck className="text-sm" />
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-[#FCF2F2] border border-[#F8E3E3] rounded-lg p-4 sm:p-5 shadow-sm">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white border border-[#F8E3E3] rounded-md flex items-center justify-center flex-shrink-0">
                  <FaExclamationTriangle className="text-[#8C2F2B] text-lg sm:text-xl" />
                </div>
                <div className="flex-1 mt-0.5">
                  <p className="text-[#8C2F2B] font-semibold text-sm sm:text-base mb-1 tracking-tight">Transaction Failed</p>
                  <p className="text-[#8C2F2B]/80 text-xs sm:text-sm leading-relaxed">{alert.message}</p>
                </div>
                <button
                  onClick={() => setAlert(null)}
                  className="text-[#8C2F2B]/50 hover:text-[#8C2F2B] transition-colors p-1.5 hover:bg-black/5 rounded-md"
                >
                  <FaCheck className="text-sm" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {txHash && (
        <div className="mb-4 sm:mb-6 bg-surface border border-borderInner rounded-lg p-4 sm:p-6 shadow-sm animate-slide-up">
          <div className="flex items-start justify-between gap-3 sm:gap-4 mb-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 rounded-md flex items-center justify-center flex-shrink-0 bg-background border border-borderOuter">
                <FaCheckCircle className="text-success text-xl" />
              </div>
              <div>
                <p className="text-textMain font-medium text-sm sm:text-base tracking-tight">Transaction Details</p>
                <p className="text-textMuted text-xs uppercase tracking-widest mt-0.5 font-medium">Payment successful</p>
              </div>
            </div>
          </div>

          <div className="bg-background rounded-md p-3 sm:p-4 border border-borderOuter mb-4">
            <p className="text-textMuted text-[10px] mb-1.5 uppercase tracking-widest font-semibold">Transaction Hash</p>
            <div className="flex items-center gap-2 sm:gap-3">
              <p className="text-textMain text-xs sm:text-sm font-mono break-all leading-relaxed flex-1">{txHash}</p>
              <button
                onClick={handleCopyHash}
                className="text-textMuted hover:text-textMain transition-colors p-1.5 hover:bg-surface rounded-md flex-shrink-0"
                title={copiedHash ? 'Copied!' : 'Copy hash'}
              >
                {copiedHash ? (
                  <FaCheck className="text-success text-sm" />
                ) : (
                  <FaCopy className="text-sm" />
                )}
              </button>
            </div>
          </div>

          <a
            href={stellar.getExplorerLink(txHash, 'tx')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-accent hover:text-textMain text-xs sm:text-sm font-medium transition-colors group hover:gap-2"
          >
            View on Stellar Expert
            <span className="group-hover:translate-x-0.5 transition-transform">→</span>
          </a>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
        <Input
          label="Recipient Address"
          placeholder="GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
          value={recipient}
          onChange={setRecipient}
          error={errors.recipient}
        />

        <Input
          label="Amount (XLM)"
          type="number"
          placeholder="0.00"
          value={amount}
          onChange={setAmount}
          error={errors.amount}
        />

        <Input
          label="Memo (Optional)"
          placeholder="Payment for..."
          value={memo}
          onChange={setMemo}
        />

        <div className="pt-2">
          <Button
            onClick={() => {}}
            fullWidth
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <LoadingSpinner size="sm" />
                <span>Sending Payment...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <FaPaperPlane className="text-xs" />
                <span>Send Payment</span>
              </div>
            )}
          </Button>
        </div>
      </form>

      <div className="mt-5 sm:mt-6 bg-[#F4F2EC] border border-[#E9E7E0] rounded-lg p-3 sm:p-4 flex items-start gap-3">
        <div className="text-sm mt-0.5 hidden sm:block">💡</div>
        <p className="text-textMuted text-xs sm:text-sm leading-relaxed">
          <strong className="text-textMain font-medium mr-1">Notice:</strong> 
          Review the recipient address carefully. Blockchain transactions are irreversible.
        </p>
      </div>
    </div>
  );
}

