import { useQuery } from '@tanstack/react-query';
import { githubApi } from '../api/githubApi';
import { sleep } from '../helpers/sleep';
import { Label } from '../interface/label';

const getLabels = async (): Promise<Label[]> => {
	await sleep(2);
	const { data } = await githubApi.get<Label[]>('/labels', { headers: { Authorization: null } });
	return data;
};

export const useLabels = () => {
	const labelsQuery = useQuery(['labels'], getLabels, {
		staleTime: 1000 * 60 * 60,
		placeholderData: [
			{
				id: 710573595,
				node_id: 'MDU6TGFiZWw3MTA1NzM1OTU=',
				url: 'https://api.github.com/repos/facebook/react/labels/Component:%20Developer%20Tools',
				name: 'Component: Developer Tools',
				color: 'fbca04',
				default: false,
			},
			{
				id: 127893911,
				node_id: 'MDU6TGFiZWwxMjc4OTM5MTE=',
				url: 'https://api.github.com/repos/facebook/react/labels/Component:%20DOM',
				name: 'Component: DOM',
				color: 'fef2c0',
				default: false,
			},
		],
	});

	return labelsQuery;
};
