import styled from 'styled-components';

const Wrapper = styled.div`
    overflow: hidden;
`;

const SplashWrapper = styled.div`
    right: 0;
    width: 100%;
    bottom: 0;
    height: 100%;
    z-index: 9999;
    display: flex;
    position: fixed;
    align-items: center;
    justify-content: center;
    background-color: white;
`;

const ImageLoading = styled.div`
    background-size: cover;
    background-position: center;
    width: 120px;
    height: 120px;
    align-items: center;
    position: relative;
    display: inline-flex;
    justify-content: center;
`;

const SpinnerContainer = styled.div`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
`;

export { ImageLoading, SpinnerContainer, SplashWrapper, Wrapper };
