import ModalAddBook from './components/ModalAddBook';
import { MdDelete } from 'react-icons/md';
import { MdEdit } from 'react-icons/md';
import { MdImage } from 'react-icons/md';
import ModalEditBook from './components/ModalEditBook';
import ModalDetailImage from './components/ModalDetailImage';
import ModalDelete from './components/ModalDelete';
import { useQuery } from '@tanstack/react-query';
import { getBooks } from './helper/queries';

export interface IBook {
	title: string;
	description: string;
	imgUrl: string;
	id?: number;
}

function App() {
	const { data, error } = useQuery({ queryKey: ['books'], queryFn: getBooks });

	return (
		<main className='flex flex-col items-center'>
			<div className='m-auto text-center'>
				<h1 className='text-4xl font-semibold'>Baca Kita!</h1>
				<h1 className='text-xl'>Welcome, Putu Arya</h1>
			</div>
			<section className='mt-14  w-full'>
				<label
					htmlFor='modal-new'
					className='btn btn-primary'
				>
					Add new book
				</label>
				<ModalAddBook />
				{data && data.data && data.data.length > 0 && !error ? (
					<div className='overflow-x-auto mt-10'>
						<table className='table table-zebra'>
							{/* head */}
							<thead>
								<tr>
									<th>No</th>
									<th>Title</th>
									<th>Description</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{data.data.map((book: IBook, index: number) => {
									return (
										<tr key={book.id}>
											<th>{index + 1}</th>
											<td>{book.title}</td>
											<td>{book.description}</td>
											<td>
												<div className='flex items-center gap-x-2'>
													<label
														htmlFor='modal-delete'
														className='btn'
													>
														<MdDelete size={20} />
													</label>
													<label
														htmlFor={`modal_edit_${book.id}`}
														className='btn'
													>
														<MdEdit size={20} />
													</label>
													<label
														htmlFor={`modal-image-${book.id}`}
														className='btn'
													>
														<MdImage size={20} />
													</label>
												</div>
												<ModalEditBook {...book} />
												<ModalDetailImage
													id={book.id}
													url={book.imgUrl}
												/>
												<ModalDelete id={book.id} />
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				) : (
					<div>
						<h3 className='text-2xl mt-5'>Data is empty</h3>
					</div>
				)}
			</section>
		</main>
	);
}

export default App;
