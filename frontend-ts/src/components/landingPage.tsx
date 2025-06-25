import { SignIn } from '@clerk/clerk-react';

const LandingPage = () => {
  return (
    <div className="flex h-screen text-white">
      <div className="w-1/2 bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-500 flex flex-col justify-center items-center px-10 relative">
        <h1 className="text-3xl font-bold mb-2 tracking-wide">
          Welcome to STR-AI-VER
        </h1>
        <p className="text-xl italic mb-4 text-center max-w-md">
            Whether you're stuck, curious, or just getting started — this AI coach adapts to your level and helps you truly understand.
        </p>
      </div>
      <div className="w-1/2 flex items-center justify-center bg-white">
        <div className="w-full max-w-md">
          <SignIn appearance={{
            elements: {
              card: 'shadow-none border-none bg-white ring-0',
            }
          }} />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
