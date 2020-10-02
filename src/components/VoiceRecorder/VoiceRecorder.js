import React, {useState, useRef, useEffect} from 'react';
import { MdFiberManualRecord, MdStop, MdPlayCircleOutline, MdFileDownload } from 'react-icons/md';
import { ReactMic } from 'react-mic';
import {useDados} from '../../context/Dados';


import { ContainerVoiceRecorder } from './styles-voice-recorder';

const VoiceRecorder = ({setAudios, dado, size, name}) => {
    const {lastVoiceRecorder, setLastVoiceRecorder} = useDados()
    const refAudio = useRef(null)
    const [record, setRecord] = useState({ [name] : false })
    const [me, setMe] = useState("")

    const startRecording = () => {
        setRecord({ [name]: true });
    }
    
    const stopRecording = () => {
        setRecord({ [name]: false });
        setMe(true)
    }
    
    const onData = (recordedBlob) => {
        // console.log('chunk of real-time data is: ', recordedBlob);
    }

    const play = () => {
        refAudio.current.play()
    }

    useEffect(() => {
        if (record[name] === false && me) {
            setAudios(lastVoiceRecorder)
            setMe(false)
        }
    }, [lastVoiceRecorder])

    // const terminouDeGravar = (blob, key) => {
    //     setLastVoiceRecorder(blob.blobURL)
    //     console.log("name: ", key)
    // }


    return (
        <ContainerVoiceRecorder>
            <ReactMic
                record={record[name]}
                onStop={blob => setLastVoiceRecorder(blob.blobURL)}
                onData={blob => onData(blob)}
                noiseSuppression={true}
                channelCount={2}
            />
            <div className="main">
                {!record[name] ? (
                    <MdFiberManualRecord fill="red" size={size} onClick={() => startRecording()}/>
                ) : (
                    <MdStop fill="lightgray" size={size} onClick={() => stopRecording()}/>
                )}
                {dado !== "" ? <MdPlayCircleOutline fill="lightgray" size={size} onClick={() => play()} /> : ""}
                {/* {dado !== "" ? <MdFileDownload fill="lightgray" size={size} onClick={() => play()} /> : ""} */}
                {/* {dado !== "" ? <a href={dado} download="oi">download </a> : ""} */}
                <audio src={!dado !== "" ? dado : null} ref={refAudio} />
            </div>
        </ContainerVoiceRecorder>
    );
}

export default VoiceRecorder;