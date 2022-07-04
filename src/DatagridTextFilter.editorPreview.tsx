/*
 * @Description:
 * @Autor: lcz
 * @Date: 2022-07-01 21:04:01
 * @LastEditors: lcz
 * @LastEditTime: 2022-07-04 16:33:04
 */
import { ReactElement } from "react";
import { DataGridTextFilterPreviewProps } from "../typings/DatagridTextFilterProps";
import { FilterComponent } from "./components/FilterComponent";
import { parseStyle } from "./piw-utils-internal/functions";

export function preview(props: DataGridTextFilterPreviewProps): ReactElement {
    return (
        <FilterComponent
            adjustable={props.adjustable}
            className={props.className}
            defaultFilter={props.defaultFilter}
            delay={props.delay ?? 500}
            placeholder={props.placeholder}
            screenReaderButtonCaption={props.screenReaderButtonCaption}
            screenReaderInputCaption={props.screenReaderInputCaption}
            styles={parseStyle(props.style)}
            value={props.defaultValue}
        />
    );
}
