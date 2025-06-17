import { Divide } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import Parser from 'rss-parser';
import { searchTrending } from '~/api/podcastIndex/client';

interface Episode {
  id: string,
  // number: string,
  title: string | null;
  pubDate: string;
  url: string | null;
}

interface PodcastGridProps {
  rssfeed: string;
  height: string;
  width: string;
}

// https://www.youtube.com/watch?v=2TDIWOubvp0&t=914s&ab_channel=AGGrid
const PodcastGrid = ({ rssfeed, height, width }: PodcastGridProps) => {
  const [podcasts, setPodcasts] = useState<Episode[]>([]);
  const [podcastsSort, setpodcastsSort] = useState(1);

  useEffect(() => {
    console.log('in use effect');
    const search = async (query: string) => {
      try {
        console.log('trying searchTrending');
        const trending = await searchTrending({ q: query });
        console.log('trending seach returns ',trending);
        // return trending.feeds;
        setPodcasts(trending.feeds);
      } catch (error) {
        console.error('API Error:', error);
        throw error;
      }
    };
    search('');
  }, []);

  const sortFeed = () => {
    const eps = [...podcasts];
    eps.sort((a, b) => (
      podcastsSort < 0
        ? new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
        : new Date(a.pubDate).getTime() - new Date(b.pubDate).getTime()
    ));
    setPodcasts(eps);
    setpodcastsSort(podcastsSort * -1);
  }
  return (
    <div>
      {/* Headers */}
      <div className="font-bold">Title</div>
      <div className="font-bold" onClick={sortFeed}>Released {podcastsSort > 0 ? '↓' : '↑'}</div>

      <div className="font-bold">Episode</div>

      {/* Data Rows */}
      {podcasts.map((episode) => (
        // <>
        //   <div key={`${episode.id}-title`}>{episode.id}{episode.title}</div>
        //   <div key={`${episode.id}-date`}>
        //     {new Date(episode.pubDate).toLocaleDateString()}
        //   </div>
        //   {/* <div key={`${episode.id}-url`}>{episode.url}</div> */}
        //   <div key={`${episode.id}-url`}>
        //     {episode.url}
        //     {episode.url && <audio src={episode.url} controls preload="none"></audio> }
        //   </div>
        // </>
        <div key={episode.id} className="flex">
          <div className="pod-img w-50"><img src={episode.image} alt={`${episode.title} podcast image`} /></div>
          <div className="pod-meta">
            <div className="pod-title">
              {episode.title}
            </div>
            <div className="pod-description">
              {episode.description}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
export default PodcastGrid;
