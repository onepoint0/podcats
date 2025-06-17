import { Divide } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import Parser from 'rss-parser';

interface Episode {
  id: string,
  // number: string,
  title: string | null;
  pubDate: string;
  url: string | null;
}

interface RssFeedGridProps {
  rssfeed: string;
  height: string;
  width: string;
}

// https://www.youtube.com/watch?v=2TDIWOubvp0&t=914s&ab_channel=AGGrid
const RssFeedGrid = ({ rssfeed, height, width }: RssFeedGridProps) => {
  const [feed, setFeed] = useState<Episode[]>([]);
  const [feedSort, setFeedSort] = useState(1);


  useEffect(() => {
    const getFeed = async () => {
      try {

        const feed = await fetch(rssfeed);

        if (!feed.ok) {
          console.log('feed not ok ',feed);
        }

        const txt = await feed.text()
        console.log('txt = ',txt)

        const parser = new window.DOMParser();
        const data = parser.parseFromString(txt,'text/xml');
        const itemList = data.querySelectorAll('item');

        const episodes = Array.from(itemList).map((item,idx) => {
          const title = item.querySelector("title")?.textContent;
          return {
            id: idx, //item.querySelector("guid")?.textContent ?? '',
            // number: title ? title.match(/Episode (\d+)/)?.[1] ?? '' : '',
            title: title ?? null,
            pubDate: item.querySelector("pubDate")?.textContent ?? '',
            url: item.querySelector("enclosure")?.getAttribute("url") ?? null,
          }
        });
        episodes.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
        console.log('eps = ', episodes);
        setFeed(episodes);

      } catch (error) {
        console.log('error on fetch rss ',error);
      }

    }

    getFeed();

  }, []);

  const sortFeed = () => {
    const eps = [...feed];
    eps.sort((a, b) => (
      feedSort < 0
        ? new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
        : new Date(a.pubDate).getTime() - new Date(b.pubDate).getTime()
    ));
    setFeed(eps);
    setFeedSort(feedSort * -1);
  }
  return (
    <div className="grid grid-cols-3 gap-2">
      {/* Headers */}
      <div className="font-bold">Title</div>
      <div className="font-bold" onClick={sortFeed}>Released {feedSort > 0 ? '↓' : '↑'}</div>

      <div className="font-bold">Episode</div>

      {/* Data Rows */}
      {feed.map((episode) => (
        <>
          <div key={`${episode.id}-title`}>{episode.title}</div>
          <div key={`${episode.id}-date`}>
            {new Date(episode.pubDate).toLocaleDateString()}
          </div>
          {/* <div key={`${episode.id}-url`}>{episode.url}</div> */}
          <div key={`${episode.id}-url`}>
            {episode.url}
            {episode.url && <audio src={episode.url} controls preload="none"></audio> }
          </div>
        </>
      ))}
    </div>
  )
}
export default RssFeedGrid;
