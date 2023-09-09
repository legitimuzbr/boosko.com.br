import React, { Component } from "react";

class CameraApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stream: null,
      facingMode: "user", // Inicialmente, usando a câmera frontal
      photoBlob: null, // Para armazenar a imagem capturada como um Blob
    };
    this.videoRef = React.createRef();
    this.imageCapture = null;
  }

  componentDidMount() {
    this.initCamera();
  }

  initCamera = async () => {
    try {
      // Solicitar permissão para a câmera
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1920 },
          height: { ideal: 1080 },
          facingMode: this.state.facingMode,
          frameRate: { ideal: 120 },
          videoBitsPerSecond: 32000000, // 8 Mbps (ajuste conforme necessário)
        },
      });
      this.setState({ stream });

      if (this.videoRef.current) {
        this.videoRef.current.srcObject = stream;

        // Inicializar a API ImageCapture
        const track = stream.getVideoTracks()[0];
        this.imageCapture = new ImageCapture(track);
      }
    } catch (error) {
      console.error("Erro ao acessar a câmera: ", error);
    }
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

  takePhoto = async () => {
    if (this.imageCapture) {
      try {
        // Capturar a foto com as configurações da câmera
        const photoBlob = await this.imageCapture.takePhoto();
        this.setState({ photoBlob });

        // Criar um link temporário para fazer o download da imagem
        const downloadLink = document.createElement("a");
        downloadLink.href = URL.createObjectURL(photoBlob);
        downloadLink.download = "photo.jpg"; // Sempre como JPG para melhor qualidade
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      } catch (error) {
        console.error("Erro ao tirar a foto: ", error);
      }
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
        <button onClick={this.takePhoto}>Tirar Foto</button>
        <video
          ref={this.videoRef}
          autoPlay
          playsInline
          style={{ width: "100%", maxWidth: "400px", cursor: "pointer" }}
        />
      </div>
    );
  }
}

export default CameraApp;
