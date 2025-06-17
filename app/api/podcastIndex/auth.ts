// import { createHash } from 'crypto'; const sha1 = (data: string) => createHash('sha1').update(data).digest('hex'); // original soln but got __vite-browser-external:crypto:3 Uncaught Error: Module "crypto" has been externalized for browser compatibility. Cannot access "crypto.createHash" in client code.  See https://vite.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.

export const sha1 = async (data: string): Promise<string> => {
  console.log('in sha1, string = ',data);
  const encoder = new TextEncoder();
  const buffer = encoder.encode(data);
  const hashBuffer = await crypto.subtle.digest('SHA-1', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};


export const GenerateAuthHeaders = async (apiKey: string, apiSecret: string) => {
  const authDate = Math.floor(Date.now() / 1000);
  const dataToHash = apiKey + apiSecret + authDate;
  // const authHash = sha1(dataToHash); // original soln above

  const authHash = await sha1(dataToHash);

  return {
    'User-Agent': 'SuperPodcastPlayer/1.3',
    'X-Auth-Key': apiKey,
    'X-Auth-Date': authDate.toString(),
    'Authorization': authHash,
  };
}
// export default Auth;

/* 

src/
├── api/
│   ├── podcastIndex/          # PodcastIndex-specific logic
│   │   ├── auth.ts            # Auth hash generation
│   │   ├── client.ts          # Axios/fetch wrapper
│   │   ├── types.ts           # API response/request types
│   │   └── index.ts           # Exports API methods
│   └── index.ts               # Centralized API exports
├── utils/                     # Reusable utilities
│   ├── date.ts                # dateToUnixTimestamp()
│   └── crypto.ts              # Generic crypto helpers
├── hooks/                     # Custom React hooks
│   └── usePodcastApi.ts       # Hook for API calls
├── components/                # UI components
├── stores/                    # State management (Zustand/Jotai)
└── App.tsx                    # Main app
*/