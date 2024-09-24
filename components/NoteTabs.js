"use client"
import { Tabs } from '@mantine/core';
import styles from '../styles/NoteTabs.module.css';

const NoteTabs = ({ categories, activeTab, setActiveTab }) => {
  return (
    <Tabs classNames={{tab: styles.tab}} value={activeTab} onChange={setActiveTab}>
      <Tabs.List>
        {categories?.map((category) => (
          <Tabs.Tab key={category.id} value={category.name}>
            {category.name}
          </Tabs.Tab>
        ))}
      </Tabs.List>
    </Tabs>
  );
};

export default NoteTabs;
