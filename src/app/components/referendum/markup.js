import React from 'react';
import ReactMarkdown  from 'react-markdown';

export const Markup = props => {
  return(<ReactMarkdown source={props.content} />)
};
