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
  useGetDrugs,
  useGetManagers,
  useGetRegions,
} from "../../../../utils/server/server";
import {
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

const ManagersGoal = () => {
  const [region, setRegion] = useState(null);
  const [date, setDate] = useState({ startDate: "", endDate: "" });
  const [specialist, setSpecialist] = useState({});
  const [selectedSpecializations, setSelectedSpecializations] = useState([]);
  const [selectedDrugs, setSelectedDrugs] = useState([]);
  const [editingSpecializationId, setEditingSpecializationId] = useState(null);
  const [editingDrugId, setEditingDrugId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const { translate } = useLanguage();
  const { data: Regions, isLoading: isLoadingRegions } = useGetRegions();
  const { data: drugs, isLoading: isLoadingDrugs } = useGetDrugs();
  const { data: managers, isLoading: isLoadingManagers } = useGetManagers({
    regionId: region,
  });

  const regionsTranslate = useMemo(
    () => transformRegionsForSelect(Regions, translate),
    [Regions, translate]
  );
  const drugsTranslate = useMemo(
    () => transformDrugsForSelect(drugs, translate),
    [drugs, translate]
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

  console.log(drugs, DrugsOptions);

  const handleChangeRegion = useCallback((selected) => {
    setRegion(selected.id);
    setSpecialist({});
  }, []);

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
            managerGoalId: 0,
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
            managerGoalId: 0,
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

  return (
    <Wrapper>
      {isLoadingRegions ||
        isLoadingManagers ||
        (isLoadingDrugs && <div className="loading">Loading...</div>)}
      <Title className="titlee">{translate("Цель_менеджеру")}</Title>
      <FormWrapper>
        <FormSectionWithGrid>
          <SectionOuter>
            <DirectionFlexGap gap="10px">
              <MiniTitleSmall>{translate("Регион")}</MiniTitleSmall>
              <PrimarySelect
                def={translate("Выберите_регион")}
                options={regionsTranslate}
                onValueChange={handleChangeRegion}
                onlyOption
              />
            </DirectionFlexGap>
            <SectionInner>
              <IconWrapper>
                <Man />
              </IconWrapper>
              <EditableSelect
                options={managerOptions}
                initialValue={specialist}
                placeholder={translate("Выберите_менеджера")}
                onValueChange={setSpecialist}
                def={specialist.label || translate("Выберите_менеджера")}
                disabled={!region}
              />
            </SectionInner>
            <DirectionFlexGap gap="10px">
              <MiniTitleSmall>{translate("Период_выполнения")}</MiniTitleSmall>
              <DateRangePicker onDateChange={handleDateChange} />
            </DirectionFlexGap>
          </SectionOuter>
          <SectionOuter>
            <RightItemMenu>
              <DirectionFlexGap gap="10px">
                <MiniTitleSmall>{translate("Охват_врачей")}</MiniTitleSmall>
                <PrimarySelect
                  def={translate("Выберите специальность")}
                  options={availableSpecializations}
                  onValueChange={handleSpecializationSelect}
                  onlyOption
                />
              </DirectionFlexGap>
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
    </Wrapper>
  );
};

export default ManagersGoal;
