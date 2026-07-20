const fs = require('fs');
let code = fs.readFileSync('src/pages/UserSubPages.tsx', 'utf-8');

code = `import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import { User, ChevronRight, Shield, Bell, Trash2, Moon, Sun, Wallet, Star, Clock, HelpCircle, MessageSquare, Send, Film, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';\n` + code;

fs.writeFileSync('src/pages/UserSubPages.tsx', code);
