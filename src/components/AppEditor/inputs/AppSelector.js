import React from "react";
import Select from "react-select";
import AppLabelCont from "../components/AppLabelCont";
import useController from "../hooks/useController";
import useMultiSelector from "../hooks/useMultiSelector";

const customStyles = {
  control: (base) => ({
    ...base,
    height: 40,
    minHeight: 40,
    boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
  }),
};

function AppSelctor({ scheme, path }) {
  const { setState, state } = useController(path);
  const { options } = useMultiSelector(scheme, path);

  function onChange(p) {
    setState(p.value);
  }

  React.useEffect(() => {
    // setState(options[0].value);
  }, []);

  return (
    <AppLabelCont label={scheme.id} {...scheme}>
      <Select
        options={options}
        value={options.find((x) => x.value == state)}
        onChange={onChange}
        styles={customStyles}
      />
    </AppLabelCont>
  );
}

export default AppSelctor;
