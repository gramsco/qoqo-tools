import { useState } from 'react';
import SpeechSynthesisRecorder from 'speech-synthesis-recorder'


export default function Audio() {
    
    const [text, setTxt] = useState("")

    function go() {
        let ttsRecorder = new SpeechSynthesisRecorder({
            text,
            utteranceOptions: {
                voice: "english-us espeak",
                lang: "fr-FR",
                pitch: .75,
                rate: 1,
                volume:1
            }
        });

        ttsRecorder.start()
            .then(tts => tts.blob())
            .then(({ tts, data }) => {
                // `data` : `Blob`
                tts.audioNode.src = URL.createObjectURL(data);
                tts.audioNode.title = tts.utterance.text;
                tts.audioNode.onloadedmetadata = () => {
                    console.log(tts.audioNode.duration);
                    tts.audioNode.play();
                }
            })


    }

    return (

        <div style={{display:'grid', height:'100vh', placeItems:'center'}}>
            <textarea value={text} onChange={e => setTxt(e.target.value)} />
            <button onClick={go}>go</button>
        </div>


    )


}