import { CatIcon } from "@/components/ui/icons/cat-icon";

export default function ProfileNotFound({ username }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-8">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Icon group */}
        <div className="relative inline-block">
          <CatIcon className="text-slate-400 mx-auto" size={128} />
          <svg className="w-16 h-16 text-slate-600 absolute -bottom-2 -right-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM13.5 10.5 10.5 13.5m0-3 3 3" />
          </svg>
          {/* Question marks around cat with fade animation */}
          <span className="absolute -top-4 -left-8 text-5xl text-slate-300 font-bold animate-pulse" style="animation-delay: 0s; animation-duration: 1s;">?</span>
          <span className="absolute -top-2 -right-8 text-4xl text-slate-300 font-bold animate-pulse" style="animation-delay: 0.3s; animation-duration: 1s;">?</span>
          <span className="absolute -bottom-8 left-4 text-3xl text-slate-300 font-bold animate-pulse" style="animation-delay: 0.6s; animation-duration: 1s;">?</span>
          <span className="absolute top-8 -left-12 text-3xl text-slate-300 font-bold animate-pulse" style="animation-delay: 0.9s; animation-duration: 1s;">?</span>
          <span className="absolute top-8 -right-12 text-4xl text-slate-300 font-bold animate-pulse" style="animation-delay: 0.2s; animation-duration: 1s;">?</span>
          <span className="absolute bottom-0 -right-16 text-3xl text-slate-300 font-bold animate-pulse" style="animation-delay: 0.5s; animation-duration: 1s;">?</span>
        </div>

        {/* Error message */}
        <div className="space-y-3">
          <h1 className="text-6xl font-bold text-slate-900">404</h1>
          <h2 className="text-2xl font-semibold text-slate-700">
            Profile Not Found
          </h2>
          <p className="text-slate-500 text-lg italic">
            {username}? Who is that?
          </p>
          <p className="text-slate-600">
            This profile seems to have wandered off somewhere...
          </p>
        </div>
        
        {/* Action button */}
        <div className="pt-4">
          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-200 text-slate-900 rounded-md hover:bg-slate-300 active:bg-slate-400 transition-all duration-200 font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            Go Home
          </a>
        </div>
      </div>
    </div>
  );
}