import { useState } from 'react';
import RssFeedGrid from '../components/RssFeedGrid';
import PodcastSearch from '~/components/PodcastSearch';
import PodcastGrid from '~/components/PodcastGrid';
export function Welcome() {
  const [rssFeed, setRssFeed] = useState("https://feeds.simplecast.com/tOjNXec5");
  // const [rssFeed, setRssFeed] = useState();

  // const handleLoadRssFeed = () => {
  //   const 
  // }

  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <header className="flex flex-col items-center gap-9">
        </header>
        <div className="max-w-[800px] w-full space-y-6 px-4">
          <h1>pp</h1>
          <div className="rss-feed-url">
            <label htmlFor="rssFeedUrl">Enter RSS Feed:</label>
            <input id="rssFeedUrl" type="text" onChange={(e) => {setRssFeed(e.target.value)}}/>
            {/* <button onClick={handleLoadRssFeed}>Load Feed</button> */}
          </div>
          {/* <RssFeedGrid 
            rssfeed={rssFeed}
            height="500px"
            width="100vw"
          /> */}
          {/* <PodcastSearch /> */}
          <PodcastGrid />
        </div>
      </div>
    </main>
  );
}

