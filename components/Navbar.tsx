/**
 * Navbar Component
 * Minimalist header styled like Claude interface
 */

'use client';

import { useState } from 'react';
import { FaWallet, FaTimes, FaBars } from 'react-icons/fa';
import { stellar } from '@/lib/stellar-helper';
import { LoadingSpinner } from './example-components';

interface NavbarProps {
  publicKey: string;
  isConnected: boolean;
  onConnect: (key: string) => void;
  onDisconnect: () => void;
}

export default function Navbar({ publicKey, isConnected, onConnect, onDisconnect }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleConnect = async () => {
    try {
      setLoading(true);
      const key = await stellar.connectWallet();
      onConnect(key);
      setMobileMenuOpen(false);
    } catch (error: any) {
      console.error('Connection error:', error);
      alert(`Failed to connect wallet:\n${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnect = () => {
    stellar.disconnect();
    onDisconnect();
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-borderOuter h-[60px]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="w-7 h-7 bg-textMain rounded-[4px] flex items-center justify-center">
              <span className="text-surface font-semibold text-sm">St</span>
            </div>
            <div>
              <h1 className="text-base font-serif font-medium tracking-tight text-textMain leading-tight">StellarPay</h1>
              <p className="text-textMuted text-[10px] uppercase font-mono tracking-wider">Testnet</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            {isConnected && (
              <div className="flex items-center gap-2 px-3 py-1 bg-surface border border-borderInner rounded-md">
                <div className="w-1.5 h-1.5 bg-success rounded-full"></div>
                <span className="text-textMain text-xs font-medium">Wallet Connected</span>
              </div>
            )}

            {!isConnected ? (
              <button
                onClick={handleConnect}
                disabled={loading}
                className="claude-button claude-button-primary px-4 py-1.5 text-xs h-8"
              >
                {loading ? (
                  <>
                    <LoadingSpinner size="sm" />
                    <span className="ml-2">Connecting...</span>
                  </>
                ) : (
                  'Connect Wallet'
                )}
              </button>
            ) : (
              <button
                onClick={handleDisconnect}
                className="claude-button claude-button-secondary px-4 py-1.5 text-xs h-8"
              >
                Disconnect
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-textMuted hover:text-textMain p-1"
          >
            {mobileMenuOpen ? <FaTimes className="text-lg" /> : <FaBars className="text-lg" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-[60px] left-0 w-full bg-surface border-b border-borderOuter shadow-sm animate-slide-up z-50">
            <div className="p-4 space-y-4">
              {isConnected && (
                <div className="flex justify-center items-center gap-2 px-3 py-2 bg-background border border-borderInner rounded-md">
                  <div className="w-1.5 h-1.5 bg-success rounded-full"></div>
                  <span className="text-textMain text-xs font-medium">Connected</span>
                </div>
              )}

              {!isConnected ? (
                <button
                  onClick={handleConnect}
                  disabled={loading}
                  className="w-full claude-button claude-button-primary py-2 text-sm"
                >
                  {loading ? 'Connecting...' : 'Connect Wallet'}
                </button>
              ) : (
                <button
                  onClick={handleDisconnect}
                  className="w-full claude-button claude-button-secondary py-2 text-sm"
                >
                  Disconnect
                </button>
              )}

              {isConnected && publicKey && (
                <div className="p-3 bg-background border border-borderInner rounded-md text-center">
                  <p className="text-textMuted text-[10px] mb-1 font-semibold uppercase">Address</p>
                  <p className="text-textMain text-xs font-mono break-all">{publicKey}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
