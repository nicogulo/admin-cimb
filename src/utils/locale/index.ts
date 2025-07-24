import { Locale } from 'antd/lib/locale';
import id_ID from 'antd/locale/id_ID';
import en_US from 'antd/locale/en_US';
import zh_CN from 'antd/locale/zh_CN';
import pl_PL from 'antd/locale/pl_PL';
import {usePathname} from "next/navigation";

export const languages = {
  'id-ID': {
    name: 'Bahasa',
    flag: '🇮🇩',
    unicode:'1f1ee-1f1e9',
    antd: id_ID
  },
  'en-US': {
    name: 'English',
    flag: '🇺🇸',
    unicode:'1f1fa-1f1f8',
    antd: en_US
  },
  'zh-CN': {
    name: '简体中文',
    flag: '🇨🇳',
    unicode: '1f1e8-1f1f3',
    antd: zh_CN,
  },
  'pl-PL': {
    name: 'Polski',
    flag: '🇵🇱',
    unicode: '1f1f5-1f1f1',
    antd: pl_PL
  },
};

export const MatchLanguage = (locale: string) => {
    return Object.keys(languages).includes(locale);
}


export type ILanguage = {
  [K in keyof typeof languages]: {
    name: string;
    flag: string;
    unicode: string;
    antd: Locale;
  };
};

export const defaultLocale: keyof typeof languages = 'en-US';

const currentPath = (fullPath: string): string[] | undefined => {
  const paths = fullPath.split('/');
  if(paths.length < 2) return undefined;
  if (paths.length === 2 ){
    return [paths[1]];
  }
  if(MatchLanguage(paths[1])){
    const length = paths.length - 4
    if (length < 0) return [paths[2]];
    if (length === 0) return [paths[3]];
    return [paths[paths.length - length]];
  }
  const length = paths.length - 3
  if (length === 0) return [paths[2]];
  return [paths[paths.length - length]];
}

const withLocalePath = (fullPath : string,destination: string): string => {
  const paths = fullPath.split('/');
  if(paths.length < 2) return destination;
  if(MatchLanguage(paths[1])){
    return `/${paths[1]}${destination}`;
  }
  return destination;
}

const currentOpenKey = (fullPath: string): string[] | undefined => {
  const paths = fullPath.split('/');
  if(paths.length < 3) return undefined;

  if(MatchLanguage(paths[1])){
    const length = paths.length - 3
    return [paths[paths.length - length]];
  }

  const length = paths.length - 2
  return [paths[paths.length - length]];
}

export {currentPath, withLocalePath, currentOpenKey};
