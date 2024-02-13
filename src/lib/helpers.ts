import { GenericRecord, ISODateString } from '@/lib/types';

export const isUniqueProperty = <T>(items: T[], propertyName: keyof T) => {
  const values = items.map((item) => item[propertyName]);
  return new Set(values).size === values.length;
};

export const getDateText = (isoDateString: ISODateString, option?: Intl.DateTimeFormatOptions) => {
  const date = new Date(isoDateString);
  const locale = navigator.language;
  const defaultOption: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };

  return new Intl.DateTimeFormat(locale, option ?? defaultOption).format(date);
};

export const findFirstErrorPath = (errors: GenericRecord, errorPaths: string[]) => {
  for (const path of errorPaths) {
    const pathParts = path.split('.');
    const hasError = pathParts.reduce(
      (error, key) => {
        if (error?.[key]) return error[key] as GenericRecord;
        return null;
      },
      errors as GenericRecord | null,
    );
    if (hasError) return path;
  }
  return null;
};

export const isDev = () => import.meta.env.MODE === 'development';
