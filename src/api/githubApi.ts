import axios from 'axios';

export const githubApi = axios.create({
	baseURL: 'https://api.github.com/repos/facebook/react',
	headers: {
		Authorization:
			'Bearer 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',
	},
});
