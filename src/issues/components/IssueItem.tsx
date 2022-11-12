import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { FiInfo, FiMessageSquare, FiCheckCircle } from 'react-icons/fi';
import { Issue, State } from '../../interface/issue';
import { getIssueInfo } from '../../hooks/useIssue';

export const IssueItem = ({ issue }: IssueItemProps) => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const onMouseEnter = () => {
		queryClient.prefetchQuery(['issue', issue.number], () => getIssueInfo(issue.number));
	};

	return (
		<div
			className='card mb-2 issue'
			onClick={() => navigate(`/issues/issue/${issue.number}`)}
			onMouseEnter={onMouseEnter}
		>
			<div className='card-body d-flex align-items-center'>
				{issue.state === State.Open ? (
					<FiInfo size={30} color='red' />
				) : (
					<FiCheckCircle size={30} color='green' />
				)}

				<div className='d-flex flex-column flex-fill px-2'>
					<span>{issue.title}</span>
					<span className='issue-subinfo'>
						#{issue.number} opened 2 days ago by <span className='fw-bold'>{issue.user.login}</span>
					</span>
				</div>

				<div className='d-flex align-items-center'>
					<img src={issue.user.avatar_url} alt='User Avatar' className='avatar' />
					<span className='px-2'>{issue.comments}</span>
					<FiMessageSquare />
				</div>
			</div>
		</div>
	);
};

interface IssueItemProps {
	issue: Issue;
}
