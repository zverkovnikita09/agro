import { ApplicationModel } from "@entities/Application/model/application.model"
import { SelectedApplicationSelectors } from "@entities/SelectedApplication/model/SelectedApplication.selectors"
import { useSelector } from "react-redux"
import { Placemark, YMapsApi } from "react-yandex-maps"
import iconMark from '@images/marker.png'
import iconMarkGrey from '@images/marker-grey.png'
import { useCallback, useEffect, useState } from "react"
import styles from './YandexMap.module.scss'
import { BalloonContent } from "./BalloonContent"
import * as ReactDOMServer from "react-dom/server";

interface MarkerProps {
  application: ApplicationModel
  onClick: (e: any) => void
  ymaps?: YMapsApi
}

const iconImageSize = [30, 37]

export const Marker = ({ application, onClick, ymaps }: MarkerProps) => {
  const selectedApplication = useSelector(SelectedApplicationSelectors.selectSelectedApplication);

  const [balloonLayout, setBallonLayout] = useState<any>();

  const [markerRef, setRef] = useState<any>();

  const mouseEnterHandler = useCallback(
    (e: any): void => {
      const placeMarker = e.get("target");
      const position = e.get("globalPixels");
      placeMarker.balloon.open(position);
    },
    [],
  );

  const mouseLeaveHandler = useCallback(
    (e: any): void => {
      const placeMarker = e.get("target");
      placeMarker.balloon.close();
    },
    [],
  );

  const onGetRef = (ref: any) => {
    if (ref) {
      setRef(ref);
    }
  };

  useEffect(() => {
    const ref = markerRef;
    ref?.events.add("mouseenter", mouseEnterHandler);
    ref?.events.add("mouseleave", mouseLeaveHandler);

    return () => {
      ref?.events.remove("mouseenter", mouseEnterHandler);
      ref?.events.remove("mouseenter", mouseLeaveHandler);
    };
  }, [markerRef, mouseEnterHandler, mouseLeaveHandler]);

  useEffect(() => {
    if (ymaps) {
      const balloonContentLayout = ymaps!.templateLayoutFactory.createClass(
        `<div class="${styles.balloon} balloon-root">
          <div class="balloon-body balloon">$[properties.balloonContent]</div>
        </div>`,
        {
          build: function () {
            this.constructor.superclass.build.call(this);
            this._element = document.querySelector(".balloon-root");
            this.applyElementOffsetVal();
          },

          applyElementOffsetVal: function () {
            this._element.style.marginTop = `-${this._element.offsetHeight / 2 + iconImageSize[1] / 2
              }px`;
          },
        },
      );
      setBallonLayout({ layout: balloonContentLayout });
    }
  }, [ymaps, iconImageSize]);

  return (
    <Placemark
      geometry={[Number(application.load_coordinates.y), Number(application.load_coordinates.x)]}
      properties={{
        balloonContent: application.id === selectedApplication[0]?.id ? "" : ReactDOMServer.renderToString(<BalloonContent application={application} />),
      }}
      options={{
        iconLayout: "default#image",
        route: '',
        iconImageSize,
        iconImageHref: !!selectedApplication.length ? selectedApplication[0].id === application.id ? iconMark : iconMarkGrey : iconMark,
        balloonOffset: [35, 0],
        balloonLayout: balloonLayout?.layout,
        hideIconOnBalloonOpen: false,
        balloonCloseButton: false,
        openBalloonOnClick: false,
        balloonPanelMaxMapArea: 0,
        zIndex: 99999,
      }}
      onClick={onClick}
      instanceRef={onGetRef}
    />
  )
}