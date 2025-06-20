import { themeQuartz } from "ag-grid-community";

const theme = themeQuartz.withParams({
  accentColor: "var(--color-bis-grey-20)",
  borderColor: "var(--color-bis-grey-90)",
  foregroundColor: "var(--color-bis-grey-10)",
  headerBackgroundColor: "var(--color-bis-grey-95)",
  wrapperBorderRadius: "5px",
  rowHeight: "36px",
  headerHeight: "40px",
  selectedRowBackgroundColor: "var(--color-bis-grey-97)",
  menuBackgroundColor: "var(--color-white)",
  menuShadow: "0px 2px 5px rgb(0 0 0 / 10%)",
  menuBorder: "unset",
  sideBarBackgroundColor: "var(--color-bis-grey-95)",
  sidePanelBorder: "1px solid var(--color-bis-grey-90)",
  fontFamily: "Open Sans",
  headerFontWeight: 600,
  rowHoverColor: "var(--color-bis-grey-97)",
  checkboxBorderRadius: "2px",
  checkboxCheckedBorderColor: "var(--color-bis-grey-20)",
  checkboxUncheckedBorderColor: "var(--color-bis-grey-20)",
  checkboxUncheckedBackgroundColor: "transparent",
  checkboxCheckedBackgroundColor: "var(--color-bis-grey-20)",
  focusShadow: "0 0 3px 0 var(--color-selection)",
  cellEditingBorder: "2px solid var(--color-bis-blue)",
  cellEditingShadow:
    "0 0 5px color-mix(in sRGB, var(--color-bis-blue) 25%, transparent)",
  borderRadius: "0",
});

export default theme;
