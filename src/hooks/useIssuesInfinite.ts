import { useInfiniteQuery } from '@tanstack/react-query';
import { githubApi } from '../api/githubApi';
import { Issue, State } from '../interface/issue';

interface Args {
	state?: State;
	labels: string[];
	page?: number;
}

interface QueryArgs {
	pageParam?: number;
	queryKey: (string | Args)[];
}

const getIssues = async ({ queryKey }: QueryArgs): Promise<Issue[]> => {
	const [, , args] = queryKey;
	const { state, labels } = args as Args;
	const params = new URLSearchParams();

	if (state) params.append('state', state);

	if (labels.length > 0) {
		const labelString = labels.join(',');
		params.append('labels', labelString);
	}

	params.append('per_page', '5');

	const { data } = await githubApi.get<Issue[]>('/issues', { params });

	return data;
};

export const useIssuesInfinite = ({ state, labels }: Args) => {
	const issuesQuery = useInfiniteQuery(
		['issues', 'infinite', { state, labels }],
		(data) => getIssues(data),
		{
			getNextPageParam: (lastPage, pages) => {
				if (lastPage.length === 0) return;
				return pages.length + 1;
			},
		}
	);

	return {
		issuesQuery,
	};
};
