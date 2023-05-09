import styled from "styled-components";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {setJwtToken} from "../../store";
import useNavigation from "../../hooks/use-navigation";


function LoginForm() {
    const {navigate} = useNavigation();
    const dispatch = useDispatch();
    const [inputs, setInputs] = useState({});

    const handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({...values, [name]: value}))
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const results = await fetch("http://localhost:8080/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: inputs.username,
                password: inputs.password,
            })
        });
        if(results.ok) {
            const data = await results.text();
            dispatch(setJwtToken(data));
            navigate("/");
        }
    };

    return(
        <LoginFormWrapper onSubmit={handleSubmit}>
            <h1>Login</h1>
            <input
                type={"text"}
                name={"username"}
                placeholder={"Username"}
                value={inputs.username || ""}
                onChange={handleChange}
            />
            <input
                type={"password"}
                name={"password"}
                placeholder={"Password"}
                value={inputs.password || ""}
                onChange={handleChange}
            />
            <button type={"submit"}>Submit</button>
        </LoginFormWrapper>
    );
}

export default LoginForm;

const LoginFormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  margin: 0 auto;
  h1 {
    font-size: xxx-large;
  }
  button, input {
    width: 100%;
    margin-top: 1rem;
  }
`;