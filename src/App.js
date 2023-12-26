import React from "react";
import Step1Form from "./components/FormSteps/Step1";
import Wizard from "./components/Wizard";
function App() {
  return (
    <div className="App">
      <Wizard
        validationSchemas={[Step1Form.validationSchema]}
        initialValues={[Step1Form.initialValues]}
        formComponents={[Step1Form.component]}
        formHeaderSteps={[Step1Form.stepper]}
      />
    </div>
  );
}

export default App;
