import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { StatsData } from "../../../components/StatsData.tsx";
import { categories, subCategories } from "../../../constants/Categories.ts";
import { useSidebarState } from "./SearchSidebar-State.tsx";
import {
  FiltersCol,
  FiltersContainer,
  FiltersRadioButton,
  FiltersRow,
  FiltersSubContainer,
} from "./VideoList-styles.tsx";

export interface SearchSidebarProps {
  onSearch: (reset?: boolean, resetFilters?: boolean) => void;
}
export const SearchSidebar = ({ onSearch }: SearchSidebarProps) => {
  const {
    filterSearch,
    filterName,
    filterType,
    setFilterSearch,
    handleInputKeyDown,
    setFilterName,
    selectedCategoryVideos,
    handleOptionCategoryChangeVideos,
    selectedSubCategoryVideos,
    handleOptionSubCategoryChangeVideos,
    setFilterType,
    filtersToDefault,
  } = useSidebarState(onSearch);

  return (
    <FiltersCol item xs={12} md={2} lg={2} xl={2} sm={3}>
      <FiltersContainer>
        <StatsData />
        <Input
          id="standard-adornment-name"
          onChange={e => {
            setFilterSearch(e.target.value);
          }}
          value={filterSearch}
          placeholder="Search"
          onKeyDown={handleInputKeyDown}
          sx={{
            borderBottom: "1px solid white",
            "&&:before": {
              borderBottom: "none",
            },
            "&&:after": {
              borderBottom: "none",
            },
            "&&:hover:before": {
              borderBottom: "none",
            },
            "&&.Mui-focused:before": {
              borderBottom: "none",
            },
            "&&.Mui-focused": {
              outline: "none",
            },
            fontSize: "18px",
          }}
        />
        <Input
          id="standard-adornment-name"
          onChange={e => {
            setFilterName(e.target.value);
          }}
          value={filterName}
          placeholder="User's Name (Exact)"
          onKeyDown={handleInputKeyDown}
          sx={{
            marginTop: "20px",
            borderBottom: "1px solid white",
            "&&:before": {
              borderBottom: "none",
            },
            "&&:after": {
              borderBottom: "none",
            },
            "&&:hover:before": {
              borderBottom: "none",
            },
            "&&.Mui-focused:before": {
              borderBottom: "none",
            },
            "&&.Mui-focused": {
              outline: "none",
            },
            fontSize: "18px",
          }}
        />

        <FiltersSubContainer>
          <FormControl sx={{ width: "100%", marginTop: "30px" }}>
            <Box
              sx={{
                display: "flex",
                gap: "20px",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <FormControl fullWidth sx={{ marginBottom: 1 }}>
                <InputLabel
                  sx={{
                    fontSize: "16px",
                  }}
                  id="Category"
                >
                  Category
                </InputLabel>
                <Select
                  labelId="Category"
                  input={<OutlinedInput label="Category" />}
                  value={selectedCategoryVideos?.id || ""}
                  onChange={handleOptionCategoryChangeVideos}
                  sx={{
                    // Target the input field
                    ".MuiSelect-select": {
                      fontSize: "16px", // Change font size for the selected value
                      padding: "10px 5px 15px 15px;",
                    },
                    // Target the dropdown icon
                    ".MuiSelect-icon": {
                      fontSize: "20px", // Adjust if needed
                    },
                    // Target the dropdown menu
                    "& .MuiMenu-paper": {
                      ".MuiMenuItem-root": {
                        fontSize: "14px", // Change font size for the menu items
                      },
                    },
                  }}
                >
                  {categories.map(option => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {selectedCategoryVideos &&
                subCategories[selectedCategoryVideos?.id] && (
                  <FormControl fullWidth sx={{ marginBottom: 2 }}>
                    <InputLabel
                      sx={{
                        fontSize: "16px",
                      }}
                      id="Sub-Category"
                    >
                      Sub-Category
                    </InputLabel>
                    <Select
                      labelId="Sub-Category"
                      input={<OutlinedInput label="Sub-Category" />}
                      value={selectedSubCategoryVideos?.id || ""}
                      onChange={e =>
                        handleOptionSubCategoryChangeVideos(
                          e,
                          subCategories[selectedCategoryVideos?.id]
                        )
                      }
                      sx={{
                        // Target the input field
                        ".MuiSelect-select": {
                          fontSize: "16px", // Change font size for the selected value
                          padding: "10px 5px 15px 15px;",
                        },
                        // Target the dropdown icon
                        ".MuiSelect-icon": {
                          fontSize: "20px", // Adjust if needed
                        },
                        // Target the dropdown menu
                        "& .MuiMenu-paper": {
                          ".MuiMenuItem-root": {
                            fontSize: "14px", // Change font size for the menu items
                          },
                        },
                      }}
                    >
                      {subCategories[selectedCategoryVideos.id].map(option => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
            </Box>
          </FormControl>
        </FiltersSubContainer>
        <FiltersSubContainer>
          <FiltersRow>
            Videos
            <FiltersRadioButton
              checked={filterType === "videos"}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setFilterType("videos");
              }}
              inputProps={{ "aria-label": "controlled" }}
            />
          </FiltersRow>
          <FiltersRow>
            Playlists
            <FiltersRadioButton
              checked={filterType === "playlists"}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setFilterType("playlists");
              }}
              inputProps={{ "aria-label": "controlled" }}
            />
          </FiltersRow>
        </FiltersSubContainer>
        <Button
          onClick={() => {
            filtersToDefault();
          }}
          sx={{
            marginTop: "20px",
          }}
          variant="contained"
        >
          reset
        </Button>
        <Button
          onClick={() => {
            onSearch(true);
          }}
          sx={{
            marginTop: "20px",
          }}
          variant="contained"
        >
          Search
        </Button>
      </FiltersContainer>
    </FiltersCol>
  );
};
