import {useMutation, useQueryClient} from '@tanstack/react-query'
import {useRef} from 'react'
import {createPost} from './api/posts'
import Post from './Post'

const CreatePost = ({setCurrentPage}) => {
  const titleRef = useRef()
  const bodyRef = useRef()
  const queryClient = useQueryClient()

  const {mutate, isMutating, isError, error, isLoading} = useMutation({
    //onMutate: (variables) => {return 'i am the context'}, //executed first, before mutationFn
    //mutationFn: createPost,
    mutationFn: (variables) => createPost(variables),
    onSuccess: (data, variables, context) => {
      // data = returned value of mutationFn
      // context : onMutate return value, here 'i am the context'

      // immediatly update cache with new data
      queryClient.setQueryData(['posts', data.id], data)

      //not only post but all queryKey starting with post => exact : true
      queryClient.invalidateQueries(['posts'], {exact: true})
      setCurrentPage(<Post id={data.id} />)
    },
    //retry: 3 - unlike useQuery, doesn't attemp multiple retry by default before throwing an error
    //onError: (error, variables, context)=>{},
    //onSettled: (data, error, variables, context)=>{},
  })

  function handleSubmit(e) {
    e.preventDefault()
    mutate({
      title: titleRef.current.value,
      body: bodyRef.current.value,
    })
  }

  return (
    <div>
      {isError && JSON.stringify(error)}
      <h1>Create Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input id="title" ref={titleRef} />
        </div>
        <div>
          <label htmlFor="body">Body</label>
          <input id="body" ref={bodyRef} />
        </div>
        <button disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Create'}
        </button>
      </form>
    </div>
  )
}

export default CreatePost
