import React, { Component } from "react";

class CameraApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stream: null,
    };
    this.videoRef = React.createRef();
  }

  componentDidMount() {
    // Solicitar permissão para a câmera
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "user" } }) // Acesso à câmera frontal
      .then((stream) => {
        this.setState({ stream });
        if (this.videoRef.current) {
          this.videoRef.current.srcObject = stream;
        }
      })
      .catch((error) => {
        console.error("Erro ao acessar a câmera: ", error);
      });
  }

  componentWillUnmount() {
    // Parar a câmera ao desmontar o componente
    if (this.state.stream) {
      this.state.stream.getTracks().forEach((track) => {
        track.stop();
      });
    }
  }

  render() {
    return (
      <div>
        <h1>Aplicativo da Câmera</h1>
        <video
          ref={this.videoRef}
          autoPlay
          playsInline
          muted // Evita feedback de áudio
          style={{ width: "100%", maxWidth: "400px" }}
        />
      </div>
    );
  }
}

export default CameraApp;
