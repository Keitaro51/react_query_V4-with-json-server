import {useState} from 'react'
import {useQueryClient} from '@tanstack/react-query'

import PostsList from './PostsList'
import CreatePost from './CreatePost'
import Post from './Post'
import PostListPaginated from './PostListPaginated'
import PostListInfinite from './PostListInfinite'
import {getPost} from './api/posts'

function App() {
  const [currentPage, setCurrentPage] = useState(<PostsList />)
  const queryClient = useQueryClient()

  //prefetch - don't use it always (avoid server overload and bandwidth overconsumption), just when you're sure the user will use data soon
  const onHoverPostOneLink = () => {
    queryClient.prefetchQuery({
      queryKey: ['posts', 1],
      queryFn: () => getPost(1),
    })
  }

  return (
    <div>
      <button onClick={() => setCurrentPage(<PostsList />)}>
        Posts List 1
      </button>

      <button
        onMouseEnter={onHoverPostOneLink}
        onClick={() => setCurrentPage(<Post id={1} />)}
      >
        First Post
      </button>
      <button
        onClick={() =>
          setCurrentPage(<CreatePost setCurrentPage={setCurrentPage} />)
        }
      >
        New Post
      </button>
      <button onClick={() => setCurrentPage(<PostListPaginated />)}>
        Post List Paginated
      </button>
      <button onClick={() => setCurrentPage(<PostListInfinite />)}>
        Post List Infinite
      </button>
      <br />
      {currentPage}
    </div>
  )
}

export default App
