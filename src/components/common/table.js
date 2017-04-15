import React, { Component } from 'react';

class Table extends Component {
    render() {
        return (
            <table className="table table-bordered table-striped table-hover">
                <thead className="bg-info">
                    <tr>
                        {this.props.titles.map( (title) => <th key={title}>{title}</th> )}
                    </tr>
                </thead>
                <tbody>
                    {this.props.children}
                </tbody>
            </table>
        );
    }
}

export default Table;