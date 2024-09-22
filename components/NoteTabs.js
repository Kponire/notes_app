"use client"
import { Tabs } from '@mantine/core';
import styles from '../styles/NoteTabs.module.css';

const NoteTabs = ({ categories, activeCategory, setActiveCategory }) => {
  return (
    <Tabs value={activeCategory} onTabChange={setActiveCategory}>
      <Tabs.List>
        {categories.map((category) => (
          <Tabs.Tab key={category} value={category}>
            {category}
          </Tabs.Tab>
        ))}
      </Tabs.List>
    </Tabs>
  );
};

export default NoteTabs;
