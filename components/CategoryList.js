import { useState, useEffect } from 'react';
import { Table, Button, Modal, TextInput, Text, Box } from '@mantine/core';
//import { IconEdit } from '@tabler/icons-react'; // You can replace this with React Icons
import { TiEdit } from "react-icons/ti";
import axios from 'axios';
import styles from '../styles/CategoryList.module.css';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [editModalOpened, setEditModalOpened] = useState(false);
  const [editCategory, setEditCategory] = useState({ id: '', name: '' });
  const [newCategoryName, setNewCategoryName] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/categories', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleEditClick = (category) => {
    setEditCategory(category);
    setNewCategoryName(category.name);
    setEditModalOpened(true);
    console.log(editCategory, newCategoryName);
  };

  const handleEditCategory = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.put('http://localhost:5000/api/categories', { id: editCategory.id, name: newCategoryName }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      //await axios.put('/api/categories', { id: editCategory.id, name: newCategoryName });
      setEditModalOpened(false);
      fetchCategories(); // Refresh categories after update
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  const rows = categories.map((category) => (
    <Table.Tr key={category.id}>
      <Table.Td c={'teal'}>{category.name}</Table.Td>
      <Table.Td>
        <Button
          onClick={() => handleEditClick(category)}
          variant="outline"
          color="teal"
          leftSection={<TiEdit size={16} />}
        >
          Edit
        </Button>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Box className={styles.category}>
        <Text className={styles.categoryTitle}> Category List </Text>
        <Table className={styles.categoryTable}>
            <Table.Thead>
            <Table.Tr>
                <Table.Th c={'teal'}>Category Name</Table.Th>
                <Table.Th c={'teal'}>Actions</Table.Th>
            </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Box>
      <Modal
        opened={editModalOpened}
        onClose={() => setEditModalOpened(false)}
        title="Edit Category"
      >
        <TextInput
          label="Category Name"
          placeholder="Enter new category name"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
        />
        <Button
          onClick={handleEditCategory}
          fullWidth
          mt="md"
        >
          Update Category
        </Button>
      </Modal>
    </>
  );
};

export default CategoryList;
