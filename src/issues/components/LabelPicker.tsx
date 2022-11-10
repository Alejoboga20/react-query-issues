import { FC } from 'react';
import { useLabels } from '../../hooks/useLabels';
import { LoadingIcon } from '../../shared/components/LoadingIcon';

export const LabelPicker: FC<LabelPickerProps> = ({ selectedLabels, onChange }) => {
	const labelsQuery = useLabels();

	if (labelsQuery.isLoading) return <LoadingIcon />;

	return (
		<div>
			{labelsQuery.data?.map(({ id, color, name }) => (
				<span
					key={id}
					className={`badge rounded-pill m-1 label-picker ${
						selectedLabels.includes(name) ? 'label--active' : ''
					}`}
					style={{ border: `1px solid #${color}`, color: `#${color}` }}
					onClick={() => onChange(name)}
				>
					{name}
				</span>
			))}
		</div>
	);
};

interface LabelPickerProps {
	selectedLabels: string[];
	onChange: (labelName: string) => void;
}
