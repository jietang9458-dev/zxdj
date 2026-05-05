import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Search, Share2, MoreHorizontal, User } from 'lucide-react';
import { motion } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import Layout from './components/Layout';
import Header from './components/Header';
import Home from './pages/Home';
import Copyright from './pages/Copyright';
import BaseList from './pages/BaseList';
import BaseDetail from './pages/BaseDetail';
import Mine from './pages/Mine';
import Mall from './pages/Mall';
import { Production, Actors, Tourism, TourismGroups, FilmingExperience, StarClub, Investment, LiveFilming } from './pages/MiscPages';
import { DramaDetail, ActorDetail, PostDetail, ProductDetail, PrepProjectDetail } from './pages/Details';
import { CopyrightPurchase, SalesModel, CopyrightLibrary, CopyrightPublicity, ServiceFlow, PurchaseInstructions, FullCopyrightInstructions, CopyrightRights, AuditionRegistration, GeneralRegistration, MyRegistrations, LearningArt, AuditionProjectList } from './pages/SubPages';
import MallCategory from './pages/MallSubPages';
import Discover from './pages/Discover';
import { Profile, MyWallet, Favorites, Settings, HelpCenter, MyOrders, MyActivities, AccountSecurity, AboutUs } from './pages/UserSubPages';
import { useNavigate } from 'react-router-dom';

import { ThemeProvider } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';
import { CMSProvider } from './context/CMSContext';
import Admin from './pages/Admin';

export default function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <CMSProvider>
          <Router>
            <Routes>
              <Route path="/admin/*" element={<Admin />} />
              <Route path="*" element={
                <Layout>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/base" element={<BaseList />} />
                    <Route path="/base/:id" element={<BaseDetail />} />
                    <Route path="/discover" element={<Discover />} />
                    <Route path="/mall" element={<Mall />} />
                    <Route path="/mine" element={<Mine />} />
                    <Route path="/copyright" element={<Copyright />} />
                    <Route path="/production" element={<Production />} />
                    <Route path="/production/project/:id" element={<PrepProjectDetail />} />
                    <Route path="/actors" element={<Actors />} />
                    <Route path="/tourism" element={<Tourism />} />
                    <Route path="/tourism/groups" element={<TourismGroups />} />
                    <Route path="/tourism/experience" element={<FilmingExperience />} />
                    <Route path="/live" element={<LiveFilming />} />
                    <Route path="/starclub" element={<StarClub />} />
                    <Route path="/investment" element={<Investment />} />
                    <Route path="/filming" element={<BaseList />} />
                    <Route path="/drama/:id" element={<DramaDetail />} />
                    <Route path="/actor/:name" element={<ActorDetail />} />
                    <Route path="/post/:id" element={<PostDetail />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/mall/:category" element={<MallCategory />} />
                    <Route path="/copyright/purchase" element={<CopyrightPurchase />} />
                    <Route path="/copyright/rights" element={<CopyrightRights />} />
                    <Route path="/copyright/purchase-instructions" element={<PurchaseInstructions />} />
                    <Route path="/copyright/full-purchase-instructions" element={<FullCopyrightInstructions />} />
                    <Route path="/copyright/model" element={<SalesModel />} />
                    <Route path="/copyright/library" element={<CopyrightLibrary />} />
                    <Route path="/copyright/publicity" element={<CopyrightPublicity />} />
                    <Route path="/audition/registration" element={<AuditionRegistration />} />
                    <Route path="/register" element={<GeneralRegistration />} />
                    <Route path="/audition/projects" element={<AuditionProjectList />} />
                    <Route path="/audition/learning" element={<LearningArt />} />
                    <Route path="/service/flow" element={<ServiceFlow />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/wallet" element={<MyWallet />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/help" element={<HelpCenter />} />
                    <Route path="/orders" element={<MyOrders />} />
                    <Route path="/activities" element={<MyActivities />} />
                    <Route path="/user/my-registrations" element={<MyRegistrations />} />
                    <Route path="/settings/security" element={<AccountSecurity />} />
                    <Route path="/settings/about" element={<AboutUs />} />
                  </Routes>
                </Layout>
              } />
            </Routes>
          </Router>
        </CMSProvider>
      </UserProvider>
    </ThemeProvider>
  );
}
