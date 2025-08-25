import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #000;
    position: relative;
    min-height: 100vh;
    padding: 16px;
`;

const BackgroundImage = styled.img`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: fill ;
    z-index: 0;
`;

const LoginContainer = styled.div`
    max-width: 485px;
    width: 100%;
    padding: 30px;
    border-radius: 20px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    background-color: white;
    margin-left: 74px;
    position: relative;
    z-index: 1;

    @media (max-width: 768px) {
        margin-left: 0;
        padding: 24px;
    }
`;

const LogoWrapper = styled.div`
    margin-bottom: 24px;
`;

const Logo = styled.img`
    width: 60px;
`;

const Footer = styled.div`
    position: absolute;
    bottom: 0;
    background: #f9f9f9;
    width: 100%;
    text-align: center;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #727272;

    @media (max-width: 768px) {
        display: none;
    }
`;

export { BackgroundImage, Footer, LoginContainer, Logo, LogoWrapper, Wrapper };
