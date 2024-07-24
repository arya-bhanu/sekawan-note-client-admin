import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBook } from '../helper/queries';
import { FormEvent, useRef } from 'react';

const ModalAddBook = () => {
	const modalRef = useRef(null);
	const formRef = useRef(null);
	const queryClient = useQueryClient();
	const { mutateAsync } = useMutation({
		mutationFn: createBook,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['books'] }),
	});
	const handleSubmitNewBook = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const data = {
			description: formData.get('description') as string,
			title: formData.get('title') as string,
			imgUrl: formData.get('img_url') as string,
		};
		console.log(data);
		try {
			const response = await mutateAsync(data);
			console.log(response);
			if (modalRef.current && formRef.current) {
				(modalRef.current as HTMLLabelElement).click();
				(formRef.current as HTMLFormElement).reset();
			}
		} catch (err) {
			console.error(err);
		}
	};
	return (
		<div>
			<input
				type='checkbox'
				id='modal-new'
				className='modal-toggle'
			/>
			<div
				className='modal'
				role='dialog'
			>
				<div className='modal-box'>
					<form
						ref={formRef}
						onSubmit={handleSubmitNewBook}
						className='flex flex-col  items-center gap-5'
					>
						<input
							required
							name='title'
							id='title'
							type='text'
							placeholder='Type the book title here'
							className='input input-bordered w-full'
						/>
						<input
							required
							name='img_url'
							id='img_url'
							type='text'
							placeholder='Insert image url'
							className='input input-bordered w-full'
						/>
						<textarea
							name='description'
							required
							id='description'
							rows={5}
							className='textarea textarea-bordered w-full'
							placeholder='Book description'
						></textarea>
						<button className='btn btn-primary block w-fit ml-auto'>
							Add book
						</button>
					</form>
				</div>
				<label
					ref={modalRef}
					className='modal-backdrop'
					htmlFor='modal-new'
				>
					Close
				</label>
			</div>
		</div>
	);
};

export default ModalAddBook;
