/**
 * BalanceDisplay Component
 * Claude Code Light Theme
 */

'use client';

import { useState, useEffect } from 'react';
import { stellar } from '@/lib/stellar-helper';
import { FaSync, FaWallet } from 'react-icons/fa';
import { CardSkeleton } from './example-components';

interface BalanceDisplayProps {
  publicKey: string;
}

export default function BalanceDisplay({ publicKey }: BalanceDisplayProps) {
  const [balance, setBalance] = useState<string>('0');
  const [assets, setAssets] = useState<Array<{ code: string; issuer: string; balance: string }>>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchBalance = async () => {
    try {
      setRefreshing(true);
      const balanceData = await stellar.getBalance(publicKey);
      setBalance(balanceData.xlm);
      setAssets(balanceData.assets);
    } catch (error) {
      console.error('Error fetching balance:', error);
      alert('Failed to fetch balance. Please try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (publicKey) {
      fetchBalance();
    }
  }, [publicKey]);

  const formatBalance = (balance: string): string => {
    const num = parseFloat(balance);
    return num.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 7,
    });
  };

  if (loading) {
    return (
      <div className="w-full h-full min-h-[300px] flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col h-full relative z-10">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-surface border border-borderInner rounded-md flex items-center justify-center shadow-sm">
            <FaWallet className="text-textMain text-sm" />
          </div>
          <h2 className="text-xl font-serif font-medium text-textMain tracking-tight">Net Worth</h2>
        </div>
        <button
          onClick={fetchBalance}
          disabled={refreshing}
          className="text-textMuted hover:text-textMain disabled:opacity-50 transition-colors p-2"
          title="Refresh balance"
        >
          <FaSync className={`text-sm ${refreshing ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* XLM Balance - Hero Style */}
      <div className="bg-surface border border-borderInner rounded-xl p-8 mb-6 flex-1 flex flex-col justify-center shadow-sm">
        <p className="text-textMuted text-xs font-semibold mb-3 tracking-widest uppercase">Available Balance</p>
        
        <div className="flex items-baseline gap-2">
          <p className="text-5xl sm:text-6xl font-serif font-semibold text-textMain tracking-tight leading-none truncate">
            {formatBalance(balance)}
          </p>
          <p className="text-xl font-medium text-textMuted">
            XLM
          </p>
        </div>
        
        {/* USD Estimate */}
        <div className="mt-6 inline-block">
          <div className="px-3 py-1.5 bg-surface border border-borderOuter rounded-md inline-flex items-center gap-2 shadow-sm">
            <span className="text-textMuted text-xs">≈</span>
            <span className="text-textMain text-xs font-medium">${(parseFloat(balance) * 0.12).toFixed(2)} USD</span>
          </div>
        </div>
      </div>

      {/* Other Assets List */}
      {assets.length > 0 && (
        <div className="space-y-3 mb-6">
          <p className="text-textMuted text-[10px] font-semibold mb-2 uppercase tracking-widest">Other Assets</p>
          {assets.map((asset, index) => (
            <div
              key={index}
              className="bg-background border border-borderInner rounded-lg p-3 flex justify-between items-center"
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 bg-surface border border-borderInner rounded-md flex items-center justify-center">
                  <span className="text-textMain font-semibold text-xs">{asset.code.charAt(0)}</span>
                </div>
                <div>
                  <p className="text-textMain font-medium text-sm leading-none">{asset.code}</p>
                  <p className="text-textMuted text-[10px] font-mono truncate max-w-[120px] uppercase mt-1">
                    {asset.issuer}
                  </p>
                </div>
              </div>
              <p className="text-textMain text-sm font-semibold">
                {formatBalance(asset.balance)}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Info Box */}
      <div className="bg-[#F4F2EC] border border-[#E9E7E0] rounded-lg p-3 flex items-start gap-3">
        <div className="text-sm mt-0.5">💡</div>
        <p className="text-textMuted text-xs leading-relaxed">
          <strong className="text-textMain font-medium mr-1">Alert:</strong> 
          Keep at least 1 XLM in your account for network reserves.
        </p>
      </div>
    </div>
  );
}

function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
    const sizes = {
      sm: 'h-4 w-4 border-2',
      md: 'h-6 w-6 border-2',
      lg: 'h-8 w-8 border-3',
    };
  
    return (
      <div className={`inline-block ${sizes[size]} animate-spin rounded-full border-solid border-borderOuter border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]`}>
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    );
  }

