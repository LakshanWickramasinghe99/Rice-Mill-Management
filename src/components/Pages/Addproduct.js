import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Grid, CircularProgress } from '@mui/material';
import axios from 'axios';

const AddProductForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        image: ''
    });

    const [existingTitles, setExistingTitles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [fetchingTitles, setFetchingTitles] = useState(false);

    useEffect(() => {
        const fetchTitles = async () => {
            setFetchingTitles(true);
            setError('');
            try {
                const response = await axios.get('http://localhost:5000/products');
                const titles = response.data.data.map(product => product.title);
                setExistingTitles(titles);
            } catch (err) {
                console.error('Error fetching titles:', err);
                setError('Error fetching existing product titles. Please try again later.');
            } finally {
                setFetchingTitles(false);
            }
        };

        fetchTitles();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (existingTitles.includes(formData.title)) {
            window.alert('Product with this title already exists. Please choose a different title.');
            return;
        }

        setLoading(true);
        setError('');
        try {
            const response = await axios.post('http://localhost:5000/products', formData);
            console.log(response.data);
            window.alert('Product added successfully!');
            setFormData({
                title: '',
                description: '',
                price: '',
                image: ''
            });
            setExistingTitles([...existingTitles, formData.title]);
        } catch (err) {
            console.error('Error:', err);
            setError('Error adding product. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>Add New Product</Typography>
            {fetchingTitles ? (
                <CircularProgress />
            ) : (
                <>
                    {error && <Typography color="error">{error}</Typography>}
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                    disabled={loading}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                    multiline
                                    disabled={loading}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Price"
                                    name="price"
                                    type="number"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                    disabled={loading}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Image URL"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleChange}
                                    required
                                    disabled={loading}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    disabled={loading}
                                >
                                    {loading ? 'Adding...' : 'Add Product'}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </>
            )}
        </Container>
    );
};

export default AddProductForm;
