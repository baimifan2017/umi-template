/**
 * @author lzh
 * @desc: 可拖拽Table
 * @date:2020-12-09
 */
import React, {Component} from 'react';
import {Table} from 'antd';
import {Resizable} from 'react-resizable';
import {get} from 'loash';

import PropTypes from 'prop-types';

const ResizableTitle = props => {
  const {onResize, width, ...restProps} = props;

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable
      width={width}
      height={0}
      handle={
        <span
          className="react-resizable-handle"
          onClick={e => {
            e.stopPropagation();
          }}
        />
      }
      onResize={onResize}
      draggableOpts={{enableUserSelectHack: false}}
    >
      <th {...restProps} />
    </Resizable>
  );
};


class Index extends Component {
  static propTypes = {
    border: PropTypes.bool, // 是否显示边框
    url: PropTypes.string,
    columns: PropTypes.array.isRequired,
    dataSource: PropTypes.array,
    params: PropTypes.object,
    onAction: PropTypes.func,
    iconType: PropTypes.string,
    leftExtra: PropTypes.node,
    rightExtra: PropTypes.node,
    extraTitle: PropTypes.string,
    reader: PropTypes.shape({
      title: PropTypes.string,
      value: PropTypes.string,
    }),
  };

  static defaultProps = {
    ellipsis: false,
    reader: {
      title: 'title',
      value: 'value',
    },
  };

  state = {
    columns: this.props.columns || [],
  };

  components = {
    header: {
      cell: ResizableTitle,
    },
  };

  handleResize = index => (e, {size}) => {
    this.setState(({columns}) => {
      const nextColumns = [...columns];
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width,
      };
      return {columns: nextColumns};
    });
  };

  render() {
    const columns = this.state.columns.map((col, index) => ({
      ...col,
      onHeaderCell: column => ({
        width: column.width,
        onResize: this.handleResize(index),
      }),
    }));

    return <Table bordered components={this.components} columns={columns} dataSource={this.data}/>;
  }
}

export default Index;
