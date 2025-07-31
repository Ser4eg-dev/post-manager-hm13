import React from 'react'
import { useGetPostByIdQuery } from '../../api/postsApi'

const PostDetails = ({ postId }) => {
  const {
    data: post,
    isLoading,
    isError,
  } = useGetPostByIdQuery(postId, {
    skip: !postId,
  })

  if (!postId) return <p>Оберіть пост, щоб побачити деталі.</p>
  if (isLoading) return <p>Завантаження деталей...</p>
  if (isError) return <p>Помилка завантаження деталей.</p>

  return (
    <div
      style={{
        border: '1px solid #ccc',
        padding: '10px',
        marginBottom: '20px',
      }}
    >
      <h3>{post.title}</h3>
      <p>ID: {post.id}</p>
      <p>Дата публікації: {new Date(post.publicationDate).toLocaleString()}</p>
      <p>Лайки: {post.likesNumber}</p>
      <p>Дислайки: {post.dislikesNumber}</p>
      <p>{post.content || 'Без опису'}</p>
    </div>
  )
}

export default PostDetails
