import React from 'react'
import { useState,useEffect } from 'react'
import { searchPodcasts,searchTrending } from '../api/podcastIndex/client';


const PodcastSearch = () => {
  useEffect(() => {
    console.log('in use effect');
    const search = async (query: string) => {
      try {
        console.log('trying searchTrending');
        const trending = await searchTrending({ q: query });
        console.log('trending seach returns ',trending);
        return trending;
      } catch (error) {
        console.error('API Error:', error);
        throw error;
      }
    };
    search('');
  }, [])
  
  return (
    <>
      <div>PodcastSearch</div>
      <input type="text" />
    </>

  )
}
export default PodcastSearch;
