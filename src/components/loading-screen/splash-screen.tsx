import { Spinner } from 'react-activity';

import { Wrapper, SplashWrapper, SpinnerContainer } from './styled';

export function SplashScreen() {
    const content = (
        <Wrapper>
            <SplashWrapper>
                <SpinnerContainer>
                    <Spinner size={32} speed={1} animating />
                </SpinnerContainer>
            </SplashWrapper>
        </Wrapper>
    );
    return content;
}
