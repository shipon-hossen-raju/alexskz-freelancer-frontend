// components/AuthGuard.jsx
'use client';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const TOKEN_KEY = 'user-token';
const PROTECTED = ['/profile', '/inbox']; // exact prefixes to protect

function isProtected(path) {
  return PROTECTED.some(p => path === p || path.startsWith(p + '/'));
}

export default function AuthGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // only run on client
    const token = typeof window !== 'undefined' ? localStorage.getItem(TOKEN_KEY) : null;

    if (isProtected(pathname) && !token) {
      router.replace(`/sign-in?returnTo=${encodeURIComponent(window.location.pathname + window.location.search)}`);
      return;
    }

    setChecking(false);
  }, [pathname, router]);

  if (checking) return <div>Loading…</div>;
  return <>{children}</>;
}
