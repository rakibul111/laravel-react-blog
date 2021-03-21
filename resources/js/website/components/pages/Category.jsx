import React from 'react';
import Sidebar from '../partials/Sidebar';
import Article from '../partials/Article';
import { withRouter } from "react-router";
import PostApi from '../../apis/Post';
import CategoryApi from '../../apis/Category';
import Pagination from "../partials/Pagination";

class Category extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            posts: {},
            spinner: false,
            category_title: "",
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
        if (prevProps !== this.props && this.state.isLoaded == false) {
            this.setState({
                spinner: true,
                isLoaded: true
            });

            this.fetch();
        }
    }

    fetch() {
        //                     *category id
        CategoryApi.getById(this.props.match.params.id).then(response => this.setState({category_title: response.data.data.title}));

        // get Posts by category
        PostApi.getByCategory(this.props.match.params.id).then(response => {
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

        PostApi.getByCategory(this.props.match.params.id, page).then(response => {
            this.setState({
                posts: response.data.data,
                spinner: false
            });
        });
    }

    render()
    {
        return (
            <div id="content-wrap">
                <div className="row">
                    <div id="main" className="eight columns">

                        {/* Loading gif */}
                        <img src={process.env.MIX_APP_URL + 'assets/website/images/ajax-loader.gif'} style={{display: this.state.spinner==true?'block':'none'}} />

                        <h1>Category: { this.state.category_title }</h1>

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

export default withRouter(Category);