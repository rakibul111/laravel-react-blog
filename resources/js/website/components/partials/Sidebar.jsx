import React from 'react';
import {Link} from "react-router-dom";
import GlobalContext from '../../GlobalContext';
import TagApi from '../../apis/Tag';

class Sidebar extends React.Component
{
    constructor(props)
    {
        super(props);

        // internal state to store the tags
        this.state = {
            tags: []
        };
    }

    componentDidMount()
    {
        TagApi.getAll().then(response => {
           this.setState({
               tags: response.data.data
           });
        });
    }

    render()
    {
        return (
            <div id="sidebar" className="four columns">
                <div className="widget widget_categories group">
                    <h3>Categories</h3>
                    <ul>
                        {
                            this.context.categories.map(category => {
                               return category.num_posts > 0 ?(
                                   <li key={category.id}><Link to={'/category/' + category.id + '/' + category.slug}>{ category.title }</Link> ({category.num_posts})</li>
                               ) : null
                            })
                        }
                    </ul>
                </div>

                {
                    this.state.tags.length > 0? (
                        <div className="widget widget_tags">
                            <h3>Post Tags</h3>

                            <div className="tagcloud group">
                                {
                                    this.state.tags.map(tag => {
                                        return (
                                            <Link key={tag.id} to={'/tag/' + tag.id + '/' + tag.title}>{tag.title}</Link>
                                        )
                                    })
                                }
                            </div>

                        </div>
                    ) : null
                }

            </div>
        );
    }
}

Sidebar.contextType = GlobalContext;

export default Sidebar;