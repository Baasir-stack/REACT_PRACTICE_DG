import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { selectPostById, updatePost, deletePost } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";

const EditPost = () => {
    const { postId } = useParams()
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const post = useSelector((state) => selectPostById(state, Number(postId)))
    const users = useSelector(selectAllUsers)

    const [title, setTitle] = useState(post?.title)
    const [content, setContent] = useState(post?.body)
    const [userId, setUserId] = useState(post?.userId)
    const [addRequestStatus, setAddRequestStatus] = useState('idle')




    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)
    const onAuthorChanged = e => setUserId(e.target.value)


    const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle';

    const onSavePostClicked = () => {
        if (canSave) {
            try {
                setAddRequestStatus('pending')
                dispatch(updatePost({ id: post.id, title, body: content, userId, reactions: post.reactions })).unwrap()

                setTitle('')
                setContent('')
                setUserId('')
                navigate(`/post/${postId}`)
            } catch (err) {
                console.error('Failed to save the post', err)
            } finally {
                setAddRequestStatus('idle')
            }
        }

    }

    const usersOptions = users.map(user => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ))

    const onDeletePostClicked = () => {
        try {
            setAddRequestStatus('pending')
            dispatch(deletePost({ id: post.id })).unwrap()

            setTitle('')
            setContent('')
            setUserId('')
            navigate('/')
        } catch (err) {
            console.error('Failed to delete the post', err)
        } finally {
            setAddRequestStatus('idle')
        }
    }




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
                        style={{minHeight:"100px"}}
                    />
                    <button
                        type="button"
                        onClick={onSavePostClicked}
                        disabled={!canSave}
                        className="add-post-button"
                    >
                        Save Post
                    </button>

                    <button className="add-post-button "
                        type="button"
                        onClick={onDeletePostClicked}
                        style={{backgroundColor:"red"}}
                    >
                        Delete Post
                    </button>

                </form>
            </section>
        </>
    )
}
export default EditPost


