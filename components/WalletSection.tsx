/**
 * WalletSection Component
 * Claude Code Light Theme
 */

'use client';

import { useState } from 'react';
import { FaCopy, FaCheck, FaExternalLinkAlt, FaWallet } from 'react-icons/fa';
import { MdLogout } from 'react-icons/md';
import { stellar } from '@/lib/stellar-helper';

interface WalletSectionProps {
  publicKey: string;
  onDisconnect: () => void;
}

export default function WalletSection({ publicKey, onDisconnect }: WalletSectionProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = async () => {
    await navigator.clipboard.writeText(publicKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDisconnect = () => {
    stellar.disconnect();
    onDisconnect();
  };

  const shortAddress = stellar.formatAddress(publicKey, 6, 4);

  return (
    <div className="flex flex-col h-full justify-between">
      {/* Header with Status */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-success rounded-full"></div>
          <span className="text-textMain text-xs font-semibold uppercase tracking-wider">Connected</span>
        </div>
        <button
          onClick={handleDisconnect}
          className="text-textMuted hover:text-error text-xs font-medium flex items-center gap-1.5 transition-colors p-1"
        >
          <MdLogout className="text-sm" />
          <span className="hidden sm:inline">Disconnect</span>
        </button>
      </div>

      {/* Wallet Address Card */}
      <div className="bg-background rounded-xl p-5 border border-borderInner flex-1 flex flex-col justify-center shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-surface border border-borderInner rounded-lg flex items-center justify-center shadow-sm">
            <FaWallet className="text-textMain text-sm" />
          </div>
          <div>
            <p className="text-textMuted text-[10px] font-semibold mb-0.5 uppercase tracking-widest">Public Key</p>
            <p className="text-textMain font-mono text-sm tracking-wide">{shortAddress}</p>
          </div>
        </div>

        {/* Full Address with Copy */}
        <div className="bg-surface rounded-md p-2.5 border border-borderOuter flex items-center justify-between gap-3 group">
          <p className="text-textMuted font-mono text-[11px] truncate flex-1">
            {publicKey}
          </p>
          <button
            onClick={handleCopyAddress}
            className="text-textMuted hover:text-textMain transition-colors p-1 flex-shrink-0"
            title={copied ? 'Copied!' : 'Copy address'}
          >
            {copied ? (
              <FaCheck className="text-success text-sm" />
            ) : (
              <FaCopy className="text-sm opacity-50 group-hover:opacity-100" />
            )}
          </button>
        </div>

        {/* Explorer Link */}
        <a
          href={stellar.getExplorerLink(publicKey, 'account')}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 text-accent hover:text-textMain text-xs font-medium inline-flex items-center gap-1.5 transition-colors group/link"
        >
          View on Explorer
          <FaExternalLinkAlt className="text-[10px] opacity-70" />
        </a>
      </div>
    </div>
  );
}
