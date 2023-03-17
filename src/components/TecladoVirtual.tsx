import "./styles/TecladoVirtual.css";

const TecladoVirtual = () => {
  const teclas = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ñ"],
    ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "DEL"],
  ];

  return (
    <div className="teclado-virtual">
      {teclas.map((fila, index) => {
        return (
          <div className="fila-teclas" key={`fila${index}`}>
            {fila.map((letra) => {
              if (letra.length === 1) {
                return (
                  <div key={letra} className="tecla">
                    {letra}
                  </div>
                );
              } else {
                return (
                  <div key={letra} className="tecla large-tecla">
                    {letra}
                  </div>
                );
              }
            })}
          </div>
        );
      })}
    </div>
  );
};

export default TecladoVirtual;
