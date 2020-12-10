/**
 * @author lzh
 * @desc: 操作按钮
 * @date:2020-12-09
 */
import React from "react";
import {Button} from "antd";
import PropTypes from 'prop-types';
import FilterOutlined from "@ant-design/icons/lib/icons/FilterOutlined";

const LeftBar = (props) => {
  const {btnArr} = props;

  return <div style={{display: "inline-block", whiteSpace: "nowrap"}}>
    {
      btnArr.map((item, index) => {
        return <Button onClick={item.onClick} icon={}
                       style={{marginLeft: '4px'}}
                       type={index === 0 ? item.type || 'primary' : ''}>{item.text}</Button>
      })
    }
  </div>
};

LeftBar.propTypes = {
  btnArr:PropTypes.array
};

LeftBar.defaultProps = {
  btnArr:[{
    icon:'plus',
    text:'新增',
    onClick:()=>function () {}
  }]
};

const RightSearch = (props) => {
  const {clickSearch} = props;

  return <>
    <span
      style={{color: 'red'}}
      onClick={clickSearch}
    >
      <FilterOutlined/>
      <span>过滤</span>
    </span>
  </>
};

const ToolBar = (props) => {
  const {leftProps, rightProps} = props;

  return <div style={{
    width: '100%',
    margin: 0,
    padding: 0,
    display: "flex",
    justifyContent: "space-between"
  }}>
    <LeftBar {...leftProps}/>
    <RightSearch {...rightProps}/>
  </div>
};

export default {RightSearch, LeftBar, ToolBar};


