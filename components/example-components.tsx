/**
 * Example Components
 * Light theme minimalistic Claude-inspired design
 */

'use client';

import { useState } from 'react';

// Example: Loading Spinner
export function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: 'h-4 w-4 border-2',
    md: 'h-6 w-6 border-2',
    lg: 'h-8 w-8 border-3',
  };

  return (
    <div className={`inline-block ${sizes[size]} animate-spin rounded-full border-solid border-textMain border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]`}>
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  );
}

// Example: Skeleton Loader
export function SkeletonLoader({ 
  count = 1, 
  height = 'h-4', 
  width = 'w-full',
  className = '' 
}: { 
  count?: number; 
  height?: string; 
  width?: string;
  className?: string;
}) {
  return (
    <div className={`space-y-3 ${className}`}>
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className={`animate-pulse ${height} ${width} bg-borderInner rounded-md`}
        />
      ))}
    </div>
  );
}

// Example: Card Skeleton
export function CardSkeleton() {
  return (
    <div className="claude-card p-6 space-y-4">
      <div className="animate-pulse h-5 bg-borderInner rounded-md w-1/3"></div>
      <div className="animate-pulse h-24 bg-borderInner rounded-md"></div>
      <div className="animate-pulse h-12 bg-borderInner rounded-md w-2/3"></div>
    </div>
  );
}

// Example: Balance Card
export function BalanceCard({ 
  balance, 
  label 
}: { 
  balance: string; 
  label: string; 
}) {
  return (
    <div className="claude-card p-6">
      <p className="text-textMuted text-xs mb-2 uppercase tracking-wide font-medium">{label}</p>
      <p className="text-3xl font-semibold text-textMain tracking-tight">{balance}</p>
    </div>
  );
}

// Example: Transaction Item
export function TransactionItem({
  type,
  amount,
  asset,
  date,
  hash,
  explorerLink,
}: {
  type: string;
  amount?: string;
  asset?: string;
  date: string;
  hash: string;
  explorerLink: string;
}) {
  return (
    <div className="bg-background border border-borderInner rounded-lg p-4 hover:border-borderOuter transition-all duration-200 group">
      <div className="flex justify-between items-start mb-3">
        <div>
          <p className="text-textMain font-medium mb-1 text-sm">
            {type === 'payment' ? '💸' : '📝'} {type}
          </p>
          {amount && (
            <p className="text-textMuted text-sm">
              {amount} {asset || 'XLM'}
            </p>
          )}
        </div>
        
        <a
          href={explorerLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-textMuted hover:text-textMain text-xs font-medium transition-colors"
        >
          View ↗
        </a>
      </div>
      <div className="flex justify-between text-[11px] text-textMuted">
        <span>{new Date(date).toLocaleString()}</span>
        <span className="font-mono">{hash.slice(0, 8)}...</span>
      </div>
    </div>
  );
}

// Example: Copy to Clipboard Button
export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="text-textMuted hover:text-textMain text-sm font-medium transition-colors"
    >
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}

// Example: Alert/Toast Component
export function Alert({
  type,
  message,
  onClose,
}: {
  type: 'success' | 'error' | 'info';
  message: string;
  onClose: () => void;
}) {
  const colors = {
    success: 'bg-[#F2F8F4] border-[#E2F0E7] text-[#2F593F]',
    error: 'bg-[#FCF2F2] border-[#F8E3E3] text-[#8C2F2B]',
    info: 'bg-background border-borderInner text-textMain',
  };

  return (
    <div
      className={`${colors[type]} border px-4 py-3 rounded-md flex justify-between items-center animate-slide-up text-sm shadow-sm`}
    >
      <span className="font-medium">{message}</span>
      <button
        onClick={onClose}
        className="ml-4 opacity-60 hover:opacity-100 transition-opacity"
      >
        ✕
      </button>
    </div>
  );
}

// Example: Card Component
export function Card({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="claude-card p-6">
      {title && (
        <h2 className="text-lg font-semibold text-textMain mb-4 tracking-tight">{title}</h2>
      )}
      {children}
    </div>
  );
}

// Example: Input Component
export function Input({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
}: {
  label: string;
  type?: 'text' | 'number' | 'email' | 'password';
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}) {
  return (
    <div className="w-full">
      <label className="block text-textMain text-sm font-medium mb-1.5">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`claude-input ${error ? 'border-[#B54D49] focus:shadow-[0_0_0_2px_rgba(181,77,73,0.1)]' : ''}`}
      />
      {error && (
        <p className="text-[#B54D49] text-xs mt-1.5 font-medium">{error}</p>
      )}
    </div>
  );
}

// Example: Button Component
export function Button({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  fullWidth = false,
}: {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  fullWidth?: boolean;
}) {
  const variants = {
    primary: 'claude-button claude-button-primary',
    secondary: 'claude-button claude-button-secondary',
    danger: 'bg-[#B54D49] hover:bg-[#A3423E] text-white transition-all duration-200 rounded-lg shadow-sm',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${variants[variant]} ${
        fullWidth ? 'w-full py-2.5' : 'py-2 px-4'
      } text-sm font-medium`}
    >
      {children}
    </button>
  );
}

// Example: Empty State Component
export function EmptyState({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center py-10 animate-slide-up border border-dashed border-borderOuter rounded-xl bg-background/50">
      <div className="w-12 h-12 mx-auto mb-4 bg-surface border border-borderInner rounded-lg flex items-center justify-center text-xl shadow-sm text-textMain">
        {icon}
      </div>
      <h3 className="text-textMain text-base font-semibold mb-1 tracking-tight">{title}</h3>
      <p className="text-textMuted text-sm leading-relaxed max-w-sm mx-auto">{description}</p>
    </div>
  );
}

// Example: Modal Component
export function Modal({
  isOpen,
  onClose,
  title,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-textMain/20 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-slide-up">
      <div className="bg-surface border border-borderInner rounded-xl shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center p-5 border-b border-borderInner">
          <h3 className="text-lg font-semibold text-textMain tracking-tight">{title}</h3>
          <button
            onClick={onClose}
            className="text-textMuted hover:text-textMain text-lg transition-colors"
          >
            ✕
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}