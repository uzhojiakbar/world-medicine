import React, { useState, useMemo, useCallback } from "react";
import {
  Child,
  DirectionFlexGap,
  EditIconCon,
  FormSectionWithGrid,
  FormWrapper,
  IconWrapper,
  ItemContainer,
  RightItemMenu,
  SectionInner,
  SectionOuter,
  Wrap,
  Wrapper,
} from "./style";
import { MiniTitleSmall, Title } from "../../../../root/style";
import PrimarySelect from "../../../../components/Generic/Select/Select";
import {
  useAddAdminMedAgentGoal,
  useGetDistricts,
  useGetDrugs,
  useGetMedAgents,
  useGetProfileInfo,
  useGetRegions,
} from "../../../../utils/server/server";
import {
  transformDistrictsForSelect,
  transformDrugsForSelect,
  transformRegionsForSelect,
} from "../../../../utils/transformRegionsForSelect";
import { useLanguage } from "../../../../context/LanguageContext";
import EditableSelect from "../../../../components/Generic/EditableSelect/EditableSelect";
import Man from "../../../../assets/svg/Man";
import DateRangePicker from "../../../../components/Generic/DataRangePicker/DataRangePicker";
import FieldnamesManager from "../../../../utils/fieldnamesManager";
import SaveIcon from "../../../../assets/svg/SaveIcon";
import EditIcon from "../../../../assets/svg/EditIcon";
import DeleteIcon from "../../../../assets/svg/DeleteIcon";
import { message } from "antd";
import Button from "../../../../components/Generic/Button/Button";
import IconPlus from "../../../../assets/svg/IconPlus";

const MedRepGoal = () => {
  const [date, setDate] = useState({ startDate: "", endDate: "" });
  const [specialist, setSpecialist] = useState({});
  const [selectedSpecializations, setSelectedSpecializations] = useState([]);
  const [selectedDrugs, setSelectedDrugs] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [editingSpecializationId, setEditingSpecializationId] = useState(null);
  const [editingDrugId, setEditingDrugId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [loading, setLoading] = useState(false);

  const { translate, language } = useLanguage();
  const { data: Regions, isLoading: isLoadingRegions } = useGetRegions();
  const { data: drugs, isLoading: isLoadingDrugs } = useGetDrugs();
  const { data: managers, isLoading: isLoadingManagers } = useGetMedAgents({});

  const { data: profileInfo, isLoading: IsLoadingProfileInfo } =
    useGetProfileInfo();

  const getAllDistricts = (regions) => {
    return Regions?.flatMap((region) => region.districts || []);
  };

  const mutation = useAddAdminMedAgentGoal();

  const drugsTranslate = useMemo(
    () => transformDrugsForSelect(drugs, translate),
    [drugs, translate]
  );
  const districtsTranslate = useMemo(
    () => transformDistrictsForSelect(getAllDistricts(), language),
    [Regions, translate]
  );

  const managerOptions = useMemo(
    () =>
      managers?.map((manager) => ({
        value: manager.userId,
        label: `${manager.firstName} ${manager.lastName}`,
        id: manager.userId,
      })) || [],
    [managers]
  );

  const DrugsOptions = useMemo(
    () =>
      drugs?.map((drug) => ({
        value: drug.id,
        label: drug.name,
        id: drug.id,
      })) || [],
    [drugs]
  );

  console.log(selectedDistrict);
  // console.log("districtsTranslate", districtsTranslate);

  const handleDateChange = useCallback((dates) => setDate(dates), []);

  const handleEditInitSpecialization = useCallback((id, quote) => {
    setEditingSpecializationId(id);
    setEditValue(quote);
  }, []);

  const handleEditInitDrug = useCallback((id, quote) => {
    setEditingDrugId(id);
    setEditValue(quote);
  }, []);

  const handleEditSaveSpecialization = useCallback(
    (id) => {
      setSelectedSpecializations((prev) =>
        prev.map((spec) =>
          spec.id === id ? { ...spec, quote: editValue } : spec
        )
      );
      setEditingSpecializationId(null);
      setEditValue("");
    },
    [editValue]
  );

  const handleEditSaveDrug = useCallback(
    (id) => {
      setSelectedDrugs((prev) =>
        prev.map((drug) =>
          drug.id === id ? { ...drug, quote: editValue } : drug
        )
      );
      setEditingDrugId(null);
      setEditValue("");
    },
    [editValue]
  );

  const handleDeleteSpecialization = useCallback((id) => {
    setSelectedSpecializations((prev) => prev.filter((spec) => spec.id !== id));
  }, []);

  const handleDeleteDrug = useCallback((id) => {
    setSelectedDrugs((prev) => prev.filter((drug) => drug.id !== id));
  }, []);

  const handleSpecializationSelect = useCallback(
    (selected) => {
      if (
        !selectedSpecializations.some((s) => s.fieldName === selected.label)
      ) {
        setSelectedSpecializations((prev) => [
          ...prev,
          {
            id: selected.id,
            fieldName: selected.label,
            quote: 0,
          },
        ]);
      }
    },
    [selectedSpecializations]
  );

  const handleDrugSelect = useCallback(
    (selected) => {
      if (!selectedDrugs.some((d) => d.fieldName === selected.label)) {
        setSelectedDrugs((prev) => [
          ...prev,
          {
            id: selected.id,
            fieldName: selected.label,
            quote: 0,
          },
        ]);
      }
    },
    [selectedDrugs]
  );

  const availableSpecializations = useMemo(
    () =>
      FieldnamesManager().filter(
        (spec) =>
          !selectedSpecializations.some((s) => s.fieldName === spec.label)
      ),
    [selectedSpecializations]
  );

  const prepareRequestData = (adminId = "asdasd") => {
    if (!specialist?.id) {
      console.error(translate("представитель_не_найден"));
      message.warning(translate("представитель_не_найден"));
      return;
    }
    if (!date?.startDate || !date?.endDate) {
      message.warning(translate("Дата_начала_или_окончания_не_указана"));
      console.log(translate("Дата_начала_или_окончания_не_указана"));
      return;
    }
    if (!selectedSpecializations.length) {
      console.error(translate("Выбранные_специализации_недоступны"));
      message.warning(translate("Выбранные_специализации_недоступны"));
      return;
    }
    if (!selectedDrugs.length) {
      console.error(translate("Препараты_не_выбраны"));
      message.warning(translate("Препараты_не_выбраны"));
      return;
    }
    console.log(selectedDistrict);

    if (!selectedDistrict?.districtId) {
      console.error(translate("Пожалуйста_выберите_один_из_районов"));
      message.warning(translate("Пожалуйста_выберите_один_из_районов"));
      return;
    }

    if (!profileInfo?.userId) {
      console.error("Admin ID topilmadi");
      return;
    }

    const requestData = {
      createdAt: new Date().toISOString().split("T")[0],
      startDate: date.startDate,
      endDate: date.endDate,
      medAgentId: specialist.id,
      managerId: specialist.id,
      districtId: selectedDistrict?.districtId || 0,
      medicineWithQuantityDTOS: selectedDrugs.map((drug) => ({
        medicineId: drug.id,
        medicineName: drug.fieldName,
        quote: drug.quote,
      })),
      fieldWithQuantityDTOS: selectedSpecializations.map((spec) => ({
        id: spec.id,
        fieldName: spec.fieldName,
        quote: spec.quote,
      })),
      managerId: profileInfo.userId,
    };

    mutation.mutate({
      requestData: requestData,
      onSuccess: () => {
        message.success(translate("Добавлена_​​цель_для_представителю"));
        setTimeout(() => {
          setLoading(false);

          document.location.reload();
        }, 500);
      },
      onError: () => {
        setLoading(false);
        message.error(translate("Ошибка_добавления_цели_для_представителю"));
      },
    });
    console.log("mutation.status", mutation.status);

    console.log("Request Data:", requestData);
    return requestData;
  };

  return (
    <Wrapper>
      {(loading ||
        isLoadingRegions ||
        isLoadingManagers ||
        isLoadingDrugs ||
        IsLoadingProfileInfo) && (
        <div className="loaderParent">
          <div className="loader"></div>
        </div>
      )}
      <Title className="titlee">{translate("Цель_мед_представителю")}</Title>
      <FormWrapper>
        <FormSectionWithGrid>
          <SectionOuter>
            <DirectionFlexGap gap="10px">
              <MiniTitleSmall>{translate("Кому")}</MiniTitleSmall>
            </DirectionFlexGap>
            <SectionInner>
              <IconWrapper>
                <Man />
              </IconWrapper>
              <EditableSelect
                options={managerOptions}
                initialValue={specialist}
                // onClick={() => {
                //   !region &&
                //     message.error(translate("Сначала_выберите_регион"));
                // }}
                placeholder={translate("Выберите_представителя")}
                onValueChange={setSpecialist}
                def={specialist.label || translate("Выберите_представителя")}
                // disabled={!region}
              />
            </SectionInner>

            <DirectionFlexGap gap="10px">
              <MiniTitleSmall>{translate("Период_выполнения")}</MiniTitleSmall>
              <DateRangePicker onlyFuture={1} onDateChange={handleDateChange} />
            </DirectionFlexGap>

            <DirectionFlexGap gap="10px">
              <MiniTitleSmall>{translate("Выберите_Район_")}</MiniTitleSmall>
              <PrimarySelect
                def={translate("Выберите_Район_")}
                options={districtsTranslate}
                onValueChange={setSelectedDistrict}
                onlyOption
              />
            </DirectionFlexGap>
          </SectionOuter>
          <SectionOuter>
            <RightItemMenu>
              <MiniTitleSmall>{translate("Охват_врачей")}</MiniTitleSmall>
              <PrimarySelect
                def={translate("Выберите специальность")}
                options={availableSpecializations}
                onValueChange={handleSpecializationSelect}
                onlyOption
              />
              <Wrap>
                {selectedSpecializations.map((v) => (
                  <ItemContainer key={v.id}>
                    <Child>
                      <EditIconCon
                        onClick={() => handleDeleteSpecialization(v.id)}
                      >
                        <DeleteIcon />
                      </EditIconCon>
                      <span>{translate(v.fieldName)}</span>
                    </Child>
                    <Child>
                      {editingSpecializationId === v.id ? (
                        <>
                          <input
                            type="number"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                          />
                          <EditIconCon
                            onClick={() => handleEditSaveSpecialization(v.id)}
                          >
                            <SaveIcon />
                          </EditIconCon>
                        </>
                      ) : (
                        <>
                          <span>{v.quote}</span>
                          <EditIconCon
                            onClick={() =>
                              handleEditInitSpecialization(v.id, v.quote)
                            }
                          >
                            <EditIcon />
                          </EditIconCon>
                        </>
                      )}
                    </Child>
                  </ItemContainer>
                ))}
              </Wrap>
            </RightItemMenu>
            <RightItemMenu>
              <DirectionFlexGap gap="10px">
                <MiniTitleSmall>
                  {translate("Выберите_препарат")}
                </MiniTitleSmall>
                <PrimarySelect
                  def={translate("Выберите_препарат")}
                  options={drugsTranslate}
                  onValueChange={handleDrugSelect}
                  onlyOption
                />
              </DirectionFlexGap>
              <Wrap>
                {selectedDrugs.map((v) => (
                  <ItemContainer key={v.id}>
                    <Child>
                      <EditIconCon onClick={() => handleDeleteDrug(v.id)}>
                        <DeleteIcon />
                      </EditIconCon>
                      <span>{translate(v.fieldName)}</span>
                    </Child>
                    <Child>
                      {editingDrugId === v.id ? (
                        <>
                          <input
                            type="number"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                          />
                          <EditIconCon onClick={() => handleEditSaveDrug(v.id)}>
                            <SaveIcon />
                          </EditIconCon>
                        </>
                      ) : (
                        <>
                          <span>{v.quote}</span>
                          <EditIconCon
                            onClick={() => handleEditInitDrug(v.id, v.quote)}
                          >
                            <EditIcon />
                          </EditIconCon>
                        </>
                      )}
                    </Child>
                  </ItemContainer>
                ))}
              </Wrap>
            </RightItemMenu>
          </SectionOuter>
        </FormSectionWithGrid>
      </FormWrapper>
      <Button
        mw={"1000px"}
        w={"100%"}
        icon={<IconPlus />}
        onClick={prepareRequestData}
      >
        {translate("Назначить_задачу")}
      </Button>
    </Wrapper>
  );
};

export default MedRepGoal;
