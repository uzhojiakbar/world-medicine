import {
  ModalBody,
  ModalBodyHeader,
  ModalBodySection,
  ModalContainer,
  ModalHeader,
  ModalInnerSection,
  ModalUserProfilePicture,
} from "../../../../root/Modal";
import { MiniTitleSmall, Title } from "../../../../root/style";
import EditableInput from "../../../../components/Generic/EditableInput/EditableInput";
import { useLanguage } from "../../../../context/LanguageContext";
import CalendarIcon from "../../../../assets/svg/CalendarIcon";
import Table2 from "./Table2Mini";


const ModalPrescription = ({ id = 454, setId = () => { } }) => {

  const { translate } = useLanguage();

  const data = [
    {
      id: 1,
      Препарат: "Ампилин",
      Формат: "Таблетка",
      Упаковка: "80 мг.",
      Количество: "2",
      Раз_в_сутки: "5",
      Дней: "7",
    },
    {
      id: 2,
      Препарат: "Ампилин",
      Формат: "Таблетка",
      Упаковка: "80 мг.",
      Количество: "2",
      Раз_в_сутки: "5",
      Дней: "7",
    },
    {
      id: 3,
      Препарат: "Ампилин",
      Формат: "Таблетка",
      Упаковка: "80 мг.",
      Количество: "2",
      Раз_в_сутки: "5",
      Дней: "7",
    },
  ];

  return (
    <ModalContainer
      w={"50vw"}
      title={
        <ModalHeader>
          <Title>{translate("Описание_рецепта")}</Title>
          <div onClick={() => setId({})} className="closeIcon">
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.5"
                d="M43 24C43 34.4933 34.4933 43 24 43C13.5066 43 5 34.4933 5 24C5 13.5066 13.5066 5 24 5C34.4933 5 43 13.5066 43 24Z"
                stroke="#808080"
                strokeWidth="2"
              />
              <path
                d="M17.9393 17.9393C18.5251 17.3536 19.4749 17.3536 20.0606 17.9393L24 21.8788L27.9394 17.9394C28.5252 17.3536 29.4748 17.3536 30.0606 17.9394C30.6464 18.5252 30.6464 19.4749 30.0606 20.0608L26.1214 24L30.0606 27.9392C30.6464 28.525 30.6464 29.4748 30.0606 30.0606C29.4748 30.6464 28.525 30.6464 27.9392 30.0606L24 26.1214L20.0608 30.0606C19.4749 30.6464 18.5252 30.6464 17.9394 30.0606C17.3536 29.4748 17.3536 28.5252 17.9394 27.9394L21.8788 24L17.9393 20.0606C17.3536 19.4749 17.3536 18.5251 17.9393 17.9393Z"
                fill="#808080"
              />
            </svg>
          </div>
        </ModalHeader>
      }
      open={Object.keys(id).length}
      onOk={() => setId({})}
      onCancel={() => setId({})}
      footer={[]}
      centered
    >
      <ModalBody>
        <ModalBodyHeader>
          <ModalBodySection>
            <MiniTitleSmall>{translate("Врач")}</MiniTitleSmall>
            <ModalInnerSection>
              <ModalUserProfilePicture />
              <EditableInput initialValue="Саратов Молевич" isInput={false} />
            </ModalInnerSection>
          </ModalBodySection>
          <ModalBodySection>
            <MiniTitleSmall>{translate("Место_работы")}</MiniTitleSmall>
            <ModalInnerSection>
              <EditableInput initialValue="MClinic" isInput={false} />
            </ModalInnerSection>
          </ModalBodySection>
          <ModalBodySection>
            <MiniTitleSmall>{translate("Дата_назначения")}</MiniTitleSmall>
            <ModalInnerSection>
              <EditableInput
                initialValue="12.11.2024"
                isInput={false}
                inputType="text"
              />
            </ModalInnerSection>
          </ModalBodySection>
          <ModalBodySection>
            <MiniTitleSmall>{translate("Контакты_врача")}</MiniTitleSmall>
            <ModalInnerSection>
              <EditableInput
                initialValue="+998 97 737 33 11"
                isInput={false}
                inputType="text"
              />
            </ModalInnerSection>
          </ModalBodySection>
        </ModalBodyHeader>
        <ModalBodySection>
          <MiniTitleSmall>{translate("Пациент")}</MiniTitleSmall>
          <ModalInnerSection>
            <EditableInput
              brdr={"10px"}
              initialValue="Каримов Давлат"
              isInput={false}
            />
            <EditableInput
              brdr={"10px"}
              initialValue="2005 год"
              isInput={false}
              inputType="text"
              icon={<CalendarIcon />}
            />
            <EditableInput
              brdr={"10px"}
              initialValue="+998 97 709 33 22"
              isInput={false}
              inputType="text"
            />
          </ModalInnerSection>
        </ModalBodySection>

        <Table2
          title={translate("Рекомендованные_препараты")}
          data={data || []}
        />
        <ModalBodySection>
          <MiniTitleSmall>
            {translate("Дополнительные_комментарии")}
          </MiniTitleSmall>
          <ModalInnerSection>
            <EditableInput
              initialValue="Асц употреблять строго до еды"
              isInput={false}
            />
          </ModalInnerSection>
        </ModalBodySection>
      </ModalBody>
    </ModalContainer>
  );
};

export default ModalPrescription;
