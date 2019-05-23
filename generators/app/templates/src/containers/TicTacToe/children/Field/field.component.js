import React from 'react';
import styled  from 'styled-components'

const Square = styled.button``

const Field = ({ value, onClick }) => {
    return <Square onClick={onClick}>{value}</Square>;
};

export default Field;
