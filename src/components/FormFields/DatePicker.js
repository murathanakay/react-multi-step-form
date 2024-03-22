import {
  Button,
  Calendar,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  DateInput,
  DatePicker,
  DateSegment,
  Dialog,
  Group,
  Heading,
  Label,
  Popover,
} from "react-aria-components";
import {Field} from "formik";
import {today, getLocalTimeZone} from "@internationalized/date";
import {ButtonProps, PopoverProps} from "react-aria-components";
// import ChevronUpDownIcon from "@spectrum-icons/workflow/ChevronUpDown";
// import ChevronLeftIcon from "@spectrum-icons/workflow/ChevronLeft";
// import ChevronRightIcon from "@spectrum-icons/workflow/ChevronRight";

import {uniqueId} from "lodash";
import ErrorText from "./common/ErrorText";

import {
  ChevronUpDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/20/solid";

export function DatePickerExample({name, label}) {
  const id = "a-4";
  return (
    <Field name={name}>
      {({field, form, meta}) => {
        const isError = meta.touched && meta.error;
        return (
          <div className="mb-10">
            <DatePicker
              className="relative z-0 w-full group"
              maxValue={today(getLocalTimeZone())}
              shouldForceLeadingZeros={true}
              onChange={(value, e) => {
                console.log("date", value);

                // field.onChange(value);

                form.setFieldTouched(field.name);
                form.setFieldValue(field.name, value);

                // if (e) field.onChange(e);
              }}
              onBlur={() => {
                form.setFieldTouched(field.name);
              }}
            >
              <Group
                className={`flex focus-within:bg-white group-open:bg-white pl-3 focus-visible:ring-2 px-4 py-3 w-full font-medium border rounded-lg appearance-none text-gray-900 dark:text-white  focus:outline-none focus:ring-0 transition-colors duration-300 bg-transparent focus:bg-white dark:bg-transparent dark:focus:bg-gray-950 caret-gray-600 ${
                  isError
                    ? "border-red-700 dark:border-red-500 dark:focus:border-red-500 focus:border-red-600"
                    : "border-gray-400 dark:border-gray-600 dark:focus:border-gray-500 focus:border-gray-800"
                }`}
              >
                <DateInput className="flex flex-1 py-2">
                  {(segment) => (
                    <DateSegment
                      segment={segment}
                      className={`px-0.5 tabular-nums outline-none rounded-sm focus:bg-gray-900 focus:text-white caret-transparent placeholder-shown:italic ${
                        isError
                          ? "text-red-700 dark:text-red-500 peer-focus:text-red-700 peer-focus:dark:text-red-500"
                          : "text-gray-900 dark:text-gray-300 peer-focus:text-gray-900 peer-focus:dark:text-gray-500"
                      }`}
                    />
                  )}
                </DateInput>
                <label
                  htmlFor={id}
                  className={`font-medium absolute duration-200 transform -translate-y-8 bg-white scale-75 top-5 left-4 z-10 origin-[0] peer-focus:start-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8 peer peer-focus:bg-white dark:peer-focus:bg-gray-950 dark:bg-gray-950 ${
                    isError
                      ? "text-red-700 dark:text-red-500 peer-focus:text-red-700 peer-focus:dark:text-red-500"
                      : "text-gray-900 dark:text-gray-300 peer-focus:text-gray-900 peer-focus:dark:text-gray-500"
                  }`}
                >
                  {label}
                </label>
                <Button
                  className={`outline-none px-3 flex items-center text-gray-700 transition border-0 border-solid border-l  bg-transparent rounded-r-lg pressed:bg-gray-100 focus-visible:ring-2 ring-gray-200 ${
                    isError
                      ? "border-red-700 dark:border-red-500 dark:focus:border-red-500 focus:border-red-600"
                      : "border-gray-400 dark:border-gray-600 dark:focus:border-gray-500 focus:border-gray-200"
                  }`}
                >
                  <ChevronUpDownIcon className="w-5 h-5" />
                </Button>
              </Group>
              <MyPopover>
                <Dialog className="p-6 text-gray-900">
                  <Calendar pageBehavior="single">
                    <header className="flex items-center gap-1 pb-4 px-1 font-serif w-full">
                      <Heading className="flex-1 font-semibold text-xl ml-2" />
                      <RoundButton slot="previous">
                        <ChevronLeftIcon />
                      </RoundButton>
                      <RoundButton slot="next">
                        <ChevronRightIcon />
                      </RoundButton>
                    </header>
                    <CalendarGrid className="border-spacing-1 border-separate">
                      <CalendarGridHeader>
                        {(day) => (
                          <CalendarHeaderCell className="text-xs text-gray-500 font-semibold">
                            {day}
                          </CalendarHeaderCell>
                        )}
                      </CalendarGridHeader>
                      <CalendarGridBody>
                        {(date, a) => {
                          // console.log(date, a);
                          return (
                            <CalendarCell
                              date={date}
                              className={(props) => {
                                const {isDisabled, isOutsideMonth} = props;

                                console.log(props);

                                // if (isDisabled)
                                //   console.log(
                                //     "isDisabled",
                                //     props.formattedDate,
                                //     props,
                                //   );

                                return `w-9 h-9 outline-none cursor-default rounded-full flex items-center justify-center outside-month:text-gray-100 pressed:bg-gray-200 selected:bg-violet-700 selected:text-white focus-visible:ring ring-gray-600/70 ring-offset-2 ${
                                  isDisabled
                                    ? "text-gray-200"
                                    : "hover:bg-gray-100"
                                }`;
                              }}
                            />
                          );
                        }}
                      </CalendarGridBody>
                    </CalendarGrid>
                  </Calendar>
                </Dialog>
              </MyPopover>
              <ErrorText meta={meta} />
            </DatePicker>
          </div>
        );
      }}
    </Field>
  );
}

function RoundButton(props: ButtonProps) {
  return (
    <Button
      {...props}
      className="w-9 h-9 outline-none cursor-default bg-transparent text-gray-600 border-0 rounded-full flex items-center justify-center hover:bg-gray-100 pressed:bg-gray-200 focus-visible:ring ring-violet-600/70 ring-offset-2"
    />
  );
}

function MyPopover(props: PopoverProps) {
  return (
    <Popover
      {...props}
      className={({isEntering, isExiting}) => `
        overflow-auto rounded-lg drop-shadow-lg ring-1 ring-black/10 bg-white
        ${
          isEntering
            ? "animate-in fade-in placement-bottom:slide-in-from-top-1 placement-top:slide-in-from-bottom-1 ease-out duration-200"
            : ""
        }
        ${
          isExiting
            ? "animate-out fade-out placement-bottom:slide-out-to-top-1 placement-top:slide-out-to-bottom-1 ease-in duration-150"
            : ""
        }
      `}
    />
  );
}
