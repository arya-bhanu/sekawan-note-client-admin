const ModalDetailImage = ({ url, id }: { url: string; id?: number }) => {
	console.log(url);
	return (
		<div>
			<input
				type='checkbox'
				id={`modal-image-${id}`}
				className='modal-toggle'
			/>
			<div
				className='modal'
				role='dialog'
			>
				<div className='modal-box'>
					<img
						src={url}
						alt='image url'
					/>
				</div>
				<label
					className='modal-backdrop'
					htmlFor={`modal-image-${id}`}
				>
					Close
				</label>
			</div>
		</div>
	);
};

export default ModalDetailImage;
