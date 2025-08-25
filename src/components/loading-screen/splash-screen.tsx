import { Spinner } from 'react-activity';
import { SpinnerContainer, SplashWrapper, Wrapper } from './styled';

export function SplashScreen() {
    const content = (
        <Wrapper>
            <SplashWrapper>
                <SpinnerContainer>
                    <Spinner size={32} speed={1} animating={true} />
                </SpinnerContainer>
            </SplashWrapper>
        </Wrapper>
    );
    return content;
}
