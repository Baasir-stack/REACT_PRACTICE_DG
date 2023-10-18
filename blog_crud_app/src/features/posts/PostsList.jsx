/* eslint-disable no-unused-vars */
import { useSelector,  } from "react-redux";
import { selectAllPosts,selectPostIds, getPostsStatus, getPostsError } from "./postsSlice";
import PostsExcerpt from "./PostsExcerpt";

const PostsList = () => {

    const all = useSelector(selectAllPosts)
    const orderedPostIds  = useSelector(selectPostIds);
    const postStatus = useSelector(getPostsStatus);
    const error = useSelector(getPostsError);

    console.log(all)
    let content;
    if (postStatus === 'loading') {
        content = <p>"Loading..."</p>;
    } else if (postStatus === 'succeeded') {
      
        content = orderedPostIds.map(postId => <PostsExcerpt key={postId} postId={postId} />)
    } else if (postStatus === 'failed') {
        content = <p>{error}</p>;
    }

    return (
        <>
        <div className="background-animation"></div>

        <section >
            
            {content}
        </section>
        </>
    )
}
export default PostsList