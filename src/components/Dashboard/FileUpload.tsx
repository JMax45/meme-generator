import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
}));

interface Props {
    onUpload: (file: File) => void;
    buttonColors: 'primary' | 'secondary';
}

const FileUpload: React.FC<Props> = ({ onUpload, buttonColors }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={(e) => onUpload(e.target.files![0])}
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color={buttonColors} component="span">
          Upload
        </Button>
      </label>
      <input accept="image/*" className={classes.input} id="icon-button-file" type="file" onChange={(e) => onUpload(e.target.files![0])} />
      <label htmlFor="icon-button-file">
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera color={buttonColors} />
        </IconButton>
      </label>
    </div>
  );
}

export default FileUpload;