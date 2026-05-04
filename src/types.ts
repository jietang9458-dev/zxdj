/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface NavItem {
  label: string;
  id: string;
  icon: string;
  path: string;
}

export interface ShortDrama {
  id: string;
  title: string;
  imageUrl: string;
  tag?: string;
}

export interface CategoryItem {
  id: string;
  label: string;
  iconUrl: string;
  path: string;
}

export interface BaseItem {
  id: string;
  title: string;
  location: string;
  imageUrl: string;
  tags: string[];
}

export interface ActivityItem {
  id: string;
  title: string;
  date: string;
  location: string;
  imageUrl: string;
}
