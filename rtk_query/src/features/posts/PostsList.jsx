import { useSelector } from "react-redux";
import { selectPostIds, useGetPostsQuery} from "./postsSlice";
import PostsExcerpt from "./PostsExcerpt";
import { useEffect } from "react";

const PostsList = () => {

    const {
        data: posts,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetPostsQuery('getPosts')

  

    const orderedPostIds  = useSelector(selectPostIds);


    let content;
    if (isLoading) {
        content = <p>"Loading..."</p>;
    } else if (isSuccess) {
      
        content = orderedPostIds.map(postId => <PostsExcerpt key={postId} postId={postId} />)
    } else if (isError) {
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