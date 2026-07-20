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
        mallContent, settingsContent, tourismContent, investContent, starclubContent, newsContent, documentsContent,
        dbDramas, dbBases, dbProducts, dbLiveStreams, dbFeedbacks, dbCourseRegistrations, dbUsers
      ] = await Promise.all([
        getPageContent('home'), getPageContent('copyright'), getPageContent('production'), getPageContent('actors'),
        getPageContent('mall'), getPageContent('settings'), getPageContent('tourism'), getPageContent('invest'), getPageContent('starclub'), getPageContent('news'), getPageContent('documents'),
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
        news: newsContent || {},
        documents: (documentsContent && Object.keys(documentsContent).length > 0) ? documentsContent : {
          features: "中星影视生态链功能介绍\n\n1. 首页推荐：为您展示最新、最热门的影视短剧资讯和精彩花絮。\n2. 发现板块：汇聚星光动态与短剧推荐，让您随时掌握第一手娱乐信息。\n3. 直播拍戏：实时观看现场拍摄情况，预约未来的拍摄直播，拉近您与剧组的距离。\n4. 影视基地：了解各大影视基地的详细信息，体验文创旅游。\n5. 会员中心：管理您的个人资料，充值星币，查看订单和活动。",
          privacy: "中星影视生态链隐私协议\n\n为了给您提供更好的服务，我们将遵循以下隐私保护原则：\n1. 信息收集：我们仅收集您在注册和使用服务过程中必要的信息（如昵称、头像、联系方式）。\n2. 信息使用：您的信息将仅用于优化产品体验、身份验证以及客服沟通，绝不会在未授权的情况下泄露给任何第三方。\n3. 信息安全：我们采用业界标准的数据加密技术，确保您的个人数据安全。\n4. 用户权利：您随时可以在系统设置中管理您的个人信息，或注销您的账户。",
          terms: "中星影视生态链用户服务协议\n\n欢迎使用中星影视生态链！\n1. 账户注册：用户需提供真实有效的信息进行注册，并对账户下的所有行为负责。\n2. 行为规范：用户在平台发布的内容需遵守国家法律法规，禁止发布色情、暴力或侵权内容。\n3. 服务变更：平台有权在必要时修改服务条款或功能设计，重大变更将通过公告通知。\n4. 知识产权：平台上所有官方提供的内容（包括短剧、图片、文字等）归中星影视生态链所有，未经许可不得私自转载或商业使用。"
        }
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
