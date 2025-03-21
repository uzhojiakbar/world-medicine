import styled from "styled-components";
import {motion} from "framer-motion";

const Wrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 10px;
  min-width: 320px;
  margin: 0 auto;

  @media (max-width: 768px) {
    gap: 15px;
  }
`;

const Header = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 950px;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    align-items: flex-start;
    gap: 20px;
  }
`;

const ProfileImg = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }
`;

const UserName = styled.div`
  font-size: 26px;
  font-weight: 500;
  line-height: 38px;

  @media (max-width: 768px) {
    font-size: 20px;
    line-height: 30px;
  }
`;

const UserDate = styled.div`
  display: flex;
  gap: 23px;

  @media (max-width: 768px) {
    gap: 15px;
  }
`;

const UserSetting = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 768px) {
    /* flex-direction: column; */
    gap: 10px;
  }
`;

const ExitIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: white;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: rgb(229, 235, 245);
  }
  &:active {
    transform: scale(0.95);
  }

  user-select: none;

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }
  @media (max-width: 425px) {
    width: 40px;
    height: 40px;
  }
`;

const MainAdminButton = styled.div`
  display: flex;
  align-items: center;
  gap: 13px;
  border-radius: 45px;
  padding: 25px 23px;
  background-color: white;
  font-size: 18px;
  line-height: 30px;
  font-weight: 400;
  color: #216bf4;
  cursor: pointer;
  transition: all 0.3s;

  user-select: none;

  @media (max-width: 768px) {
    font-size: 16px;
    line-height: 26px;
    padding: 15px 18px;
  }
`;

const FormWrapper = styled(motion.div)`
  max-width: 950px;
  width: 100%;
  border-radius: 24px;
  padding: 20px;
  background-color: white;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const Section = styled.div`
  width: 100%;
`;

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ pad }) => !pad && "19px 20px"};
  padding-right: ${({ pad }) => pad && "15px"};
  margin-top: 10px;
  background-color: ${({ bgcolor }) => (bgcolor ? bgcolor : "#f7f8fc")};
  border-radius: 50px;
  font-size: 14px;
  font-weight: 600;
  line-height: 21px;

  @media (max-width: 768px) {
    align-items: flex-start;
    padding: ${({ pad }) => !pad && "15px"};
    font-size: 12px;
  }
`;

const Name = styled.div`
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const Text = styled.div`
  display: flex;
  gap: 10px;
  margin-top: ${({ mt }) => mt && "20px"};

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 5px;
  }
`;

const Input = styled.input`
  width: 100%;
  height: 55px;
  border-radius: inherit;
  background-color: inherit;
  border: none;
  padding: 0 20px;
  outline: none;

  @media (max-width: 768px) {
    height: 45px;
    padding: 0 15px;
  }
`;

const Input2 = styled.input`
  width: 100%;
  height: 60px;
  border-radius: 30px;
  background-color: ${(bgcolor) => (bgcolor ? bgcolor : "inherit")};
  border: 1px solid #d9d9d9;

  padding: 0 20px;
  outline: none;

  @media (max-width: 768px) {
    height: 20px;
    padding: 0 15px;
  }
`;

const ResetPassword = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  width: 100%;
  height: 55px;
  background-color: ${({ bgcolor }) =>
    typeof bgcolor == "string" ? bgcolor : "#fb3748"};
  padding: 0 20px;
  font-size: 14px;
  line-height: 21px;
  font-weight: 600;
  color: ${({ color }) => (color ? color : "white")};
  border-radius: 50px;
  margin-top: ${({mt})=>mt?mt:"10px"};
  cursor: pointer;
  transition: filter 0.3s ease;
  font-family: "Vela Sans GX SemiBold";
  user-select: none;

  &:hover {
    filter: brightness(85%);
  }

  @media (max-width: 768px) {
    height: 45px;
    font-size: 12px;
  }
  text-align: left;
`;

const Item = styled.span``;

export {
  Input,
  Wrapper,
  ProfileImg,
  Header,
  UserName,
  UserDate,
  UserSetting,
  ExitIcon,
  MainAdminButton,
  FormWrapper,
  InputWrapper,
  Name,
  Text,
  Section,
  ResetPassword,
  Item,
  Input2,
};
