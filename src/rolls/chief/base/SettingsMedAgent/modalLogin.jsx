import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  background-color: white;
  border-radius: 10px;
  justify-content: space-between;
  margin: 20px 0;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 40%;
  position: relative;

  @media (max-width: 768px) {
    flex: 1 1 100%;
  }
`;

const Label = styled.label`
  margin-bottom: 8px;
  font-size: 24px;
  color: #000000;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const Input = styled.input`
  padding: 17px 20px;
  border-radius: 50px;
  border: none;
  font-size: 14px;
  outline: none;
  background-color: #f7f8fc;
  position: relative;

  &:focus {
    border-color: #888;
  }

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 12px;
  }
`;

const PasswordToggle = styled.span`
  position: absolute;
  top: 77%;
  right: 15px;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 18px;
  color: #666;

  @media (max-width: 768px) {
    font-size: 16px;
    right: 10px;
  }
`;

const Button = styled.button`
  background-color: #ff4d4d;
  color: white;
  font-size: 14px;
  font-weight: bold;
  padding: 17px 20px;
  border: none;
  border-radius: 50px;
  cursor: pointer;

  &:hover {
    background-color: #ff3333;
  }

  @media (max-width: 768px) {
    font-size: 12px;
    padding: 10px 15px;
  }
`;



const ModalLogin = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [formData, setFormData] = useState({
        login: "",
        email: "",
        password: "",
    });

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitted Form Data:", formData);
    };

   
    return (
        <form onSubmit={handleSubmit}>
             
            <Container>
                <InputContainer>
                    <Label>Логин</Label>
                    <Input
                        type="text"
                        name="login"
                        value={formData.login}
                        onChange={handleChange}
                        placeholder="Введите логин"
                    />
                </InputContainer>

                <InputContainer>
                    <Label>Почта</Label>
                    <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Введите почту"
                    />
                </InputContainer>

                <InputContainer>
                    <Label>Пароль</Label>
                    <Input
                        type={passwordVisible ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Введите пароль"
                    />
                    <PasswordToggle onClick={togglePasswordVisibility}>
                        {passwordVisible ? <i class="fa-solid fa-eye"></i> :<i className="fa-solid fa-eye-slash"></i>}
                    </PasswordToggle>
                </InputContainer>

                <InputContainer>
                    <Label>Сбросить пароль</Label>
                    <Button type="submit">Получить новый пароль</Button>
                </InputContainer>
            </Container>
        </form>
    );
};

export default ModalLogin;
