import { useStateReducer } from "./useStateReducer";

class SpeechRecognition {
  recognizer: any;
  isSupported: boolean;

  constructor() {
    const SpeechRecognition =
      typeof window !== "undefined" &&
      ((window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition ||
        (window as any).mozSpeechRecognition ||
        (window as any).msSpeechRecognition ||
        (window as any).oSpeechRecognition);

    const browserSupportsSpeechRecognition = !!SpeechRecognition;
    const browserSupportsMedia =
      typeof window !== "undefined" &&
      window.navigator !== undefined &&
      window.navigator.mediaDevices !== undefined &&
      window.navigator.mediaDevices.getUserMedia !== undefined &&
      (window.AudioContext !== undefined ||
        (window as any).webkitAudioContext !== undefined);

    this.isSupported = browserSupportsSpeechRecognition && browserSupportsMedia;

    if (this.isSupported) {
      this.recognizer = new SpeechRecognition();
      this.recognizer.continuous = true;
      this.recognizer.interimResults = true;
    }
  }
}
interface ISpeechRecognitionState {
  isSupported: boolean;
  isListening: boolean;
  final: string;
  interim: string;
  start: () => void;
  stop: () => void;
}
export function useSpeechRecognition(): ISpeechRecognitionState {
  const recognitionEngine = new SpeechRecognition();
  const [state, dispatch] = useStateReducer<ISpeechRecognitionState>({
    isSupported: recognitionEngine.isSupported,
    isListening: false,
    interim: "",
    final: "",
    start: () => {
      if (recognitionEngine.isSupported) {
        dispatch({ isListening: true, final: "", interim: "" });
        recognitionEngine.recognizer.start();
      }
    },
    stop: () => {
      if (recognitionEngine.isSupported) {
        dispatch({ isListening: false });
        recognitionEngine.recognizer.stop();
      }
    },
  });

  recognitionEngine.recognizer.onend = () => {
    dispatch({ isListening: false });
  };
  recognitionEngine.recognizer.onresult = (event: {
    results: SpeechRecognitionResultList;
  }) => {
    let final = "";
    let interim = "";
    for (let index = 0; index < event.results.length; index++) {
      const element = event.results[index];
      if (element.isFinal) {
        final += element[0].transcript;
      } else {
        interim += element[0].transcript;
      }
    }
    dispatch({
      final,
      interim,
    });
  };

  return state;
}
