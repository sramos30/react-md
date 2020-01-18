import React, {
  FC,
  TdHTMLAttributes,
  forwardRef,
  Ref,
  CSSProperties,
} from "react";
import cn from "classnames";
import { CheckboxProps, Checkbox } from "@react-md/form";
import { WithForwardedRef } from "@react-md/utils";
import TableCell, { TableCellProps } from "./TableCell";

type WantedCheckboxProps =
  | "icon"
  | "iconStyle"
  | "iconClassName"
  | "toggleStyle"
  | "toggleClassName"
  | "disableIconOverlay"
  | "checked"
  | "onChange"
  | "defaultChecked"
  | "indeterminate"
  | "aria-controls";

export interface TableCheckboxProps
  extends Omit<
      TdHTMLAttributes<HTMLTableDataCellElement>,
      "onChange" | "scope" | "aria-sort"
    >,
    Pick<CheckboxProps, WantedCheckboxProps>,
    Pick<TableCellProps, "sticky"> {
  /**
   * The id for the checkbox. This is required for a11y.
   */
  id: string;

  /**
   * An optional id to provide to the `<td>` element. The base `id` prop is
   * passed to the checkbox input instead.
   */
  cellId?: string;

  /**
   * An screen reader label to use for the checkbox. Either this or the `aria-labelledby`
   * prop are required for a11y.
   *
   * Note: This is defaulted automatically to "Toggle Row Selection".
   */
  "aria-label"?: string;

  /**
   * An optional id or space-delimited list of ids that describe the checkbox. Either this or
   * the `aria-label` props are required for a11y.
   */
  "aria-labelledby"?: string;

  /**
   * An optional `ref` to apply to the checkbox element. The base `ref` is passed to the `<td>`
   * element.
   */
  checkboxRef?: Ref<HTMLInputElement>;

  /**
   * An optional style to apply to the checkbox. The base `style` is passed to the `<td>`.
   */
  checkboxStyle?: CSSProperties;

  /**
   * An optional className to apply to the checkbox. The base `className` is passed to the `<td>`.
   */
  checkboxClassName?: string;
}

type WithRef = WithForwardedRef<HTMLTableDataCellElement>;

/**
 * This is a simple wrapper for the `Checkbox` component that allows you to render a nicely
 * styled `Checkbox` within a `TableCell` element. This will mostly just remove the additional
 * padding applied and default an `aria-label` since you normally don't want a checkbox with
 * a label within a table since it's more for selection.
 */
const TableCheckbox: FC<TableCheckboxProps & WithRef> = ({
  cellId,
  className,
  forwardedRef,
  id,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  "aria-checked": ariaChecked,
  "aria-controls": ariaControls,
  checkboxRef,
  checkboxStyle,
  checkboxClassName,
  icon,
  iconStyle,
  iconClassName,
  toggleStyle,
  toggleClassName,
  disableIconOverlay,
  checked,
  onChange,
  defaultChecked,
  indeterminate,
  ...props
}) => {
  return (
    <TableCell
      {...props}
      id={cellId}
      header={false}
      ref={forwardedRef}
      className={cn("rmd-table-cell--checkbox", className)}
    >
      <Checkbox
        id={id}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-checked={ariaChecked}
        aria-controls={ariaControls}
        ref={checkboxRef}
        style={checkboxStyle}
        indeterminate={indeterminate}
        className={checkboxClassName}
        icon={icon}
        iconStyle={iconStyle}
        iconClassName={iconClassName}
        toggleStyle={toggleStyle}
        toggleClassName={toggleClassName}
        disableIconOverlay={disableIconOverlay}
        checked={checked}
        onChange={onChange}
        defaultChecked={defaultChecked}
      />
    </TableCell>
  );
};

TableCheckbox.defaultProps = {
  "aria-label": "Toggle Row Selection",
};

if (process.env.NODE_ENV !== "production") {
  TableCheckbox.displayName = "TableCheckbox";

  let PropTypes;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    TableCheckbox.propTypes = {
      id: PropTypes.string.isRequired,
      className: PropTypes.string,
      "aria-label": PropTypes.string,
      "aria-labelledby": PropTypes.string,
      "aria-checked": PropTypes.string,
      "aria-controls": PropTypes.string,
      checkboxRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
      checkboxStyle: PropTypes.object,
      checkboxClassName: PropTypes.string,
      icon: PropTypes.node,
      iconStyle: PropTypes.object,
      iconClassName: PropTypes.string,
      toggleStyle: PropTypes.object,
      toggleClassName: PropTypes.string,
      disableIconOverlay: PropTypes.bool,
      checked: PropTypes.bool,
      defaultChecked: PropTypes.bool,
      onChange: PropTypes.func,
      cellId: PropTypes.string,
      forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
      indeterminate: PropTypes.bool,
    };
  }
}

export default forwardRef<HTMLTableDataCellElement, TableCheckboxProps>(
  (props, ref) => <TableCheckbox {...props} forwardedRef={ref} />
);