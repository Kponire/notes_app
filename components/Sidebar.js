"use client";
import { useState, useEffect } from "react";
import { FaLightbulb, FaBell, FaEdit, FaArchive, FaTrash, FaSignOutAlt } from "react-icons/fa";
import styles from "@/styles/Sidebar.module.css";
import { useRouter } from "next/navigation";
import { Text, Button, Box } from "@mantine/core";
import axios from "axios";

const Sidebar = ({ activeCategory, setActiveCategory }) => {
  const [user, setUser] = useState({ username: "", email: "" });
  const router = useRouter();

  // Fetch user data from backend (you can adjust the endpoint as necessary)
  useEffect(() => {
    console.log('lalaa');
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response.data);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUser();
  }, [activeCategory]);

  // Handle sign out
  const handleSignOut = () => {
    localStorage.removeItem("token");
    router.push("/"); // Redirect to the home/index page
  };

  const handleNavigation = (category) => {
    setActiveCategory(category);
  };

  return (
    <div className={styles.sidebar}>
      <Text className={styles.notemaster}> NoteMaster </Text>
      <ul>
        <li 
          className={activeCategory === "Notes" ? styles.active : ""} 
          onClick={() => handleNavigation("Notes")}
        >
          <FaLightbulb /> Notes
        </li>
        <li 
          className={activeCategory === "Reminders" ? styles.active : ""} 
          onClick={() => handleNavigation("Reminders")}
        >
          <FaBell /> Reminders
        </li>
        <li 
          className={activeCategory === "Category" ? styles.active : ""} 
          onClick={() => handleNavigation("Category")}
        >
          <FaEdit /> Edit Categories
        </li>
        <li 
          className={activeCategory === "Archive" ? styles.active : ""} 
          onClick={() => handleNavigation("Archive")}
        >
          <FaArchive /> Archive
        </li>
        <li 
          className={activeCategory === "Trash" ? styles.active : ""} 
          onClick={() => handleNavigation("Trash")}
        >
          <FaTrash /> Trash
        </li>
      </ul>

      {/* User info and sign-out at the bottom */}
      <Box className={styles.userSection}>
        <Text size="sm" weight={500}>
          {user.username}
        </Text>
        <Text size="xs" color="dimmed">
          {user.email}
        </Text>
        <Button
          variant="subtle"
          size="xs"
          leftSection={<FaSignOutAlt />}
          onClick={handleSignOut}
          className={styles.signOutButton}
        >
          Sign Out
        </Button>
      </Box>
    </div>
  );
};

export default Sidebar;
