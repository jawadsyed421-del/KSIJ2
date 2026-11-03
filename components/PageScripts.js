'use client';

import { useEffect, useRef } from 'react';

export default function PageScripts({ scripts }) {
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    async function loadPageScripts() {
      for (const entry of scripts) {
        await new Promise((resolve) => {
          const script = document.createElement('script');
          if (entry.src) {
            script.src = entry.src;
            script.async = false;
            script.onload = resolve;
            script.onerror = resolve;
          } else {
            script.textContent = entry.code;
          }
          document.body.appendChild(script);
          if (!entry.src) resolve();
        });
      }
    }

    loadPageScripts();
  }, [scripts]);

  return null;
}
