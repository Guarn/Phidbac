import React from "react";
import { Button, Form, Input, Icon, Checkbox } from "antd";
import "./Login.css";
import Axios from "../../Fonctionnels/Axios";
import { useCookies } from "react-cookie";

const Login = (props) => {
    const { setUser } = props;
    const [cookies, setCookie, removeCookie] = useCookies();
    const { getFieldDecorator, validateFields } = props.form;

    const handleSubmit = (e) => {
        e.preventDefault();
        validateFields((err, values) => {
            if (!err) {
                Axios.post("/login", {
                    email: values.email,
                    password: values.password
                }).then((rep) => {
                    setCookie("token", "Bearer " + rep.data.token, {
                        path: "/",
                        domain: ".phidbac.fr"
                    });
                    setUser({ type: "UPDATE", user: rep.data });
                });
            }
        });
    };
    return (
        <Form
            className="Login"
            onSubmit={handleSubmit}
            style={{ width: "300px" }}
        >
            <Form.Item>
                {getFieldDecorator("email", {
                    rules: [
                        {
                            required: true,
                            message: "Ce champ est requis."
                        }
                    ]
                })(
                    <Input
                        autoFocus
                        prefix={
                            <Icon
                                type="user"
                                style={{ color: "rgba(0,0,0,.25)" }}
                            />
                        }
                        placeholder="Votre adresse email"
                    />
                )}
            </Form.Item>
            <Form.Item>
                {getFieldDecorator("password", {
                    rules: [
                        {
                            required: true,
                            message: "Ce champ est requis."
                        }
                    ]
                })(
                    <Input
                        prefix={
                            <Icon
                                type="lock"
                                style={{ color: "rgba(0,0,0,.25)" }}
                            />
                        }
                        type="password"
                        placeholder="Votre mot de passe"
                    />
                )}
            </Form.Item>
            <Form.Item>
                {getFieldDecorator("remember", {
                    valuePropName: "checked",
                    initialValue: true
                })(<Checkbox>Se souvenir de moi</Checkbox>)}
                <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    block
                >
                    Connexion
                </Button>
                Ou <a href="">Créer un compte</a>
            </Form.Item>
        </Form>
    );
};

export default Login;
