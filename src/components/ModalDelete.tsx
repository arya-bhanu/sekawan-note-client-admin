import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBook } from '../helper/queries';
import { useRef } from 'react';

const ModalDelete = ({ id }: { id: number | undefined }) => {
	const queryClient = useQueryClient();
	const labelRef = useRef(null);
	const { mutateAsync } = useMutation({
		mutationFn: deleteBook,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['books'] }),
	});
	const handleDelete = async () => {
		try {
			await mutateAsync(id);
			if (labelRef.current) {
				(labelRef.current as HTMLLabelElement).click();
			}
		} catch (err) {
			console.error(err);
		}
	};
	return (
		<div>
			<input
				type='checkbox'
				id='modal-delete'
				className='modal-toggle'
			/>
			<div
				className='modal'
				role='dialog'
			>
				<div className='modal-box'>
					<p className='text-xl'>Are you sure wanted to delete this row?</p>
					<button
						onClick={handleDelete}
						className='btn btn-warning mt-5 w-fit block ml-auto'
					>
						Delete
					</button>
				</div>
				<label
					ref={labelRef}
					className='modal-backdrop'
					htmlFor='modal-delete'
				>
					Close
				</label>
			</div>
		</div>
	);
};

export default ModalDelete;
