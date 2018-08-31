import * as React from 'react';
import { AnyComponent } from '@material-ui/core';
import Input from '@material-ui/core/Input';

// asd is not a native element
const WrontNativeName = <Input inputComponent="asd" />; // $ExpectError

const NativeInput = <Input inputComponent="input" />;

// typescript infers `e: any`
// $ExpectError
const NativeInputWithProps = <Input inputProps={{ onFocus: e => {}, readOnly: true, size: 5 }} />;
// `e` needs an explicit type
const NativeInputWithPropsExplicit = (
  <Input
    inputProps={{ onFocus: (e: React.FocusEvent<HTMLInputElement>) => {}, readOnly: true, size: 5 }}
  />
);

const UnknownPropWarning = (
  <Input
    inputComponent="input"
    inputProps={{
      inputRef: {}, // $ExpectError
    }}
  />
);

interface CustomInputProps {
  suggestion: string;
}
const CustomInputComponent: AnyComponent = props => {
  return <input placeholder={props.suggestion} />;
};

// inputProps is still optional even if Props is not empty
const WithBadInputComponentProps = <Input inputComponent={CustomInputComponent} />;
const WithInputComponent = (
  <Input
    inputProps={{
      suggestion: 'testing',
    }}
    inputComponent={CustomInputComponent}
  />
);
