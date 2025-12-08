import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

interface LoginScreenProps {
  darkMode: boolean;
  onLogin: (email: string, password: string, remember: boolean) => void;
  onForgotPassword?: () => void;
}

export function LoginScreen({ darkMode, onLogin, onForgotPassword }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate loading
    setTimeout(() => {
      onLogin(email, password, rememberMe);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className={`
      min-h-screen flex items-center justify-center p-8
      ${darkMode 
        ? 'bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900' 
        : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
      }
    `}>
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`
          absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20
          ${darkMode ? 'bg-blue-500' : 'bg-blue-400'}
          animate-pulse
        `} />
        <div className={`
          absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-20
          ${darkMode ? 'bg-purple-500' : 'bg-purple-400'}
          animate-pulse
        `} style={{ animationDelay: '1s' }} />
      </div>

      {/* Login card */}
      <div className={`
        relative w-full max-w-md rounded-3xl p-8 backdrop-blur-3xl border shadow-2xl
        ${darkMode
          ? 'bg-neutral-900/80 border-white/20 shadow-black/40'
          : 'bg-white/80 border-white/80 shadow-black/20'
        }
      `}>
        {/* Gradient overlay */}
        <div className={`
          absolute inset-0 rounded-3xl pointer-events-none
          ${darkMode
            ? 'bg-gradient-to-br from-white/5 to-transparent'
            : 'bg-gradient-to-br from-white/40 to-transparent'
          }
        `} />

        <div className="relative z-10">
          {/* Logo/Title */}
          <div className="text-center mb-8">
            <div className={`
              w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center
              bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/50
            `}>
              <span className="text-2xl text-white">📅</span>
            </div>
            <h1 className={`mb-2 ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
              Welcome Back
            </h1>
            <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-neutral-600'}`}>
              Sign in to your content calendar
            </p>
          </div>

          {/* Login form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email field */}
            <div>
              <label className={`block text-sm mb-2 ${darkMode ? 'text-white/70' : 'text-neutral-600'}`}>
                Email Address
              </label>
              <div className={`
                flex items-center gap-3 px-4 py-3 rounded-xl backdrop-blur-md border transition-all
                ${darkMode
                  ? 'bg-white/10 border-white/20 focus-within:bg-white/15 focus-within:border-white/30'
                  : 'bg-white/60 border-white/80 focus-within:bg-white/80 focus-within:border-neutral-300'
                }
                focus-within:ring-2 focus-within:ring-blue-500/50
              `}>
                <Mail className={`w-5 h-5 ${darkMode ? 'text-white/60' : 'text-neutral-600'}`} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className={`
                    flex-1 bg-transparent outline-none
                    ${darkMode ? 'text-white placeholder-white/40' : 'text-neutral-900 placeholder-neutral-400'}
                  `}
                />
              </div>
            </div>

            {/* Password field */}
            <div>
              <label className={`block text-sm mb-2 ${darkMode ? 'text-white/70' : 'text-neutral-600'}`}>
                Password
              </label>
              <div className={`
                flex items-center gap-3 px-4 py-3 rounded-xl backdrop-blur-md border transition-all
                ${darkMode
                  ? 'bg-white/10 border-white/20 focus-within:bg-white/15 focus-within:border-white/30'
                  : 'bg-white/60 border-white/80 focus-within:bg-white/80 focus-within:border-neutral-300'
                }
                focus-within:ring-2 focus-within:ring-blue-500/50
              `}>
                <Lock className={`w-5 h-5 ${darkMode ? 'text-white/60' : 'text-neutral-600'}`} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className={`
                    flex-1 bg-transparent outline-none
                    ${darkMode ? 'text-white placeholder-white/40' : 'text-neutral-900 placeholder-neutral-400'}
                  `}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`${darkMode ? 'text-white/60 hover:text-white' : 'text-neutral-600 hover:text-neutral-900'} transition-colors`}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember me & Forgot password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded accent-blue-500"
                />
                <span className={`text-sm ${darkMode ? 'text-white/70' : 'text-neutral-600'}`}>
                  Remember me
                </span>
              </label>
              <button
                type="button"
                onClick={onForgotPassword}
                className={`text-sm ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} transition-colors`}
              >
                Forgot password?
              </button>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`
                w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl transition-all shadow-lg
                ${darkMode
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20'
                  : 'bg-blue-500 hover:bg-blue-600 text-white shadow-blue-500/30'
                }
                ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
                hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]
              `}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Continue</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Demo credentials hint */}
          <div className={`
            mt-6 p-4 rounded-xl backdrop-blur-md border
            ${darkMode
              ? 'bg-blue-500/10 border-blue-500/30'
              : 'bg-blue-100/60 border-blue-200'
            }
          `}>
            <p className={`text-xs text-center ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>
              💡 Demo: Use any email/password to continue
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
