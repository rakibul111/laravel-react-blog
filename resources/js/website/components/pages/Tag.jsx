import React from 'react';
import Sidebar from '../partials/Sidebar';
import Article from '../partials/Article';
import { withRouter } from "react-router";
import PostApi from '../../apis/Post';
import TagApi from '../../apis/Tag';
import Pagination from "../partials/Pagination";


class Tag extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            posts: {},
            spinner: false,
            tag_title: "",
            isLoaded: false
        };
    }

    componentDidMount()
    {
        this.setState({
            spinner: true,
            isLoaded: true
        });

        this.fetch();
    }

    componentDidUpdate(prevProps)
    {
        // props means location
        // check if this is not the same category
        if (prevProps !== this.props &&this.state.isLoaded == false) {
            this.setState({
                spinner: true,
                isLoaded: true
            });

            this.fetch();
        }
    }

    fetch() {
        //                *tag id
        TagApi.getById(this.props.match.params.id).then(response => this.setState({tag_title: response.data.data.title}));

        // get Posts by tag
        PostApi.getByTag(this.props.match.params.id).then(response => {
            this.setState({
                posts: response.data.data,
                spinner: false,
                isLoaded: false
            });
        });
    }

    onPaginate(page) {
        this.setState({
            spinner: true
        });

        PostApi.getByTag(this.props.match.params.id, page).then(response => {
            this.setState({
                posts: response.data.data,
                spinner: false
            });
        });
    }

    render()
    {
        console.info(this.props);
        return (
            <div id="content-wrap">
                <div className="row">
                    <div id="main" className="eight columns">

                        {/* Loading gif */}
                        <img src={process.env.MIX_APP_URL + 'assets/website/images/ajax-loader.gif'} style={{display: this.state.spinner==true?'block':'none'}} />

                        <h1>Tag: {this.state.tag_title}</h1>

                        {
                            this.state.posts.data && this.state.posts.data.length > 0?(
                                this.state.posts.data.map(post => <Article key={post.id} post={post} />)
                            ) : (
                                <p>No posts found</p>
                            )
                        }

                        <Pagination data={this.state.posts} onclick={this.onPaginate.bind(this)} />

                    </div>

                    <Sidebar/>

                </div>
            </div>
        )
    }
}

export default withRouter(Tag);