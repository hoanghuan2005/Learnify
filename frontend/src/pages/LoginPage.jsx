import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { GraduationCapIcon, EyeIcon, EyeOffIcon, MailIcon, LockIcon } from 'lucide-react';
import useLogin from '../hooks/useLogin';

const LoginPage = () => { 

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })

  const [showPassword, setShowPassword] = useState(false);

  // const queryClient = useQueryClient();

  // const { mutate: loginMutation, isPending, error } = useMutation({
  //   mutationFn: login,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ['authUser'] })
  //   }
  // })

  const { loginMutation, isPending, error } = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 bg-gradient-to-br from-primary/5 via-base-100 to-secondary/5"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 border border-primary/20 flex flex-col lg:flex-row w-full max-w-6xl mx-auto bg-base-100/80 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden">
        {/* LOGIN FORM SECTION */}
        <div className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-12 flex flex-col justify-center">
          {/* LOGO */}
          <div className="mb-8 flex items-center justify-start gap-3">
            <div className="relative">
              <GraduationCapIcon className="size-10 text-primary drop-shadow-lg" />
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-md"></div>
            </div>
            <span className="text-4xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent tracking-wider">
              Learnify
            </span>
          </div>

          {/* ERROR MESSAGE DISPLAY */}
          {error && (
            <div className="alert alert-error mb-6 shadow-lg border-l-4 border-l-error">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium">{error.response?.data?.message || 'An error occurred during login'}</span>
            </div>
          )}

          <div className="w-full">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Welcome Back
                </h2>
                <p className="text-base opacity-70 leading-relaxed">
                  Sign in to your account to continue your language journey and connect with learners worldwide
                </p>
              </div>

              <div className="space-y-5">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-semibold text-base">Email Address</span>
                  </label>
                  <div className="relative">
                    <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50 size-5" />
                    <input
                      type="email"
                      placeholder="hello@example.com"
                      className="input input-bordered w-full pl-12 pr-4 py-4 text-base focus:input-primary transition-all duration-300 hover:shadow-md"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-semibold text-base">Password</span>
                  </label>
                  <div className="relative">
                    <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50 size-5" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="input input-bordered w-full pl-12 pr-12 py-4 text-base focus:input-primary transition-all duration-300 hover:shadow-md"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-5 top-1/2 transform -translate-y-1/2 text-base-content/50 hover:text-base-content transition-colors"
                    >
                      {showPassword ? <EyeOffIcon className="size-5" /> : <EyeIcon className="size-5" />}
                    </button>
                  </div>
                </div>

                <button className="btn btn-primary w-full" type="submit">
                  {isPending ? (
                    <>
                      <span className="loading loading-spinner loading-xs"></span>
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </button>


                <div className="text-center pt-4">
                  <p className="text-base">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-primary hover:text-primary-focus font-semibold hover:underline transition-all duration-300">
                      Create one now
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* IMAGE SECTION */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 items-center justify-center relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-20 h-20 bg-primary/20 rounded-full animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-16 h-16 bg-secondary/20 rounded-full animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-accent/20 rounded-full animate-pulse delay-500"></div>
          </div>
          
          <div className="max-w-md p-8 text-center relative z-10">
            {/* Illustration */}
            <div className="relative aspect-square max-w-sm mx-auto mb-8">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-2xl"></div>
              <img 
                src="/banner.png" 
                alt="Language learning illustration" 
                className="w-full h-full object-contain relative z-10 drop-shadow-2xl" 
              />
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Connect with language partners worldwide
              </h2>
              <p className="text-base opacity-80 leading-relaxed">
                Practice conversations, make friends, and improve your language skills together in a supportive community
              </p>
              
              {/* Feature highlights */}
              <div className="flex flex-wrap justify-center gap-4 mt-6">
                <div className="badge badge-primary badge-lg">Group Learning</div>
                <div className="badge badge-secondary badge-lg">AI Assistant</div>
                <div className="badge badge-accent badge-lg">Flashcards</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;