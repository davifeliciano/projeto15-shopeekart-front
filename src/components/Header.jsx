import React from 'react';
import styled from 'styled-components';
import useTheme from '../hooks/useTheme';

const Header = () => {
    const { colors } = useTheme();

    return (
        <HeaderContainer colors={colors}>
           
        </HeaderContainer>
    );
};

const HeaderContainer = styled.header`
    background: linear-gradient(to bottom, ${props => props.colors.backgroundUpHeader}, ${props => props.colors.backgroundDownHeader});
    width: 100vw;
    height: 200px;
`;

export default Header;