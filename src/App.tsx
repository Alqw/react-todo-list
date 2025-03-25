const App = () => {
  return (
    <>
      <main className="page">
        <form className="todo-header">
          <input type="text" className="todo-input" placeholder="Task" />
          <button className="button">Send</button>
        </form>
        <div className="todo-body">
          <div className="todo-item">
            <div className="checkbox"></div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti
              fuga numquam dignissimos pariatur! Fugiat, distinctio incidunt
              modi possimus quisquam doloribus deserunt sint laboriosam
              pariatur? Debitis asperiores ea sequi modi consectetur?
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default App;
