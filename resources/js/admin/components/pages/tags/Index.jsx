import React from 'react';
import Breadcrumb from '../../partials/Breadcrumb';
import {connect} from 'react-redux';
import { listTags, setTagDefaults } from '../../../store/actions/TagActions';
import Spinner from '../../partials/Spinner';
import { Link } from 'react-router-dom';
import Row from './Row';
import Pagination from '../../partials/Pagination';
import SuccessAlert from '../../partials/SuccessAlert';
import ErrorAlert from '../../partials/ErrorAlert';
import Auth from '../../../apis/Auth'

class Index extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    componentDidMount()
    {
        // check the token validity and admin
        //successCb()
        Auth.checkAuth( (response) => {             //successCb()
            console.log(response);
        },
        // if the token is no more valid or user is no more admin,
        // then back to Login page
        (err) => {                           //failCb()
            alert(err.response.data.message);
            console.log(err.response)
            this.props.history.push("/login");
        });
        
        this.props.setTagDefaults();
        this.props.listTags(1);
    }

    // set category state default 
    // load categories based on page number
    handleTags(page){
        this.props.setTagDefaults();
        this.props.listTags(page);
    }

    render()
    {
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>
                        Tags
                    </h1>

                    <Breadcrumb />

                </section>

                <section className="content">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="box">
                                <div className="box-header">
                                    <h3 className="box-title">All tags</h3>

                                    <Link to='tags/add' className="btn btn-primary pull-right">Add <i className="fa fa-plus"></i></Link>
                                </div>
                                <div className="box-body">
                                    <Spinner show={this.props.tag.list_spinner}/>

                                    <SuccessAlert msg={this.props.tag.success_message}/>
                                    <ErrorAlert msg={this.props.tag.error_message}/>

                                    <table className="table">
                                        <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Title</th>
                                            <th width="15%">Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            // get the data, without pagination
                                            this.props.tag.tags.data?(
                                                // map each category into Row
                                                this.props.tag.tags.data.map(item => <Row key={item.id} tag={item} />)
                                            ) : null
                                        }
                                        </tbody>

                                    </table>
                                </div>

                                <Pagination data={this.props.tag.tags} onclick={this.handleTags.bind(this)} />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {

    return {
        tag: state.tag
    }
};

const mapDispatchToProps = (dispatch) => {

    return {
        listTags: (page) => dispatch(listTags(page)),
        setTagDefaults: () => dispatch(setTagDefaults())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);