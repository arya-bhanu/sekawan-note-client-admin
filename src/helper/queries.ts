import { axiosConfig } from '../config/axios.config';
import { IBook } from '../App';
export const getBooks = async () => {
	const response = await axiosConfig.get('/admin/books');
	return response;
};

export const createBook = async (data: IBook | null) => {
	if (data) {
		const response = await axiosConfig.post('/admin/create-book', data);
		return response;
	}
	return null;
};

export const deleteBook = async (id?: number) => {
	if (id) {
		const response = await axiosConfig.delete('/admin/delete-book/' + id);
		return response;
	}
};

export const editBook = async (data: IBook) => {
	const { id, ...payload } = data;
	if (id) {
		const response = await axiosConfig.put('/admin/update-book/' + id, payload);
		return response;
	}
};
