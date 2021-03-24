import React from 'react';
import Sidebar from '../partials/Sidebar';
import Article from '../partials/Article';
import Post from '../../apis/Post';

class Home extends React.Component
{
    constructor(props)
    {
        super(props);

        // to store the posts
        this.state = {
          posts: [],
          spinner: false
        };
    }

    componentDidMount()
    {
        // show Loading before the post is fetched
        this.setState({
            spinner: true
        });

        Post.getRecent().then(response => {
            this.setState({
                posts: response.data.data,
                spinner: false
            });
            // console.log(this.state.posts)
        });
    }

    render()
    {
        return (
            <div id="content-wrap">
                <div className="row">

                    <div id="main" className="eight columns">

                        {/* Loading... */}
                        <img src={process.env.MIX_APP_URL + 'assets/website/images/ajax-loader.gif'} style={{display: this.state.spinner==true?'block':'none'}} />
                        {
                            this.state.posts.map(post => <Article key={post.id} post={post} />)
                        }

                    </div>

                    {/* sidebar for category and tags */}
                    <Sidebar/>

                </div>
            </div>
        )
    }
}

export default Home;