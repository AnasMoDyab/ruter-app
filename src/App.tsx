import style from "./App.module.css";
import Form from "./container/formContainer/form";

function App() {
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <h1 className={style.header}>Ruter app</h1>
        <div className={style.formsWrapper}>
          <Form />
          <Form />
        </div>
      </div>
    </div>
  );
}

export default App;
