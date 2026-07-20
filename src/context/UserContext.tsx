import React, { createContext, useContext, useState, useEffect } from 'react';

export interface AppNotification {
  id: string;
  title: string;
  content: string;
  read: boolean;
  timestamp: number;
}

interface UserProfile {
  nickname: string;
  gender: string;
  bio: string;
  avatar: string;
  uid: string;
  reservations?: { id: string; title: string; liveTime?: string }[];
}

interface UserContextType {
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
  notifications: AppNotification[];
  addNotification: (notification: Omit<AppNotification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('user_profile');
    
    // Read from URL parameters (passed from WeChat Mini Program)
    const urlParams = new URLSearchParams(window.location.search);
    const urlNickname = urlParams.get('nickname');
    const urlAvatar = urlParams.get('avatar');

    if (saved) {
      const parsedSaved = JSON.parse(saved);
      // Overwrite with URL params if present (e.g. first time from WeChat or updated)
      if (urlNickname) parsedSaved.nickname = urlNickname;
      if (urlAvatar) parsedSaved.avatar = urlAvatar;
      return parsedSaved;
    }
    
    return {
      nickname: urlNickname || '星友_9527',
      gender: '男',
      bio: '生活不仅有短剧，还有诗和远方',
      avatar: urlAvatar || 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop',
      uid: '88886666'
    };
  });

  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const saved = localStorage.getItem('user_notifications');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('user_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('user_notifications', JSON.stringify(notifications));
  }, [notifications]);

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  const addNotification = (notification: Omit<AppNotification, 'id' | 'timestamp' | 'read'>) => {
    setNotifications(prev => [{
      ...notification,
      id: Date.now().toString(),
      timestamp: Date.now(),
      read: false
    }, ...prev]);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <UserContext.Provider value={{ profile, updateProfile, notifications, addNotification, markAsRead }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within UserProvider');
  return context;
}
