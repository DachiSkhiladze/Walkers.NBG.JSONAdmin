import scheme from "./scheme.json";
import "./App.scss";
import { useDispatch, useSelector } from "react-redux";
import defaultContent from "./assets/content.json";
import { SET_CONTENT, SET_LANGUAGE } from "./redux/actions";
import AppEditor from "./components/AppEditor";
import AppSiderbar from "./components/AppSidebar";
import { useEffect } from "react";
import AppPublish from "./components/AppPublish";
import { AppLoader } from "./hooks/useFiles";

function App() {
  const dispatch = useDispatch();
  const content = useSelector((x) => x.content);
  const currentScheme = useSelector((x) => x.scheme);

  useEffect(() => {
    const lang = localStorage.getItem("lang");

    dispatch(SET_LANGUAGE(lang || "Ge"));
  }, []);

  function onSave(id, value) {
    const newContent = { ...content, [id]: value };

    dispatch(SET_CONTENT(newContent));
  }

  let route = window.location.pathname.replace("/", "");

  return (
    <div className="container">
      <AppLoader />
      <AppSiderbar list={[...scheme.data, { id: "Publish" }]} />
      {route === "Publish" ? (
        <AppPublish />
      ) : (
        content &&
        currentScheme && (
          <AppEditor scheme={currentScheme} state={content} onSave={onSave} />
        )
      )}
    </div>
  );
}

export default App;
