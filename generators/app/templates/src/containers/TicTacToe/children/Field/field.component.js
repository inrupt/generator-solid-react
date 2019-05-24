import React from 'react';
import styled  from 'styled-components'

const Square = styled.button``

const Field = ({ value, onMove }) => {
    return <Square onClick={onMove}>{value}</Square>;
};

export default Field;
