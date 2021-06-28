import React, { useEffect, useState, useRef, useContext, useCallback } from 'react';
import { Stage, Layer, Image as KonvaImg } from 'react-konva';
import { saveAs } from 'file-saver';
import { BoxesContext } from '../../BoxesContext';
import TextBox from './TextBox';
import { useDetectClickOutside } from 'react-detect-click-outside';
import styles from './index.module.css';
import resize from './resize';

interface Props {
  file: File | null;
  exportEvent: string;
}

const Canvas: React.FC<Props> = ({ file, exportEvent }) => {
  const [location, setLocation] = useState([0, 0]);
  const [imageSize, setImageSize] = useState([0, 0]);
  const [boxes, setBoxes] = useContext(BoxesContext).boxes!;
  const exportCanvas = useCallback(() => {
    selectShape(null);
    const data = stageRef.current.getStage().toDataURL({
      x: location[0],
      y: location[1],
      width: imageSize[0],
      height: imageSize[1]
    });
    saveAs(data, `${boxes.map(e => e.text).join(' ').trim()}.png`);
  }, [location, imageSize, boxes])
  useEffect(() => {
    if(exportEvent.startsWith('export')) {
      exportCanvas();
    }
  }, [exportEvent])
  const [selectedId, selectShape] = React.useState<any>(null);

  const checkDeselect = (e: any) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

  const [img, setImg] = useState(new Image())

  const stageRef = useRef<any>(null);
  const [stageSize, setStageSize] = useState([0, 0]);
  const ref = useDetectClickOutside({ onTriggered: () => selectShape(null) });
  useEffect(() => {
    const container: any = ref;
    setStageSize([container.current.clientWidth, container.current.clientHeight]);
  }, [])
  useEffect(() => {
    if(file !== null) {
      const dataUrl = window.URL.createObjectURL(file);
      var imageObj = new Image();
      imageObj.src = dataUrl;
      imageObj.onload = async () => {
        const resized = resize(imageObj.width, imageObj.height, Math.min(...stageSize));
        imageObj.height = resized[1];
        imageObj.width = resized[0];
        setImg(imageObj);
        setImageSize([imageObj.width, imageObj.height]);

        const optimalPosition = ((stageSize[0]/2 - imageObj.width/2 - (stageSize[0] / 2 - imageObj.width)) + (stageSize[0]/2 - imageObj.width/2 + (stageSize[0] / 2 - imageObj.width))) / 2 ;
        setLocation([optimalPosition, 0]);
      }
    }
  }, [file, stageSize])
  return (
    <div className={styles.Canvas}>
      <div className={styles.container} ref={ref} >
        <Stage
          ref={stageRef}
          width={stageSize[0]}
          height={stageSize[1]}
          onMouseDown={checkDeselect}
          onTouchStart={checkDeselect}
        >
          <Layer>
            <KonvaImg x={location[0]} y={location[1]} image={img} onMouseDown={() => selectShape(null)} onTouchStart={() => selectShape(null)} />
            {boxes.map((rect: any, i: any) => {
              return (
                <TextBox
                  text={rect.text}
                  key={i}
                  shapeProps={rect}
                  isSelected={rect.id === selectedId}
                  onSelect={() => {
                    selectShape(rect.id);
                  }}
                  onChange={(newAttrs: any) => {
                    const rects = boxes.slice();
                    rects[i] = newAttrs;
                    setBoxes(rects);
                  }}
                />
              );
            })}
          </Layer>
      </Stage>
    </div>
    </div>
  );
};

export default Canvas;