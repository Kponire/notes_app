"use client"
import { useState, useEffect } from 'react';
import { Text, Loader, Box, Modal, TextInput, Button } from '@mantine/core';
import NoteList from '@/components/NoteList';
import SearchBar from '@/components/SearchBar';
import AddNoteModal from '@/components/AddNoteModal';
import NoteTabs from '@/components/NoteTabs';
import NoNotesImage from '@/components/NoNotesImage';
import styles from '@/styles/Notes.module.css';
import axios from 'axios';
import Sidebar from '@/components/Sidebar';
import CategoryList from '@/components/CategoryList';

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [loading, setLoading] = useState(true); //true
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([{ id: null, name: 'All' }]);
  const [activeCategory, setActiveCategory] = useState('Notes');
  const [activeTab, setActiveTab] = useState('All');
  const [newCategoryName, setNewCategoryName] = useState('');
  const [update, setUpdate] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      const token = localStorage.getItem('token');
      //let endpoint = '/notes';
      let selectedCategory;
      categories.forEach((category) => {
        if (category.name === activeTab) {
          //console.log('yeee');
          selectedCategory = category.id;
        }
      });
      let endpoint = activeCategory === 'Notes' && activeTab === 'All' ? '/notes' : `/notes?category=${selectedCategory}`
      //console.log(endpoint);
      if (activeCategory === 'Reminders') {
        if (activeTab === 'All') endpoint = '/reminders';
        else `/reminders?category=${selectedCategory}`;
      } else if (activeCategory === 'Archive') {
        if (activeTab === 'All') endpoint = '/archive';
        else `/archive?category=${selectedCategory}`;
      } else if (activeCategory === 'Trash') {
        if (activeTab === 'All') endpoint = '/trash';
        else `/trash?category=${selectedCategory}`;
      }
      const response = await axios.get(`http://localhost:5000/api${endpoint}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      //console.log("response is", response.data);
      filterNotes(response.data);
      setLoading(false);
      //setFilteredNotes(response.data);
    };

    fetchNotes();
    fetchCategories();
    console.log(update);
  }, [activeCategory, activeTab, update]);

  useEffect(() => {
    // Filter notes based on search query
    let filtered = notes?.filter((note) =>
      note?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase())
    );
    setFilteredNotes(filtered);
  }, [searchQuery]);

  const fetchCategories = async () => {
    const token = localStorage.getItem('token');
    const { data } = await axios.get('http://localhost:5000/api/categories', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setCategories([{ id: null, name: 'All' }, ...data]);
    //console.log(categories);
  };

  // Filtering notes based on category and pinned status
  const filterNotes = (notesData) => {
    let filtered = notesData;
    if (activeCategory === 'Reminders') {
      filtered = notesData.filter(note => note.reminder === 1);
    } else if (activeCategory === 'Archive') {
      filtered = notesData.filter(note => note.archived === 1);
    } else if (activeCategory === 'Trash') {
      filtered = notesData.filter(note => note.trash === 1);
    } else if (activeCategory === 'Notes') {
      filtered = notesData.filter(note => note.trash === 0 && note.archived === 0);
    }
    filtered = filtered.sort((a, b) => b.pinned - a.pinned);
    //console.log(activeCategory, filtered);
    setNotes(filtered);
    setFilteredNotes(filtered);
  };

  const handleCreateCategory = async () => {
    const token = localStorage.getItem('token');
    await axios.post('http://localhost:5000/api/categories', { name: newCategoryName }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setModalOpen(false);
    fetchCategories();
  };

  // Add a new note
  const handleAddNote = async (noteData) => {
    const token = localStorage.getItem('token');
    const response = await axios.post('http://localhost:5000/api/notes', noteData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setNotes([...notes, response.data]);
  };

  // Edit an existing note
  const handleEditNote = async (noteData) => {
    const token = localStorage.getItem('token');
    const response = await axios.put(`http://localhost:5000/api/notes/${noteData.id}`, noteData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setNotes(notes.map((note) => (note.id === noteData.id ? response.data : note)));
    setUpdate(!update);
  };

  // Delete a note
  const handleDeleteNote = async (id, isPermanentDelete) => {
    const token = localStorage.getItem('token');
    if (isPermanentDelete) {      
      await axios.delete(`http://localhost:5000/api/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotes(notes.filter((note) => note.id !== id));
      setUpdate(!update);
    } else {
      await axios.put(`http://localhost:5000/api/trash/${id}`, { is_trash: true }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotes(notes.map((note) => (note.id === id ? { ...note, trash: true } : note)));
      setUpdate(!update);
    }
  };

  // Pin or unpin a note
  const handlePinNote = async (id, isPinned) => {
    //console.log('good to go');
    const token = localStorage.getItem('token');
    await axios.put(`http://localhost:5000/api/pinned/${id}`, { is_pinned: isPinned }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setNotes(notes.map((note) => (note.id === id ? { ...note, pinned: isPinned } : note)));
    setUpdate(!update);
  };

  // Archive or unarchive a note
  const handleArchiveNote = async (id, isArchived) => {
    const token = localStorage.getItem('token');
    await axios.put(`http://localhost:5000/api/archive/${id}`, { is_archived: isArchived }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setNotes(notes.map((note) => (note.id === id ? { ...note, archived: isArchived } : note)));
    setUpdate(!update);
  };

  // Set or unset reminder for a note
  const handleReminderNote = async (id, isReminderSet) => {
    const token = localStorage.getItem('token');
    await axios.put(`http://localhost:5000/api/reminders/${id}`, { is_reminder_set: isReminderSet }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setNotes(notes.map((note) => (note.id === id ? { ...note, is_reminder_set: isReminderSet } : note)));
  };


  return (
    <>
    <Box className={styles.notesContainer}>
     {/*  <div className={styles.header}>
        <Text className={styles.title}>Your Notes</Text>
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <AddNoteModal onSubmit={handleAddNote} />
      </div>

      <NoteTabs
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      /> */}
      <Sidebar activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
      {activeCategory === "Category" ? (
          <CategoryList />
      ) : (
        <>
        <Box className={styles.box}>
        <div className={styles.header}>
          <Text className={styles.title}>Your Notes</Text>
          <Box className={styles.headerRight}>
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <AddNoteModal text={'Add Note'} onSubmit={handleAddNote} categories={categories} />
          {/* Create Category Modal */}
          <Button bg={'teal'} onClick={() => setModalOpen(true)} className={styles.addButton}>+ Add Category</Button>
          <Modal opened={isModalOpen} onClose={() => setModalOpen(false)} title="Create New Category">
            <TextInput
              label="Category Name"
              placeholder="Enter category name"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              mb={'10px'}
            />
            <Button bg={'teal'} onClick={handleCreateCategory} fullWidth>
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
          <NoteList 
            notes={filteredNotes} 
            onEdit={handleEditNote} 
            onDelete={handleDeleteNote}
            onPin={handlePinNote}
            onArchive={handleArchiveNote} 
            onReminder={handleReminderNote}
            categories={categories}
          />
        ) : (
          <NoNotesImage />
        )}
        </Box>
        </>
      )}
    </Box>
    </>
  );
};

export default NotesPage;
