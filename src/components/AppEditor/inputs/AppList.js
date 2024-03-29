import AppLabelCont from "../components/AppLabelCont";
import AppObject from "../components/AppObject";
import useController from "../hooks/useController";

function AppList({ scheme, path }) {
  const { state, setState, pushBlock } = useController(path);

  function onAdd() {
    pushBlock({
      scheme,
      onSave,
      state: JSON.parse(JSON.stringify(state)),
      path: path,
      type: "table",
    });
  }

  function onSave(s,callback) {
    setState([...s]);
    callback?.()
  }

  return (
    <button className="list-button full-width" onClick={onAdd}>
      <span>{scheme.label || scheme.id}</span>
      <span>{">"}</span>
    </button>
  );
}

export default AppList;
