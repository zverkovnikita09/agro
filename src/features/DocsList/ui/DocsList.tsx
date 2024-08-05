import cn from 'classnames';
import styles from './DocsList.module.scss'
import {useGetData} from "@shared/hook/useGetData";
import {LoadingBlock} from "@shared/ui/LoadingBlock";
import {Document} from "@entities/Document";
import {DocumentOnSign} from "@entities/Document/model/document.model";
import {Tab, TabPanel, Tabs} from "@shared/ui/Tabs";
import DocumentIcon from "@images/file.svg"
import {Select, SelectTheme} from "@shared/ui/Select";
import {NotFoundBlock} from "@shared/ui/NotFoundBlock";
import {useEffect, useMemo, useState} from "react";
import {useSearchParams} from "react-router-dom";

interface DocsListProps {
  className?: string;
}

const documentsFilters = {
  1: 'Договор',
  2: 'Заявка',
  3: 'Акт'
};

const documentsSortOptions = [
  {
    value: 'new',
    name: 'Сначала новые',
  },
  {
    value: 'old',
    name: 'Сначала старые',
  },
  {
    value: 'sign',
    name: 'Подписанные',
  },
  {
    value: 'unsign',
    name: 'Не подписанные',
  },
]

const FILTER_PARAM_NAME = 'docFilter';

export const DocsList = (props: DocsListProps) => {
  const { className } = props;
  const [docsFilter, setDocsFilter] = useState('');
  const [docsSort, setDocsSort] = useState('new');

  const {data: documents, isLoading, isSuccess} = useGetData<DocumentOnSign[]>(
    {
      url: '/api/v1/files/on-signing',
      dataFlag: true,
      withAuthToken: true,
    });

  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get(FILTER_PARAM_NAME)) {
      //@ts-ignore
      setDocsFilter(documentsFilters[searchParams.get(FILTER_PARAM_NAME)])
    } else {
      setDocsFilter('');
    }

  }, [searchParams.get(FILTER_PARAM_NAME)]);

  const filteredDocuments = useMemo(()=> {
    let result = documents?.filter(document => Object.values(documentsFilters).includes(document.type)) ?? [];

    if (docsFilter) {
      result = result.filter((document)=> document.type === docsFilter)
    }

    switch (docsSort) {
      case 'sign':{
        result = [...result].sort((a, b) =>  (a.is_signed === b.is_signed) ? 0 : a.is_signed ? -1 : 1);
        break;
      }
      case 'unsign':{
        result = [...result].sort((a, b) =>  (a.is_signed === b.is_signed) ? 0 : a.is_signed ? 1 : -1);
        break;
      }
      case 'new':
      case 'old':
        break;
      default: break
    }

    return result;
  },[documents, docsSort, docsFilter])

  if (!isSuccess){
    return <LoadingBlock />
  }

  return (
    <div className={cn(styles.docsList, className)}>
      <Tabs saveInParams paramKey={FILTER_PARAM_NAME}>
        <div className={styles.tabsHeading}>
          <Tab value={0}>Все</Tab>
          <Tab value={1}>Договора</Tab>
          <Tab value={2}>Заявки</Tab>
          <Tab value={3}>Акты</Tab>
          <Select
            className={styles.documentsSort}
            togglerClassName={styles.selectToggler}
            options={documentsSortOptions}
            value={docsSort}
            setValue={(value)=>setDocsSort(value as string)}
            theme={SelectTheme.FILTERS}
          />

        </div>
        {[...new Array(4)].map((_, index) => (
          <TabPanel key={index} value={index}>
            <div className={styles.documentsWrapper}>
              {filteredDocuments.length ? filteredDocuments.map(({id, ...props}) => (
                <Document
                  key={id}
                  id={id}
                  {...props}
                />
              )) : <NotFoundBlock Icon={DocumentIcon} title='Нет подгруженных документов' />
              }
            </div>
          </TabPanel>
        ))}
      </Tabs>
    </div>
  )
}
