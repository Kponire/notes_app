"use client";
import { useState, useEffect } from "react";
import {
  Text,
  Loader,
  Box,
  Modal,
  TextInput,
  Button,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import NoteList from "@/components/NoteList";
import SearchBar from "@/components/SearchBar";
import AddNoteModal from "@/components/AddNoteModal";
import NoteTabs from "@/components/NoteTabs";
import NoNotesImage from "@/components/NoNotesImage";
import styles from "@/styles/Notes.module.css";
import Sidebar from "@/components/Sidebar";
import CategoryList from "@/components/CategoryList";
import { DatesProvider, DateTimePicker } from "@mantine/dates";
import { useRouter } from "next/navigation";
import axiosInstance from "@/axiosConfig";

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([{ id: null, name: "All" }]);
  const [activeCategory, setActiveCategory] = useState("Notes");
  const [activeTab, setActiveTab] = useState("All");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [update, setUpdate] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isReminderOpened, setIsReminderOpened] = useState(false);
  const [reminderDateVal, setReminderDateVal] = useState(new Date());
  const [idRem, setIdRem] = useState(null);
  const router = useRouter();

  // Fetch notes and categories
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        setLoading(true);
        await fetchNotes(token);
        await fetchCategories(token);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeCategory, activeTab, update]);

  // Filter notes based on search query
  useEffect(() => {
    const filtered = notes.filter((note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredNotes(filtered);
  }, [searchQuery]);

  // Fetch Notes
  const fetchNotes = async (token) => {
    try {
      let selectedCategory = categories.find(
        (category) => category.name === activeTab
      )?.id;

      let endpoint = "/notes";
      if (activeCategory === "Notes" && activeTab !== "All") {
        endpoint = `/notes?category=${selectedCategory}`;
      } else if (activeCategory === "Reminders") {
        endpoint =
          activeTab === "All"
            ? "/reminders"
            : `/reminders?category=${selectedCategory}`;
      } else if (activeCategory === "Archive") {
        endpoint =
          activeTab === "All"
            ? "/archive"
            : `/archive?category=${selectedCategory}`;
      } else if (activeCategory === "Trash") {
        endpoint =
          activeTab === "All"
            ? "/trash"
            : `/trash?category=${selectedCategory}`;
      }

      const response = await axiosInstance.get(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });

      filterNotes(response.data);
    } catch (error) {
      handleAxiosError(error, "Failed to fetch notes.");
    }
  };

  // Fetch Categories
  const fetchCategories = async (token) => {
    try {
      const { data } = await axiosInstance.get("/categories");
      setCategories([{ id: null, name: "All" }, ...data]);
    } catch (error) {
      handleAxiosError(error, "Failed to fetch categories.");
    }
  };

  // Handle Axios Errors
  const handleAxiosError = (error, defaultMessage) => {
    if (error.response) {
      if (error.response.status === 401) {
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
          message: error.response.data.message || defaultMessage,
          color: "red",
        });
      }
    } else {
      showNotification({
        title: "Error",
        message: defaultMessage,
        color: "red",
      });
    }
  };

  // Filtering notes based on category and pinned status
  const filterNotes = (notesData) => {
    let filtered = notesData;

    if (activeCategory === "Reminders") {
      filtered = notesData.filter((note) => {
        const reminderDate = new Date(note.reminder);
        return reminderDate >= new Date();
      });
    } else if (activeCategory === "Archive") {
      filtered = notesData.filter((note) => note.archived === 1);
    } else if (activeCategory === "Trash") {
      filtered = notesData.filter((note) => note.trash === 1);
    } else if (activeCategory === "Notes") {
      filtered = notesData.filter(
        (note) => note.trash === 0 && note.archived === 0
      );
    }

    filtered = filtered.sort((a, b) => b.pinned - a.pinned);
    setNotes(filtered);
    setFilteredNotes(filtered);
  };

  // Handle Create Category
  const handleCreateCategory = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      await axiosInstance.post("/categories", { name: newCategoryName });
      showNotification({
        title: "Success",
        message: "Category created successfully.",
        color: "green",
      });
      setModalOpen(false);
      setNewCategoryName("");
      setUpdate(!update);
    } catch (error) {
      handleAxiosError(error, "Failed to create category.");
    }
  };

  // Add a new note
  const handleAddNote = async (noteData) => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    try {
      const response = await axiosInstance.post("/notes", noteData);
      showNotification({
        title: "Success",
        message: "Note added successfully.",
        color: "green",
      });
      setNotes([response.data, ...notes]);
      setUpdate(!update);
    } catch (error) {
      handleAxiosError(error, "Failed to add note.");
    }
  };

  // Edit an existing note
  const handleEditNote = async (noteData) => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const response = await axiosInstance.put(`/notes/${noteData.id}`, noteData);
      showNotification({
        title: "Success",
        message: "Note updated successfully.",
        color: "green",
      });
      setNotes(
        notes.map((note) => (note.id === noteData.id ? response.data : note))
      );
      setUpdate(!update);
    } catch (error) {
      handleAxiosError(error, "Failed to update note.");
    }
  };

  // Delete a note
  const handleDeleteNote = async (id, isPermanentDelete, restore) => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      if (isPermanentDelete) {
        await axiosInstance.delete(`/notes/${id}`);
        showNotification({
          title: "Deleted",
          message: "Note permanently deleted.",
          color: "green",
        });
        setNotes(notes.filter((note) => note.id !== id));
      } else {
        await axiosInstance.put(`/trash/${id}`, { is_trash: restore });
        showNotification({
          title: restore ? "Restored" : "Trashed",
          message: restore
            ? "Note restored successfully."
            : "Note moved to trash.",
          color: "green",
        });
        setNotes(
          notes.map((note) =>
            note.id === id
              ? { ...note, trash: restore ? 0 : 1 }
              : note
          )
        );
      }
      setUpdate(!update);
    } catch (error) {
      handleAxiosError(
        error,
        isPermanentDelete
          ? "Failed to delete note."
          : "Failed to move note to trash."
      );
    }
  };

  // Pin or unpin a note
  const handlePinNote = async (id, isPinned) => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      await axiosInstance.put(`/pinned/${id}`, { is_pinned: isPinned });
      showNotification({
        title: isPinned ? "Pinned" : "Unpinned",
        message: isPinned
          ? "Note pinned successfully."
          : "Note unpinned successfully.",
        color: "green",
      });
      setNotes(
        notes.map((note) =>
          note.id === id ? { ...note, pinned: isPinned } : note
        )
      );
      setUpdate(!update);
    } catch (error) {
      handleAxiosError(error, "Failed to update pin status.");
    }
  };

  // Archive or unarchive a note
  const handleArchiveNote = async (id, isArchived) => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      await axiosInstance.put(`/archive/${id}`, { is_archived: isArchived });
      showNotification({
        title: isArchived ? "Archived" : "Unarchived",
        message: isArchived
          ? "Note archived successfully."
          : "Note unarchived successfully.",
        color: "green",
      });
      setNotes(
        notes.map((note) =>
          note.id === id ? { ...note, archived: isArchived } : note
        )
      );
      setUpdate(!update);
    } catch (error) {
      handleAxiosError(error, "Failed to update archive status.");
    }
  };

  const handleReminderVal = (id) => {
    setIsReminderOpened(true);
    setIdRem(id);
  };

  // Set or unset reminder for a note
  const handleReminderNote = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const id = idRem;
    try {
      await axiosInstance.put(`/reminders/${id}`, { is_reminder_set: reminderDateVal });
      showNotification({
        title: "Reminder Set",
        message: "Reminder has been set successfully.",
        color: "green",
      });
      setIsReminderOpened(false);
      setNotes(
        notes.map((note) =>
          note.id === id
            ? { ...note, is_reminder_set: reminderDateVal }
            : note
        )
      );
      setUpdate(!update);
    } catch (error) {
      handleAxiosError(error, "Failed to set reminder.");
    }
  };

  return (
    <>
      <Box className={styles.notesContainer}>
        <Sidebar
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        <Box className={styles.content}>
          {activeCategory === "Category" ? (
            <CategoryList />
          ) : (
            <>
              <Box className={styles.box}>
                <div className={styles.header}>
                  <Text className={styles.title}>Your Notes</Text>
                  <Box className={styles.headerRight}>
                    <SearchBar
                      value={searchQuery}
                      onChange={setSearchQuery}
                    />
                    <AddNoteModal
                      text={"Add Note"}
                      onSubmit={handleAddNote}
                      categories={categories}
                    />
                    {/* Create Category Modal */}
                    <Button
                      bg="teal"
                      onClick={() => setModalOpen(true)}
                      className={styles.addButton}
                    >
                      + Add Category
                    </Button>
                    <Modal
                      opened={isModalOpen}
                      onClose={() => setModalOpen(false)}
                      title="Create New Category"
                      centered
                    >
                      <TextInput
                        label="Category Name"
                        placeholder="Enter category name"
                        value={newCategoryName}
                        onChange={(e) =>
                          setNewCategoryName(e.target.value)
                        }
                        mb="10px"
                      />
                      <Button
                        color="teal"
                        onClick={handleCreateCategory}
                        fullWidth
                      >
                        Create
                      </Button>
                    </Modal>
                  </Box>
                </div>
                <NoteTabs
                  categories={categories}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />
                {loading ? (
                  <Loader className={styles.loader} />
                ) : filteredNotes.length > 0 ? (
                  <>
                    <NoteList
                      notes={filteredNotes}
                      onEdit={handleEditNote}
                      onDelete={handleDeleteNote}
                      onPin={handlePinNote}
                      onArchive={handleArchiveNote}
                      onReminder={handleReminderVal}
                      categories={categories}
                    />
                    <Modal
                      opened={isReminderOpened}
                      onClose={() => setIsReminderOpened(false)}
                      title="Set Reminder"
                      centered
                    >
                      <DatesProvider settings={{ timezone: "UTC" }}>
                        <DateTimePicker
                          clearable
                          minDate={new Date()}
                          value={reminderDateVal}
                          onChange={setReminderDateVal}
                          valueFormat="DD MMM YYYY hh:mm A"
                          label="Pick date and time"
                          placeholder="Pick date and time"
                          mb="md"
                        />
                      </DatesProvider>
                      <Button
                        color="teal"
                        onClick={handleReminderNote}
                        fullWidth
                      >
                        Set Reminder
                      </Button>
                    </Modal>
                  </>
                ) : (
                  <NoNotesImage />
                )}
              </Box>
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default NotesPage;
