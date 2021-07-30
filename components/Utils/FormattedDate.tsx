import { parseISO, format } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import tr from 'date-fns/locale/tr';
interface Props {
  dateString: string;
  locale: string;
}

export const FormattedDate = ({ dateString, locale }: Props) => {
  const date = format(parseISO(dateString), 'MMMM dd, yyyy', {
    locale: locale === 'en' ? enUS : tr,
  });
  return <time dateTime={date}>{date}</time>;
};
