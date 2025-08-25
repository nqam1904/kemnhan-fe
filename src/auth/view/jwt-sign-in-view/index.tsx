import React, { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';

import { useRouter } from 'routes/hooks';

import { useAuthContext } from 'auth/hooks';

import { CustomAlert } from '@/components';
import { isValidEmailAddress } from '@/utils/format-string';
import { setLocalStorage } from 'auth/context/jwt';
import { useSignInMutation } from 'store/apis/auth';
import { BackgroundImage, LoginContainer, Logo, LogoWrapper, Wrapper } from './styles';

const LOGO = '/assets/images/logo.png';
const BACKGROUND_IMAGE = '/assets/images/bg3.png';

export const JwtSignInView: React.FC = () => {
    const [errorUsername, setErrorUsername] = useState<string>('');
    const [errorPassword, setErrorPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { checkUserSession } = useAuthContext();
    const router = useRouter();
    const [authen] = useSignInMutation();

    const onFinish = async (values: any) => {
        const body = {
            email: values?.email || '',
            password: values?.password || '',
        };
        try {
            const response = await authen(body).unwrap();
            const { is_success, user } = response || {};
            if (is_success) {
                const { access_token = '' } = response || {};
                await setLocalStorage(access_token, JSON.stringify(user));
                if (user.role === 'admin') {
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

        let hasError = false;

        const trimmedEmail = email?.trim() || '';
        const trimmedPassword = password?.trim() || '';

        if (!trimmedEmail) {
            setErrorUsername('Vui lòng nhập email.');
            hasError = true;
        } else if (!isValidEmailAddress(trimmedEmail)) {
            setErrorUsername('Email không hợp lệ.');
            hasError = true;
        }

        if (!trimmedPassword) {
            setErrorPassword('Vui lòng nhập mật khẩu.');
            hasError = true;
        }

        if (hasError) return;

        onFinish({ email: trimmedEmail, password: trimmedPassword });
    };

    return (
        <Wrapper>
            <BackgroundImage src={BACKGROUND_IMAGE} alt="background" />

            <LoginContainer>
                <LogoWrapper>
                    <Logo src={LOGO} alt="logo" />
                    <h3 style={{ marginTop: 10 }}>Đăng nhập Portal</h3>
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
                                <Form.Label>Mật khẩu</Form.Label>
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
            </LoginContainer>
        </Wrapper>
    );
};
