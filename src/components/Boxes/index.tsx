import './index.css';
import { useContext, useState } from 'react';
import { BoxesContext } from '../../BoxesContext';
import { Button, TextField, Menu } from '@material-ui/core';
import { Save } from '@material-ui/icons';
import { SketchPicker } from 'react-color';
import Square from './Square';

interface Props {
    exportEvent: () => void;
}

const Boxes: React.FC<Props> = ({ exportEvent }) => {
    const [boxes, setBoxes] = useContext(BoxesContext).boxes!;
    const [inputValue, setInputValue] = useState('');
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setInputValue('');
        setBoxes([...boxes, {
          x: 150,
          y: 150,
          width: 300,
          fill: '#ffffff',
          id: 'rect2'+Math.floor(Math.random() * 100),
          text: inputValue
        }])
    }
    const [color, setColor] = useState('#ffffff');
    const [currentPicker, setCurrentPicker] = useState<undefined | string>();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event: any, id: string) => {
      setCurrentPicker(id)
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
    return (
        <div className="boxes">
        {boxes.map((e) => {
          const cloned = boxes.slice();
          return <div className="rect"><TextField className="textfield" id="standard-required" defaultValue="Hello World" value={e.text} onChange={(i) => {
            cloned[cloned.map((clone: any) => clone.id).indexOf(e.id)].text = i.target.value;
            setBoxes(cloned);
          }} /><Square color={e.fill} onClick={(event) => handleClick(event, e.id)} />
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <SketchPicker color={color} onChange={(e) => {
              setColor(e.hex);
              if(currentPicker !== undefined) {
                const cloned = boxes.slice();
                cloned[cloned.map((clone) => clone.id).indexOf(currentPicker!)].fill = e.hex;
                setBoxes(cloned);
              }
            }} />
          </Menu>
          </div>
        })}
        <form onSubmit={onSubmit}>
          <div className="form-buttons">
            <TextField id="standard-required" className="textfield" placeholder="add..." value={inputValue} onChange={(i) => setInputValue(i.target.value)} />
            <Square color={'#ffffff'} onClick={(event) => {}} />
          </div>
        </form>
        <Button
          variant="contained"
          color="primary"
          size="medium"
          startIcon={<Save />}
          onClick={() => {
            exportEvent();
          }}
          className="save-button"
        >
        Save
        </Button>
      </div>
    )
}

export default Boxes;