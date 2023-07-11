import {useQueries, useQuery} from '@tanstack/react-query'
import {getPost, getPosts} from './api/posts'

const PostsList1 = () => {
  const {
    isError,
    error,
    isLoading,
    //status,
    //fetchStatus,
    data: posts,
  } = useQuery({
    // /posts -> ['posts']
    // /posts/1 -> ["posts", postId]
    // /posts?authorId=1 -> ["posts", {authorId:1}]
    // /posts/2/comments -> ["posts", postId, "comments"]
    queryKey: ['posts'],

    queryFn: ({queryKey}) => getPosts(),
    staleTime: 5000, //overide default provider option
    //enabled: otherQuery?.data?.userId != null, //when querie depends on previous query result
    //refetchInterval: 3000,
    //display placeholder during data fetching, then fresh data
    //placeholderData: [{id: 1, title: 'Initial Data', body: 'Initial Data'}],
    //initialData: [{id: 1, title: 'Initial Data', body: 'Initial Data'}], //same than placeholder but initialData ara considered as fresh data in cache and doesn't refetch
  })

  //useQueries also exists for multiple queries
  // const queries = useQueries({
  //   queries: (posts ?? []).map((post) => {
  //     return {
  //       queryKey: ['posts', post.id],
  //       queryFn: () => getPost(post.id),
  //     }
  //   }),
  // })
  // console.log(queries.map((q) => q.data))

  if (isLoading) return <h1>Loading...</h1>
  if (isError) {
    return <h1>{JSON.stringify(error)}</h1>
  }

  return (
    <div>
      <h1>Posts List 1</h1>
      <ol>
        {posts.map((post) => (
          <li key={post.id}>
            {post.title} - {post.body}
          </li>
        ))}
      </ol>
    </div>
  )
}

export default PostsList1
