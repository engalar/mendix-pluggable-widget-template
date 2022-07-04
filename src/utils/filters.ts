/*
 * @Description: 
 * @Autor: lcz
 * @Date: 2022-07-04 16:10:07
 * @LastEditors: lcz
 * @LastEditTime: 2022-07-04 16:53:18
 */
import { FilterValue } from "../piw-utils-internal/utils/FilterProvider";
import { DefaultFilterEnum } from "../../typings/DatagridTextFilterProps";

export type DefaultFilterValue = {
    type: DefaultFilterEnum;
    value: string;
};

export function translateFilters(filters?: FilterValue[]): DefaultFilterValue | undefined {
    if (filters && filters.length === 1) {
        const [filter] = filters;
        let type: DefaultFilterEnum = "equal";
        switch (filter.type) {
            case "contains":
                type = "contains";
                break;
            case "starts-with":
                type = "startsWith";
                break;
            case "ends-with":
                type = "endsWith";
                break;
            case ">":
                type = "greater";
                break;
            case ">=":
                type = "greaterEqual";
                break;
            case "=":
                type = "equal";
                break;
            case "!=":
                type = "notEqual";
                break;
            case "<":
                type = "smaller";
                break;
            case "<=":
                type = "smallerEqual";
                break;
        }
        return {
            type,
            value: String(filter.value)
        };
    }
    return undefined;
}
