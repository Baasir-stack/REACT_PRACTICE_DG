import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllPosts } from './postSlice'
import PostAuhtor from './PostAuhtor'
import TimeAgo from "./TimeAgo.jsx";
import ReactionButtons from "./ReactionButton";

import './styles/posts.css'


const PostsList = () => {

    const posts = useSelector(selectAllPosts)
    console.log(posts)

    const renderedList = (posts.map(post =>(
        <div className="container" key={post.id}>
            <article>
                <h2 >{post.title}</h2>
                <p >{post.content.substring(0,100)}...</p>
                <p className="postCredit">
                    <PostAuhtor userId={post.userId}/>
                    <TimeAgo timestamp={post.date}/>
                </p>
                <ReactionButtons post={post}/>
                <a href="#">Read More</a>
            </article>
        </div>
    ))).reverse()
    

    return (
        <section>
            <h2>Posts</h2>
            {renderedList}
        </section>
    )
}

export default PostsList