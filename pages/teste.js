import React, { Component } from "react";

class CameraApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stream: null,
      facingMode: "user", // Inicialmente, usando a câmera frontal
    };
    this.videoRef = React.createRef();
  }

  componentDidMount() {
    this.initCamera();
  }

  initCamera = () => {
    // Solicitar permissão para a câmera
    navigator.mediaDevices
      .getUserMedia({
        video: {
          facingMode: this.state.facingMode,
          focusMode: "continuous", // Ativar o foco contínuo
        },
      })
      .then((stream) => {
        this.setState({ stream });
        if (this.videoRef.current) {
          this.videoRef.current.srcObject = stream;
          this.videoRef.current.addEventListener("click", this.focusCamera); // Adicionar evento de clique para focar
        }
      })
      .catch((error) => {
        console.error("Erro ao acessar a câmera: ", error);
      });
  };

  toggleCamera = () => {
    // Alternar entre a câmera frontal e traseira
    const newFacingMode =
      this.state.facingMode === "user" ? "environment" : "user";
    this.setState({ facingMode: newFacingMode }, () => {
      if (this.state.stream) {
        this.state.stream.getTracks().forEach((track) => {
          track.stop();
        });
      }
      this.initCamera();
    });
  };

  focusCamera = () => {
    // Chamar o foco da câmera ao clicar na imagem
    if (this.videoRef.current) {
      this.videoRef.current.focus();
    }
  };

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
        <button onClick={this.toggleCamera}>Alternar Câmera</button>
        <video
          ref={this.videoRef}
          autoPlay
          playsInline
          muted
          style={{ width: "100%", maxWidth: "400px", cursor: "pointer" }} // Adicionar cursor apontando
        />
      </div>
    );
  }
}

export default CameraApp;
