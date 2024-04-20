import cn from 'classnames';
import styles from './YandexMap.module.scss'
import {MapState, Map, YMaps, Placemark, withYMaps, WithYMapsProps, YMapsApi} from "react-yandex-maps";
import {useDispatch, useSelector} from "react-redux";
import {SortBySelectors} from "@entities/SortBy";
import {FiltersSelectors} from "@entities/Filters";
import {useGetData} from "@shared/hook/useGetData";
import {ApplicationModel, Coord} from "@entities/Application/model/application.model";
import iconMark from '@images/marker.png'
import iconMarkFinish from '@images/marker-finish.png'
import * as ReactDOMServer from "react-dom/server";
import {MarkWithContent} from "@widgets/YandexMap/ui/MarkWithContent";
import {useCallback, useEffect, useRef, useState} from "react";
import {debounce} from "lodash-es";
import {SelectedApplicationSelectors} from "@entities/SelectedApplication/model/SelectedApplication.selectors";
import {setSelectedApplication} from "@entities/SelectedApplication/model/SelectedApplication.slice";

interface YandexMapProps {
  className?: string;
  // onClick?: (e: MouseEvent) => void;
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
  const {
    className,
    // onClick
  } = props;
  const map = useRef<HTMLElement>(null) as any;
  const route = useRef<MultiRoute>();
  const needToUpdateBounds = useRef<boolean>(true);
  const [ymaps, setYmaps] = useState<YMapsApi>();

  const dispatch = useDispatch();
  const selectedApplication = useSelector(SelectedApplicationSelectors.selectSelectedApplication)

  // @ts-ignore
  type MultiRoute = ymaps.multiRouter.MultiRoute;

  const sortBy = useSelector(SortBySelectors.selectSortByValue);
  const filters = useSelector(FiltersSelectors.selectAllFilters);

  const {data: applications, isError, isLoading} = useGetData<ApplicationModel[]>(
    {
      url: '/api/v1/orders',
      dataFlag: true,
      params: {sort: sortBy, ...filters}
    });

  const changeBounds = debounce(async () => {
    const bounds = route?.current?.getBounds() ?? null;

    if (bounds && ymaps && needToUpdateBounds.current) {
      map?.current.setBounds(bounds, { duration: 450 });
      needToUpdateBounds.current = false;
    }
  }, 200);

  const clearRoute = (): void => {
    if (route.current) {
      map?.current.geoObjects.remove(route.current);
      route.current.events?.remove("boundschange", changeBounds);
      route.current = undefined;
    }
  };

  const renderRoute = (multiRoute: MultiRoute): void => {
    clearRoute();

    if (multiRoute) {
      map?.current.geoObjects.add(multiRoute);
      route.current = multiRoute;
      route.current.events.add("boundschange", changeBounds);
    }
  };

  const getRoute = (from?: Coord, to?: Coord) => {
    if (ymaps) {
      if (!(from && to)) {
        clearRoute();
        return;
      }
      const multiRoute: MultiRoute = new ymaps.multiRouter.MultiRoute(
        {
          referencePoints: [
            [from.y, from.x],
            [to.y, to.x],
          ],
          params: {
            results: 1,
          },
        },
        {
          wayPointFinishIconLayout: "default#image",
          wayPointFinishIconImageHref: iconMarkFinish,
          wayPointFinishIconImageSize: [30, 37],
          wayPointStartIconLayout: "default#image",
          wayPointStartIconImageHref: iconMark,
          wayPointStartIconImageSize: [30, 37],
          pinVisible:false,
          routeActiveStrokeWidth: 8,
          balloonLayout: '',
          routeActiveStrokeColor: "rgba(242, 180, 48, 1)",
        },
      );

      needToUpdateBounds.current = true;

      // multiRoute.model.events.add("requestsuccess", function () {
      //   const activeRoute = multiRoute.getActiveRoute();
      //   if (onRouteChange) {
      //     onRouteChange({
      //       distance: (activeRoute?.properties.get("distance", {}) as RouteInfo)?.value ?? 0,
      //       duration: (activeRoute?.properties.get("duration", {}) as RouteInfo)?.value ?? 0,
      //     });
      //   }
      // });

      renderRoute(multiRoute);
    }
  };
  useEffect(() => {
    // if (ymaps) getRoute({x: 37.524, y: 55.749}, {x: 30.304908, y: 59.918072});
  }, [ymaps]);

  const markerOnClick = useCallback(
    (e: any, application: ApplicationModel) => {
      const placeMarker = e.get("target");
      placeMarker.balloon.close();
      dispatch(setSelectedApplication(application));
      // onClick?.(e as MouseEvent);
    },
    [],
  );

  return (
    <div className={cn(styles.yandexMap, className)}>
      <YMaps
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
          {applications?.map((application, index) => (
            <Placemark
              key={index}
              geometry={[Number(application.load_coordinates.y), Number(application.load_coordinates.x)]}
              properties={{
                // iconContent: ReactDOMServer.renderToString(
                //   <MarkWithContent />
                // ),
              }}
              options={{
                iconLayout: "default#image",
                route: '',
                iconImageSize: [30, 37],
                iconImageHref: iconMark,
              }}
              onClick={(e: any) => markerOnClick(e, application)}
            />
          ))}
        </Map>
      </YMaps>
    </div>
  )
}
