import axios from "axios";

const fetchCategories = () => axios.get('/api/categories');

export { fetchCategories };