import React, { createContext, useContext, useState, useEffect } from 'react';
import { getPageContent, getDramas, getBases, getProducts, testConnection, getLiveStreams, getFeedbacks, getCourseRegistrations, getUsers, getVisitBookings, addVisitBooking } from '../services/cmsService';
import { HOME_CATEGORIES, HOT_DRAMAS, BASES, MALL_PRODUCTS } from '../constants';

interface CMSContextType {
  pages: { [key: string]: any };
  dramas: any[];
  bases: any[];
  products: any[];
  liveStreams: any[];
  feedbacks: any[];
  courseRegistrations: any[];
  visitBookings: any[];
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
  const [visitBookings, setVisitBookings] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      await testConnection();
      
      const [
        homeContent, copyrightContent, productionContent, actorsContent,
        mallContent, settingsContent, tourismContent, investContent, starclubContent, newsContent, documentsContent,
        dbDramas, dbBases, dbProducts, dbLiveStreams, dbFeedbacks, dbCourseRegistrations, dbUsers, dbVisitBookings
      ] = await Promise.all([
        getPageContent('home'), getPageContent('copyright'), getPageContent('production'), getPageContent('actors'),
        getPageContent('mall'), getPageContent('settings'), getPageContent('tourism'), getPageContent('invest'), getPageContent('starclub'), getPageContent('news'), getPageContent('documents'),
        getDramas(), getBases(), getProducts(), getLiveStreams(), getFeedbacks(), getCourseRegistrations(), getUsers(), getVisitBookings()
      ]);

      setPages({
        home: homeContent || { banners: [], categories: HOME_CATEGORIES },
        copyright: copyrightContent || {},
        production: productionContent || {},
        actors: actorsContent || {},
        mall: mallContent || {},
        settings: settingsContent || {
          logo: '/logo_main.png',
          appName: '中星影视生态链',
          slogan: '联动你我 · 链接未来',
          welcomeNavTitle: '中星影视生态链',
          welcomeTitle: '中星影视生态链',
          splashType: 'video',
          splashUrl: '/uploads/splash_ad.mp4',
          splashPoster: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=1080&h=1920&fit=crop'
        },
        tourism: tourismContent || {},
        invest: investContent || {},
        starclub: starclubContent || {},
        news: (newsContent && Object.keys(newsContent).length > 0) ? newsContent : {
          shortDramaNews: [
            { title: "短剧版权保护进入新阶段：AI技术赋能监测", desc: "法务观察", imageUrl: "https://images.unsplash.com/photo-1589252392322-450144a11b05?w=400", isRecommended: true }
          ],
          ecosystemNews: [
            { title: "中星影视生态链战略发布会圆满成功", desc: "官方小助手", imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400", isRecommended: true },
            { title: "如何高效完成短剧拍摄？资深导演经验分享", desc: "影人周刊", imageUrl: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=400", isRecommended: true }
          ],
          bts: [
            { title: "新兴短剧演员招募计划正式启动！", desc: "演员孵化中心", imageUrl: "https://images.unsplash.com/photo-1543533966-70e9f09280a6?w=400", isRecommended: true },
            { title: "片场花絮：为了一个镜头重拍30次背后的故事", desc: "幕后人", imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400", isRecommended: true }
          ],
          successCases: [
            { title: "《总裁的秘密》斩获年度最具潜力短剧奖", desc: "成功案例库", imageUrl: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400", isRecommended: true }
          ]
        },
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
      if (dbVisitBookings !== null) setVisitBookings(dbVisitBookings);
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
    <CMSContext.Provider value={{ pages, dramas, bases, products, liveStreams, feedbacks, courseRegistrations, visitBookings, users, loading, refresh: fetchData }}>
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
