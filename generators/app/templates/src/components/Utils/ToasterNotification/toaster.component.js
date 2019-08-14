import React from 'react';
import styled from 'styled-components';

type Props = {
  title: String,
  content: String,
  link: { href: string, label: string }
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

  a {
    color: white;
    display: block;
    margin: 5px 0;
  }
`;

const Toaster = (props: Props) => {
  const { title, content, link } = props;
  return (
    <Toastr>
      <span>{title}</span>
      <p>{content}</p>
      {link && (
        <a href={link.href} target="_blank" rel="noopener noreferrer">
          {link.label}
        </a>
      )}
    </Toastr>
  );
};

export default Toaster;
