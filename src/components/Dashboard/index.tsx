import { useState } from 'react';
import FileUpload from './FileUpload';
import Canvas from '../Canvas';
import Boxes from '../Boxes';
import styles from './index.module.css';
import Header from '../Header';

const Dashboard = () => {
    const [file, setFile] = useState<File | null>(null);
    // the canvas component will listen for changes in exportEvent and run the export function
    const [exportEvent, setExportEvent] = useState('');
    return (
        <>
            {file !== null && ( <Header onUpload={(file) => setFile(file)} />)}
            <div className={file === null ? styles.DashboardNoFile : styles.Dashboard }>
                {file === null && (<FileUpload buttonColors={'primary'} onUpload={(file) => setFile(file)} />)}
                {file !== null && (
                    <>
                        <Canvas file={file} exportEvent={exportEvent} />
                        <Boxes exportEvent={() => setExportEvent('export'+(new Date()).getTime())} />
                    </>
                )}
            </div>
        </>
    )
}

export default Dashboard;