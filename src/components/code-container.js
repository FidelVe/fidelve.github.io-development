import React from 'react';

const style = {
  maxWidth: '100%',
  display: 'flex',
  justifyContent: 'center',
};
const CodeContainer = props => {
  return (
    <div
      style={style}
      dangerouslySetInnerHTML={{
        __html: props.innerHTML,
      }}
    />
  );
};

export default CodeContainer;
