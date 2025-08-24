import React, { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';

import { useRouter } from 'routes/hooks';

import CustomAlert from 'components/custom-alert/CustomAlert';

import { useAuthContext } from 'auth/hooks';

import { STORAGE_ACCESS_TOKEN, STORAGE_REFRESH_TOKEN } from 'auth/context/jwt';
import { useLazyGetAuthorizeMeQuery, useSignInMutation } from 'store/apis/auth';
import { BackgroundImage, LoginContainer, Logo, LogoWrapper, Wrapper } from './styles';

const LOGO = process.env.PUBLIC_URL + '/assets/images/logo.png';
const BG_IMAGE = process.env.PUBLIC_URL + '/assets/images/bg3.png';

export const JwtSignInView: React.FC = () => {
    const [errorUsername, setErrorUsername] = useState<string>('');
    const [errorPassword, setErrorPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { checkUserSession } = useAuthContext();
    const router = useRouter();
    const [authen] = useSignInMutation();
    const [authorize] = useLazyGetAuthorizeMeQuery();

    const onFinish = async (values: any) => {
        const body = {
            email: values?.email || '',
            password: values?.password || '',
        };
        try {
            const response = await authen(body).unwrap();
            const { code, data } = response || {};
            if (code === 200) {
                const { token = '' } = data || {};
                localStorage.setItem(STORAGE_ACCESS_TOKEN, token);
                localStorage.setItem(STORAGE_REFRESH_TOKEN, token);
                const resAuthorize = await authorize().unwrap();
                const { code: authoCode, data: authoData } = resAuthorize || {};
                const { status } = authoData || {};
                if (authoCode === 200 && status === 1) {
                    setErrorUsername('');
                    setErrorPassword('');
                    await checkUserSession?.();
                    router.refresh();
                }
            }
        } catch (e) {
            setErrorUsername('Sai username hoặc password. Vui lòng kiểm tra và thử lại.');
            setErrorPassword('Sai username hoặc password. Vui lòng kiểm tra và thử lại.');
            console.log('ERROR', e);
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onFinish({ email, password });
    };

    return (
        <Wrapper>
            <BackgroundImage src={BG_IMAGE} alt="background" />

            <LoginContainer>
                <LogoWrapper>
                    <Logo src={LOGO} alt="logo" />
                    <h3 style={{ marginTop: 10 }}>Đăng nhập eKYC Portal</h3>
                </LogoWrapper>

                <Card>
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="loginEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Nhập email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        if (errorUsername) setErrorUsername('');
                                    }}
                                    isInvalid={Boolean(errorUsername)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errorUsername}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="loginPassword" className="mt-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Nhập mật khẩu"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        if (errorPassword) setErrorPassword('');
                                    }}
                                    isInvalid={Boolean(errorPassword)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errorPassword}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Button variant="primary" type="submit" block className="mt-4">
                                Đăng nhập
                            </Button>
                        </Form>

                        <div className="mt-3">
                            <CustomAlert
                                iconColor="#727272"
                                textColor="#727272"
                                backgroundColor="#fff"
                                message="Nếu bạn chưa có tài khoản, hãy liên hệ Quản lý của phần mềm để được hỗ trợ đăng ký tài khoản."
                            />
                        </div>
                    </Card.Body>
                </Card>

                <div className="text-center text-muted my-3">Hoặc</div>
            </LoginContainer>
        </Wrapper>
    );
};
