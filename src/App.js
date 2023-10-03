function App() {
  return (
    <>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <h2>Digite seu cpf abaixo:</h2>
            <input
              type="number"
              maxlength="11"
              className="form-control mt-3"
              id="legitimuz-hydrate-cpf"
              placeholder="Digite seu CPF aqui..."
            />
            <button
              className="btn btn-success btn-lg btn-block mt-3 font-weight-bold"
              type="button"
              id="legitimuz-action-verify"
            >
              VERIFICAR IDENTIDADE
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
