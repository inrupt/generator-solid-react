import React from 'react';
import styled from 'styled-components';

type Props = {
  title: String,
  content: String
};

const Toastr = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  flex: 1 1 auto;

  & > span {
    font-weight: bold;
    text-transform: uppercase;
  }

  & > p {
    margin: 0;
    padding: 2px 0;
    color: inherit;
  }
`;

const Toaster = (props: Props) => {
  const { title, content } = props;
  return (
    <Toastr>
      <span>{title}</span>
      <p>{content}</p>
    </Toastr>
  );
};

export default Toaster;
