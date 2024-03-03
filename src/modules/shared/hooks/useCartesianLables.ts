import { useMemo } from 'react';

type Axis = (string | number | null)[][];

/**
 * this method is checking if each of the axes data only contains number and if integers or not
 * we want to auto detect integer values to remove unwanted decimals
 * @param axis list of data arrays
 * @returns per axis the hoverformat
 */
export const useCartesianLabels = (axis: Axis[]): (string | undefined)[] =>
  useMemo(() => {
    const result = new Array<string | undefined>(axis.length).fill(undefined);

    const isNumber = (value: string) =>
      /^-?\d+(\.\d+)?[KMkmBb]?$/.test(value.replace(',', '.'));

    const firstNonNull = (arr: Axis) => {
      for (const narr of arr) {
        for (const el of narr) {
          if (el !== null) return el;
        }
      }
      return null;
    };

    const isInteger = (value: string) => /^\d+$/.test(value);

    for (const [i, ax] of axis.entries()) {
      if (ax.length > 0) {
        const fnn = firstNonNull(ax);
        if (fnn && isNumber(String(fnn))) {
          let foundDouble = false;

          for (const nax of ax) {
            for (const el of nax) {
              if (el && !isInteger(String(el))) {
                result[i] = ',.2f';
                foundDouble = true;
                break;
              }
            }
          }

          if (!foundDouble) {
            result[i] = ',.0f';
          }
        }
      }
    }

    return result;
  }, [axis]);
