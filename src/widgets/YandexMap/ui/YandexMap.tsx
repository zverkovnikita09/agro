import cn from 'classnames';
import styles from './YandexMap.module.scss'
import {MapState, Map, YMaps, Placemark, withYMaps, WithYMapsProps, YMapsApi} from "react-yandex-maps";
import {useSelector} from "react-redux";
import {SortBySelectors} from "@entities/SortBy";
import {FiltersSelectors} from "@entities/Filters";
import {useGetData} from "@shared/hook/useGetData";
import {ApplicationModel} from "@entities/Application/model/application.model";
import iconMark from '@images/marker.png'
import * as ReactDOMServer from "react-dom/server";
import {MarkWithContent} from "@widgets/YandexMap/ui/MarkWithContent";
import {useEffect, useRef, useState} from "react";

interface YandexMapProps {
  className?: string;
}

const defaultLibraries: string[] = [
  "Map",
  "Balloon",
  "Hint",
  "Placemark",
  "layout.Image",
  "layout.ImageWithContent",
  "layout.storage",
  "layout.templateBased.Base",
  "route",
  "util.bounds",
  "templateLayoutFactory",
  "multiRouter.MultiRoute",
];

export interface YandexMapPropsWithYMaps extends YandexMapProps, Partial<WithYMapsProps> {}
export const YandexMap = (props: YandexMapPropsWithYMaps) => {
  const { className } = props;
  const map = useRef<HTMLElement>(null) as any;
  const [ymaps, setYmaps] = useState<YMapsApi>();

  const sortBy = useSelector(SortBySelectors.selectSortByValue);
  const filters = useSelector(FiltersSelectors.selectAllFilters);

  const {data: applications, isError, isLoading} = useGetData<ApplicationModel[]>(
    {
      url: '/api/v1/orders',
      dataFlag: true,
      params: {sort: sortBy, ...filters}
    });

  const addRoute = (ymaps: YMapsApi) => {
    const pointA = [55.749, 37.524]; // Москва
    const pointB = [59.918072, 30.304908]; // Санкт-Петербург

    const multiRoute = new ymaps.multiRouter.MultiRoute(
      {
        referencePoints: [pointA, pointB],
        params: {
          routingMode: "pedestrian"
        }
      },
      {
        boundsAutoApply: true
      }
    );

    map.current.geoObjects.add(multiRoute);
  };

  useEffect(() => {
    if (ymaps) addRoute(ymaps);
  }, [ymaps]);

  return (
    <div className={cn(styles.yandexMap, className)}>
      <YMaps
        onApiAvaliable={(ymaps: YMapsApi) => {
          }}

        query={{
          load: defaultLibraries.join(","),
          apikey: process.env.YANDEX_MAP_TOKEN,
        }}
      >
        <Map
          defaultState={{ center: [51.665944, 39.191717], zoom: 5 }}
          width='100%'
          height='100%'
          instanceRef={map}
          onLoad={(ymaps) => setYmaps(ymaps)}
        >
          {applications?.map(({load_coordinates: {x, y}}, index) => (
            <Placemark
              key={index}
              geometry={[Number(y), Number(x)]}
              properties={{
                // iconContent: ReactDOMServer.renderToString(
                //   <MarkWithContent />
                // ),
              }}
              options={{
                iconLayout: "default#image",
                route: ''
                // iconImageSize: [30, 37],
                // iconImageHref: iconMark,
              }}
            />
          ))}
        </Map>
      </YMaps>
    </div>
  )
}
