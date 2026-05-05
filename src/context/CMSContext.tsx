import React, { createContext, useContext, useState, useEffect } from 'react';
import { getPageContent, getDramas, getBases, getProducts, testConnection, getLiveStreams, getFeedbacks, getCourseRegistrations, getUsers } from '../services/cmsService';
import { HOME_CATEGORIES, HOT_DRAMAS, BASES, MALL_PRODUCTS } from '../constants';

interface CMSContextType {
  pages: { [key: string]: any };
  dramas: any[];
  bases: any[];
  products: any[];
  liveStreams: any[];
  feedbacks: any[];
  courseRegistrations: any[];
  users: any[];
  loading: boolean;
  refresh: () => void;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export function CMSProvider({ children }: { children: React.ReactNode }) {
  const [pages, setPages] = useState<{ [key: string]: any }>({});
  const [dramas, setDramas] = useState<any[]>(HOT_DRAMAS);
  const [bases, setBases] = useState<any[]>(BASES);
  const [products, setProducts] = useState<any[]>(MALL_PRODUCTS);
  const [liveStreams, setLiveStreams] = useState<any[]>(HOT_DRAMAS);
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [courseRegistrations, setCourseRegistrations] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      await testConnection();
      
      const [
        homeContent, copyrightContent, productionContent, actorsContent,
        mallContent, settingsContent, tourismContent, investContent, starclubContent, newsContent,
        dbDramas, dbBases, dbProducts, dbLiveStreams, dbFeedbacks, dbCourseRegistrations, dbUsers
      ] = await Promise.all([
        getPageContent('home'), getPageContent('copyright'), getPageContent('production'), getPageContent('actors'),
        getPageContent('mall'), getPageContent('settings'), getPageContent('tourism'), getPageContent('invest'), getPageContent('starclub'), getPageContent('news'),
        getDramas(), getBases(), getProducts(), getLiveStreams(), getFeedbacks(), getCourseRegistrations(), getUsers()
      ]);

      setPages({
        home: homeContent || { banners: [], categories: HOME_CATEGORIES },
        copyright: copyrightContent || {},
        production: productionContent || {},
        actors: actorsContent || {},
        mall: mallContent || {},
        settings: settingsContent || { logo: '' },
        tourism: tourismContent || {},
        invest: investContent || {},
        starclub: starclubContent || {},
        news: newsContent || {}
      });

      if (dbDramas !== null) setDramas(dbDramas.length > 0 ? dbDramas : []);
      if (dbBases !== null) setBases(dbBases.length > 0 ? dbBases : []);
      if (dbProducts !== null) setProducts(dbProducts.length > 0 ? dbProducts : []);
      if (dbLiveStreams !== null) setLiveStreams(dbLiveStreams.length > 0 ? dbLiveStreams : []);
      if (dbFeedbacks !== null) setFeedbacks(dbFeedbacks);
      if (dbCourseRegistrations !== null) setCourseRegistrations(dbCourseRegistrations);
      if (dbUsers !== null) setUsers(dbUsers);

    } catch (error) {
      console.error("Failed to fetch CMS content", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <CMSContext.Provider value={{ pages, dramas, bases, products, liveStreams, feedbacks, courseRegistrations, users, loading, refresh: fetchData }}>
      {children}
    </CMSContext.Provider>
  );
}

export function useCMS() {
  const context = useContext(CMSContext);
  if (context === undefined) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
}
