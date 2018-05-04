import { Button } from '../Button';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {SORTS} from '../../constants/search';
import './index.css';
class Table extends Component {

    constructor(props) {
      super(props);
  
      this.state = {
        sortKey: "NONE",
        isReverse: false,
      }
  
      this.onSort = this.onSort.bind(this);
    }
  
    onSort(sortKey) {
      const isReverse = this.state.sortKey === sortKey && !this.state.isReverse
      this.setState({sortKey, isReverse});
    }
    
    render() {
      const {
        list,
        onDismiss
      } = this.props;
  
      const {
        sortKey,
        isReverse
      } = this.state;
  
      const sortList=
        isReverse
        ? SORTS[sortKey](list).reverse()
        : SORTS[sortKey](list);
  
        return (
        <div className="table">
        <div className="table-header">
          <span style={{ width: '40%'}}>
            <Sort 
              sortKey={'TITLE'}
              onSort={this.onSort}
              >
              Title
            </Sort>
          </span>
          <span style={{ width: '30%'}}>
            <Sort
              sortKey={'AUTHOR'}
              onSort={this.onSort}
              >
              Author
            </Sort>
          </span>
          <span style={{ width: '10%' }}>
            <Sort
              sortKey={'COMMENTS'}
              onSort={this.onSort}
              >
              Comments
          </Sort>
          </span>
          <span style={{ width: '10%' }}>
            <Sort
              sortKey={'POINTS'}
              onSort={this.onSort}
            >
              Points
            </Sort>
          </span>
          <span style={{ width: '10%' }}>
            Archive
          </span>
          </div>
        {sortList.map(item => 
          <div key={item.objectID} className="table-row">
            <span>
              <a href={item.url}>{item.title}</a>
            </span>
            <span>{item.author}</span>
            <span>{item.num_comments}</span>
            <span>{item.points}</span>
            <Button 
            onClick={() => onDismiss(item.objectID)}
            className="button-inline"
            >
              Dismiss 
            </Button>
          </div>
        )}
        </div>
        );
    }
  }
  
  Table.propTypes = {
    list: PropTypes.array.isRequired,
    onDismiss: PropTypes.func.isRequired,
  }

  const Sort = ({sortKey, onSort, children}) => 
  <Button onClick={() => onSort(sortKey)}>
    {children}
    </Button>

  export {Table};