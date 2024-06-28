/* eslint-disable react/display-name */
import { memo } from "react";
import { useParams } from "react-router-dom";
import { ArticleDetails } from "@/Entities/Article";
import { Card } from "@/Shared/UI/Card";

interface DetailsContainerProps {
  className?: string;
}
// обертка на д ArticleDetails
export const DetailsContainer = memo((props: DetailsContainerProps) => {
  const { className } = props;
  const { id } = useParams<{ id: string }>();
  if (!id) {
    return null;
  }
  return (
    <Card max border={"partialRound"} className={className} padding={"24"}>
      <ArticleDetails id={id} />
    </Card>
  );
});
