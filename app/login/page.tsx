"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Leaf, ArrowRight, Sprout, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  
  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [otpError, setOtpError] = useState('');
  const [signupMsg, setSignupMsg] = useState('');
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotOtp, setForgotOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [forgotOtpSent, setForgotOtpSent] = useState(false);
  const [forgotError, setForgotError] = useState('');
  const [forgotMsg, setForgotMsg] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);
  const [signupResendCooldown, setSignupResendCooldown] = useState(0);

  useEffect(() => {
    if (resendCooldown <= 0) return;

    const timer = setInterval(() => {
      setResendCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [resendCooldown]);

  useEffect(() => {
    if (signupResendCooldown <= 0) return;

    const timer = setInterval(() => {
      setSignupResendCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [signupResendCooldown]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setOtpError('');
    setSignupMsg('');
    if (isLogin) {
      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();

        if (res.ok) {
          setIsLoading(false);
          router.push('/profile');
          return;
        }

        setOtpError(data.error || 'Invalid credentials');
      } catch (err) {
        setOtpError('Login failed. Please try again.');
      }

      setIsLoading(false);
    } else {
      // Signup flow
      try {
        const res = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password }),
        });
        const data = await res.json();
        if (res.ok) {
          setShowOtp(true);
          setSignupEmail(email);
          setSignupResendCooldown(30);
          setSignupMsg('OTP sent to your email.');
        } else {
          setOtpError(data.error || 'Signup failed');
        }
      } catch (err) {
        setOtpError('Signup failed');
      }
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setOtpError('');
    setSignupMsg('');
    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: signupEmail, otp }),
      });
      const data = await res.json();
      if (res.ok) {
        setSignupMsg('Email verified! You can now log in.');
        setShowOtp(false);
        setIsLogin(true);
        setName('');
        setEmail('');
        setPassword('');
        setOtp('');
      } else {
        setOtpError(data.error || 'OTP verification failed');
      }
    } catch (err) {
      setOtpError('OTP verification failed');
    }
    setIsLoading(false);
  };

  const handleResendSignupOtp = async () => {
    if (signupResendCooldown > 0 || !signupEmail) return;

    setIsLoading(true);
    setOtpError('');
    setSignupMsg('');

    try {
      const res = await fetch('/api/auth/resend-signup-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: signupEmail }),
      });
      const data = await res.json();

      if (res.ok) {
        setSignupResendCooldown(30);
        setSignupMsg(data.message || 'OTP resent to your email.');
      } else {
        setOtpError(data.error || 'Failed to resend OTP');
      }
    } catch (err) {
      setOtpError('Failed to resend OTP');
    }

    setIsLoading(false);
  };

  const handleSendForgotOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setForgotError('');
    setForgotMsg('');

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotEmail }),
      });
      const data = await res.json();

      if (res.ok) {
        setForgotOtpSent(true);
        setResendCooldown(30);
        setForgotMsg(data.message || 'OTP sent to your email.');
      } else {
        setForgotError(data.error || 'Failed to send OTP');
      }
    } catch (err) {
      setForgotError('Failed to send OTP');
    }

    setIsLoading(false);
  };

  const handleResendForgotOtp = async () => {
    if (resendCooldown > 0 || !forgotEmail) return;

    setIsLoading(true);
    setForgotError('');
    setForgotMsg('');

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotEmail }),
      });
      const data = await res.json();

      if (res.ok) {
        setResendCooldown(30);
        setForgotMsg(data.message || 'OTP resent successfully.');
      } else {
        setForgotError(data.error || 'Failed to resend OTP');
      }
    } catch (err) {
      setForgotError('Failed to resend OTP');
    }

    setIsLoading(false);
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setForgotError('');
    setForgotMsg('');

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotEmail, otp: forgotOtp, newPassword }),
      });
      const data = await res.json();

      if (res.ok) {
        setIsForgotPassword(false);
        setForgotOtpSent(false);
        setForgotOtp('');
        setNewPassword('');
        setEmail(forgotEmail);
        setIsLogin(true);
        setSignupMsg(data.message || 'Password reset successful. Please login.');
      } else {
        setForgotError(data.error || 'Failed to reset password');
      }
    } catch (err) {
      setForgotError('Failed to reset password');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-nature-sage flex items-center justify-center p-4">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-nature-leaf/20 blur-3xl" />
        <div className="absolute -bottom-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-nature-forest/10 blur-3xl" />
      </div>

      <motion.div 
        key={isLogin ? 'login' : 'signup'}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-white/80 backdrop-blur-md border border-white/50 shadow-glass rounded-2xl p-8">
          
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-nature-forest to-nature-leaf rounded-full flex items-center justify-center mb-4 shadow-lg">
              <Sprout size={32} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 text-center">
              {isForgotPassword ? 'Reset Password' : isLogin ? 'Welcome Back' : 'Join'} <span className="text-nature-forest">Krushi Scan</span>
            </h1>
            <p className="text-gray-500 mt-2 text-center">
              {isForgotPassword
                ? 'Verify with OTP and set a new password'
                : isLogin
                  ? 'Sign in to manage your smart farm'
                  : 'Create an account to digitize your farm'}
            </p>
          </div>

          {isForgotPassword ? (
            <form onSubmit={forgotOtpSent ? handleResetPassword : handleSendForgotOtp} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="forgot-email">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={18} className="text-gray-400" />
                  </div>
                  <input
                    id="forgot-email"
                    type="email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-nature-leaf focus:border-transparent bg-white/50 transition-all outline-none"
                    placeholder="farmer@krushiscan.com"
                    required
                    disabled={forgotOtpSent}
                  />
                </div>
              </div>

              {forgotOtpSent && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="forgot-otp">
                      OTP
                    </label>
                    <input
                      id="forgot-otp"
                      type="text"
                      value={forgotOtp}
                      onChange={(e) => setForgotOtp(e.target.value)}
                      className="block w-full pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-nature-leaf focus:border-transparent bg-white/50 transition-all outline-none text-center tracking-widest text-lg"
                      placeholder="6-digit OTP"
                      maxLength={6}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="new-password">
                      New Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock size={18} className="text-gray-400" />
                      </div>
                      <input
                        id="new-password"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-nature-leaf focus:border-transparent bg-white/50 transition-all outline-none"
                        placeholder="Enter new password"
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full relative flex items-center justify-center gap-2 bg-gradient-to-r from-nature-forest to-nature-leaf text-white py-3 rounded-xl font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:hover:translate-y-0 mt-2"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : forgotOtpSent ? (
                  <>Reset Password <ArrowRight size={18} /></>
                ) : (
                  <>Send OTP <ArrowRight size={18} /></>
                )}
              </button>

              {forgotOtpSent && (
                <button
                  type="button"
                  onClick={handleResendForgotOtp}
                  disabled={isLoading || resendCooldown > 0}
                  className="w-full text-sm text-nature-forest font-semibold border border-nature-forest/40 rounded-xl py-2 hover:bg-nature-forest/5 transition-colors disabled:opacity-60"
                >
                  {resendCooldown > 0 ? `Resend OTP in ${resendCooldown}s` : 'Resend OTP'}
                </button>
              )}

              {forgotError && <div className="text-red-500 text-sm mt-2 text-center">{forgotError}</div>}
              {forgotMsg && <div className="text-green-600 text-sm mt-2 text-center">{forgotMsg}</div>}
            </form>
          ) : !showOtp ? (
            <form onSubmit={handleSubmit} className="space-y-5">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">
                    Full Name
                  </label>
                  <div className="relative mb-5">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User size={18} className="text-gray-400" />
                    </div>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-nature-leaf focus:border-transparent bg-white/50 transition-all outline-none"
                      placeholder="John Farmer"
                      required={!isLogin}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-nature-leaf focus:border-transparent bg-white/50 transition-all outline-none"
                  placeholder="farmer@krushiscan.com"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                  Password
                </label>
                {isLogin && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsForgotPassword(true);
                      setForgotEmail(email);
                      setForgotOtpSent(false);
                      setForgotOtp('');
                      setNewPassword('');
                      setForgotError('');
                      setForgotMsg('');
                    }}
                    className="text-sm text-nature-forest hover:text-nature-leaf font-medium transition-colors"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-nature-leaf focus:border-transparent bg-white/50 transition-all outline-none"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full relative flex items-center justify-center gap-2 bg-gradient-to-r from-nature-forest to-nature-leaf text-white py-3 rounded-xl font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:hover:translate-y-0 mt-2"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {isLogin ? 'Sign In' : 'Create Account'} <ArrowRight size={18} />
                </>
              )}
            </button>
            {otpError && <div className="text-red-500 text-sm mt-2 text-center">{otpError}</div>}
            {signupMsg && <div className="text-green-600 text-sm mt-2 text-center">{signupMsg}</div>}
          </form>
          ) : (
            <form onSubmit={handleOtpSubmit} className="space-y-5">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="otp">
                Enter OTP sent to your email
              </label>
              <input
                id="otp"
                type="text"
                value={otp}
                onChange={e => setOtp(e.target.value)}
                className="block w-full pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-nature-leaf focus:border-transparent bg-white/50 transition-all outline-none text-center tracking-widest text-lg"
                placeholder="6-digit OTP"
                maxLength={6}
                required
              />
              <button
                type="submit"
                disabled={isLoading}
                className="w-full relative flex items-center justify-center gap-2 bg-gradient-to-r from-nature-forest to-nature-leaf text-white py-3 rounded-xl font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:hover:translate-y-0 mt-2"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>Verify OTP <ArrowRight size={18} /></>
                )}
              </button>
              <button
                type="button"
                onClick={handleResendSignupOtp}
                disabled={isLoading || signupResendCooldown > 0}
                className="w-full text-sm text-nature-forest font-semibold border border-nature-forest/40 rounded-xl py-2 hover:bg-nature-forest/5 transition-colors disabled:opacity-60"
              >
                {signupResendCooldown > 0 ? `Resend OTP in ${signupResendCooldown}s` : 'Resend OTP'}
              </button>
              {otpError && <div className="text-red-500 text-sm mt-2 text-center">{otpError}</div>}
              {signupMsg && <div className="text-green-600 text-sm mt-2 text-center">{signupMsg}</div>}
            </form>
          )}

          <div className="mt-8 text-center">
            {isForgotPassword ? (
              <p className="text-gray-600 text-sm">
                Remembered your password?{' '}
                <button
                  onClick={() => setIsForgotPassword(false)}
                  className="text-nature-forest font-semibold hover:text-nature-leaf transition-colors focus:outline-none"
                >
                  Back to Log In
                </button>
              </p>
            ) : (
              <p className="text-gray-600 text-sm">
                {isLogin ? "Don't have an account yet?" : "Already have an account?"}{' '}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-nature-forest font-semibold hover:text-nature-leaf transition-colors focus:outline-none"
                >
                  {isLogin ? 'Sign Up' : 'Log In'}
                </button>
              </p>
            )}
          </div>
          
          <div className="mt-6 flex justify-center">
            <Link href="/" className="text-sm text-gray-400 hover:text-gray-600 flex items-center gap-1 transition-colors">
              <Leaf size={14} /> Back to Home
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
