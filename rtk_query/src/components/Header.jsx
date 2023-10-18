import { Link } from "react-router-dom"


const Header = () => {
    return (
        <header className="header">
            {/* <h1>Redux Blog</h1>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="post">Post</Link></li>
                </ul>
            </nav> */}
            <div className="header-left">
                <h1 className="header-title">Redux Blogs</h1>
            </div>
            <div className="header-right">
                <Link to="/" className="header-link">Home</Link>
                <Link to="post" className="header-link">Post Navigation</Link>
                <Link to="user" className="header-link">Users</Link>
            </div>
        </header>
    )
}

export default Header