/**
 * TransactionHistory Component
 * Claude Code Light Theme
 */

'use client';

import { useState, useEffect } from 'react';
import { stellar } from '@/lib/stellar-helper';
import { FaHistory, FaSync, FaArrowUp, FaArrowDown, FaExternalLinkAlt } from 'react-icons/fa';
import { Card, EmptyState, SkeletonLoader } from './example-components';

interface Transaction {
  id: string;
  type: string;
  amount?: string;
  asset?: string;
  from?: string;
  to?: string;
  createdAt: string;
  hash: string;
}

interface TransactionHistoryProps {
  publicKey: string;
}

export default function TransactionHistory({ publicKey }: TransactionHistoryProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [limit] = useState(10);

  const fetchTransactions = async () => {
    try {
      setRefreshing(true);
      const txs = await stellar.getRecentTransactions(publicKey, limit);
      setTransactions(txs);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (publicKey) {
      fetchTransactions();
    }
  }, [publicKey]);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  };

  const formatAddress = (address?: string): string => {
    if (!address) return 'N/A';
    return stellar.formatAddress(address, 4, 4);
  };

  const isOutgoing = (tx: Transaction): boolean => {
    return tx.from === publicKey;
  };

  if (loading) {
    return (
      <div className="bg-background rounded-xl p-6 sm:p-8 border border-borderInner shadow-sm">
        <div className="flex items-center gap-2 mb-6 sm:mb-8">
          <span className="text-xl">📜</span>
          <h2 className="text-xl sm:text-2xl font-serif font-medium text-textMain tracking-tight">Transaction History</h2>
        </div>
        <SkeletonLoader count={3} height="h-24" className="space-y-4" />
      </div>
    );
  }

  return (
    <div className="bg-background rounded-xl p-6 sm:p-8 border border-borderInner shadow-sm">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-serif font-medium text-textMain flex items-center gap-2 sm:gap-3 tracking-tight">
          <span className="text-xl sm:text-2xl">📜</span>
          Transaction History
        </h2>
        <button
          onClick={fetchTransactions}
          disabled={refreshing}
          className="text-textMuted hover:text-textMain disabled:opacity-50 transition-colors p-2 hover:bg-surface rounded-lg"
          title="Refresh transactions"
        >
          <FaSync className={`text-base sm:text-lg ${refreshing ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {transactions.length === 0 ? (
        <EmptyState
          icon="📭"
          title="No Transactions Yet"
          description="Your transaction history will appear here once you start sending or receiving XLM."
        />
      ) : (
        <div className="space-y-3">
          {transactions.map((tx) => {
            const outgoing = isOutgoing(tx);
            
            return (
              <div
                key={tx.id}
                className="bg-surface rounded-xl p-4 sm:p-5 hover:bg-surface/80 transition-all duration-200 border border-borderInner hover:border-borderOuter group shadow-sm"
              >
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-lg flex items-center justify-center border shadow-sm ${
                      outgoing 
                        ? 'bg-[#FCF2F2] text-[#8C2F2B] border-[#F8E3E3]' 
                        : 'bg-[#F2F8F4] text-[#2F593F] border-[#E2F0E7]'
                    }`}>
                      {outgoing ? <FaArrowUp className="text-xs sm:text-sm" /> : <FaArrowDown className="text-xs sm:text-sm" />}
                    </div>
                    <div>
                      <p className="text-textMain font-medium text-xs sm:text-sm tracking-tight mb-0.5">
                        {outgoing ? 'Sent' : 'Received'}
                      </p>
                      {tx.amount && (
                        <p className={`text-base sm:text-lg font-semibold tracking-tight ${
                          outgoing ? 'text-[#8C2F2B]' : 'text-[#2F593F]'
                        }`}>
                          {outgoing ? '-' : '+'}{parseFloat(tx.amount).toFixed(2)} {tx.asset || 'XLM'}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <a
                    href={stellar.getExplorerLink(tx.hash, 'tx')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-textMuted hover:text-textMain text-[10px] sm:text-xs font-medium flex items-center gap-1.5 transition-colors"
                  >
                    Details <FaExternalLinkAlt className="text-[10px] opacity-70" />
                  </a>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:gap-4 text-sm">
                  <div className="bg-background border border-borderInner p-2.5 rounded-md">
                    <p className="text-textMuted text-[10px] mb-1 font-semibold uppercase tracking-widest">From</p>
                    <p className="text-textMain font-mono text-xs">{formatAddress(tx.from)}</p>
                  </div>
                  <div className="bg-background border border-borderInner p-2.5 rounded-md">
                    <p className="text-textMuted text-[10px] mb-1 font-semibold uppercase tracking-widest">To</p>
                    <p className="text-textMain font-mono text-xs">{formatAddress(tx.to)}</p>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-3 sm:mt-4 pt-3 border-t border-borderInner">
                  <p className="text-textMuted text-[11px] font-medium">{formatDate(tx.createdAt)}</p>
                  <p className="text-textMuted text-[11px] font-mono">{tx.hash.slice(0, 12)}...</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {transactions.length > 0 && (
        <div className="mt-4 sm:mt-5 text-center">
          <p className="text-textMuted text-xs font-medium tracking-wide">
            Showing last {transactions.length} transaction{transactions.length !== 1 ? 's' : ''}
          </p>
        </div>
      )}
    </div>
  );
}

