/**
 * Stellar Payment Dashboard - Main Page
 * 
 * Clean, minimalist, light-mode interface inspired by Claude.
 */

'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import WalletSection from '@/components/WalletSection';
import BalanceDisplay from '@/components/BalanceDisplay';
import PaymentForm from '@/components/PaymentForm';
import TransactionHistory from '@/components/TransactionHistory';

export default function Home() {
  const [publicKey, setPublicKey] = useState<string>('');
  const [isConnected, setIsConnected] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleConnect = (key: string) => {
    setPublicKey(key);
    setIsConnected(true);
  };

  const handleDisconnect = () => {
    setPublicKey('');
    setIsConnected(false);
  };

  const handlePaymentSuccess = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="relative min-h-screen animate-fade-in flex flex-col">
      <Navbar 
        publicKey={publicKey}
        isConnected={isConnected}
        onConnect={handleConnect}
        onDisconnect={handleDisconnect}
      />

      <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 sm:px-6 py-12 sm:py-16 relative z-10">
        
        {!isConnected && (
          <div className="mb-12 py-16 sm:py-24 text-center animate-slide-up bg-surface border border-borderInner rounded-2xl shadow-sm">
            <h2 className="text-4xl sm:text-5xl font-serif font-medium text-textMain mb-6 tracking-tight">
              Welcome to StellarPay
            </h2>
            <p className="text-textMuted max-w-2xl mx-auto text-base sm:text-lg leading-relaxed px-4">
              A minimalist, high-performance interface for the Stellar network. Connect your wallet to view your balance, manage assets, and execute transactions.
            </p>
          </div>
        )}

        {isConnected && publicKey && (
          <div className="space-y-6 sm:space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1 claude-card p-6 h-full flex flex-col animate-slide-up stagger-1">
                <WalletSection publicKey={publicKey} onDisconnect={handleDisconnect} />
              </div>

              <div key={`balance-${refreshKey}`} className="lg:col-span-2 claude-card p-6 animate-slide-up stagger-2 flex items-center justify-center">
                <BalanceDisplay publicKey={publicKey} />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-5 claude-card p-6 animate-slide-up stagger-3">
                <PaymentForm publicKey={publicKey} onSuccess={handlePaymentSuccess} />
              </div>

              <div key={`history-${refreshKey}`} className="lg:col-span-7 claude-card p-6 animate-slide-up stagger-4 flex flex-col">
                <TransactionHistory publicKey={publicKey} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 animate-slide-up stagger-5 mt-12">
              <div className="bg-[#F4F2EC] rounded-xl p-6 border border-[#E9E7E0]">
                <h3 className="text-textMain font-semibold mb-2 text-sm tracking-wide">Lightning Fast</h3>
                <p className="text-textMuted text-sm leading-relaxed">
                  Transactions settle in just 3-5 seconds on the globally distributed Stellar network.
                </p>
              </div>

              <div className="bg-[#F4F2EC] rounded-xl p-6 border border-[#E9E7E0]">
                <h3 className="text-textMain font-semibold mb-2 text-sm tracking-wide">Negligible Fees</h3>
                <p className="text-textMuted text-sm leading-relaxed">
                  Transaction fees are kept effectively at zero (0.00001 XLM / ~$0.000001).
                </p>
              </div>

              <div className="bg-[#F4F2EC] rounded-xl p-6 border border-[#E9E7E0]">
                <h3 className="text-textMain font-semibold mb-2 text-sm tracking-wide">Bank-Grade Security</h3>
                <p className="text-textMuted text-sm leading-relaxed">
                  Decentralized cryptographic consensus protects your digital assets fully.
                </p>
              </div>
            </div>
          </div>
        )}

        {!isConnected && (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="claude-card p-6 animate-slide-up stagger-1">
              <div className="w-8 h-8 bg-surface border border-borderInner rounded-md flex items-center justify-center mb-4 text-sm font-bold text-textMain shadow-sm">
                1
              </div>
              <h3 className="text-textMain font-serif font-medium mb-2 text-base">Install a Wallet</h3>
              <p className="text-textMuted text-sm leading-relaxed">
                Choose any Stellar wallet: Freighter, xBull, Lobstr, or Albedo.
              </p>
            </div>

            <div className="claude-card p-6 animate-slide-up stagger-2">
              <div className="w-8 h-8 bg-surface border border-borderInner rounded-md flex items-center justify-center mb-4 text-sm font-bold text-textMain shadow-sm">
                2
              </div>
              <h3 className="text-textMain font-serif font-medium mb-2 text-base">Connect</h3>
              <p className="text-textMuted text-sm leading-relaxed">
                Use the elegant connect button in the top right to link your account.
              </p>
            </div>

            <div className="claude-card p-6 animate-slide-up stagger-3">
              <div className="w-8 h-8 bg-surface border border-borderInner rounded-md flex items-center justify-center mb-4 text-sm font-bold text-textMain shadow-sm">
                3
              </div>
              <h3 className="text-textMain font-serif font-medium mb-2 text-base">Get Testnet XLM</h3>
              <p className="text-textMuted text-sm leading-relaxed">
                Use Friendbot to fund your testnet account with free XLM.
              </p>
            </div>

            <div className="claude-card p-6 animate-slide-up stagger-4">
              <div className="w-8 h-8 bg-surface border border-borderInner rounded-md flex items-center justify-center mb-4 text-sm font-bold text-textMain shadow-sm">
                4
              </div>
              <h3 className="text-textMain font-serif font-medium mb-2 text-base">Start Sending</h3>
              <p className="text-textMuted text-sm leading-relaxed">
                Experience real-time settlements across the globe effortlessly.
              </p>
            </div>
          </div>
        )}
      </main>

      <footer className="mt-auto border-t border-borderOuter bg-background">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="text-center text-textMuted text-xs">
            <p className="mb-2 font-medium">
              Stellar Frontend Challenge &middot; Running on Testnet
            </p>
            <p className="opacity-70 uppercase tracking-widest">
              Please do not use real funds
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
