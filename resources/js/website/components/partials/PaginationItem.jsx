import React from 'react';

const disabledStyle = {
  color: '#ccc'
};

class PaginationItem extends React.Component {

    constructor(props)
    {
        super(props);
    }

    paginate(e) {
        e.preventDefault();

        this.props.onclick(this.props.page);
    }

    render() {
        return (
            <a href="#" rel={this.props.rel} onClick={this.paginate.bind(this) } style={{color: !this.props.enabled?'#ccc':''}}>{this.props.title}</a>
        );
    }
}

export default PaginationItem;