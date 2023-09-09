import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons";

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
      .getUserMedia({ video: { facingMode: this.state.facingMode } })
      .then((stream) => {
        this.setState({ stream });
        if (this.videoRef.current) {
          this.videoRef.current.srcObject = stream;
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
        <button onClick={this.toggleCamera}>
          <FontAwesomeIcon icon={faSync} />
          Alternar Câmera
        </button>
        <video
          ref={this.videoRef}
          autoPlay
          playsInline
          muted
          style={{ width: "100%", maxWidth: "400px" }}
        />
      </div>
    );
  }
}

export default CameraApp;
