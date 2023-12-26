import React, {useState} from "react";
import {Formik, Form} from "formik";
import PropTypes from "prop-types";
import * as Yup from "yup";
import {CheckCircleIcon} from "@heroicons/react/24/outline";
import WizardStepper from "./WizardStepper";
import WizardButtons from "./WizardButtons";
import {DisplayFormikState, novalidate} from "../../helper";

const Wizard = (props) => {
  const [formSending, setFormSending] = useState(false);
  const [formSent, setFormSent] = useState(false);

  const [state, setState] = useState({
    step: 0,
  });

  const schema = novalidate() ? {} : props.validationSchemas[state.step];

  const initialValues = props.initialValues.reduce((item, total) => {
    return {...item, ...total};
  });

  const FormComponent = props.formComponents[state.step];
  const lastStep = props.formComponents.length - 1;

  const handleSubmit = (values) => {
    // setFormSending(true);
    setFormSent(true);
    alert("DATA \n" + JSON.stringify(values, null, 2));
  };

  const next = () => {
    setState((prevState) => {
      return {
        step: prevState.step + 1,
      };
    });
  };

  const prev = () => {
    setState((prevState) => {
      props.formHeaderSteps[prevState.step].completed = false;
      return {
        step: prevState.step - 1,
      };
    });
  };

  return (
    <>
      {!formSent ? (
        <>
          <div className="max-w-screen-sm mx-auto mt-10 mb-5">
            <WizardStepper steps={props.formHeaderSteps} stepNum={state.step} />
            <div className="mb-3 font-light text-xs text-right text-gray-400 dark:text-gray-600">
              * is required field
            </div>
          </div>
          <div className="max-w-screen-sm mx-auto">
            <Formik
              validateOnBlur={false}
              // enableReinitialize={true}
              // validateOnMount={true}
              validateOnChange={true}
              initialValues={initialValues}
              validationSchema={Yup.object().shape(schema)}
              onSubmit={(values, {setSubmitting, setFieldTouched, ...rest}) => {
                setTimeout(() => {
                  setSubmitting(false);

                  if (state.step === lastStep) {
                    handleSubmit(values);
                  } else {
                    next();
                    props.formHeaderSteps[state.step].completed = true;
                    Object.keys(props.initialValues[state.step + 1]).map(
                      (key) => {
                        setFieldTouched(key, false, false);
                      },
                    );
                  }
                }, 40);
              }}
            >
              {(props) => {
                return (
                  <Form className="mt-5">
                    {React.createElement(FormComponent, {
                      ...props,
                    })}

                    <WizardButtons
                      key={`buttons-${state.step}`}
                      stepNum={state.step}
                      lastStep={lastStep}
                      handleBack={prev}
                      formSending={formSending}
                      formSent={formSent}
                    />

                    {(!process.env.NODE_ENV ||
                      process.env.NODE_ENV === "development") && (
                      <DisplayFormikState {...props} />
                    )}
                  </Form>
                );
              }}
            </Formik>
          </div>
        </>
      ) : (
        <div className="row">
          <div className="col-6 my-5 mx-auto text-center">
            <h4>
              <span className="check-holder">
                <CheckCircleIcon />
              </span>
              Form has been successfully sent.
            </h4>
            <span className="text-secondary">
              We'll touch back to you in a while...
            </span>
          </div>
        </div>
      )}
    </>
  );
};

Wizard.propTypes = {
  validationSchemas: PropTypes.arrayOf(PropTypes.object).isRequired,
  initialValues: PropTypes.arrayOf(PropTypes.object).isRequired,
  FormComponents: PropTypes.arrayOf(PropTypes.func).isRequired,
};

export default Wizard;
