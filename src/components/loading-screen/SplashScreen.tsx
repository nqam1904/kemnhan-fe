import { ImageLoading, SplashWrapper, Wrapper } from './styled';

export function SplashScreen() {
  const content = (
    <Wrapper>
      <SplashWrapper>
        <ImageLoading />
      </SplashWrapper>
    </Wrapper>
  );
  return content;
}
