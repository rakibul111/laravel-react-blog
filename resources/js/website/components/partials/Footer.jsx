import React from 'react';
import {Link} from "react-router-dom";
import GlobalContext from '../../GlobalContext';

class Footer extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return (
            <footer>

                <div className="row">

                    <div className="six columns info">

                        <h3>About US</h3>

                        <p>Interactive full featured website built with reactjs and laravel. Include admin panel and sacntum authentication and different modules like posts, categories, tags and comments.
                        </p>
                    </div>

                    <div className="six columns">
                        <h3 className="social">Navigate</h3>

                        <ul className="navigate group">
                            <li><Link to="/">Home</Link></li>
                            {
                                this.context.categories.map(category => <li key={category.id}><Link to={'/category/' + category.id + '/' + category.slug}>{ category.title }</Link></li>)
                            }
                        </ul>
                    </div>

                </div>

            </footer>
        );
    }
}

Footer.contextType = GlobalContext;

export default Footer;