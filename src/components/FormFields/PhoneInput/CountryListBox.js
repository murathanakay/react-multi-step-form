import {Fragment, useCallback, useEffect, useState} from "react";
import {Listbox, Transition} from "@headlessui/react";
import {ChevronUpDownIcon} from "@heroicons/react/20/solid";

import {
  defaultCountries,
  FlagImage,
  parseCountry,
} from "react-international-phone";

const CountryListBox = ({handleCountryChange, country}) => {
  const [selected, setSelected] = useState(country.iso2);

  useEffect(() => {
    setSelected(country.iso2);
  }, [country]);

  const handleChange = useCallback((value) => {
    setSelected(value);
    handleCountryChange(value);
  }, []);

  return (
    <div className="self-stretch flex items-center">
      <Listbox value={selected} onChange={handleChange}>
        <div className="relative pt-1 ms-3 me-4">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-gray-50 py-2 pl-2 pr-4 sm:text-sm">
            <span className="block truncate">
              <FlagImage iso2={selected} className="w-6 h-6 me-3" />
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-0">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-3.5 z-10 max-h-60 w-72 overflow-auto rounded-lg bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {defaultCountries.map((c, i) => {
                const country = parseCountry(c);

                return (
                  <Listbox.Option
                    key={country.iso2}
                    className={({active, selected}) =>
                      `relative cursor-default select-none py-2 px-3 ${
                        selected
                          ? "bg-amber-50 text-amber-900"
                          : "text-gray-900"
                      } ${
                        active
                          ? "!bg-amber-100 text-amber-900"
                          : "text-gray-900"
                      }`
                    }
                    value={country.iso2}
                  >
                    {({selected}) => (
                      <>
                        <div
                          className={`flex align-center ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          <FlagImage
                            iso2={country.iso2}
                            className="me-1 w-6 h-6"
                          />
                          {country.name} +{country.dialCode}
                        </div>
                      </>
                    )}
                  </Listbox.Option>
                );
              })}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default CountryListBox;
