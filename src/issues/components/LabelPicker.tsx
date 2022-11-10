import { useQuery } from '@tanstack/react-query';

const getLabels = async () => {
	const response = await fetch('https://api.github.com/repos/facebook/react/labels');
	return await response.json();
};

export const LabelPicker = () => {
	const labelsQuery = useQuery(['labels'], getLabels);

	return (
		<div>
			<span
				className='badge rounded-pill m-1 label-picker'
				style={{ border: `1px solid #ffccd3`, color: '#ffccd3' }}
			>
				Primary
			</span>
		</div>
	);
};
