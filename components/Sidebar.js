"use client";
import { useState, useEffect } from "react";
import { FaLightbulb, FaBell, FaEdit, FaArchive, FaTrash, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import styles from "@/styles/Sidebar.module.css";
import { useRouter } from "next/navigation";
import { Text, Button, Box } from "@mantine/core";
import axios from "axios";
import { showNotification } from "@mantine/notifications";

const Sidebar = ({ activeCategory, setActiveCategory }) => {
  const [user, setUser] = useState({ username: "", email: "" });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }
      try {
        const response = await axios.get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        if (error.response && error.response.status === 401) {
          showNotification({
            title: "Session Expired",
            message: "Please log in again.",
            color: "red",
          });
          localStorage.removeItem("token");
          router.push("/login");
        } else {
          showNotification({
            title: "Error",
            message: "Failed to fetch user data.",
            color: "red",
          });
        }
      }
    };
    fetchUser();
  }, [activeCategory]);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  const handleNavigation = (category) => {
    setActiveCategory(category);
    setIsSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <>
    {/* Mobile toggle button */}
    <button className={styles.mobileToggle} onClick={toggleSidebar}>
        {isSidebarOpen ? <FaTimes /> : <FaBars />}
    </button>
    {/* Sidebar content */}
    <div className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ""}`}>
      <div
          className={styles.sidebarContent}
          onClick={(e) => e.stopPropagation()}
      >
      <Box>  
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
      </Box>

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
    </div>
    </>
  );
};

export default Sidebar;
