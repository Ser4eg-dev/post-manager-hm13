import {
  useAddPostMutation,
  useEditPostMutation,
  useGetPostByIdQuery
} from '@/api/postsApi';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const FormGroup = ({ label, children }) => (
  <div className="space-y-1">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    {children}
  </div>
);

const Input = ({ ...props }) => (
  <input
    {...props}
    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
  />
);

const Textarea = ({ ...props }) => (
  <textarea
    {...props}
    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm resize-y focus:outline-none focus:ring-2 focus:ring-blue-400"
  />
);

const SubmitButton = ({ isLoading, children }) => (
  <button
    type="submit"
    disabled={isLoading}
    className={`w-full py-2 px-4 rounded-lg font-semibold transition duration-300 ${
      isLoading
        ? 'bg-gray-400 text-white cursor-not-allowed'
        : 'bg-blue-600 text-white hover:bg-blue-700'
    }`}
  >
    {children}
  </button>
);

function PostForm({ postId }) {
  const {
    data: post,
    isLoading,
    isError
  } = useGetPostByIdQuery(postId, { skip: !postId });

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (post && postId) {
      setTitle(post.title || '');
      setContent(post.content || '');
    }
  }, [post, postId]);

  const [addPost, { isLoading: isAdding, isSuccess: isAdded }] =
    useAddPostMutation();
  const [editPost, { isLoading: isEditing, isSuccess: isEdited }] =
    useEditPostMutation();

  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (postId) {
        await editPost({ id: postId, updatePost: { title, content } }).unwrap();
      } else {
        await addPost({ title, content }).unwrap();
        setTitle('');
        setContent('');
      }

      setTimeout(() => {
        navigate('/posts');
      }, 1500);
    } catch (error) {
      console.error('Помилка:', error.message);
    }
  };

  const getButtonText = () => {
    if (postId) return isEditing ? 'Збереження...' : 'Редагувати';
    return isAdding ? 'Додавання...' : 'Додати';
  };

  if (isLoading)
    return <p className="text-center text-gray-500 py-4">Завантаження...</p>;

  if (isError)
    return (
      <p className="text-center text-red-500 py-4">
        Помилка завантаження посту
      </p>
    );

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-md space-y-6"
    >
      <FormGroup label="Заголовок*">
        <Input
          type="text"
          id="title"
          value={title}
          required
          onChange={e => setTitle(e.target.value)}
          placeholder="Введіть заголовок"
        />
      </FormGroup>

      <FormGroup label="Текст поста">
        <Textarea
          id="content"
          value={content}
          onChange={e => setContent(e.target.value)}
          rows={5}
          placeholder="Введіть текст поста"
        />
      </FormGroup>

      <SubmitButton isLoading={isAdding || isEditing}>
        {getButtonText()}
      </SubmitButton>

      {!postId && isAdded && (
        <p className="text-green-600 text-sm text-center">
          Пост успішно додано
        </p>
      )}
      {postId && isEdited && (
        <p className="text-green-600 text-sm text-center">
          Пост успішно відредаговано
        </p>
      )}
    </form>
  );
}

export default PostForm;
