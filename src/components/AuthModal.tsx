import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'login' | 'signup' | 'reset';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  defaultMode = 'login',
}) => {
  const [mode, setMode] = useState<'login' | 'signup' | 'reset'>(defaultMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        toast({
          title: 'Welcome Back!',
          description: 'You have logged in successfully.',
        });
        onClose();
      } else if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name: fullName,
            },
          },
        });
        if (error) throw error;
        toast({
          title: 'Sign Up Successful!',
          description: 'Please check your email to verify your account.',
        });
        onClose();
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: window.location.origin,
        });
        if (error) throw error;
        toast({
          title: 'Reset Link Sent',
          description: 'Check your email for the password recovery link.',
        });
        setMode('login');
      }
    } catch (err: any) {
      toast({
        variant: 'destructive',
        title: 'Authentication Error',
        description: err.message || 'An error occurred during authentication.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px] bg-[#0A0D1A]/95 border-white/10 text-white backdrop-blur-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold font-outfit text-white text-center">
            {mode === 'login' && 'Access the Mystery Lab'}
            {mode === 'signup' && 'Create Your Explorer Account'}
            {mode === 'reset' && 'Reset Access Code'}
          </DialogTitle>
          <DialogDescription className="text-gray-400 text-center">
            {mode === 'login' && 'Log in to sync your bookmarks, book workshops, and review lab logs.'}
            {mode === 'signup' && 'Join the scientific adventure and customize your science kits.'}
            {mode === 'reset' && 'Enter your email address to receive password recovery instructions.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleAuthSubmit} className="space-y-4 mt-4">
          {mode === 'signup' && (
            <div className="space-y-2">
              <label htmlFor="auth-name" className="text-sm font-medium text-gray-300">
                Full Name
              </label>
              <input
                id="auth-name"
                type="text"
                placeholder="Dr. Eleanor Vance"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-neon-pink focus:ring-1 focus:ring-neon-pink focus:outline-none text-white text-base"
                autoComplete="name"
              />
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="auth-email" className="text-sm font-medium text-gray-300">
              Email Address
            </label>
            <input
              id="auth-email"
              type="email"
              placeholder="explorer@mysterylab.org"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-neon-pink focus:ring-1 focus:ring-neon-pink focus:outline-none text-white text-base"
              autoComplete="username"
            />
          </div>

          {mode !== 'reset' && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor="auth-password" className="text-sm font-medium text-gray-300">
                  Access Code (Password)
                </label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => setMode('reset')}
                    className="text-xs text-neon-blue hover:text-neon-pink transition-colors focus:outline-none"
                  >
                    Forgot Code?
                  </button>
                )}
              </div>
              <input
                id="auth-password"
                type="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-neon-pink focus:ring-1 focus:ring-neon-pink focus:outline-none text-white text-base"
                autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary flex justify-center items-center py-3 bg-gradient-to-r from-neon-pink to-purple-600 rounded-xl text-white font-medium hover:opacity-90 transition-opacity"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
            ) : null}
            {mode === 'login' && 'Initiate Authorization'}
            {mode === 'signup' && 'Register Explorer Account'}
            {mode === 'reset' && 'Send Reset Code'}
          </button>
        </form>

        <div className="border-t border-white/10 mt-6 pt-4 text-center">
          {mode === 'login' && (
            <p className="text-sm text-gray-400">
              New explorer?{' '}
              <button
                type="button"
                onClick={() => setMode('signup')}
                className="text-neon-pink hover:underline font-semibold focus:outline-none"
              >
                Sign Up Here
              </button>
            </p>
          )}
          {mode === 'signup' && (
            <p className="text-sm text-gray-400">
              Already registered?{' '}
              <button
                type="button"
                onClick={() => setMode('login')}
                className="text-neon-pink hover:underline font-semibold focus:outline-none"
              >
                Log In Here
              </button>
            </p>
          )}
          {mode === 'reset' && (
            <button
              type="button"
              onClick={() => setMode('login')}
              className="text-sm text-neon-blue hover:underline font-semibold focus:outline-none"
            >
              Return to Login
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
