import React, { useEffect, FormEvent, useContext } from "react";
import { Button, Form, Input, Icon, Checkbox } from "antd";
import "./Login.css";
import Axios from "../../Fonctionnels/Axios";
import { useCookies } from "react-cookie";
import { userContext } from "../../../App";

export interface Login_PROPS {
    form: any;
}

export type formConnect = {
    email: string;
    password: string;
    remember: boolean;
};

export type formError = {
    email?: { errors: { message: string; field: string }[] };
    password?: { errors: { message: string; field: string }[] };
};

const Login = (props: Login_PROPS) => {
    const [, userDispatch] = useContext(userContext);
    const [, setCookie] = useCookies();
    const { getFieldDecorator, validateFields } = props.form;

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        validateFields((err: formError, values: formConnect) => {
            if (!err) {
                Axios.post("/login", {
                    email: values.email,
                    password: values.password
                })
                    .then((rep) => {
                        let dateExp = new Date(Date.now());
                        dateExp.setDate(365);

                        userDispatch({ type: "UPDATE", user: rep.data });
                        setCookie("token", "Bearer " + rep.data.token, {
                            path: "/",
                            domain: ".phidbac.fr",
                            expires: dateExp
                        });
                    })
                    .catch((err) => console.log(err));
            }
        });
    };
    useEffect(() => {}, [validateFields]);
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
                Ou{" "}
                <span style={{ color: "blue", cursor: "pointer" }}>
                    Créer un compte
                </span>
            </Form.Item>
        </Form>
    );
};

export default Login;
