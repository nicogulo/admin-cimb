import { useTranslations } from 'next-intl';
import {theme} from "antd";

export default function Page() {
    const {token} = theme.useToken();
  const t = useTranslations('site');

  return (
      <h1>
          AUTH
      </h1>
  );
}
