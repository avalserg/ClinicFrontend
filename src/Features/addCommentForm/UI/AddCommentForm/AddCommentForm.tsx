/* eslint-disable react/display-name */

import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Button } from "@/Shared/UI/Button";
import { Input } from "@/Shared/UI/Input";
import { HStack } from "@/Shared/UI/Stack";
import { classNames } from "@/Shared/lib/classNames/classNames";
import DynamicModuleLoader, {
  ReducersList,
} from "@/Shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "@/Shared/lib/hooks/useAppDispatch/useAppDispatch";
import {
  getAddCommentFormError,
  getAddCommentFormText,
} from "../../Model/selectors/addCommentFormSelectors";
import {
  addCommentFormActions,
  addCommentFormReducer,
} from "../../Model/slices/addCommentFormSlice";
import cls from "./AddCommentForm.module.scss";
import { Card } from "@/Shared/UI/Card";

export interface AddCommentFormProps {
  className?: string;
  // делегируем отправку комментария внешней сущности
  onSendComment: (text: string) => void;
}
const reducers: ReducersList = {
  addCommentForm: addCommentFormReducer,
};

const AddCommentForm = memo((props: AddCommentFormProps) => {
  const { className, onSendComment } = props;
  const { t } = useTranslation("");
  const text = useSelector(getAddCommentFormText);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const error = useSelector(getAddCommentFormError);
  const dispatch = useAppDispatch();
  const onCommentTextChange = useCallback(
    (value: string) => {
      dispatch(addCommentFormActions.setText(value));
    },
    [dispatch],
  );

  const onSendHandler = useCallback(() => {
    onSendComment(text || "");
    // clear input
    onCommentTextChange("");
  }, [onCommentTextChange, onSendComment, text]);
  return (
    <DynamicModuleLoader reducers={reducers}>
      <Card padding={"24"} border={"partialRound"} max>
        <HStack
          data-testid={"AddCommentForm"}
          justify={"between"}
          max
          gap={"16"}
          className={classNames(cls.AddCommentFormRedesigned, {}, [className])}
        >
          <Input
            data-testid={"AddCommentForm.Input"}
            className={cls.input}
            placeholder={t("Введите текст комментария")}
            value={text}
            onChange={onCommentTextChange}
          />
          <Button
            data-testid={"AddCommentForm.Button"}
            onClick={onSendHandler}
            variant={"outline"}
          >
            {t("Отправить")}
          </Button>
        </HStack>
      </Card>
    </DynamicModuleLoader>
  );
});
// for async version only default export
export default AddCommentForm;
