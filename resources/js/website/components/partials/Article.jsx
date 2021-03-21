import React from "react";
import {Link} from "react-router-dom";

const Article = (props) => {

    return (
        <article className="entry">

            <header className="entry-header">

                <h2 className="entry-title">
                    <Link to={`/p/${props.post.id}/${props.post.slug}` }>{props.post.title}</Link>
                </h2>

                <div className="entry-meta">
                    <ul>
                        <li>{props.post.date_formatted}</li>
                        <span className="meta-sep">•</span>
                        <li><Link to={`/category/${props.post.category.id}/${props.post.category.slug}`} title="" rel="category tag">{props.post.category.title}</Link></li>
                        <span className="meta-sep">•</span>
                        <li>{props.post.user.name}</li>
                    </ul>
                </div>

            </header>

            <div className="entry-content-media">
                <div className="post-thumb">
                    {(props.post.image != null)? <img src={process.env.MIX_APP_URL + `uploads/${props.post.image}`} width="614" />
                    :null}
                </div>
            </div>

            <div className="entry-content">
                <p>{props.post.excerpt}</p>
            </div>

        </article>
    );
};

export default Article;