import { CustomView } from "./lib/types";
import TableCustomViewControls from "./table-custom-view-controls";
import TableMenu from "./table-menu";
import styles from "./table-toolbar.module.css";

type Props = {
  customViewsType?: string;
  customViews: CustomView[];
  customViewsLayout: "none" | "simple" | "dropdown";
  onCreateCustomView?: (customView: CustomView) => void;
  onSaveCustomView?: (customView: CustomView) => void;
  onDeleteCustomView?: (customView: CustomView) => void;
  onSelectCustomView?: (customView?: CustomView) => void;
};

function TableToolbar({
  customViewsType,
  customViews,
  customViewsLayout,
  onCreateCustomView,
  onSaveCustomView,
  onDeleteCustomView,
  onSelectCustomView,
}: Props) {
  return (
    <header className={styles.toolbar}>
      <TableCustomViewControls
        customViewsType={customViewsType}
        customViews={customViews}
        customViewsLayout={customViewsLayout}
        onCreateCustomView={onCreateCustomView}
        onSaveCustomView={onSaveCustomView}
        onDeleteCustomView={onDeleteCustomView}
        onSelectCustomView={onSelectCustomView}
      />

      <TableMenu />
    </header>
  );
}

export default TableToolbar;
