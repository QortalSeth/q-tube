import SavedSearchIcon from "@mui/icons-material/SavedSearch";
import { IconButton, Tooltip } from "@mui/material";
import { createQortalLink, IndexCategory, useGlobal } from "qapp-core";
import { CustomTooltip } from "./CustomTooltip.tsx";
import { useLocation } from "react-router-dom";

export interface IndexButtonProps {
  channelName: string;
}

export const IndexButton = ({ channelName }: IndexButtonProps) => {
  const openPageIndexManager = useGlobal().indexOperations.openPageIndexManager;
  const location = useLocation();

  return (
    <CustomTooltip title={`Index Video`} arrow placement={"top"}>
      <IconButton
        sx={{ padding: 0 }}
        onClick={() => {
          const link = createQortalLink("APP", "Q-Tube", location.pathname);
          openPageIndexManager({
            link: link,
            name: channelName,
            category: IndexCategory.PUBLIC_PAGE_VIDEO,
            rootName: "Q-Tube",
          });
        }}
      >
        <SavedSearchIcon fontSize={"large"} htmlColor={"#00C1E8"} />
      </IconButton>
    </CustomTooltip>
  );
};
