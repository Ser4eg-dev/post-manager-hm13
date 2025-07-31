import { useParams } from 'react-router';
import PostForm from './PostsPage/PostForm';

const PostEditPage = () => {
  const { id } = useParams();

  return <>{id ? <PostForm postId={id} /> : <PostForm />}</>;
};

export default PostEditPage;
