/**
 * WalletConnection Component
 * 
 * Handles wallet connection/disconnection and displays connected address
 * 
 * Features:
 * - Connect button with loading state
 * - Show connected address
 * - Disconnect functionality
 * - Copy address to clipboard
 * - Check if Freighter is installed
 */

'use client';

import { useState } from 'react';
import { stellar } from '@/lib/stellar-helper';
import { FaWallet, FaCopy, FaCheck } from 'react-icons/fa';
import { MdLogout } from 'react-icons/md';
import { Card } from './example-components';

interface WalletConnectionProps {
  onConnect: (publicKey: string) => void;
  onDisconnect: () => void;
}

export default function WalletConnection({ onConnect, onDisconnect }: WalletConnectionProps) {
  const [publicKey, setPublicKey] = useState<string>('');
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleConnect = async () => {
    try {
      setLoading(true);
      const key = await stellar.connectWallet();
      setPublicKey(key);
      setIsConnected(true);
      onConnect(key);
    } catch (error: any) {
      console.error('Connection error:', error);
      alert(`Failed to connect wallet:\n${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnect = () => {
    stellar.disconnect();
    setPublicKey('');
    setIsConnected(false);
    onDisconnect();
  };

  const handleCopyAddress = async () => {
    await navigator.clipboard.writeText(publicKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isConnected) {
    return (
      <Card title="🔐 Connect Your Wallet">
        <p className="text-white/50 mb-6 leading-relaxed">
          Connect your Stellar wallet to view your balance and make transactions.
        </p>
        
        <button
          onClick={handleConnect}
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3 neon-glow"
        >
          {loading ? (
            <>
              <div className="h-5 w-5 animate-spin rounded-full border-4 border-solid border-white border-r-transparent"></div>
              Connecting...
            </>
          ) : (
            <>
              <FaWallet className="text-lg" />
              Connect Wallet
            </>
          )}
        </button>

        <div className="mt-6 glass rounded-xl p-5 border border-blue-500/20">
          <p className="text-white/50 text-xs font-medium mb-4 uppercase tracking-wide">
            💡 Supported Wallets
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs text-white/40">
            <div className="flex items-center gap-2">
              <span className="text-blue-400">✓</span> Freighter
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-400">✓</span> xBull
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-400">✓</span> Albedo
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-400">✓</span> Rabet
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-400">✓</span> Lobstr
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-400">✓</span> Hana
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-400">✓</span> WalletConnect
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-400">✓</span> More...
            </div>
          </div>
          <p className="text-white/30 text-xs mt-4">
            Click "Connect Wallet" to choose your preferred wallet
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse-glow neon-glow-strong"></div>
          <span className="text-white/60 text-sm font-medium uppercase tracking-wide">Connected</span>
        </div>
        <button
          onClick={handleDisconnect}
          className="text-red-400 hover:text-red-300 text-sm flex items-center gap-2 transition-colors font-medium"
        >
          <MdLogout /> Disconnect
        </button>
      </div>

      <div className="glass rounded-xl p-5 border border-white/10">
        <p className="text-white/40 text-xs font-medium mb-3 uppercase tracking-wide">Your Address</p>
        <div className="flex items-center justify-between gap-3">
          <p className="text-white font-mono text-sm break-all leading-relaxed">
            {publicKey}
          </p>
          <button
            onClick={handleCopyAddress}
            className="text-blue-400 hover:text-blue-300 text-lg flex-shrink-0 transition-colors p-2 hover:bg-white/5 rounded-lg"
            title={copied ? 'Copied!' : 'Copy address'}
          >
            {copied ? <FaCheck className="text-green-400" /> : <FaCopy />}
          </button>
        </div>
      </div>

      <div className="mt-4">
        <a
          href={stellar.getExplorerLink(publicKey, 'account')}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 text-sm font-medium inline-flex items-center gap-2 transition-colors group"
        >
          View on Stellar Expert
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </a>
      </div>
    </Card>
  );
}

