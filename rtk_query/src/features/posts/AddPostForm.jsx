import { useState } from "react";
import { useSelector } from "react-redux";

import { useAddNewPostMutation } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";
import { useNavigate } from "react-router-dom";

const AddPostForm = () => {
  const [addNewPost, { isLoading }] = useAddNewPostMutation()

  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')

  const users = useSelector(selectAllUsers)

  const onTitleChanged = e => setTitle(e.target.value)
  const onContentChanged = e => setContent(e.target.value)
  const onAuthorChanged = e => setUserId(e.target.value)


  const canSave = [title, content, userId].every(Boolean) && !isLoading

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        await addNewPost({ title, body: content, userId }).unwrap()

        setTitle('')
        setContent('')
        setUserId('')
        navigate('/')
      } catch (err) {
        console.error('Failed to save the post', err)
      }
    }

  }

  const usersOptions = users.map(user => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))

  return (
    <>
      <div className="background-animation"></div>

      <section className="add-post-section">
        <div className="cool-heading">Add a New Post</div>
        <form className="add-post-form">
          <label htmlFor="postTitle" className="add-post-label">Post Title:</label>
          <input
            type="text"
            id="postTitle"
            name="postTitle"
            value={title}
            onChange={onTitleChanged}
            className="add-post-input"
          />
          <label htmlFor="postAuthor" className="add-post-label">Author:</label>
          <select
            id="postAuthor"
            value={userId}
            onChange={onAuthorChanged}
            className="add-post-select"
          >
            <option value=""></option>
            {usersOptions}
          </select>
          <label htmlFor="postContent" className="add-post-label">Content:</label>
          <textarea
            id="postContent"
            name="postContent"
            value={content}
            onChange={onContentChanged}
            className="add-post-textarea"
          />
          <button
            type="button"
            onClick={onSavePostClicked}
            disabled={!canSave}
            className="add-post-button"
          >
            Save Post
          </button>
        </form>
      </section>
    </>
  )
}
export default AddPostForm