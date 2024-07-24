import { FormEvent, useRef } from 'react';
import { IBook } from '../App';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editBook } from '../helper/queries';

const ModalEditBook = (data: IBook) => {
	const labelRef = useRef(null);
	const formRef = useRef(null);
	const queryClient = useQueryClient();
	const { mutateAsync } = useMutation({
		mutationFn: editBook,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['books'] }),
	});
	const handleSubmitNewBook = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const formdata = {
			description: formData.get('description') as string,
			title: formData.get('title') as string,
			imgUrl: formData.get('img_url') as string,
		};
		console.log(data);
		try {
			const response = await mutateAsync({ id: data.id, ...formdata });
			console.log(response);
			if (labelRef.current && formRef.current) {
				(labelRef.current as HTMLLabelElement).click();
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
				id={`modal_edit_${data.id}`}
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
							id='title'
							name='title'
							defaultValue={data.title}
							type='text'
							placeholder='Type the book title here'
							className='input input-bordered w-full'
						/>
						<input
							required
							id='img_url'
							name='img_url'
							defaultValue={data.imgUrl}
							type='text'
							placeholder='Insert image url'
							className='input input-bordered w-full'
						/>
						<textarea
							required
							id='description'
							name='description'
							defaultValue={data.description}
							rows={5}
							className='textarea textarea-bordered w-full'
							placeholder='Book description'
						></textarea>
						<button className='btn btn-primary block w-fit ml-auto'>
							Edit Book
						</button>
					</form>
				</div>
				<label
					ref={labelRef}
					className='modal-backdrop'
					htmlFor={`modal_edit_${data.id}`}
				>
					Close
				</label>
			</div>
		</div>
	);
};

export default ModalEditBook;
