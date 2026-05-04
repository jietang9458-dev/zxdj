import React, { createContext, useContext, useState, useEffect } from 'react';
import { getPageContent, getDramas, getBases, getProducts, testConnection } from '../services/cmsService';
import { HOME_CATEGORIES, HOT_DRAMAS, BASES, MALL_PRODUCTS } from '../constants';

interface CMSContextType {
  pages: { [key: string]: any };
  dramas: any[];
  bases: any[];
  products: any[];
  loading: boolean;
  refresh: () => void;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export function CMSProvider({ children }: { children: React.ReactNode }) {
  const [pages, setPages] = useState<{ [key: string]: any }>({});
  const [dramas, setDramas] = useState<any[]>(HOT_DRAMAS);
  const [bases, setBases] = useState<any[]>(BASES);
  const [products, setProducts] = useState<any[]>(MALL_PRODUCTS);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      await testConnection();
      
      const homeContent = await getPageContent('home');
      const copyrightContent = await getPageContent('copyright');
      const productionContent = await getPageContent('production');
      const actorsContent = await getPageContent('actors');
      const mallContent = await getPageContent('mall');
      const settingsContent = await getPageContent('settings');
      const tourismContent = await getPageContent('tourism');
      const investContent = await getPageContent('invest');
      const starclubContent = await getPageContent('starclub');

      const dbDramas = await getDramas();
      const dbBases = await getBases();
      const dbProducts = await getProducts();

      setPages({
        home: homeContent || { banners: [], categories: HOME_CATEGORIES },
        copyright: copyrightContent || {},
        production: productionContent || {},
        actors: actorsContent || {},
        mall: mallContent || {},
        settings: settingsContent || { logo: '' },
        tourism: tourismContent || {},
        invest: investContent || {},
        starclub: starclubContent || {}
      });

      if (dbDramas && dbDramas.length > 0) setDramas(dbDramas);
      if (dbBases && dbBases.length > 0) setBases(dbBases);
      if (dbProducts && dbProducts.length > 0) setProducts(dbProducts);

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
    <CMSContext.Provider value={{ pages, dramas, bases, products, loading, refresh: fetchData }}>
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
