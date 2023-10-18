import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { postAdded } from './postSlice'
import { selectAllUsers } from '../users/userSlice'

import './styles/postForm.css'

const PostForm = () => {

    const users = useSelector(selectAllUsers)

    const dispatch = useDispatch()


    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    const [userId, setUserId] = useState()


    const onChangeTitle = (e) => setTitle(e.target.value)
    const onChangeContent = (e) => setContent(e.target.value)
    const onAuthorChanged = e => setUserId(e.target.value)

    const onSavePostClicked = (e) => {
        e.preventDefault()

        if (title && content) {
            dispatch(
                postAdded(title, content, userId)
            )

            setTitle('')
            setContent('')
        }
    }

    const usersOptions = users.map(user => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ))



    return (
        <section className="container">
            <h2>Add a New Post</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="post-title">Title:</label>
                    <input type="text"
                        id="post-title"
                        name="post-title"
                        placeholder="Enter post title"
                        value={title}
                        onChange={onChangeTitle}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="postAuthor">Author:</label>
                   
                    <select id="postAuthor" className='postAuthor' value={userId} onChange={onAuthorChanged}>
                        <option value=""></option>
                        {usersOptions}
                    </select>
                   
                   
                </div>


                <div className="form-group">
                    <label htmlFor="post-content">Content:</label>
                    <textarea id="post-content"
                        name="post-content"
                        placeholder="Enter post content"
                        value={content}
                        onChange={onChangeContent}
                    ></textarea>
                </div>
                <button type="submit" onClick={onSavePostClicked}>Submit</button>
            </form>
        </section>
    )
}

export default PostForm