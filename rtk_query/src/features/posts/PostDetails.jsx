import { useSelector,  } from 'react-redux'
import { selectPostById,  } from './postsSlice'

import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';



const PostDetails = () => {
    const { postId } = useParams()

   



    const post = useSelector((state) => selectPostById(state, Number(postId)))

    if (!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }

    // const handleDeletePost = (id) => {
    //     try {
    //         dispatch(deletePost({id}))
    //         navigate(`/`)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    return (
        <>
        <div className="background-animation"></div>

        
        <article className="blog-card" style={{ position: "relative",marginTop:"2rem" }}>

            <h2 className="blog-card-title">{post.title}</h2>
            <p className="blog-card-body">{post.body}</p>
            <p className="postCredit">
                <Link to={`/post/edit/${post.id}`}>Edit Post</Link>
                <PostAuthor userId={post.userId} />
                <TimeAgo timestamp={post.date} />
            </p>

            <ReactionButtons post={post} />
            {/* <span style={{
                color: "gray",
                fontSize: "20px",
                position: "absolute",
                bottom: "18px",
                right: "20px",
            }}
                onClick={()=>handleDeletePost(post.id)}
            >
                <FaTrash />
            </span> */}
        </article>
        </>
    )
}

export default PostDetails