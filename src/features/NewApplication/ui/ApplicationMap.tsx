import { Coord } from "@entities/Application"
import styles from './NewApplication.module.scss'
import { Map, YMaps, YMapsApi } from "react-yandex-maps"
import { debounce } from "lodash-es"
import iconMark from '@images/marker.png'
import iconMarkFinish from '@images/marker-finish.png'
import { useEffect, useRef, useState } from "react"
import { LoadingBlock } from "@shared/ui/LoadingBlock"

interface ApplicationMapProps {
  from?: Coord
  to?: Coord
  setDistance?: (distance: number) => void
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

export const ApplicationMap = ({ from, to, setDistance }: ApplicationMapProps) => {
  //@ts-ignore
  type MultiRoute = ymaps.multiRouter.MultiRoute;

  const map = useRef<HTMLElement>(null) as any;
  const route = useRef<MultiRoute>();
  const [ymaps, setYmaps] = useState<YMapsApi>();
  const needToUpdateBounds = useRef<boolean>(true);
  const [isLoading, setIsLoading] = useState(true)

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
          pinVisible: false,
          routeActiveStrokeWidth: 8,
          balloonLayout: '',
          routeActiveStrokeColor: "rgba(242, 180, 48, 1)",
        },
      );

      needToUpdateBounds.current = true;

      multiRoute.model.events.add("requestsuccess", function () {
        const activeRoute = multiRoute.getActiveRoute();
        if (activeRoute?.properties.get("distance")?.value) {
          setDistance?.(Math.ceil(activeRoute?.properties.get("distance", {})?.value / 1000))
        }
      });

      renderRoute(multiRoute);
    }
  };

  useEffect(() => {
    if (Object.keys(from ?? {}).length && Object.keys(to ?? {}).length) {
      getRoute(from, to)
    }

    else clearRoute()
  }, [from, to])

  return (
    <div className={styles.map}>
      {isLoading && (
        <div className={styles.loading}>
          <LoadingBlock />
        </div>
      )}
      <YMaps
        query={{
          load: defaultLibraries.join(","),
          apikey: process.env.YANDEX_MAP_TOKEN,
        }}
      >
        <Map
          defaultState={{ center: [47.13, 39.42], zoom: 5 }}
          options={{ suppressMapOpenBlock: true }}
          width="100%"
          height="100%"
          instanceRef={map}
          onLoad={(ymaps) => {
            setYmaps(ymaps)
            setIsLoading(false)
          }}
        />
      </YMaps>
    </div>
  )
}